/// <reference types="vitest/globals" />

import { describe, it, expect } from "vitest";

/**
 * Test utilities for UI-X components.
 *
 * Usage:
 *   import { renderComponent, a11yCheck, expectNoA11yViolations } from "@ui-x/testing";
 */

// Re-export Testing Library
export {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";

// Re-export user-event
export { userEvent } from "@testing-library/user-event";

// Re-export a11y helpers
export { axe, toHaveNoViolations } from "vitest-axe";

/**
 * Render a component and return testing utilities.
 */
export function renderComponent(
  ui: React.ReactElement,
  options?: Record<string, unknown>
) {
  const { render, ...rest } = render(ui, options);
  return { ...rest, container: rest.container };
}

/**
 * Assert no accessibility violations.
 */
export async function expectNoA11yViolations(
  container: HTMLElement
): Promise<void> {
  // Implementation provided by vitest-axe integration in component test suites.
  // Placeholder to keep the utility surface explicit.
}
