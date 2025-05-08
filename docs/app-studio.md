# App Studio Rules

## I. Introduction

### Purpose

These rules are designed to guide developers in building high-quality, consistent, and maintainable components for or with the **App Studio library**. They combine general clean code principles with best practices specific to React, TypeScript, and the established patterns within the App Studio codebase. Adhering to these rules will ensure that new components integrate seamlessly and the library remains easy to understand, use, and extend.

### How to Use

This document outlines the expected standards and practices. Refer to it when:

*   Creating new components for the App Studio library.
*   Modifying existing App Studio components.
*   Using App Studio components to build applications.

Start with the General Principles, then focus on the App Studio Specific Best Practices which detail the library's core patterns.

## II. General Coding Principles (Applied to App Studio)

### Clean Code

*   **Constants Over Magic Values:** Use named constants defined in `.style.ts` or `.style.tsx` files (e.g., `ButtonSizes`, `Themes`) instead of hard-coded numbers or strings directly in view components.
*   **Meaningful Names:** Use descriptive names for components (`AlertComponent`, `ButtonView`), props (`isLoading`, `colorScheme`), state variables (`isHovered`), hooks (`useAlertState`), and types (`AlertProps`, `Variant`). Follow established conventions (see Naming Conventions section).
*   **Smart Comments:** Explain the *why* behind complex logic or non-obvious choices, especially in state hooks or utility functions. Prop descriptions should be in `.props.ts` files using TSDoc. `.view.tsx` files should be largely self-explanatory through props and structure.
*   **Single Responsibility:**
    *   **Components:** `ComponentName.tsx` orchestrates state and view.
    *   **Hooks:** `useComponentNameState` manages component-specific state and logic.
    *   **Views:** `ComponentName.view.tsx` focuses solely on presentation based on props.
    *   **Props/Types/Styles:** Dedicated files (`.props.ts`, `.type.ts`, `.style.ts`) handle specific concerns.
