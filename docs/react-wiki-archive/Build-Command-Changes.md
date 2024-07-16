[A PR in early 2020](https://github.com/microsoft/fluentui/pull/11574) introduced some important changes to Fabric's build commands which are detailed below. [The Build Command documentation](Build-Commands) has been updated to reflect these changes.

| Monorepo Build Command | Prereqs | Important Notes                                                                                          | Description                                                                                                                        |
| ---------------------- | ------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `yarn build`           |         | Now TypeScript only. No longer runs bundle, lint or test. No longer production build by default.         | Generates output using TypeScript.                                                                                                 |
| `yarn buildci`         |         | No change. **This command approximates PR build steps and is useful for validating your build locally.** | Reproduction of PR build steps: build, lint, test, bundle.                                                                         |
| `yarn buildto`         |         | Now TypeScript only. No longer runs bundle, lint or test. No longer production build by default.         | Builds to specified target package.                                                                                                |
| `yarn buildfast`       |         | Removed (redundant with `yarn build` and `yarn buildto`)                                                 |                                                                                                                                    |
| `yarn bundle`          | build   | New                                                                                                      | Runs webpack. Webpack configs use lib output as entry point, requiring build as prereq.                                            |
| `yarn clean`           |         | New                                                                                                      | Cleans package output.                                                                                                             |
| `yarn lint`            | build   | New                                                                                                      | Runs lint and lint-imports tasks. lint-imports requires build artifacts to detect that physical file exist for imports from 'lib'. |
| `yarn test`            | build   | New (replaces `yarn validate`)                                                                           | Runs jest. Build artifacts required for dependencies of packages under test.                                                       |
| `yarn validate`        |         | Removed (replaced by `yarn test`)                                                                        |                                                                                                                                    |