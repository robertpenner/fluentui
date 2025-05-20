# @fluentui/react-components

**Converged Fluent UI React components**

This is a suite package for converged components and related utilities. It is a result of a dedupe effort for `@fluentui/react` and `@fluentui/react-northstar`.

### Usage

Add @fluentui/react-components to a project:

```sh
yarn add @fluentui/react-components
```

To use a component, add a `FluentProvider` with a theme close to the root of your application and then instantiate components inside the provider's subtree:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { FluentProvider, teamsLightTheme, Button } from '@fluentui/react-components';

ReactDOM.render(
  <FluentProvider theme={teamsLightTheme}>
    <Button appearance="primary">I am a button.</Button>
  </FluentProvider>,
  document.getElementById('root'),
);
```

### Docs

Docs are hosted at https://react.fluentui.dev/.

### Contributing

If you're interested in contributing to this project, here are some helpful resources:

- [Development Environment Setup](/docs/react-v9/contributing/dev-env.md)
- [Development Workflow](/docs/react-v9/contributing/dev-workflow.md)
- [Component Implementation Guide](/docs/react-v9/contributing/component-implementation-guide.md)
- [Command Cheat Sheet](/docs/react-v9/contributing/command-cheat-sheet.md)
- [Common Development Snags](/docs/react-v9/contributing/common-dev-snags.md)
