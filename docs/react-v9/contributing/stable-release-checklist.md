# V9 Package Stable Release Criteria

Inferred from repository documentation, generator code, conformance tests, and the Component Implementation Guide.

## Architecture & API

- Component follows the hook-based architecture: `use<Name>()` → `use<Name>Styles()` → `render<Name>()`
- Main component uses `ForwardRefComponent` with `React.forwardRef` (never `React.FC`)
- All extensible sub-elements exposed via the slot system with proper `Slot<>` types
- Public API surface is finalized — stable packages use strict semver (`9.x.x`), and `_unstable` suffixes cannot be removed until the next major version
- `.api.md` file exists and matches current exports (`yarn nx run <project>:generate-api`)
- No direct dependencies between component packages — shared logic lives in `react-utilities` or `react-shared-contexts`
- All design tokens from `@fluentui/react-theme` used instead of hardcoded colors, spacing, or typography values
- No direct access to `window`, `document`, or `navigator` — uses `useFluent_unstable()` or `canUseDOM()`

## Testing

- **Conformance tests**: `testing/isConformant.ts` exists and passes (validates rendering, ref forwarding, className merging, accessibility basics)
- **Unit tests**: Cover all state hook behavior, prop variants, user interactions, controlled/uncontrolled patterns, and accessibility attributes. Tests live adjacent to the component.
- **Visual regression tests**: Stories added to `vr-tests-react-components` covering all visual states from the styling hook
- **Bundle size tests**: Fixture file present (e.g., `bundle-size/<Name>.fixture.js`)
- **Performance tests**: Scenario present in `perf-test-react-components`
- **SSR safety**: Component renders without errors in server-side rendering environments

## Accessibility

- Manual accessibility review completed:
  - Screen reader testing (NVDA, JAWS, VoiceOver)
  - High contrast mode compatibility
  - Theming support
  - RTL and localization support
  - Keyboard navigation
- WCAG 2.1 compliance with proper ARIA labels, roles, and keyboard interaction patterns

## Validation

- Component validated in a real partner product — it cannot be considered complete until used in production
- Bug bash organized with other Fluent UI crews across major time zones (e.g., one for US and one for Europe), with all feedback addressed before release

## Documentation

- Storybook stories with Default story and variant coverage, reviewed for completeness and clarity
- Best practices and do's/don'ts documented as applicable
- Migration guide from v8 and v0 complete, with codemods to automate migration where possible
- README has description, install command, and usage example

## Mechanical Release Steps

Run the generator to automate the promotion:

```bash
yarn nx g @fluentui/workspace-plugin:prepare-initial-release --project react-<name>-preview --phase=stable
```

The generator handles:

1. Removing the `-preview` suffix from the package name and paths
2. Setting version to `9.0.0-alpha.0` (beachball bumps this to `9.0.0` on release)
3. Adding exports to the `@fluentui/react-components` suite
4. Updating tsconfig paths, CODEOWNERS, VR tests, and docsite references
5. Generating beachball change files
6. Deprecating the `-preview` package on npm

After the generator runs, verify that `disallowedChangeTypes` in `package.json` is set to `["major", "prerelease"]`.

## Sources

- `docs/react-wiki-archive/Component-Implementation-Guide.md` — Phase 3: Validation and Stable Release
- `docs/react-v9/contributing/new-release-process-v9-packages.md` — Lifecycle flow and generator commands
- `tools/workspace-plugin/src/generators/prepare-initial-release/` — Generator implementation and assertions
- `docs/workflows/testing.md` — Test types and conformance expectations
- `docs/architecture/component-patterns.md` — Required file structure and hook patterns
- `docs/quality-grades.md` — Quality signals (README, stories, tests, API docs, conformance)
- `apps/public-docsite-v9/src/Concepts/PackageMaturityLevels.mdx` — Maturity level definitions
