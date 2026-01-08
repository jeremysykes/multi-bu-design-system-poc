# Consuming Themes

This guide explains how to consume the `@multi-bu/themes` package in your applications.

## Installation

### In Workspace (Monorepo)

If you're working within the monorepo:

```json
{
  "dependencies": {
    "@multi-bu/themes": "workspace:*"
  }
}
```

### As Published Package

If the package is published to npm:

```bash
pnpm add @multi-bu/themes
# or
npm install @multi-bu/themes
```

## Available Themes

The package exports themes for three business units:

- `getBuATheme()` - Core Banking Platform (conservative, dense, professional)
- `getBuBTheme()` - Growth & Payments Experience (expressive, spacious, modern)
- `getBuCTheme()` - Wealth Management (sophisticated, premium, elegant)

All theme loaders are async functions that return a Promise resolving to a MUI Theme object.

## Basic Usage

### Single BU Application

Most applications use a single BU theme:

```tsx
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { getBuATheme } from '@multi-bu/themes';
import { Button } from '@multi-bu/ui';

function App() {
  const [theme, setTheme] = React.useState(null);

  React.useEffect(() => {
    getBuATheme().then(setTheme);
  }, []);

  if (!theme) {
    return <div>Loading theme...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </ThemeProvider>
  );
}
```

### Runtime BU Switching

For applications that need to switch between BUs at runtime:

```tsx
import { ThemeProvider } from '@mui/material/styles';
import { getBuATheme, getBuBTheme, getBuCTheme } from '@multi-bu/themes';
import type { Theme } from '@mui/material/styles';

type BU = 'bu-a' | 'bu-b' | 'bu-c';

function App() {
  const [selectedBU, setSelectedBU] = React.useState<BU>('bu-a');
  const [theme, setTheme] = React.useState<Theme | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    const loadTheme = async () => {
      let themeLoader;
      switch (selectedBU) {
        case 'bu-a':
          themeLoader = getBuATheme;
          break;
        case 'bu-b':
          themeLoader = getBuBTheme;
          break;
        case 'bu-c':
          themeLoader = getBuCTheme;
          break;
      }

      const loadedTheme = await themeLoader();
      if (!cancelled) {
        setTheme(loadedTheme);
      }
    };

    loadTheme();

    return () => {
      cancelled = true;
    };
  }, [selectedBU]);

  if (!theme) {
    return <div>Loading theme...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <select value={selectedBU} onChange={(e) => setSelectedBU(e.target.value as BU)}>
        <option value="bu-a">Core Banking Platform</option>
        <option value="bu-b">Growth & Payments Experience</option>
        <option value="bu-c">Wealth Management</option>
      </select>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### URL-Based BU Selection

For better shareability, store BU selection in URL:

```tsx
import { useSearchParams } from 'react-router-dom'; // or your routing library

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const buId = (searchParams.get('bu') || 'bu-a') as BU;
  
  // Use buId to load theme...
  
  const handleBUChange = (newBU: BU) => {
    setSearchParams({ bu: newBU });
  };
}
```

## Multi-BU Organization Pattern

In a large organization with multiple products:

### Pattern 1: One App Per BU

Each application is built for a specific BU:

```
apps/
  core-banking/       # Uses BU A theme
  payments-portal/    # Uses BU B theme
  wealth-advisory/    # Uses BU C theme
```

Each app imports only the theme it needs:

```tsx
// apps/core-banking/src/App.tsx
import { getBuATheme } from '@multi-bu/themes';

// apps/payments-portal/src/App.tsx
import { getBuBTheme } from '@multi-bu/themes';

// apps/wealth-advisory/src/App.tsx
import { getBuCTheme } from '@multi-bu/themes';
```

### Pattern 2: Multi-BU Application

A single application supports multiple BUs:

```tsx
// Shared theme loader
import { getBuATheme, getBuBTheme, getBuCTheme } from '@multi-bu/themes';

function getThemeForBU(buId: string) {
  switch (buId) {
    case 'bu-a':
      return getBuATheme();
    case 'bu-b':
      return getBuBTheme();
    case 'bu-c':
      return getBuCTheme();
    default:
      return getBuATheme();
  }
}
```

Themes can be:
- Selected at runtime via UI
- Determined by user permissions/role
- Set via configuration/environment variables
- Stored in user preferences

## Theme API

### Async Theme Loaders

Each BU has an async theme loader:

```typescript
function getBuATheme(): Promise<Theme>
function getBuBTheme(): Promise<Theme>
function getBuCTheme(): Promise<Theme>
```

These functions:
- Load tokens from JSON files
- Compile tokens into MUI themes
- Cache the compiled theme (subsequent calls return cached theme)
- Return a Promise resolving to a MUI Theme object

### Sync Theme Access

Currently, sync theme access (`buAThemeSync`, etc.) is not populated. If you need synchronous theme access, you can:

1. Pre-load themes during app initialization
2. Use the async loaders and handle loading states
3. Build sync access into the theme package (future enhancement)

## Package Structure

The `@multi-bu/themes` package:

- **Build Tool**: Uses `tsup` for bundling
- **Output Formats**: ESM and CJS
- **Type Declarations**: Included (`*.d.ts` files)
- **External Dependencies**: React and MUI are not bundled (must be provided by consuming app)
- **Entry Point**: `dist/index.js`

## Dependencies

The consuming application must provide:

- `react` and `react-dom` (React 18+)
- `@mui/material` (MUI v5+)
- `@emotion/react` and `@emotion/styled` (required by MUI)

Themes are compiled at runtime from token files, so no build-time dependencies are required.

## Examples

### Simple Usage

```tsx
import { ThemeProvider } from '@mui/material/styles';
import { getBuATheme } from '@multi-bu/themes';

const theme = await getBuATheme();

<ThemeProvider theme={theme}>
  {/* Your app */}
</ThemeProvider>
```

### With Loading State

```tsx
const [theme, setTheme] = useState<Theme | null>(null);

useEffect(() => {
  getBuATheme().then(setTheme);
}, []);

if (!theme) return <LoadingSpinner />;
```

### With Error Handling

```tsx
const [theme, setTheme] = useState<Theme | null>(null);
const [error, setError] = useState<Error | null>(null);

useEffect(() => {
  getBuATheme()
    .then(setTheme)
    .catch(setError);
}, []);

if (error) return <ErrorMessage error={error} />;
if (!theme) return <LoadingSpinner />;
```

## TypeScript Support

Full TypeScript support is provided:

```typescript
import type { Theme } from '@mui/material/styles';
import { getBuATheme } from '@multi-bu/themes';

const theme: Theme = await getBuATheme();
```

All theme loaders are properly typed and return `Promise<Theme>`.

## Best Practices

1. **Pre-load themes**: Load themes early in your app lifecycle to avoid flash of unstyled content
2. **Handle loading states**: Show loading indicators while themes are loading
3. **Cache themes**: Themes are cached automatically, but you can also cache them in your app state
4. **Error handling**: Always handle potential errors when loading themes
5. **One theme per app**: For single-BU apps, import only the theme you need (smaller bundle)
6. **BU selection**: For multi-BU apps, store BU selection in URL or user preferences for shareability

## Troubleshooting

### Theme doesn't load

- Check that token files exist in `tokens/{bu-id}/tokens.json`
- Verify token files are valid JSON
- Check browser console for errors

### Theme compiles but looks wrong

- Run `pnpm run tokens:validate` to check token structure
- Compare with other BUs to verify token format
- Check semantic token mappings

### Type errors

- Ensure `@mui/material` types are installed
- Check that theme loader return types match `Theme` from MUI

