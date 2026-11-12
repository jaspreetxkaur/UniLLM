import mongoose from 'mongoose';
import crypto from 'crypto';

const routingPolicySchema = new mongoose.Schema(
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
    description: {
      type: String,
      default: ''
    },
    enabled: {
      type: Boolean,
      default: true
    },
    priority: {
      type: Number,
      default: 10
    },
    condition_type: {
      type: String,
      required: true
    },
    condition_config: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    action_type: {
      type: String,
      required: true
    },
    action_config: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    created_by_user_id: {
      type: String,
      default: null
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
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

// High-efficiency composite index for tenant-scoped priority rule resolution
routingPolicySchema.index({ organization_id: 1, enabled: 1, priority: 1, created_at: 1 });

routingPolicySchema.virtual('id').get(function () {
  return this._id;
});

export const RoutingPolicy = mongoose.model('RoutingPolicy', routingPolicySchema, 'routing_policies');
export default RoutingPolicy;
