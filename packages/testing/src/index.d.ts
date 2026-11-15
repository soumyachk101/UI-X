/**
 * UI-X Testing Utilities — type declarations.
 */

import type { ReactElement } from "react";

// Re-exported types from testing libraries
export type { RenderOptions, Queries } from "@testing-library/react";

export interface RenderResult<Q = Queries> {
  container: HTMLElement;
  baseElement: HTMLElement;
  debug(baseElement?: HTMLElement | DocumentFragment): void;
  rerender(ui: ReactElement): void;
  unmount(): void;
}

/**
 * Render a component and return testing utilities.
 */
export declare function renderComponent(
  ui: ReactElement,
  options?: Record<string, unknown>
): RenderResult;

/**
 * Assert no accessibility violations.
 */
export declare function expectNoA11yViolations(
  container: HTMLElement
): Promise<void>;
