/**
 * Educational CommonJS Module Helper
 * File: scripts/demo-cjs-helper.cjs
 * 
 * Demonstrates:
 * 1. Traditional CommonJS module format (.cjs extension in an ESM project)
 * 2. 'module.exports' and 'exports' pattern
 * 3. Synchronous loading compatibility
 */

function formatTimestamp(date = new Date()) {
  return date.toISOString().replace('T', ' ').substring(0, 19);
}

function computeMemoryStats() {
  const mem = process.memoryUsage();
  return {
    rssMb: parseFloat((mem.rss / 1024 / 1024).toFixed(2)),
    heapUsedMb: parseFloat((mem.heapUsed / 1024 / 1024).toFixed(2)),
    heapTotalMb: parseFloat((mem.heapTotal / 1024 / 1024).toFixed(2))
  };
}

module.exports = {
  moduleSystem: 'CommonJS (CJS)',
  formatTimestamp,
  computeMemoryStats
};
