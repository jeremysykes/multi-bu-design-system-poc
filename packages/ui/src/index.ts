/**
 * @multi-bu/ui - Component wrapper library
 *
 * This package provides BU-agnostic component wrappers that use theme tokens
 * exclusively. Components accept themes via props/context, enabling remote
 * theme loading in microservices architecture.
 *
 * Components are organized using atomic design principles:
 * - Atoms: Basic building blocks (Button, Typography)
 * - Molecules: Simple combinations (TextField, Alert)
 * - Organisms: Complex components (Card)
 * - Templates: Page-level layouts (FormLayout)
 * - Pages: Specific page instances (LoginPage)
 *
 * For backward compatibility, all components are exported from the root.
 * You can also import from atomic-level modules:
 * - import { Button } from '@multi-bu/ui' (backward compatible)
 * - import { Button } from '@multi-bu/ui/atoms' (atomic-level import)
 */

// Backward-compatible flat exports (existing consumers)
export { Button, type ButtonProps } from './atoms/Button/Button';
export { Typography, type TypographyProps } from './atoms/Typography/Typography';
export { TextField, type TextFieldProps } from './molecules/TextField/TextField';
export { Alert, type AlertProps } from './molecules/Alert/Alert';
export { Card, type CardProps } from './organisms/Card/Card';

// Re-export common MUI layout utilities (these use theme tokens)
export { Box } from '@mui/material';
export type { BoxProps } from '@mui/material';
export { Grid, Stack } from '@mui/material';
export type { GridProps, StackProps } from '@mui/material';

// New component exports
export * from './atoms';
export * from './molecules';
export * from './organisms';
export * from './templates';
export * from './pages';

// Atomic-level exports (new organization)
export * from './atoms';
export * from './molecules';
export * from './organisms';
export * from './templates';
export * from './pages';
