import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

export const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'documents');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Strict whitelist of extensions and MIME types
const ALLOWED_EXTENSIONS = new Set(['.txt', '.md', '.json', '.csv', '.pdf']);

const ALLOWED_MIME_TYPES = new Set([
  'text/plain',
  'text/markdown',
  'text/x-markdown',
  'application/json',
  'text/json',
  'text/csv',
  'application/csv',
  'application/vnd.ms-excel',
  'application/pdf'
]);

// Dangerous executable signatures (magic bytes) to block
const BLOCKED_MAGIC_BYTES = [
  Buffer.from([0x4D, 0x5A]), // Windows PE / EXE / DLL (MZ)
  Buffer.from([0x7F, 0x45, 0x4C, 0x46]), // Linux ELF
  Buffer.from([0xCF, 0xFA, 0xED, 0xFE]), // Mach-O 64-bit
  Buffer.from([0xCE, 0xFA, 0xED, 0xFE]), // Mach-O 32-bit
  Buffer.from([0xCA, 0xFE, 0xBA, 0xBE])  // Mach-O Universal / Java Class
];

// Configure Multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const docId = crypto.randomUUID();
    file.documentId = docId;
    file.safeExtension = ext;
    cb(null, `${docId}${ext}`);
  }
});

// File filter checking extension and declared MIME type
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    const err = new Error(`Invalid file extension '${ext}'. Allowed formats: .txt, .md, .json, .csv, .pdf`);
    err.code = 'INVALID_FILE_EXTENSION';
    return cb(err, false);
  }

  if (!ALLOWED_MIME_TYPES.has(file.mimetype.toLowerCase())) {
    const err = new Error(`Invalid file MIME type '${file.mimetype}'. Allowed formats: .txt, .md, .json, .csv, .pdf`);
    err.code = 'INVALID_MIME_TYPE';
    return cb(err, false);
  }

  cb(null, true);
};

// Multer upload instance with 5 MB size limit
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB maximum
    files: 1
  },
  fileFilter
});

/**
 * Validates file content headers (magic bytes) after upload to prevent file masquerading.
 * Removes the invalid file if checks fail.
 */
export const validateUploadedFileContent = async (filePath, ext) => {
  const buffer = Buffer.alloc(512);
  const fd = fs.openSync(filePath, 'r');
  const bytesRead = fs.readSync(fd, buffer, 0, 512, 0);
  fs.closeSync(fd);

  const header = buffer.subarray(0, bytesRead);

  // Check for dangerous binary/executable signatures
  for (const magic of BLOCKED_MAGIC_BYTES) {
    if (bytesRead >= magic.length && header.subarray(0, magic.length).equals(magic)) {
      fs.unlinkSync(filePath);
      const err = new Error('Dangerous file content detected: executable binary masquerading as document.');
      err.code = 'EXECUTABLE_CONTENT_BLOCKED';
      throw err;
    }
  }

  // PDF-specific header verification
  if (ext === '.pdf') {
    const pdfMagic = Buffer.from('%PDF-');
    if (bytesRead < 5 || !header.subarray(0, 5).equals(pdfMagic)) {
      fs.unlinkSync(filePath);
      const err = new Error('Corrupt or invalid PDF file header.');
      err.code = 'INVALID_PDF_HEADER';
      throw err;
    }
  }

  // JSON-specific syntax verification
  if (ext === '.json') {
    try {
      const fullContent = fs.readFileSync(filePath, 'utf8');
      JSON.parse(fullContent);
    } catch (parseErr) {
      fs.unlinkSync(filePath);
      const err = new Error('Invalid JSON file: syntax error in document body.');
      err.code = 'INVALID_JSON_BODY';
      throw err;
    }
  }

  // Text / CSV / Markdown files must not contain binary null bytes
  if (['.txt', '.md', '.csv'].includes(ext)) {
    if (header.includes(0x00)) {
      fs.unlinkSync(filePath);
      const err = new Error('Binary content detected in text document.');
      err.code = 'BINARY_TEXT_BLOCKED';
      throw err;
    }
  }

  return true;
};

/**
 * Express middleware wrapper handling upload errors cleanly with JSON responses.
 */
export const handleDocumentUpload = (req, res, next) => {
  const uploadSingle = upload.single('file');

  uploadSingle(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'File size exceeds maximum allowed limit of 5 MB.'
          });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return res.status(400).json({
            success: false,
            message: 'Unexpected form field. Please upload the file using the field name "file".'
          });
        }
        return res.status(400).json({
          success: false,
          message: `Upload error: ${err.message}`
        });
      }

      return res.status(400).json({
        success: false,
        message: err.message || 'File upload validation failed.'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file provided. Please attach a file under form field "file".'
      });
    }

    // Perform deep content verification
    try {
      await validateUploadedFileContent(req.file.path, req.file.safeExtension);
      next();
    } catch (validationErr) {
      return res.status(400).json({
        success: false,
        message: validationErr.message
      });
    }
  });
};
