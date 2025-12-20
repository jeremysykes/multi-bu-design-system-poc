import { z } from 'zod';

/**
 * Token Schema - Defines the structure for design tokens
 * 
 * This schema enforces a layered token model:
 * - Base tokens: raw values (palette, typography, spacing, shape)
 * - Semantic tokens: intent-based mappings (surface, text, border, action, feedback)
 */

// Color ramp schema (50-900 scale)
const colorRampSchema = z.object({
  50: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  100: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  200: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  300: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  400: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  500: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  600: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  700: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  800: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  900: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
});

// Palette schema
const paletteSchema = z.object({
  primary: colorRampSchema,
  secondary: colorRampSchema,
  neutral: colorRampSchema,
  error: colorRampSchema.optional(),
  warning: colorRampSchema.optional(),
  info: colorRampSchema.optional(),
  success: colorRampSchema.optional(),
});

// Typography schema
const typographySchema = z.object({
  fontFamily: z.object({
    primary: z.string(),
    secondary: z.string().optional(),
    mono: z.string().optional(),
  }),
  fontSize: z.record(z.string(), z.string()), // e.g., { "xs": "0.75rem", "sm": "0.875rem", ... }
  fontWeight: z.object({
    light: z.number().optional(),
    regular: z.number(),
    medium: z.number().optional(),
    semibold: z.number().optional(),
    bold: z.number(),
  }),
  lineHeight: z.record(z.string(), z.string().or(z.number())),
});

// Spacing schema
const spacingSchema = z.record(z.string(), z.string()); // e.g., { "0": "0px", "1": "4px", ... }

// Shape schema
const shapeSchema = z.object({
  borderRadius: z.record(z.string(), z.string()), // e.g., { "none": "0", "sm": "4px", ... }
  elevation: z.record(z.string(), z.string()).optional(), // e.g., { "0": "none", "1": "0px 1px 3px rgba(...)", ... }
});

// Base tokens schema
const baseTokensSchema = z.object({
  palette: paletteSchema,
  typography: typographySchema,
  spacing: spacingSchema,
  shape: shapeSchema,
});

// Semantic token mappings schema
const semanticTokensSchema = z.object({
  surface: z.object({
    default: z.string(),
    elevated: z.string().optional(),
    overlay: z.string().optional(),
  }),
  text: z.object({
    primary: z.string(),
    secondary: z.string().optional(),
    disabled: z.string().optional(),
    inverse: z.string().optional(),
  }),
  border: z.object({
    default: z.string(),
    focus: z.string().optional(),
    error: z.string().optional(),
  }),
  action: z.object({
    primary: z.string(),
    secondary: z.string().optional(),
    disabled: z.string().optional(),
  }),
  feedback: z.object({
    error: z.string().optional(),
    warning: z.string().optional(),
    info: z.string().optional(),
    success: z.string().optional(),
  }).optional(),
});

// Complete token schema
export const tokenSchema = z.object({
  base: baseTokensSchema,
  semantic: semanticTokensSchema,
});

export type TokenSchema = z.infer<typeof tokenSchema>;
export type BaseTokens = z.infer<typeof baseTokensSchema>;
export type SemanticTokens = z.infer<typeof semanticTokensSchema>;
export type PaletteTokens = z.infer<typeof paletteSchema>;
export type TypographyTokens = z.infer<typeof typographySchema>;
export type SpacingTokens = z.infer<typeof spacingSchema>;
export type ShapeTokens = z.infer<typeof shapeSchema>;
