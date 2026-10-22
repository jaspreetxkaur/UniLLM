// APP PAGE: modelDetail
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { modelDetail, bindModelDetail } from "../public/modelDetail.js?v=2";

export function appModelDetail(params) {
  return modelDetail(params);
}

export function bindAppModelDetail(params) {
  if (typeof bindModelDetail === 'function') {
    bindModelDetail(params);
  }
}

export default {
  appModelDetail,
  bindAppModelDetail
};
