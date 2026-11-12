import mongoose from 'mongoose';
import crypto from 'crypto';

const organizationSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => crypto.randomUUID()
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    referral_code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    referral_enabled: {
      type: Boolean,
      default: true
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

organizationSchema.virtual('id').get(function () {
  return this._id;
});

export const Organization = mongoose.model('Organization', organizationSchema, 'organizations');
export default Organization;
