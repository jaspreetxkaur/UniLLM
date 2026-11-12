import mongoose from 'mongoose';
import crypto from 'crypto';

const organizationBudgetSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => crypto.randomUUID()
    },
    organization_id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    monthly_budget_usd: {
      type: Number,
      default: 100.00
    },
    alert_threshold_percent: {
      type: Number,
      default: 80
    },
    hard_limit_enabled: {
      type: Boolean,
      default: true
    },
    current_period_start: {
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

organizationBudgetSchema.virtual('id').get(function () {
  return this._id;
});

export const OrganizationBudget = mongoose.model('OrganizationBudget', organizationBudgetSchema, 'organization_budgets');
export default OrganizationBudget;