*   **DRY (Don't Repeat Yourself):** Extract reusable UI patterns into shared components (like the `Field*` layout components) or utility functions. Avoid duplicating prop type definitions; extend or compose interfaces.
*   **Clean Structure:** Strictly follow the established component folder structure (see Project & Component Structure section). Keep related logic, types, and styles together.
*   **Encapsulation:** Define clear component APIs through `ComponentName.props.ts`. Internal state and logic should be managed within the component or its state hook.
*   **Code Quality Maintenance:** Regularly refactor components to improve clarity, performance, and adherence to these rules. Address TODOs and FIXMEs promptly.
*   **Testing:** (Assuming tests will be added) Write unit tests for component logic (state hooks) and integration/rendering tests for components, verifying behavior based on props and interactions. Use examples (`examples/*.tsx`) for visual testing and documentation.
*   **Version Control:** Use Git effectively. Commit messages should be clear and concise (`feat(Button): Add loading state`). Branch names should be descriptive (`feature/add-tooltip-component`).

### Code Quality (Developer Focus)

*   **Verify Prop Usage:** Ensure props passed to components match their definitions in `.props.ts`. Double-check types and optionality.
*   **File-by-File Structure:** When creating or modifying components, ensure all relevant files (`.props.ts`, `.state.ts`, `.view.tsx`, etc.) are created or updated consistently.
*   **Preserve Component API:** When refactoring, avoid breaking changes to component props (`ComponentName.props.ts`) unless necessary and clearly documented.
*   **Focused Changes:** Keep commits and pull requests focused on a single component or feature.
*   **Leverage Existing Components:** Before creating new UI logic, check if an existing App Studio component (`Button`, `Alert`, `Vertical`, etc.) can be used or adapted.

### Documentation

*   **Prop Documentation (TSDoc):** Clearly document *all* props in the `ComponentName.props.ts` file using TSDoc comments (e.g., `/** Description of the prop */`).
*   **Type Definitions:** Define and export specific types (`Size`, `Variant`, `Shape`) in `ComponentName.type.ts` or `.d.ts` files. Use descriptive type names.
*   **Examples (`examples/*.tsx`):** Create clear, concise, and functional examples for each significant prop or feature of a component in the `examples/` directory. Export all examples from `examples/index.ts`.
*   **MDX Documentation:** Keep the corresponding `.mdx` file (e.g., `Button.mdx`) updated with imports, descriptions, props tables, and embedded examples that match the code in the `examples/` directory.

## III. App Studio Specific Best Practices

### Project & Component Structure

*   **Standard Structure:** Every component `ComponentName` should reside in a directory `ComponentName/` and follow this internal structure:
    *   `ComponentName/ComponentName/`: Contains the core component files.
        *   `ComponentName.props.ts`: TypeScript interface definitions for the component's props.
        *   `ComponentName.state.ts`: (Optional) Custom React hook (`useComponentNameState`) for managing component state and logic.
        *   `ComponentName.style.ts` or `.tsx`: Style constants, mappings (e.g., `Size` to pixels), or theme definitions.
        *   `ComponentName.type.ts` or `.d.ts`: TypeScript type definitions specific to the component (e.g., `Variant`, `Size`, `Shape`, `Styles`).
        *   `ComponentName.view.tsx`: The presentational React component, receiving props and state.
    *   `ComponentName/examples/`: Contains usage example components.
        *   `default.tsx`: A basic default usage example.
        *   `propSpecificExample.tsx`: Examples demonstrating specific props (e.g., `variant.tsx`, `size.tsx`).
        *   `index.ts`: Exports all examples from the directory (`export * from './default';`).
    *   `ComponentName.tsx`: The main export file, usually orchestrating the state hook and the view.
    *   `ComponentName.mdx`: Documentation file for the component.

### Naming Conventions

*   **Components:** `PascalCase`. Main component: `ComponentNameComponent` (exported as `ComponentName`). View component: `ComponentNameView`. Example components: `DefaultDemo`, `VariantDemo`.
*   **Files:** `PascalCase` matching the component/purpose (e.g., `Button.tsx`, `Button.props.ts`, `Button.view.tsx`, `default.tsx`). Use `.mdx` for documentation.
*   **Interfaces/Types:** `PascalCase` (e.g., `ButtonProps`, `ButtonViewProps`, `Size`, `Variant`). Append `Props` for component prop interfaces.
*   **State Hooks:** `use` + `PascalCase` + `State` (e.g., `useButtonState`, `useModalState`).
*   **Variables/Functions:** `camelCase` (e.g., `isHovered`, `setIsHovered`, `handleToggle`).
*   **Style Constants:** `PascalCase` or `UPPER_SNAKE_CASE` (e.g., `ButtonSizes`, `Themes`, `DEFAULT_COLOR`).

### Component Design

*   **Functional Components & Hooks:** Use functional components and React Hooks (`useState`, `useEffect`, `useCallback`, custom hooks) exclusively.
*   **Separation of Concerns:**
    *   **Logic/State:** Encapsulate in `useComponentNameState`.
    *   **Presentation:** Handle in `ComponentName.view.tsx`.
    *   **Orchestration:** Connect state and view in `ComponentName.tsx`.
*   **Props:** Define explicitly in `.props.ts`. Pass data down from parent to child. Avoid deeply nested prop drilling where context or state management might be better (though sparingly used in this library outside specific store-based components).
*   **Composition:** Use composition by passing `children` or specific props (like `icon`, `left`, `right` in `TextField`).
*   **Layout:** **Strongly prefer** using the provided layout components (`View`, `Horizontal`, `Vertical`, `Center`) over manual CSS for flexbox/grid layouts to ensure consistency. Pass layout props (e.g., `gap`, `justifyContent`, `alignItems`) to these components.
*   **Base Components:** Leverage core `app-studio` components (like `Element`, `Input`, `View` from the base `app-studio` import if applicable) for building blocks.

### Props & Types

*   **TypeScript Interfaces:** Define *all* component props using TypeScript interfaces in `ComponentName.props.ts`.
*   **Clarity & Specificity:** Use descriptive prop names. Use specific union types (`Variant`, `Size`) defined in `.type.ts` instead of generic `string` or `number` where applicable.
*   **Optional vs. Required:** Clearly distinguish between optional (`?`) and required props. Provide default values within the component or view logic (e.g., `size = 'md'`).
*   **Extending Props:** Use `extends Omit<BaseProps, 'propToOverride'>` or `extends BaseProps` when building on base component props.
*   **Avoid `any`:** Use specific types, `unknown`, or generics. If `any` is absolutely necessary, add a `// eslint-disable-next-line @typescript-eslint/no-explicit-any` with justification.
*   **Export Types:** Export all relevant types and interfaces from `ComponentName.props.ts` and `ComponentName.type.ts` so they can be used by consumers.

### State Management

*   **Component State:** Use `useState` for simple state within a component or its state hook.
*   **Custom Hooks (`useComponentNameState`):** Centralize component-specific state, event handlers, and derived logic within a custom hook in `ComponentName.state.ts`. This hook should return an object containing state values and setters/handlers.
*   **Global State (`zustand`):** Use only for state that is truly global or shared across distant parts of the application (e.g., `Modal` visibility, `Message` queue). Avoid using it for local component state.

### Styling

*   **Style Definitions:** Define style constants (sizes, colors, theme maps) in `.style.ts` or `.style.tsx`.
*   **`styles` Prop:** Allow consumers to override specific parts of the component's style via the `styles` prop, which should accept an object mapping keys (e.g., `container`, `label`, `icon`) to `CSSProperties`. Define the structure of this `styles` object in `ComponentName.type.ts`.
*   **Theme Variables:** Prefer using theme variables (e.g., `theme.primary`, `color.blueGray.700`) over hardcoded hex/rgb values to maintain theme consistency. Use `useTheme` hook if necessary to access theme values dynamically.
*   **Inline Styles vs. `styles` Prop:** Use inline styles within `.view.tsx` for structural layout (using layout components) and dynamic styles based on state (e.g., hover effects). Use the `styles` prop for customizable theme/appearance overrides.
*   **CSS Files:** Limit usage. Prefer inline styles passed via props or theme-based styling. Use CSS files (like `style.css` in `TextArea` and `TextField`) only for styles that cannot be easily applied via inline styles (e.g., pseudo-elements, complex selectors).

### Form Components & Formik

*   **Base Form Components:** Build reusable base form components (`TextField`, `Checkbox`, `Select`, etc.) following the standard structure.
*   **Formik Integration:** Create corresponding `FormikComponentName` wrappers (e.g., `FormikTextField`).
*   **`useFormikInput` Hook:** Utilize the `useFormikInput` hook within Formik wrappers to connect components to Formik's state, errors, and touched status automatically. Pass `name` and `type` correctly.

### Icons

*   **Use Icon Components:** Import and use icons directly from `Icon/Icon.tsx`.
*   **Props:** Pass `size`, `color`, `strokeWidth`, `filled`, `orientation` as props to customize icons. Do not hardcode styles within the icon usage.

## IV. Dos and Don'ts for App Studio

**Dos:**

*   **Do** follow the exact `ComponentName/ComponentName/` file structure.
*   **Do** define all props with TSDoc comments in `ComponentName.props.ts`.
*   **Do** use TypeScript interfaces for props and specific types (`Variant`, `Size`) from `.type.ts`.
*   **Do** encapsulate component state and logic in `useComponentNameState` hooks.
*   **Do** keep `ComponentName.view.tsx` purely presentational.
*   **Do** use `Horizontal`, `Vertical`, `Center`, `View` for layout.
*   **Do** use theme variables (`theme.primary`) for colors.
*   **Do** allow style overrides via the `styles` prop with a defined structure.
*   **Do** create clear examples in the `examples/` directory for each component.
*   **Do** keep `.mdx` documentation synchronized with examples and props.
*   **Do** use `FormikComponentName` wrappers and `useFormikInput` when using Formik.
*   **Do** import and use Icons from `Icon/Icon.tsx` passing props.

**Don'ts:**

*   **Don't** deviate from the established file and folder structure.
*   **Don't** define props inline or without TSDoc comments.
*   **Don't** use `any` for props or state; use specific types.
*   **Don't** put complex logic or state management directly in `ComponentName.view.tsx`.
*   **Don't** use manual CSS for flexbox/grid layouts; use Layout components.
*   **Don't** hardcode colors or sizes; use style constants and theme variables.
*   **Don't** apply styles that cannot be overridden by the `styles` prop unless essential.
*   **Don't** forget to create examples for new components or features.
*   **Don't** let documentation (`.mdx`) become outdated.
*   **Don't** connect standard form components directly to Formik; use the wrappers.
*   **Don't** create custom SVG icons directly in components; add them to `Icon/Icon.tsx`.

## V. Secret Sauce (Effective Application)

*   **Consistency is Key:** The primary goal is consistency with the *existing* App Studio patterns. When unsure, look at similar components (`Button`, `TextField`, `Alert`) and follow their structure and approach.
*   **Understand the Pattern:** Internalize the `props -> state hook -> view` flow and the purpose of each file (`.props.ts`, `.state.ts`, `.view.tsx`, `.tsx`).
*   **Leverage TypeScript:** Use TypeScript not just for type safety but also for self-documentation through clear interfaces and types.
*   **Prioritize Reusability:** Use Layout components and existing base components whenever possible. Extract common logic into utility functions or hooks.
*   **Documentation First (or Concurrent):** Define props (`.props.ts`) and write basic examples (`examples/`) early. This clarifies the component's API and intended usage. Keep the `.mdx` file updated as you build.
*   **Review Against Rules:** During code reviews, explicitly check adherence to these cursor rules, especially structure, naming, props definition, and styling patterns.

## VI. Conclusion

Following these rules will help maintain the quality, consistency, and developer experience of the App Studio library. They provide a clear framework for building components that are robust, maintainable, and easy to integrate. Remember to prioritize consistency with existing patterns and continuously refine your understanding and application of these guidelines.



# Create new component for App Studio Web

1.  **Component Structure:** Components generally follow a consistent pattern:
    *   `ComponentName/` (Root folder for the component)
        *   `ComponentName/` (Inner folder for core files)
            *   `ComponentName.props.ts` (or `.tsx`): Defines TypeScript interfaces for props. Often extends base props like `ViewProps` or `InputProps` from `app-studio`.
            *   `ComponentName.state.ts` (or `.tsx`): Usually contains a custom hook `useComponentNameState` using `React.useState` to manage component-specific state (like hover, focus, selection).
            *   `ComponentName.style.ts` (or `.tsx`): Contains style-related constants, mappings (e.g., `Size` to CSS), or theme definitions.
            *   `ComponentName.type.ts` (or `.tsx`, `.d.ts`): Defines specific TypeScript types/enums used within the component (e.g., `Variant`, `Size`, `Shape`, custom style object types).
            *   `ComponentName.view.tsx`: The core presentational component. It receives props (often including state values and setters from the hook) and renders the UI, typically using base components like `View`, `Text`, `Horizontal`, `Vertical`, `Center` from the library itself or `app-studio`.
        *   `examples/` (Folder for usage examples)
            *   `default.tsx`: A basic usage example.
            *   Other `.tsx` files: Demonstrating specific props, variants, or states (e.g., `size.tsx`, `variant.tsx`, `isDisabled.tsx`).
            *   `index.ts` (or `.tsx`): Exports all examples from the directory.
        *   `ComponentName.tsx` (Top-level file): The public API for the component. It usually imports the state hook and the view, wires them together, and exports the final component.

2.  **Styling:**
    *   Relies heavily on the `app-studio` library's components (`View`, `Element`, `Horizontal`, `Vertical`, `Center`) which accept style props directly.
    *   Uses a theme system (`useTheme`, `getColor`) provided by `app-studio`.
    *   Style constants (like size mappings) are defined in `.style.ts` files.
    *   Custom style overrides are often passed via a `styles` prop, typed in `.type.ts`.
    *   Minimal use of global CSS, mostly for specific input overrides (`style.css` in some form components).

3.  **State Management:**
    *   Primarily local component state managed via `React.useState` encapsulated in custom `useComponentNameState` hooks.
    *   Global/Shared state for components like `Modal` and `Message` uses Zustand (`create`, `useMessageStore`, `useModalStore`).

4.  **Dependencies & Base Components:**
    *   Strong reliance on `app-studio` for base elements, layout, input primitives, and theming.
    *   Uses internal layout components (`Horizontal`, `Vertical`, `Center`, `View`).
    *   Uses internal `Text`, `Icon`, `Button`, `Loader` components.
    *   Form components often use shared layout helpers (`FieldContainer`, `FieldContent`, etc.).
    *   `react-router-dom` for `Link`.
    *   `formik` and `yup` for form handling examples/integrations.

5.  **TypeScript:** The library is strongly typed using TypeScript interfaces and types defined in dedicated files.

6.  **Exports:** Components and their primary prop types are exported from the root `index.tsx`.

**Guideline for Creating New Components**

Based on the analysis, here's a guideline for adding new components to this library:

**I. Core Principles:**

1.  **Consistency:** Adhere strictly to the established file structure, naming conventions, and coding patterns.
2.  **Separation of Concerns:** Keep props, types, state logic, styling constants, and view presentation in separate, dedicated files.
3.  **TypeScript First:** Define clear interfaces and types for all props, state, and internal structures.
4.  **Reusability:** Leverage existing base components (`View`, `Text`, `Horizontal`, `Icon`, etc.) and `app-studio` primitives whenever possible. Avoid introducing new external dependencies unless absolutely necessary and approved.
5.  **Presentational View:** The `.view.tsx` component should be purely presentational, receiving all data and event handlers via props.
6.  **State Encapsulation:** Use the `useComponentNameState` hook pattern for managing local component state.

**II. Steps to Create a New Component (`NewComponent`):**

1.  **Planning:**
    *   Define the component's purpose and core functionality.
    *   Identify the necessary props (API). Consider variations (variants, sizes, shapes).
    *   Determine if any internal state is needed.
    *   Sketch the basic UI structure.

2.  **Directory Structure:**
    *   Create the main folder: `NewComponent/`
    *   Create the inner folder: `NewComponent/NewComponent/`
    *   Create the examples folder: `NewComponent/examples/`

3.  **Define Types (`NewComponent/NewComponent/NewComponent.type.ts` or `.d.ts`):**
    *   Define any specific enums needed (e.g., `Variant`, `Size`, `Shape`).
    *   Define the type for the `styles` prop (e.g., `NewComponentStyles`).

4.  **Define Props (`NewComponent/NewComponent/NewComponent.props.ts`):**
    *   Create the main props interface (e.g., `NewComponentProps`).
        *   Extend relevant base props if applicable (e.g., `extends ViewProps`). Omit props like `size` if you redefine them.
        *   Include props for variations (variant, size, shape), content (`children`), event handlers (`onClick`, `onChange`), state control (`isDisabled`, `isLoading`), and custom styling (`styles`).
    *   Create the view props interface (e.g., `NewComponentViewProps`) extending the main props and adding state values/setters from the hook (e.g., `isHovered`, `setIsHovered`).

5.  **Define Style Constants (`NewComponent/NewComponent/NewComponent.style.ts`):**
    *   If the component has standard size/shape/variant mappings to CSS properties, define them here as `Record<TypeName, CSSProperties>` (e.g., `NewComponentSizes`, `NewComponentShapes`).

6.  **Implement State Hook (`NewComponent/NewComponent/NewComponent.state.ts`):**
    *   Create the `useNewComponentState` hook.
    *   Use `React.useState` for any internal state (e.g., hover, focus, active state).
    *   Accept relevant props (like default values) if needed for initialization.
    *   Return an object containing state values and their setters.

7.  **Implement the View (`NewComponent/NewComponent/NewComponent.view.tsx`):**
    *   Create a functional component that accepts `NewComponentViewProps`.
    *   Use `View`, `Text`, `Horizontal`, `Vertical`, `Center`, `Icon`, etc., to build the UI.
    *   Apply styles based on props (variant, size, shape, isDisabled, isHovered, isFocused) using mappings from `.style.ts` or conditional logic.
    *   Integrate theme colors using `useTheme` if necessary.
    *   Apply custom styles from the `styles` prop to the appropriate elements.
    *   Connect event handlers (like `onClick`, `onMouseEnter`, `onMouseLeave`) from props to the relevant elements.

8.  **Create Component Entry Point (`NewComponent/NewComponent.tsx`):**
    *   Create a functional component accepting `NewComponentProps`.
    *   Call the `useNewComponentState` hook.
    *   Render the `NewComponentView`, passing the state values/setters from the hook and all original props.
    *   Export this component as `NewComponent`.

9.  **Add Examples (`NewComponent/examples/`):**
    *   Create `default.tsx` showing basic usage.
    *   Create examples for different props/variants (e.g., `size.tsx`, `variant.tsx`, `disabled.tsx`).
    *   Create `index.ts` to export all examples.

10. **Export from Library (`index.tsx`):**
    *   Add `export * from './NewComponent/NewComponent';` to the main `index.tsx`.
    *   Add `export * from './NewComponent/NewComponent/NewComponent.props';` to export the primary props interface.

11. **Testing & Documentation (Implicit):**
    *   Write unit/integration tests for the component (framework not specified, but essential).
    *   Update any relevant documentation (e.g., Storybook, style guides).

**III. Requirements & Restrictions:**

*   **File Structure:** Strictly follow the `Component/Component/` and `Component/examples/` structure.
*   **Naming:** Use consistent naming (`ComponentName`, `useComponentNameState`, `ComponentNameProps`, `ComponentNameView`, etc.).
*   **State:** Use the `useComponentNameState` hook pattern. Avoid direct `useState` in the view or entry point component. Use Zustand (`useModalStore`, `useMessageStore`) *only* if the component requires interaction with the existing global Modal or Message system. Do not introduce new global stores without strong justification.
*   **Styling:**
    *   Prioritize using `app-studio` components (`View`, `Element`) and style props.
    *   Use the `styles` prop pattern for custom overrides.
    *   Use `.style.ts` for reusable style constants/mappings.
    *   Use `useTheme` for theme colors.
    *   **Restriction:** Avoid adding new global CSS files unless absolutely necessary for browser resets or complex pseudo-selectors not achievable via style props.
*   **Props & Types:** Define all props and types using TypeScript interfaces/types in their respective files. Export the main props interface.
*   **Dependencies:**
    *   **Requirement:** Reuse existing internal components (`Text`, `Button`, `Icon`, layout components) and `app-studio` primitives.
    *   **Restriction:** Do not add new external libraries without discussion and approval.
*   **Examples:** Provide comprehensive examples covering common use cases and prop variations.
*   **Exports:** Ensure the component and its props are exported correctly from the main `index.tsx`.
*   **Form Components:** If creating a form input, follow the patterns seen in `TextField`, `Select`, etc., potentially using the `FieldContainer`, `FieldContent`, `FieldLabel`, `FieldWrapper`, `HelperText` layout components. If Formik integration is needed, create a separate `Formik.NewComponent.tsx` file following the existing pattern using `useFormikInput`.

By following these guidelines, new components will integrate smoothly into the existing library, maintaining consistency in structure, style, and API design.