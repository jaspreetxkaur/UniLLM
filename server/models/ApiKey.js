import mongoose from 'mongoose';
import crypto from 'crypto';

const apiKeySchema = new mongoose.Schema(
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
    workspace_id: {
      type: String,
      required: true,
      index: true
    },
    created_by_user_id: {
      type: String,
      required: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    key_prefix: {
      type: String,
      required: true
    },
    key_hash: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    key_secret: {
      type: String,
      default: null
    },
    status: {
      type: String,
      required: true,
      default: 'active',
      enum: ['active', 'revoked']
    },
    last_used_at: {
      type: Date,
      default: null
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

apiKeySchema.index({ organization_id: 1, created_at: -1 });

apiKeySchema.virtual('id').get(function () {
  return this._id;
});

export const ApiKey = mongoose.model('ApiKey', apiKeySchema, 'api_keys');
export default ApiKey;
