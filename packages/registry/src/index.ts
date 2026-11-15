/**
 * UI-X Registry package — public barrel.
 */
export {
  loadRegistryIndex,
  resolveItem,
  resolveDependencies,
  collectDependencies,
  buildInstallPlan,
} from "./resolver.js";

export {
  validateRegistry,
  loadAndValidate,
  formatValidationErrors,
  type ValidationError,
  type ValidationWarning,
  type ValidationReport,
  type ValidateOptions,
} from "./validator.js";
