import mongoose from 'mongoose';
import crypto from 'crypto';

const workspaceSchema = new mongoose.Schema(
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
    name: {
      type: String,
      required: true,
      trim: true
    },
    is_default: {
      type: Boolean,
      default: false
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

workspaceSchema.index({ organization_id: 1, is_default: -1, created_at: 1 });

workspaceSchema.virtual('id').get(function () {
  return this._id;
});

export const Workspace = mongoose.model('Workspace', workspaceSchema, 'workspaces');
export default Workspace;
