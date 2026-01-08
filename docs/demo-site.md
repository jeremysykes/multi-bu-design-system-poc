# Demo Site

## Overview

The demo site (`apps/demo-site`) demonstrates the multi-BU design system at application scale with real-time BU switching across BU A, BU B, and BU C.

## Purpose

The demo site serves multiple purposes:

1. **Application-Scale Demonstration**: Shows the design system in a realistic application context
2. **Runtime BU Switching**: Demonstrates how the same application can switch between BU themes at runtime
3. **Cross-BU Review**: Enables designers, engineers, and stakeholders to review visual divergence across BUs
4. **Integration Example**: Provides a reference implementation for consuming the design system

## Structure

```
apps/demo-site/
├── src/
│   ├── components/
│   │   ├── BUSelector.tsx      # BU theme selector (tabs)
│   │   └── Navigation.tsx       # Sidebar navigation
│   ├── pages/
│   │   ├── DashboardPage.tsx    # Dashboard with cards and metrics
│   │   ├── OnboardingPage.tsx   # Account creation form
│   │   └── SettingsPage.tsx     # Settings and preferences
│   ├── App.tsx                  # Main app with theme provider
│   └── main.tsx                 # Entry point
├── package.json
├── vite.config.ts
└── index.html
```

## Features

### BU Selector

The BU selector appears at the top of the application as tabs:

- **Core Banking Platform** (BU A)
- **Growth & Payments Experience** (BU B)
- **Wealth Management** (BU C)

Selecting a different BU:
1. Updates the URL with `?bu=bu-a|bu-b|bu-c`
2. Loads the corresponding theme asynchronously
3. Re-renders the entire application with the new theme
4. Preserves navigation state (current page)

### Theme Loading

Themes are loaded asynchronously using the theme loaders from `@multi-bu/themes`:

```tsx
import { getBuATheme, getBuBTheme, getBuCTheme } from '@multi-bu/themes';

// Theme is selected based on URL parameter
const theme = await getThemeForBU(selectedBU);
```

The app handles:
- Loading states (shows "Loading theme..." while loading)
- Error handling (graceful fallback)
- Theme caching (themes are cached after first load)

### Pages

#### Dashboard Page

Demonstrates:
- Cards and metrics
- Data visualization placeholders
- Quick actions
- Responsive grid layout

Shows how the same dashboard structure looks different under each BU theme.

#### Onboarding Page

Demonstrates:
- Form components (TextField, Button, Alert)
- Form validation patterns
- Token-driven styling

The same form structure adapts to each BU's visual identity.

#### Settings Page

Demonstrates:
- Settings forms
- Preference management
- Dangerous actions (delete account)
- Alert components

Shows how settings interfaces adapt to different BU themes.

## Running the Demo Site

### Development

```bash
pnpm run demo:dev
```

Starts the development server at `http://localhost:3000`.

### Build

```bash
pnpm run demo:build
```

Builds the production bundle in `apps/demo-site/dist`.

### Preview Production Build

```bash
cd apps/demo-site
pnpm preview
```

## Usage Patterns

### Single BU Application

Most applications use a single BU theme. Example:

```tsx
import { getBuATheme } from '@multi-bu/themes';

const theme = await getBuATheme();
// Use theme for the entire app
```

### Runtime BU Switching

For applications that need to switch BUs at runtime:

```tsx
// Store BU selection in URL
const [searchParams, setSearchParams] = useSearchParams();
const buId = searchParams.get('bu') || 'bu-a';

// Load theme based on selection
const theme = await getThemeForBU(buId);

// Update URL when BU changes
const handleBUChange = (newBU: BU) => {
  setSearchParams({ bu: newBU });
};
```

### User Preference-Based BU

Store BU selection in user preferences:

```tsx
// Load from user preferences
const buId = userPreferences.buId || 'bu-a';

// Save when changed
const handleBUChange = (newBU: BU) => {
  userPreferences.buId = newBU;
  saveUserPreferences(userPreferences);
};
```

## Organization Usage

### Pattern 1: Separate Apps Per BU

Each application uses a specific BU theme:

```
apps/
  core-banking/       # Uses BU A theme
  payments-portal/    # Uses BU B theme
  wealth-advisory/    # Uses BU C theme
```

### Pattern 2: Multi-BU Application

A single application supports multiple BUs:

```tsx
// App detects user's BU from permissions/role
const userBU = getUserBUFromPermissions(user);

// Load appropriate theme
const theme = await getThemeForBU(userBU);
```

### Pattern 3: Shared Demo Site

Use the demo site as a shared review platform:

- Designers review cross-BU consistency
- Stakeholders see visual divergence
- Engineers test theme switching
- Product teams understand BU differences

## Key Implementation Details

### URL-Based BU Selection

BU selection is stored in URL parameters for shareability:

```
http://localhost:3000/?bu=bu-a
http://localhost:3000/dashboard?bu=bu-b
http://localhost:3000/onboarding?bu=bu-c
```

This allows:
- Sharing specific BU views via URL
- Bookmarking preferred BU
- Deep linking to specific pages with BU

### Theme Provider Setup

The entire app is wrapped in MUI's `ThemeProvider`:

```tsx
<ThemeProvider theme={theme}>
  <CssBaseline />
  {/* App content */}
</ThemeProvider>
```

This ensures all MUI components and custom components consume the correct theme.

### Component Usage

All components use `@multi-bu/ui` components:

```tsx
import { Button, Card, TextField, Alert } from '@multi-bu/ui';
```

These components:
- Consume semantic tokens via theme
- Adapt automatically to selected BU theme
- Maintain consistent APIs across BUs

## Extending the Demo Site

To add new pages or features:

1. **Create Page Component**: Add to `src/pages/`
2. **Add Route**: Update `src/App.tsx` routes
3. **Add Navigation**: Update `src/components/Navigation.tsx`
4. **Use Design System Components**: Import from `@multi-bu/ui`
5. **Follow Token Paradigm**: Use semantic tokens via theme, not hardcoded values

## Best Practices Demonstrated

1. **Token-Driven Styling**: No hardcoded colors, spacing, or typography
2. **Semantic Consumption**: Components use semantic tokens (meaning), not raw values
3. **Theme Switching**: Clean implementation of runtime theme switching
4. **Loading States**: Proper handling of async theme loading
5. **URL Persistence**: BU selection preserved in URL for shareability

