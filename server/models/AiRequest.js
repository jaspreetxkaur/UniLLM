import mongoose from 'mongoose';
import crypto from 'crypto';

const aiRequestSchema = new mongoose.Schema(
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
    api_key_id: {
      type: String,
      default: null,
      index: true
    },
    user_id: {
      type: String,
      default: null,
      index: true
    },
    request_type: {
      type: String,
      default: 'chat'
    },
    provider: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    prompt_tokens: {
      type: Number,
      default: 0
    },
    completion_tokens: {
      type: Number,
      default: 0
    },
    total_tokens: {
      type: Number,
      default: 0
    },
    cost_usd: {
      type: Number,
      default: 0.000000
    },
    latency_ms: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: 'success'
    },
    status_code: {
      type: Number,
      default: 200
    },
    cache_status: {
      type: String,
      default: 'MISS',
      enum: ['HIT', 'MISS', 'BYPASS']
    },
    is_fallback: {
      type: Boolean,
      default: false
    },
    error_message: {
      type: String,
      default: null
    },
    request_metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
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

// High-performance compound indexes for analytics and usage filtering
aiRequestSchema.index({ organization_id: 1, created_at: -1 });
aiRequestSchema.index({ organization_id: 1, provider: 1, created_at: -1 });
aiRequestSchema.index({ workspace_id: 1, created_at: -1 });

aiRequestSchema.virtual('id').get(function () {
  return this._id;
});

export const AiRequest = mongoose.model('AiRequest', aiRequestSchema, 'ai_requests');
export default AiRequest;
