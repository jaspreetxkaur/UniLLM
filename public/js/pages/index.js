// Central Page Aggregator & Modular Re-exporter for UniLLM SPA

import * as public_landing from "./public/landing.js?v=10";
import * as public_product from "./public/product.js?v=10";
import * as public_solutions from "./public/solutions.js?v=10";
import * as public_modelsMarketplace from "./public/modelsMarketplace.js?v=10";
import * as public_modelDetail from "./public/modelDetail.js?v=10";
import * as public_developers from "./public/developers.js?v=10";
import * as public_pricing from "./public/pricing.js?v=10";
import * as public_enterprise from "./public/enterprise.js?v=10";
import * as public_about from "./public/about.js?v=10";
import * as public_security from "./public/security.js?v=10";
import * as public_statusPage from "./public/statusPage.js?v=10";
import * as public_contact from "./public/contact.js?v=10";
import * as public_changelog from "./public/changelog.js?v=10";
import * as public_bookDemo from "./public/bookDemo.js?v=10";
import * as public_talkToSales from "./public/talkToSales.js?v=10";
import * as public_getStarted from "./public/getStarted.js?v=10";
import * as public_careers from "./public/careers.js?v=10";
import * as public_blog from "./public/blog.js?v=10";
import * as public_blogDetail from "./public/blogDetail.js?v=10";
import * as auth_login from "./auth/login.js?v=10";
import * as auth_signup from "./auth/signup.js?v=10";
import * as auth_forgotPassword from "./auth/forgotPassword.js?v=10";
import * as auth_resetPassword from "./auth/resetPassword.js?v=10";
import * as auth_onboarding from "./auth/onboarding.js?v=10";
import * as app_overview from "./app/overview.js?v=11";
import * as app_playground from "./app/playground.js?v=35";
import * as app_models from "./app/models.js?v=10";
import * as app_modelDetail from "./app/modelDetail.js?v=10";
import * as app_arena from "./app/arena.js?v=10";
import * as app_requests from "./app/requests.js?v=10";
import * as app_requestTrace from "./app/requestTrace.js?v=10";
import * as app_analytics from "./app/analytics.js?v=10";
import * as app_costs from "./app/costs.js?v=10";
import * as app_routing from "./app/routing.js?v=10";
import * as app_cache from "./app/cache.js?v=10";
import * as app_apiKeys from "./app/apiKeys.js?v=10";
import * as app_usage from "./app/usage.js?v=10";
import * as app_billing from "./app/billing.js?v=10";
import * as app_notifications from "./app/notifications.js?v=10";
import * as app_settings from "./app/settings.js?v=11";
import * as admin_overview from "./admin/overview.js?v=10";
import * as admin_employees from "./admin/employees.js?v=11";
import * as admin_employeeDetail from "./admin/employeeDetail.js?v=10";
import * as admin_referrals from "./admin/referrals.js?v=10";
import * as admin_teams from "./admin/teams.js?v=13";
import * as admin_teamDetail from "./admin/teamDetail.js?v=10";
import * as admin_models from "./admin/models.js?v=10";
import * as admin_policies from "./admin/policies.js?v=11";
import * as admin_limits from "./admin/limits.js?v=10";
import * as admin_alerts from "./admin/alerts.js?v=10";
import * as admin_auditLogs from "./admin/auditLogs.js?v=10";
import * as admin_apiKeys from "./admin/apiKeys.js?v=10";
import * as admin_analytics from "./admin/analytics.js?v=10";
import * as admin_costs from "./admin/costs.js?v=10";
import * as admin_billing from "./admin/billing.js?v=10";
import * as admin_security from "./admin/security.js?v=10";
import * as admin_settings from "./admin/settings.js?v=11";
import * as docs_docsHome from "./docs/docsHome.js?v=10";
import * as docs_docsApi from "./docs/docsApi.js?v=10";
import * as errors_notFound from "./errors/notFound.js?v=10";

