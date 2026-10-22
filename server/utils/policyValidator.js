import { MODEL_CATALOG } from '../config/models.js';

const VALID_CONDITIONS = ['model', 'keyword', 'request_type', 'always'];
const VALID_ACTIONS = ['route_model', 'fallback_chain'];

export const policyValidator = {
  /**
   * Validates policy payload before creation or update
   */
  validate: (payload, isPartial = false) => {
    const {
      name,
      priority,
      enabled,
      condition_type,
      condition_config,
      action_type,
      action_config
    } = payload;

    // Validate Name
    if (!isPartial || name !== undefined) {
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return { valid: false, message: "Field 'name' is required and must be a non-empty string." };
      }
      if (name.trim().length > 255) {
        return { valid: false, message: "Field 'name' must not exceed 255 characters." };
      }
    }

    // Validate Priority
    if (!isPartial || priority !== undefined) {
      if (priority !== undefined) {
        if (!Number.isInteger(priority) || priority < 1 || priority > 1000) {
          return { valid: false, message: "Field 'priority' must be an integer between 1 and 1000." };
        }
      }
    }

    // Validate Enabled
    if (enabled !== undefined && typeof enabled !== 'boolean') {
      return { valid: false, message: "Field 'enabled' must be a boolean." };
    }

    // Validate Condition Type & Config
    if (!isPartial || condition_type !== undefined) {
      if (!VALID_CONDITIONS.includes(condition_type)) {
        return {
          valid: false,
          message: `Invalid condition_type '${condition_type}'. Allowed types: [${VALID_CONDITIONS.join(', ')}].`
        };
      }

      const condConfig = condition_config || {};
      if (typeof condConfig !== 'object' || Array.isArray(condConfig)) {
        return { valid: false, message: "Field 'condition_config' must be a JSON object." };
      }

      if (condition_type === 'model') {
        if (!condConfig.model || !MODEL_CATALOG[condConfig.model]) {
          return {
            valid: false,
            message: `condition_config.model is required and must be an available model in catalog: [${Object.keys(MODEL_CATALOG).join(', ')}].`
          };
        }
      } else if (condition_type === 'keyword') {
        if (!Array.isArray(condConfig.keywords) || condConfig.keywords.length === 0) {
          return {
            valid: false,
            message: "condition_config.keywords is required and must be a non-empty array of strings."
          };
        }
        for (const kw of condConfig.keywords) {
          if (typeof kw !== 'string' || kw.trim().length === 0) {
            return { valid: false, message: "All elements in condition_config.keywords must be non-empty strings." };
          }
        }
      } else if (condition_type === 'request_type') {
        if (!condConfig.request_type || typeof condConfig.request_type !== 'string') {
          return { valid: false, message: "condition_config.request_type is required and must be a string (e.g. 'chat')." };
        }
      }
    }

    // Validate Action Type & Config
    if (!isPartial || action_type !== undefined) {
      if (!VALID_ACTIONS.includes(action_type)) {
        return {
          valid: false,
          message: `Invalid action_type '${action_type}'. Allowed types: [${VALID_ACTIONS.join(', ')}].`
        };
      }

      const actConfig = action_config || {};
      if (typeof actConfig !== 'object' || Array.isArray(actConfig)) {
        return { valid: false, message: "Field 'action_config' must be a JSON object." };
      }

      if (!actConfig.target_model || !MODEL_CATALOG[actConfig.target_model]) {
        return {
          valid: false,
          message: `action_config.target_model is required and must be an available model in catalog: [${Object.keys(MODEL_CATALOG).join(', ')}].`
        };
      }

      if (action_type === 'fallback_chain') {
        if (!Array.isArray(actConfig.fallback_models) || actConfig.fallback_models.length === 0) {
          return {
            valid: false,
            message: "action_config.fallback_models is required and must be a non-empty array of models for fallback_chain."
          };
        }
        for (const fbModel of actConfig.fallback_models) {
          if (!MODEL_CATALOG[fbModel]) {
            return {
              valid: false,
              message: `Fallback model '${fbModel}' is not an available model in catalog: [${Object.keys(MODEL_CATALOG).join(', ')}].`
            };
          }
        }
      }
    }

    return { valid: true };
  }
};
