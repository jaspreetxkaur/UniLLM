import mongoose from 'mongoose';
import crypto from 'crypto';

const auditLogSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => crypto.randomUUID()
    },
    organization_id: {
      type: String,
      required: true,
      index: true
    },
    actor_id: {
      type: String,
      default: null,
      index: true
    },
    action: {
      type: String,
      required: true
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    ip_address: {
      type: String,
      default: null
    },
    created_at: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    timestamps: false,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

auditLogSchema.index({ organization_id: 1, created_at: -1 });

auditLogSchema.virtual('id').get(function () {
  return this._id;
});

export const AuditLog = mongoose.model('AuditLog', auditLogSchema, 'audit_logs');
export default AuditLog;