// Consolidated pages object for router and direct lookup
export const pages = {
  // --- PUBLIC PAGES ---
  landing: public_landing.landing,
  bindLanding: public_landing.bindLanding,
  product: public_product.product,
  bindProduct: public_product.bindProduct,
  solutions: public_solutions.solutions,
  bindSolutions: public_solutions.bindSolutions,
  modelsMarketplace: public_modelsMarketplace.modelsMarketplace,
  bindModelsMarketplace: public_modelsMarketplace.bindModelsMarketplace,
  modelDetail: public_modelDetail.modelDetail,
  bindModelDetail: public_modelDetail.bindModelDetail,
  developers: public_developers.developers,
  bindDevelopers: public_developers.bindDevelopers,
  pricing: public_pricing.pricing,
  bindPricing: public_pricing.bindPricing,
  enterprise: public_enterprise.enterprise,
  bindEnterprise: public_enterprise.bindEnterprise,
  about: public_about.about,
  bindAbout: public_about.bindAbout,
  security: public_security.security,
  bindSecurity: public_security.bindSecurity,
  statusPage: public_statusPage.statusPage,
  bindStatusPage: public_statusPage.bindStatusPage,
  contact: public_contact.contact,
  bindContact: public_contact.bindContact,
  changelog: public_changelog.changelog,
  bindChangelog: public_changelog.bindChangelog,
  bookDemo: public_bookDemo.bookDemo,
  bindBookDemo: public_bookDemo.bindBookDemo,
  talkToSales: public_talkToSales.talkToSales,
  bindTalkToSales: public_talkToSales.bindTalkToSales,
  getStarted: public_getStarted.getStarted,
  bindGetStarted: public_getStarted.bindGetStarted,
  careers: public_careers.careers,
  bindCareers: public_careers.bindCareers,
  blog: public_blog.blog,
  bindBlog: public_blog.bindBlog,
  blogDetail: public_blogDetail.blogDetail,
  bindBlogDetail: public_blogDetail.bindBlogDetail,
  // --- AUTH PAGES ---
  login: auth_login.login,
  bindLogin: auth_login.bindLogin,
  signup: auth_signup.signup,
  bindSignup: auth_signup.bindSignup,
  forgotPassword: auth_forgotPassword.forgotPassword,
  bindForgotPassword: auth_forgotPassword.bindForgotPassword,
  resetPassword: auth_resetPassword.resetPassword,
  bindResetPassword: auth_resetPassword.bindResetPassword,
  onboarding: auth_onboarding.onboarding,
  bindOnboarding: auth_onboarding.bindOnboarding,
  // --- APP PAGES ---
  appOverview: app_overview.appOverview,
  bindAppOverview: app_overview.bindAppOverview,
  appPlayground: app_playground.appPlayground,
  bindAppPlayground: app_playground.bindAppPlayground,
  appModels: app_models.appModels,
  bindAppModels: app_models.bindAppModels,
  appModelDetail: app_modelDetail.appModelDetail,
  bindAppModelDetail: app_modelDetail.bindAppModelDetail,
  appArena: app_arena.appArena,
  bindAppArena: app_arena.bindAppArena,
  appRequests: app_requests.appRequests,
  bindAppRequests: app_requests.bindAppRequests,
  appRequestTrace: app_requestTrace.appRequestTrace,
  bindAppRequestTrace: app_requestTrace.bindAppRequestTrace,
  appAnalytics: app_analytics.appAnalytics,
  bindAppAnalytics: app_analytics.bindAppAnalytics,
  appCosts: app_costs.appCosts,
  bindAppCosts: app_costs.bindAppCosts,
  appRouting: app_routing.appRouting,
  bindAppRouting: app_routing.bindAppRouting,
  appCache: app_cache.appCache,
  bindAppCache: app_cache.bindAppCache,
  appApiKeys: app_apiKeys.appApiKeys,
  bindAppApiKeys: app_apiKeys.bindAppApiKeys,
  appUsage: app_usage.appUsage,
  bindAppUsage: app_usage.bindAppUsage,
  appBilling: app_billing.appBilling,
  bindAppBilling: app_billing.bindAppBilling,
  appNotifications: app_notifications.appNotifications,
  bindAppNotifications: app_notifications.bindAppNotifications,
  appSettings: app_settings.appSettings,
  bindAppSettings: app_settings.bindAppSettings,
  // --- ADMIN PAGES ---
  adminOverview: admin_overview.adminOverview,
  bindAdminOverview: admin_overview.bindAdminOverview,
  adminEmployees: admin_employees.adminEmployees,
  bindAdminEmployees: admin_employees.bindAdminEmployees,
  adminEmployeeDetail: admin_employeeDetail.adminEmployeeDetail,
  bindAdminEmployeeDetail: admin_employeeDetail.bindAdminEmployeeDetail,
  adminReferrals: admin_referrals.adminReferrals,
  bindAdminReferrals: admin_referrals.bindAdminReferrals,
  adminTeams: admin_teams.adminTeams,
  bindAdminTeams: admin_teams.bindAdminTeams,
  adminTeamDetail: admin_teamDetail.adminTeamDetail,
  bindAdminTeamDetail: admin_teamDetail.bindAdminTeamDetail,
  adminModels: admin_models.adminModels,
  bindAdminModels: admin_models.bindAdminModels,
  adminPolicies: admin_policies.adminPolicies,
  bindAdminPolicies: admin_policies.bindAdminPolicies,
  renderPolicyWizardHtml: admin_policies.renderPolicyWizardHtml,
  bindPolicyWizard: admin_policies.bindPolicyWizard,
  adminLimits: admin_limits.adminLimits,
  bindAdminLimits: admin_limits.bindAdminLimits,
  adminAlerts: admin_alerts.adminAlerts,
  bindAdminAlerts: admin_alerts.bindAdminAlerts,
  adminAuditLogs: admin_auditLogs.adminAuditLogs,
  bindAdminAuditLogs: admin_auditLogs.bindAdminAuditLogs,
  adminApiKeys: admin_apiKeys.adminApiKeys,
  bindAdminApiKeys: admin_apiKeys.bindAdminApiKeys,
  adminAnalytics: admin_analytics.adminAnalytics,
  bindAdminAnalytics: admin_analytics.bindAdminAnalytics,
  adminCosts: admin_costs.adminCosts,
  bindAdminCosts: admin_costs.bindAdminCosts,
  adminBilling: admin_billing.adminBilling,
  bindAdminBilling: admin_billing.bindAdminBilling,
  adminSecurity: admin_security.adminSecurity,
  bindAdminSecurity: admin_security.bindAdminSecurity,
  adminSettings: admin_settings.adminSettings,
  bindAdminSettings: admin_settings.bindAdminSettings,
  // --- DOCS PAGES ---
  docsHome: docs_docsHome.docsHome,
  bindDocsHome: docs_docsHome.bindDocsHome,
  docsApi: docs_docsApi.docsApi,
  bindDocsApi: docs_docsApi.bindDocsApi,
  // --- ERRORS PAGES ---
  render404: errors_notFound.render404,
  bind404: errors_notFound.bind404,
};

export default pages;
