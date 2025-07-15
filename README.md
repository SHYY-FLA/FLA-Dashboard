# FLA FlaDashboard

A set of React components for building customizable dashboard layouts.

## Installation

```bash
npm install fla-dashboard
```

## Usage

```tsx
import { DashboardBase } from 'fla-dashboard';

const Example = () => (
  <DashboardBase width={800} height={800} column={3} row={6} gap={16} />
);
```

## Development

Run the following commands to work on the package locally:

```bash
npm install
npm run dev
```

To generate the production build and type definitions run:

```bash
npm run build
```

The build output will be placed in the `dist` folder and is used when publishing to npm.

## License

MIT
