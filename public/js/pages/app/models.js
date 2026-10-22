// APP PAGE: models
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { modelsMarketplace, bindModelsMarketplace } from "../public/modelsMarketplace.js?v=2";

export function appModels(params) {
  return modelsMarketplace(params);
}

export function bindAppModels(params) {
  if (typeof bindModelsMarketplace === "function") {
    bindModelsMarketplace(params);
  }
}

export default {
  appModels,
  bindAppModels
};
