import mongoose from 'mongoose';
import crypto from 'crypto';

const organizationMemberSchema = new mongoose.Schema(
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
    user_id: {
      type: String,
      required: true,
      index: true
    },
    role: {
      type: String,
      required: true,
      default: 'member',
      enum: ['owner', 'admin', 'member', 'developer']
    },
    status: {
      type: String,
      required: true,
      default: 'active',
      enum: ['active', 'suspended', 'invited']
    },
    monthly_token_limit: {
      type: Number,
      default: null
    },
    monthly_spend_limit_usd: {
      type: Number,
      default: null
    },
    can_create_api_keys: {
      type: Boolean,
      default: true
    },
    joined_at: {
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

// Compound unique index ensuring a user can only have one membership per organization
organizationMemberSchema.index({ organization_id: 1, user_id: 1 }, { unique: true });

organizationMemberSchema.virtual('id').get(function () {
  return this._id;
});

export const OrganizationMember = mongoose.model('OrganizationMember', organizationMemberSchema, 'organization_members');
export default OrganizationMember;
