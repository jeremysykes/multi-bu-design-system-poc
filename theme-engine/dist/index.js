"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  buildTheme: () => buildTheme,
  loadTokens: () => loadTokens,
  loadTokensNode: () => loadTokens2,
  validateTokens: () => validateTokens
});
module.exports = __toCommonJS(index_exports);

// src/buildTheme.ts
var import_styles = require("@mui/material/styles");

// src/utils/extractValue.ts
function extractValue(token) {
  if (token && typeof token === "object" && "$value" in token) {
    return token.$value;
  }
  return token;
}

// src/mappers/paletteMapper.ts
function getContrastRatio(foreground, background) {
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [0, 0, 0];
  };
  const getLuminance = (rgb) => {
    const [r, g, b] = rgb.map((val) => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);
  const fgLum = getLuminance(fgRgb);
  const bgLum = getLuminance(bgRgb);
  const lighter = Math.max(fgLum, bgLum);
  const darker = Math.min(fgLum, bgLum);
  return (lighter + 0.05) / (darker + 0.05);
}
function getContrastText(background) {
  const blackContrast = getContrastRatio("#000000", background);
  const whiteContrast = getContrastRatio("#ffffff", background);
  return whiteContrast > blackContrast ? "#ffffff" : "#000000";
}
function mapPalette(colorTokens) {
  const getColor = (category, shade) => {
    const flattenedKey = `${category}-${shade}`;
    if (colorTokens[flattenedKey]) {
      const value = extractValue(colorTokens[flattenedKey]);
      if (typeof value === "string" && (value.startsWith("#") || value.startsWith("rgb"))) {
        return value;
      }
    }
    if (colorTokens[category]?.[shade]) {
      const value = extractValue(colorTokens[category][shade]);
      if (typeof value === "string" && (value.startsWith("#") || value.startsWith("rgb"))) {
        return value;
      }
    }
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `Missing color token: ${category}-${shade}, falling back to #000000`
      );
    }
    return "#000000";
  };
  const hasCategory = (category) => {
    if (colorTokens[`${category}-50`] || colorTokens[`${category}-100`] || colorTokens[`${category}-500`]) {
      return true;
    }
    if (colorTokens[category] && typeof colorTokens[category] === "object") {
      return true;
    }
    return false;
  };
  const primaryMain = getColor("primary", "500");
  const secondaryMain = getColor("secondary", "500");
  return {
    primary: {
      main: primaryMain,
      light: getColor("primary", "300"),
      dark: getColor("primary", "700"),
      contrastText: getContrastText(primaryMain)
    },
    secondary: {
      main: secondaryMain,
      light: getColor("secondary", "300"),
      dark: getColor("secondary", "700"),
      contrastText: getContrastText(secondaryMain)
    },
    error: hasCategory("error") ? (() => {
      const errorMain = getColor("error", "500");
      return {
        main: errorMain,
        light: getColor("error", "300"),
        dark: getColor("error", "700"),
        contrastText: getContrastText(errorMain)
      };
    })() : void 0,
    warning: hasCategory("warning") ? (() => {
      const warningMain = getColor("warning", "500");
      return {
        main: warningMain,
        light: getColor("warning", "300"),
        dark: getColor("warning", "700"),
        contrastText: getContrastText(warningMain)
      };
    })() : void 0,
    info: hasCategory("info") ? (() => {
      const infoMain = getColor("info", "500");
      return {
        main: infoMain,
        light: getColor("info", "300"),
        dark: getColor("info", "700"),
        contrastText: getContrastText(infoMain)
      };
    })() : void 0,
    success: hasCategory("success") ? (() => {
      const successMain = getColor("success", "500");
      return {
        main: successMain,
        light: getColor("success", "300"),
        dark: getColor("success", "700"),
        contrastText: getContrastText(successMain)
      };
    })() : void 0,
    grey: {
      50: getColor("neutral", "50"),
      100: getColor("neutral", "100"),
      200: getColor("neutral", "200"),
      300: getColor("neutral", "300"),
      400: getColor("neutral", "400"),
      500: getColor("neutral", "500"),
      600: getColor("neutral", "600"),
      700: getColor("neutral", "700"),
      800: getColor("neutral", "800"),
      900: getColor("neutral", "900")
    }
  };
}

// src/mappers/typographyMapper.ts
function mapTypography(typographyTokens) {
  const getTokenValue = (group, key) => {
    const token = typographyTokens[group]?.[key];
    return token ? extractValue(token) : void 0;
  };
  const parseBaseFontSize = (size) => {
    if (size.endsWith("rem")) {
      const num = parseFloat(size);
      return num * 16;
    }
    if (size.endsWith("px")) {
      return parseFloat(size);
    }
    return parseFloat(size) || 16;
  };
  const fontFamily = getTokenValue("fontFamily", "primary") || "Roboto, Arial, sans-serif";
  const baseFontSize = getTokenValue("fontSize", "base") || "1rem";
  const fontSizeNumber = parseBaseFontSize(baseFontSize);
  const fontWeightLight = getTokenValue("fontWeight", "light") || 300;
  const fontWeightRegular = getTokenValue("fontWeight", "regular") || 400;
  const fontWeightMedium = getTokenValue("fontWeight", "medium") || 500;
  const fontWeightBold = getTokenValue("fontWeight", "bold") || 700;
  const fontSizeXs = getTokenValue("fontSize", "xs") || "0.75rem";
  const fontSizeSm = getTokenValue("fontSize", "sm") || "0.875rem";
  const fontSizeBase = getTokenValue("fontSize", "base") || "1rem";
  const fontSizeLg = getTokenValue("fontSize", "lg") || "1.125rem";
  const fontSizeXl = getTokenValue("fontSize", "xl") || "1.25rem";
  const fontSize2xl = getTokenValue("fontSize", "2xl") || "1.5rem";
  const fontSize3xl = getTokenValue("fontSize", "3xl") || "1.875rem";
  const fontSize4xl = getTokenValue("fontSize", "4xl") || "2.25rem";
  const lineHeightNormal = getTokenValue("lineHeight", "normal");
  const lineHeightTight = getTokenValue("lineHeight", "tight");
  const lineHeightRelaxed = getTokenValue("lineHeight", "relaxed");
  const parseLineHeight = (lh, fallback) => {
    if (lh === void 0) return fallback;
    if (typeof lh === "number") return lh;
    const parsed = parseFloat(lh);
    return isNaN(parsed) ? fallback : parsed;
  };
  return {
    fontFamily,
    fontSize: fontSizeNumber,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
    h1: {
      fontSize: fontSize4xl,
      fontWeight: fontWeightBold,
      lineHeight: parseLineHeight(lineHeightTight, 1.2),
      fontFamily
    },
    h2: {
      fontSize: fontSize3xl,
      fontWeight: fontWeightBold,
      lineHeight: parseLineHeight(lineHeightTight, 1.3),
      fontFamily
    },
    h3: {
      fontSize: fontSize2xl,
      fontWeight: fontWeightMedium,
      lineHeight: parseLineHeight(lineHeightNormal, 1.4),
      fontFamily
    },
    h4: {
      fontSize: fontSizeXl,
      fontWeight: fontWeightMedium,
      lineHeight: parseLineHeight(lineHeightNormal, 1.4),
      fontFamily
    },
    h5: {
      fontSize: fontSizeLg,
      fontWeight: fontWeightRegular,
      lineHeight: parseLineHeight(lineHeightNormal, 1.5),
      fontFamily
    },
    h6: {
      fontSize: fontSizeBase,
      fontWeight: fontWeightMedium,
      lineHeight: parseLineHeight(lineHeightNormal, 1.5),
      fontFamily
    },
    body1: {
      fontSize: fontSizeBase,
      fontWeight: fontWeightRegular,
      lineHeight: parseLineHeight(lineHeightNormal, 1.5),
      fontFamily
    },
    body2: {
      fontSize: fontSizeSm,
      fontWeight: fontWeightRegular,
      lineHeight: parseLineHeight(lineHeightRelaxed, 1.6),
      fontFamily
    },
    button: {
      fontSize: fontSizeBase,
      fontWeight: fontWeightMedium,
      lineHeight: 1.75,
      fontFamily,
      textTransform: "none"
    }
  };
}

// src/mappers/spacingMapper.ts
function mapSpacing(spacingTokens) {
  const spacingValues = Object.entries(spacingTokens).reduce((acc, [key, token]) => {
    const value = extractValue(token);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      acc[parseInt(key, 10)] = numValue;
    }
    return acc;
  }, {});
  const unit = spacingValues[1] || 4;
  return (factor) => {
    return `${factor * unit}px`;
  };
}

// src/mappers/shapeMapper.ts
function mapShape(shapeTokens) {
  const borderRadiusToken = shapeTokens.borderRadius?.base;
  const borderRadiusValue = borderRadiusToken ? extractValue(borderRadiusToken) : "8px";
  const parseBorderRadius = (value) => {
    if (value.endsWith("px")) {
      return parseFloat(value);
    }
    if (value.endsWith("rem")) {
      return parseFloat(value) * 16;
    }
    return parseFloat(value) || 8;
  };
  return {
    borderRadius: parseBorderRadius(borderRadiusValue)
  };
}

// src/mappers/componentMapper.ts
function getContrastRatio2(foreground, background) {
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [0, 0, 0];
  };
  const getLuminance = (rgb) => {
    const [r, g, b] = rgb.map((val) => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);
  const fgLum = getLuminance(fgRgb);
  const bgLum = getLuminance(bgRgb);
  const lighter = Math.max(fgLum, bgLum);
  const darker = Math.min(fgLum, bgLum);
  return (lighter + 0.05) / (darker + 0.05);
}
function isBlueOrPurple(color) {
  if (!color || typeof color !== "string" || !color.startsWith("#")) {
    return false;
  }
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  };
  const rgb = hexToRgb(color);
  if (!rgb) return false;
  const [r, g, b] = rgb;
  const isBlue = b > r && b > g && r < 200 && g < 200;
  const isPurple = r > 100 && b > 100 && g < Math.max(r, b) * 0.8;
  const isNavyBlue = r < 100 && g < 100 && b > 50 && b > r && b > g;
  return isBlue || isPurple || isNavyBlue;
}
function getContrastText2(background) {
  if (!background || typeof background !== "string" || !background.startsWith("#")) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `Invalid background color for contrast calculation: ${background}, defaulting to white text`
      );
    }
    return "#ffffff";
  }
  if (isBlueOrPurple(background)) {
    return "#ffffff";
  }
  const blackContrast = getContrastRatio2("#000000", background);
  const whiteContrast = getContrastRatio2("#ffffff", background);
  return whiteContrast > blackContrast ? "#ffffff" : "#000000";
}
function mapComponents(semanticTokens, allTokens, _theme) {
  const resolveToken = (tokenValue) => {
    let tokenRef = typeof tokenValue === "object" ? extractValue(tokenValue) : tokenValue;
    if (typeof tokenRef === "string" && tokenRef.startsWith("#")) {
      return tokenRef;
    }
    if (typeof tokenRef === "string" && tokenRef.startsWith("rgba")) {
      return tokenRef;
    }
    if (typeof tokenRef === "string" && tokenRef.startsWith("{") && tokenRef.endsWith("}")) {
      const path = tokenRef.slice(1, -1);
      const parts = path.split(".");
      if (parts.length === 2 && parts[0] === "color" && parts[1].includes("-")) {
        const colorKey = parts[1];
        if (allTokens.color && allTokens.color[colorKey]) {
          return extractValue(allTokens.color[colorKey]);
        }
      }
      let value = allTokens;
      for (const part of parts) {
        if (value && typeof value === "object" && part in value) {
          value = value[part];
        } else {
          return tokenRef;
        }
      }
      return extractValue(value);
    }
    return typeof tokenRef === "string" ? tokenRef : String(tokenRef);
  };
  const getSemanticValue = (category, key) => {
    const token = semanticTokens[category]?.[key];
    if (!token) return "#000000";
    const value = extractValue(token);
    return resolveToken(value);
  };
  const getDarkerShadeForHover = (category, key) => {
    const token = semanticTokens[category]?.[key];
    if (!token) return "#000000";
    let tokenRef = typeof token === "object" ? extractValue(token) : token;
    if (typeof tokenRef === "string" && tokenRef.startsWith("{") && tokenRef.endsWith("}")) {
      const path = tokenRef.slice(1, -1);
      const parts = path.split(".");
      if (parts.length === 2 && parts[0] === "color" && parts[1].includes("-")) {
        const colorParts = parts[1].split("-");
        if (colorParts.length === 2) {
          const colorCategory = colorParts[0];
          const shade = parseInt(colorParts[1]);
          const darkerShade = colorCategory === "secondary" && shade === 500 ? 700 : shade >= 600 ? 700 : 600;
          const darkerKey = `${colorCategory}-${darkerShade}`;
          if (allTokens.color && allTokens.color[darkerKey]) {
            return extractValue(allTokens.color[darkerKey]);
          }
        }
      }
    }
    const baseColor = getSemanticValue(category, key);
    return baseColor;
  };
  const primaryBg = getSemanticValue("action", "primary");
  const secondaryBg = getSemanticValue("action", "secondary") || primaryBg;
  const primaryHoverBg = getDarkerShadeForHover("action", "primary");
  const secondaryHoverBg = semanticTokens.action?.secondary ? getDarkerShadeForHover("action", "secondary") : primaryHoverBg;
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none"
        },
        containedPrimary: {
          backgroundColor: primaryBg,
          // Calculate contrastText dynamically based on the actual background color
          color: getContrastText2(primaryBg),
          // Hover state uses a darker shade of the same color
          "&:hover": {
            backgroundColor: primaryHoverBg,
            // Maintain same text color (white for blue/purple, calculated for others)
            color: getContrastText2(primaryHoverBg)
          }
        },
        containedSecondary: {
          backgroundColor: secondaryBg,
          // Calculate contrastText dynamically based on the actual background color
          color: getContrastText2(secondaryBg),
          // Hover state uses a darker shade of the same color
          "&:hover": {
            backgroundColor: secondaryHoverBg,
            // For darker hover states, use white text if it meets minimum threshold
            // This ensures visual consistency for darker hover states
            color: (() => {
              const whiteContrast = getContrastRatio2("#ffffff", secondaryHoverBg);
              const blackContrast = getContrastRatio2("#000000", secondaryHoverBg);
              if (whiteContrast >= 1.3 && whiteContrast < blackContrast) {
                return "#ffffff";
              }
              return getContrastText2(secondaryHoverBg);
            })()
          }
        },
        containedError: {
          color: _theme.palette.error?.contrastText || "#ffffff",
          "&:hover": {
            backgroundColor: _theme.palette.error?.dark,
            color: _theme.palette.error?.contrastText || "#ffffff"
          }
        },
        containedWarning: {
          color: _theme.palette.warning?.contrastText || "#ffffff",
          "&:hover": {
            backgroundColor: _theme.palette.warning?.dark,
            color: _theme.palette.warning?.contrastText || "#ffffff"
          }
        },
        containedInfo: {
          color: _theme.palette.info?.contrastText || "#ffffff",
          "&:hover": {
            backgroundColor: _theme.palette.info?.dark,
            color: _theme.palette.info?.contrastText || "#ffffff"
          }
        },
        containedSuccess: {
          color: _theme.palette.success?.contrastText || "#ffffff",
          "&:hover": {
            backgroundColor: _theme.palette.success?.dark,
            color: _theme.palette.success?.contrastText || "#ffffff"
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: getSemanticValue("border", "default")
            },
            "&:hover fieldset": {
              borderColor: getSemanticValue("border", "default")
            },
            "&.Mui-focused fieldset": {
              borderColor: getSemanticValue("border", "focus") || getSemanticValue("action", "primary")
            }
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: getSemanticValue("surface", "default")
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          "&.MuiAlert-standardError": (() => {
            const errorToken = allTokens.color?.["error-50"];
            const errorBg = errorToken ? resolveToken(extractValue(errorToken)) : getSemanticValue("feedback", "error") || "#FFEBEE";
            const errorText = getContrastText2(errorBg);
            return {
              backgroundColor: errorBg,
              color: errorText
            };
          })(),
          "&.MuiAlert-standardWarning": (() => {
            const warningToken = allTokens.color?.["warning-50"];
            const warningBg = warningToken ? resolveToken(extractValue(warningToken)) : getSemanticValue("feedback", "warning") || "#FFF3E0";
            const warningText = getContrastText2(warningBg);
            return {
              backgroundColor: warningBg,
              color: warningText
            };
          })(),
          "&.MuiAlert-standardInfo": (() => {
            const infoToken = allTokens.color?.["info-50"];
            const infoBg = infoToken ? resolveToken(extractValue(infoToken)) : getSemanticValue("feedback", "info") || "#E0F2F1";
            const infoText = getContrastText2(infoBg);
            return {
              backgroundColor: infoBg,
              color: infoText
            };
          })(),
          "&.MuiAlert-standardSuccess": (() => {
            const successToken = allTokens.color?.["success-50"];
            const successBg = successToken ? resolveToken(extractValue(successToken)) : getSemanticValue("feedback", "success") || "#E8F5E9";
            const successText = getContrastText2(successBg);
            return {
              backgroundColor: successBg,
              color: successText
            };
          })()
        }
      }
    }
  };
}

// src/buildTheme.ts
function buildTheme(tokens) {
  const theme = (0, import_styles.createTheme)({
    palette: mapPalette(tokens.color || {}),
    typography: mapTypography(tokens.typography || {}),
    spacing: mapSpacing(tokens.spacing || {}),
    shape: mapShape(tokens.shape || {})
  });
  const components = mapComponents(tokens.semantic || {}, tokens, theme);
  return (0, import_styles.createTheme)({
    ...theme,
    components
  });
}

// ../tokens/core/tokens.json
var tokens_default = {
  $schema: "https://schemas.figma.com/tokens/v1",
  color: {
    "primary-50": {
      $value: "#E3F2FD",
      $type: "color"
    },
    "primary-100": {
      $value: "#BBDEFB",
      $type: "color"
    },
    "primary-200": {
      $value: "#90CAF9",
      $type: "color"
    },
    "primary-300": {
      $value: "#64B5F6",
      $type: "color"
    },
    "primary-400": {
      $value: "#42A5F5",
      $type: "color"
    },
    "primary-500": {
      $value: "#2196F3",
      $type: "color"
    },
    "primary-600": {
      $value: "#1E88E5",
      $type: "color"
    },
    "primary-700": {
      $value: "#1976D2",
      $type: "color"
    },
    "primary-800": {
      $value: "#1565C0",
      $type: "color"
    },
    "primary-900": {
      $value: "#0D47A1",
      $type: "color"
    },
    "secondary-50": {
      $value: "#F3E5F5",
      $type: "color"
    },
    "secondary-100": {
      $value: "#E1BEE7",
      $type: "color"
    },
    "secondary-200": {
      $value: "#CE93D8",
      $type: "color"
    },
    "secondary-300": {
      $value: "#BA68C8",
      $type: "color"
    },
    "secondary-400": {
      $value: "#AB47BC",
      $type: "color"
    },
    "secondary-500": {
      $value: "#9C27B0",
      $type: "color"
    },
    "secondary-600": {
      $value: "#8E24AA",
      $type: "color"
    },
    "secondary-700": {
      $value: "#7B1FA2",
      $type: "color"
    },
    "secondary-800": {
      $value: "#6A1B9A",
      $type: "color"
    },
    "secondary-900": {
      $value: "#4A148C",
      $type: "color"
    },
    "neutral-50": {
      $value: "#FAFAFA",
      $type: "color"
    },
    "neutral-100": {
      $value: "#F5F5F5",
      $type: "color"
    },
    "neutral-200": {
      $value: "#EEEEEE",
      $type: "color"
    },
    "neutral-300": {
      $value: "#E0E0E0",
      $type: "color"
    },
    "neutral-400": {
      $value: "#BDBDBD",
      $type: "color"
    },
    "neutral-500": {
      $value: "#9E9E9E",
      $type: "color"
    },
    "neutral-600": {
      $value: "#757575",
      $type: "color"
    },
    "neutral-700": {
      $value: "#616161",
      $type: "color"
    },
    "neutral-800": {
      $value: "#424242",
      $type: "color"
    },
    "neutral-900": {
      $value: "#212121",
      $type: "color"
    },
    "error-50": {
      $value: "#FFEBEE",
      $type: "color"
    },
    "error-100": {
      $value: "#FFCDD2",
      $type: "color"
    },
    "error-200": {
      $value: "#EF9A9A",
      $type: "color"
    },
    "error-300": {
      $value: "#E57373",
      $type: "color"
    },
    "error-400": {
      $value: "#EF5350",
      $type: "color"
    },
    "error-500": {
      $value: "#F44336",
      $type: "color"
    },
    "error-600": {
      $value: "#E53935",
      $type: "color"
    },
    "error-700": {
      $value: "#D32F2F",
      $type: "color"
    },
    "error-800": {
      $value: "#C62828",
      $type: "color"
    },
    "error-900": {
      $value: "#B71C1C",
      $type: "color"
    },
    "warning-50": {
      $value: "#FFF3E0",
      $type: "color"
    },
    "warning-100": {
      $value: "#FFE0B2",
      $type: "color"
    },
    "warning-200": {
      $value: "#FFCC80",
      $type: "color"
    },
    "warning-300": {
      $value: "#FFB74D",
      $type: "color"
    },
    "warning-400": {
      $value: "#FFA726",
      $type: "color"
    },
    "warning-500": {
      $value: "#FF9800",
      $type: "color"
    },
    "warning-600": {
      $value: "#FB8C00",
      $type: "color"
    },
    "warning-700": {
      $value: "#F57C00",
      $type: "color"
    },
    "warning-800": {
      $value: "#EF6C00",
      $type: "color"
    },
    "warning-900": {
      $value: "#E65100",
      $type: "color"
    },
    "info-50": {
      $value: "#E0F2F1",
      $type: "color"
    },
    "info-100": {
      $value: "#B2DFDB",
      $type: "color"
    },
    "info-200": {
      $value: "#80CBC4",
      $type: "color"
    },
    "info-300": {
      $value: "#4DB6AC",
      $type: "color"
    },
    "info-400": {
      $value: "#26A69A",
      $type: "color"
    },
    "info-500": {
      $value: "#009688",
      $type: "color"
    },
    "info-600": {
      $value: "#00897B",
      $type: "color"
    },
    "info-700": {
      $value: "#00796B",
      $type: "color"
    },
    "info-800": {
      $value: "#00695C",
      $type: "color"
    },
    "info-900": {
      $value: "#004D40",
      $type: "color"
    },
    "success-50": {
      $value: "#E8F5E9",
      $type: "color"
    },
    "success-100": {
      $value: "#C8E6C9",
      $type: "color"
    },
    "success-200": {
      $value: "#A5D6A7",
      $type: "color"
    },
    "success-300": {
      $value: "#81C784",
      $type: "color"
    },
    "success-400": {
      $value: "#66BB6A",
      $type: "color"
    },
    "success-500": {
      $value: "#4CAF50",
      $type: "color"
    },
    "success-600": {
      $value: "#43A047",
      $type: "color"
    },
    "success-700": {
      $value: "#388E3C",
      $type: "color"
    },
    "success-800": {
      $value: "#2E7D32",
      $type: "color"
    },
    "success-900": {
      $value: "#1B5E20",
      $type: "color"
    }
  },
  typography: {
    fontFamily: {
      primary: {
        $value: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        $type: "fontFamily"
      },
      secondary: {
        $value: '"Roboto", "Helvetica", "Arial", sans-serif',
        $type: "fontFamily"
      },
      mono: {
        $value: '"Roboto Mono", "Courier New", monospace',
        $type: "fontFamily"
      }
    },
    fontSize: {
      xs: {
        $value: "0.75rem",
        $type: "dimension"
      },
      sm: {
        $value: "0.875rem",
        $type: "dimension"
      },
      base: {
        $value: "1rem",
        $type: "dimension"
      },
      lg: {
        $value: "1.125rem",
        $type: "dimension"
      },
      xl: {
        $value: "1.25rem",
        $type: "dimension"
      },
      "2xl": {
        $value: "1.5rem",
        $type: "dimension"
      },
      "3xl": {
        $value: "1.875rem",
        $type: "dimension"
      },
      "4xl": {
        $value: "2.25rem",
        $type: "dimension"
      },
      "5xl": {
        $value: "3rem",
        $type: "dimension"
      },
      "6xl": {
        $value: "3.75rem",
        $type: "dimension"
      }
    },
    fontWeight: {
      light: {
        $value: 300,
        $type: "number"
      },
      regular: {
        $value: 400,
        $type: "number"
      },
      medium: {
        $value: 500,
        $type: "number"
      },
      semibold: {
        $value: 600,
        $type: "number"
      },
      bold: {
        $value: 700,
        $type: "number"
      }
    },
    lineHeight: {
      none: {
        $value: 1,
        $type: "number"
      },
      tight: {
        $value: 1.25,
        $type: "number"
      },
      snug: {
        $value: 1.375,
        $type: "number"
      },
      normal: {
        $value: 1.5,
        $type: "number"
      },
      relaxed: {
        $value: 1.625,
        $type: "number"
      },
      loose: {
        $value: 2,
        $type: "number"
      }
    }
  },
  spacing: {
    "0": {
      $value: "0px",
      $type: "dimension"
    },
    "1": {
      $value: "4px",
      $type: "dimension"
    },
    "2": {
      $value: "8px",
      $type: "dimension"
    },
    "3": {
      $value: "12px",
      $type: "dimension"
    },
    "4": {
      $value: "16px",
      $type: "dimension"
    },
    "5": {
      $value: "20px",
      $type: "dimension"
    },
    "6": {
      $value: "24px",
      $type: "dimension"
    },
    "7": {
      $value: "28px",
      $type: "dimension"
    },
    "8": {
      $value: "32px",
      $type: "dimension"
    },
    "9": {
      $value: "36px",
      $type: "dimension"
    },
    "10": {
      $value: "40px",
      $type: "dimension"
    },
    "12": {
      $value: "48px",
      $type: "dimension"
    },
    "14": {
      $value: "56px",
      $type: "dimension"
    },
    "16": {
      $value: "64px",
      $type: "dimension"
    },
    "20": {
      $value: "80px",
      $type: "dimension"
    },
    "24": {
      $value: "96px",
      $type: "dimension"
    },
    "32": {
      $value: "128px",
      $type: "dimension"
    },
    "40": {
      $value: "160px",
      $type: "dimension"
    },
    "48": {
      $value: "192px",
      $type: "dimension"
    },
    "56": {
      $value: "224px",
      $type: "dimension"
    },
    "64": {
      $value: "256px",
      $type: "dimension"
    }
  },
  shape: {
    borderRadius: {
      none: {
        $value: "0",
        $type: "dimension"
      },
      sm: {
        $value: "4px",
        $type: "dimension"
      },
      base: {
        $value: "8px",
        $type: "dimension"
      },
      md: {
        $value: "12px",
        $type: "dimension"
      },
      lg: {
        $value: "16px",
        $type: "dimension"
      },
      xl: {
        $value: "24px",
        $type: "dimension"
      },
      "2xl": {
        $value: "32px",
        $type: "dimension"
      },
      full: {
        $value: "9999px",
        $type: "dimension"
      }
    },
    elevation: {
      "0": {
        $value: "none",
        $type: "string"
      },
      "1": {
        $value: "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)",
        $type: "string"
      },
      "2": {
        $value: "0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)",
        $type: "string"
      },
      "3": {
        $value: "0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)",
        $type: "string"
      },
      "4": {
        $value: "0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22)",
        $type: "string"
      },
      "5": {
        $value: "0px 19px 38px rgba(0, 0, 0, 0.30), 0px 15px 12px rgba(0, 0, 0, 0.22)",
        $type: "string"
      }
    }
  },
  semantic: {
    surface: {
      default: {
        $value: "{color.neutral.50}",
        $type: "color"
      },
      elevated: {
        $value: "{color.neutral.0}",
        $type: "color"
      },
      overlay: {
        $value: "rgba(0, 0, 0, 0.5)",
        $type: "color"
      }
    },
    text: {
      primary: {
        $value: "{color.neutral.900}",
        $type: "color"
      },
      secondary: {
        $value: "{color.neutral.700}",
        $type: "color"
      },
      disabled: {
        $value: "{color.neutral.400}",
        $type: "color"
      },
      inverse: {
        $value: "{color.neutral.50}",
        $type: "color"
      }
    },
    border: {
      default: {
        $value: "{color.neutral.300}",
        $type: "color"
      },
      focus: {
        $value: "{color.primary.500}",
        $type: "color"
      },
      error: {
        $value: "{color.error.500}",
        $type: "color"
      }
    },
    action: {
      primary: {
        $value: "{color.primary.500}",
        $type: "color"
      },
      secondary: {
        $value: "{color.secondary.500}",
        $type: "color"
      },
      disabled: {
        $value: "{color.neutral.300}",
        $type: "color"
      }
    },
    feedback: {
      error: {
        $value: "{color.error.500}",
        $type: "color"
      },
      warning: {
        $value: "{color.warning.500}",
        $type: "color"
      },
      info: {
        $value: "{color.info.500}",
        $type: "color"
      },
      success: {
        $value: "{color.success.500}",
        $type: "color"
      }
    }
  }
};

// ../tokens/bu-a/tokens.json
var tokens_default2 = {
  $schema: "https://schemas.figma.com/tokens/v1",
  color: {
    "primary-50": {
      $value: "#E3E8F0",
      $type: "color"
    },
    "primary-100": {
      $value: "#C1CBD9",
      $type: "color"
    },
    "primary-200": {
      $value: "#9BABC0",
      $type: "color"
    },
    "primary-300": {
      $value: "#748BA7",
      $type: "color"
    },
    "primary-400": {
      $value: "#577394",
      $type: "color"
    },
    "primary-500": {
      $value: "#3A5B81",
      $type: "color"
    },
    "primary-600": {
      $value: "#345375",
      $type: "color"
    },
    "primary-700": {
      $value: "#2C4967",
      $type: "color"
    },
    "primary-800": {
      $value: "#253F59",
      $type: "color"
    },
    "primary-900": {
      $value: "#182E47",
      $type: "color"
    },
    "secondary-50": {
      $value: "#FAF6F0",
      $type: "color"
    },
    "secondary-100": {
      $value: "#F5EBDC",
      $type: "color"
    },
    "secondary-200": {
      $value: "#EDDCC2",
      $type: "color"
    },
    "secondary-300": {
      $value: "#E5CDA8",
      $type: "color"
    },
    "secondary-400": {
      $value: "#DCBE8E",
      $type: "color"
    },
    "secondary-500": {
      $value: "#D4A574",
      $type: "color"
    },
    "secondary-600": {
      $value: "#C9955A",
      $type: "color"
    },
    "secondary-700": {
      $value: "#B88540",
      $type: "color"
    },
    "secondary-800": {
      $value: "#A77526",
      $type: "color"
    },
    "secondary-900": {
      $value: "#8F650C",
      $type: "color"
    },
    "neutral-50": {
      $value: "#FAFAFA",
      $type: "color"
    },
    "neutral-100": {
      $value: "#F5F5F5",
      $type: "color"
    },
    "neutral-200": {
      $value: "#EEEEEE",
      $type: "color"
    },
    "neutral-300": {
      $value: "#E0E0E0",
      $type: "color"
    },
    "neutral-400": {
      $value: "#BDBDBD",
      $type: "color"
    },
    "neutral-500": {
      $value: "#9E9E9E",
      $type: "color"
    },
    "neutral-600": {
      $value: "#757575",
      $type: "color"
    },
    "neutral-700": {
      $value: "#616161",
      $type: "color"
    },
    "neutral-800": {
      $value: "#424242",
      $type: "color"
    },
    "neutral-900": {
      $value: "#212121",
      $type: "color"
    },
    "error-50": {
      $value: "#FFEBEE",
      $type: "color"
    },
    "error-100": {
      $value: "#FFCDD2",
      $type: "color"
    },
    "error-200": {
      $value: "#EF9A9A",
      $type: "color"
    },
    "error-300": {
      $value: "#E57373",
      $type: "color"
    },
    "error-400": {
      $value: "#EF5350",
      $type: "color"
    },
    "error-500": {
      $value: "#F44336",
      $type: "color"
    },
    "error-600": {
      $value: "#E53935",
      $type: "color"
    },
    "error-700": {
      $value: "#D32F2F",
      $type: "color"
    },
    "error-800": {
      $value: "#C62828",
      $type: "color"
    },
    "error-900": {
      $value: "#B71C1C",
      $type: "color"
    },
    "warning-50": {
      $value: "#FFF3E0",
      $type: "color"
    },
    "warning-100": {
      $value: "#FFE0B2",
      $type: "color"
    },
    "warning-200": {
      $value: "#FFCC80",
      $type: "color"
    },
    "warning-300": {
      $value: "#FFB74D",
      $type: "color"
    },
    "warning-400": {
      $value: "#FFA726",
      $type: "color"
    },
    "warning-500": {
      $value: "#FF9800",
      $type: "color"
    },
    "warning-600": {
      $value: "#FB8C00",
      $type: "color"
    },
    "warning-700": {
      $value: "#F57C00",
      $type: "color"
    },
    "warning-800": {
      $value: "#EF6C00",
      $type: "color"
    },
    "warning-900": {
      $value: "#E65100",
      $type: "color"
    },
    "info-50": {
      $value: "#E0F2F1",
      $type: "color"
    },
    "info-100": {
      $value: "#B2DFDB",
      $type: "color"
    },
    "info-200": {
      $value: "#80CBC4",
      $type: "color"
    },
    "info-300": {
      $value: "#4DB6AC",
      $type: "color"
    },
    "info-400": {
      $value: "#26A69A",
      $type: "color"
    },
    "info-500": {
      $value: "#009688",
      $type: "color"
    },
    "info-600": {
      $value: "#00897B",
      $type: "color"
    },
    "info-700": {
      $value: "#00796B",
      $type: "color"
    },
    "info-800": {
      $value: "#00695C",
      $type: "color"
    },
    "info-900": {
      $value: "#004D40",
      $type: "color"
    },
    "success-50": {
      $value: "#E8F5E9",
      $type: "color"
    },
    "success-100": {
      $value: "#C8E6C9",
      $type: "color"
    },
    "success-200": {
      $value: "#A5D6A7",
      $type: "color"
    },
    "success-300": {
      $value: "#81C784",
      $type: "color"
    },
    "success-400": {
      $value: "#66BB6A",
      $type: "color"
    },
    "success-500": {
      $value: "#4CAF50",
      $type: "color"
    },
    "success-600": {
      $value: "#43A047",
      $type: "color"
    },
    "success-700": {
      $value: "#388E3C",
      $type: "color"
    },
    "success-800": {
      $value: "#2E7D32",
      $type: "color"
    },
    "success-900": {
      $value: "#1B5E20",
      $type: "color"
    }
  },
  typography: {
    fontFamily: {
      primary: {
        $value: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        $type: "fontFamily"
      }
    },
    fontSize: {
      xs: {
        $value: "0.6875rem",
        $type: "dimension"
      },
      sm: {
        $value: "0.8125rem",
        $type: "dimension"
      },
      base: {
        $value: "0.875rem",
        $type: "dimension"
      },
      lg: {
        $value: "0.9375rem",
        $type: "dimension"
      },
      xl: {
        $value: "1rem",
        $type: "dimension"
      },
      "2xl": {
        $value: "1.25rem",
        $type: "dimension"
      },
      "3xl": {
        $value: "1.5rem",
        $type: "dimension"
      },
      "4xl": {
        $value: "1.75rem",
        $type: "dimension"
      }
    },
    fontWeight: {
      light: {
        $value: 300,
        $type: "number"
      },
      regular: {
        $value: 400,
        $type: "number"
      },
      medium: {
        $value: 500,
        $type: "number"
      },
      semibold: {
        $value: 600,
        $type: "number"
      },
      bold: {
        $value: 700,
        $type: "number"
      }
    },
    lineHeight: {
      none: {
        $value: 1,
        $type: "number"
      },
      tight: {
        $value: 1.25,
        $type: "number"
      },
      snug: {
        $value: 1.375,
        $type: "number"
      },
      normal: {
        $value: 1.5,
        $type: "number"
      },
      relaxed: {
        $value: 1.625,
        $type: "number"
      },
      loose: {
        $value: 2,
        $type: "number"
      }
    }
  },
  spacing: {
    "0": {
      $value: "0px",
      $type: "dimension"
    },
    "1": {
      $value: "4px",
      $type: "dimension"
    },
    "2": {
      $value: "8px",
      $type: "dimension"
    },
    "3": {
      $value: "12px",
      $type: "dimension"
    },
    "4": {
      $value: "16px",
      $type: "dimension"
    },
    "5": {
      $value: "20px",
      $type: "dimension"
    },
    "6": {
      $value: "24px",
      $type: "dimension"
    },
    "7": {
      $value: "28px",
      $type: "dimension"
    },
    "8": {
      $value: "32px",
      $type: "dimension"
    },
    "9": {
      $value: "36px",
      $type: "dimension"
    },
    "10": {
      $value: "40px",
      $type: "dimension"
    },
    "12": {
      $value: "48px",
      $type: "dimension"
    },
    "14": {
      $value: "56px",
      $type: "dimension"
    },
    "16": {
      $value: "64px",
      $type: "dimension"
    },
    "20": {
      $value: "80px",
      $type: "dimension"
    },
    "24": {
      $value: "96px",
      $type: "dimension"
    },
    "32": {
      $value: "128px",
      $type: "dimension"
    },
    "40": {
      $value: "160px",
      $type: "dimension"
    },
    "48": {
      $value: "192px",
      $type: "dimension"
    },
    "56": {
      $value: "224px",
      $type: "dimension"
    },
    "64": {
      $value: "256px",
      $type: "dimension"
    }
  },
  shape: {
    borderRadius: {
      none: {
        $value: "0",
        $type: "dimension"
      },
      sm: {
        $value: "4px",
        $type: "dimension"
      },
      base: {
        $value: "8px",
        $type: "dimension"
      },
      md: {
        $value: "12px",
        $type: "dimension"
      },
      lg: {
        $value: "16px",
        $type: "dimension"
      },
      xl: {
        $value: "24px",
        $type: "dimension"
      },
      "2xl": {
        $value: "32px",
        $type: "dimension"
      },
      full: {
        $value: "9999px",
        $type: "dimension"
      }
    },
    elevation: {
      "0": {
        $value: "none",
        $type: "string"
      },
      "1": {
        $value: "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)",
        $type: "string"
      },
      "2": {
        $value: "0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)",
        $type: "string"
      },
      "3": {
        $value: "0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)",
        $type: "string"
      },
      "4": {
        $value: "0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22)",
        $type: "string"
      },
      "5": {
        $value: "0px 19px 38px rgba(0, 0, 0, 0.30), 0px 15px 12px rgba(0, 0, 0, 0.22)",
        $type: "string"
      }
    }
  },
  semantic: {
    surface: {
      default: {
        $value: "{color.neutral-50}",
        $type: "color"
      },
      elevated: {
        $value: "{color.neutral-0}",
        $type: "color"
      }
    },
    text: {
      primary: {
        $value: "{color.neutral-900}",
        $type: "color"
      },
      secondary: {
        $value: "{color.neutral-800}",
        $type: "color"
      }
    },
    border: {
      default: {
        $value: "{color.neutral-400}",
        $type: "color"
      },
      focus: {
        $value: "{color.primary-500}",
        $type: "color"
      },
      error: {
        $value: "{color.error-500}",
        $type: "color"
      }
    },
    action: {
      primary: {
        $value: "{color.primary-500}",
        $type: "color"
      },
      secondary: {
        $value: "{color.secondary-500}",
        $type: "color"
      }
    },
    feedback: {
      error: {
        $value: "{color.error-500}",
        $type: "color"
      },
      warning: {
        $value: "{color.warning-500}",
        $type: "color"
      },
      info: {
        $value: "{color.info-500}",
        $type: "color"
      },
      success: {
        $value: "{color.success-500}",
        $type: "color"
      }
    }
  }
};

// ../tokens/bu-b/tokens.json
var tokens_default3 = {
  $schema: "https://schemas.figma.com/tokens/v1",
  color: {
    "primary-50": {
      $value: "#E0F7FA",
      $type: "color"
    },
    "primary-100": {
      $value: "#B2EBF2",
      $type: "color"
    },
    "primary-200": {
      $value: "#80DEEA",
      $type: "color"
    },
    "primary-300": {
      $value: "#4DD0E1",
      $type: "color"
    },
    "primary-400": {
      $value: "#26C6DA",
      $type: "color"
    },
    "primary-500": {
      $value: "#00BCD4",
      $type: "color"
    },
    "primary-600": {
      $value: "#00ACC1",
      $type: "color"
    },
    "primary-700": {
      $value: "#0097A7",
      $type: "color"
    },
    "primary-800": {
      $value: "#00838F",
      $type: "color"
    },
    "primary-900": {
      $value: "#006064",
      $type: "color"
    },
    "secondary-50": {
      $value: "#F5F4FF",
      $type: "color"
    },
    "secondary-100": {
      $value: "#EBE9FF",
      $type: "color"
    },
    "secondary-200": {
      $value: "#D7D3FF",
      $type: "color"
    },
    "secondary-300": {
      $value: "#C3BDFF",
      $type: "color"
    },
    "secondary-400": {
      $value: "#AFA7FF",
      $type: "color"
    },
    "secondary-500": {
      $value: "#7B68EE",
      $type: "color"
    },
    "secondary-600": {
      $value: "#6B5DE6",
      $type: "color"
    },
    "secondary-700": {
      $value: "#5B52DE",
      $type: "color"
    },
    "secondary-800": {
      $value: "#4B47D6",
      $type: "color"
    },
    "secondary-900": {
      $value: "#3B3CCE",
      $type: "color"
    },
    "neutral-50": {
      $value: "#FAFAFA",
      $type: "color"
    },
    "neutral-100": {
      $value: "#F5F5F5",
      $type: "color"
    },
    "neutral-200": {
      $value: "#EEEEEE",
      $type: "color"
    },
    "neutral-300": {
      $value: "#E0E0E0",
      $type: "color"
    },
    "neutral-400": {
      $value: "#BDBDBD",
      $type: "color"
    },
    "neutral-500": {
      $value: "#9E9E9E",
      $type: "color"
    },
    "neutral-600": {
      $value: "#757575",
      $type: "color"
    },
    "neutral-700": {
      $value: "#616161",
      $type: "color"
    },
    "neutral-800": {
      $value: "#424242",
      $type: "color"
    },
    "neutral-900": {
      $value: "#212121",
      $type: "color"
    },
    "error-50": {
      $value: "#FFEBEE",
      $type: "color"
    },
    "error-100": {
      $value: "#FFCDD2",
      $type: "color"
    },
    "error-200": {
      $value: "#EF9A9A",
      $type: "color"
    },
    "error-300": {
      $value: "#E57373",
      $type: "color"
    },
    "error-400": {
      $value: "#EF5350",
      $type: "color"
    },
    "error-500": {
      $value: "#F44336",
      $type: "color"
    },
    "error-600": {
      $value: "#E53935",
      $type: "color"
    },
    "error-700": {
      $value: "#D32F2F",
      $type: "color"
    },
    "error-800": {
      $value: "#C62828",
      $type: "color"
    },
    "error-900": {
      $value: "#B71C1C",
      $type: "color"
    },
    "warning-50": {
      $value: "#FFF3E0",
      $type: "color"
    },
    "warning-100": {
      $value: "#FFE0B2",
      $type: "color"
    },
    "warning-200": {
      $value: "#FFCC80",
      $type: "color"
    },
    "warning-300": {
      $value: "#FFB74D",
      $type: "color"
    },
    "warning-400": {
      $value: "#FFA726",
      $type: "color"
    },
    "warning-500": {
      $value: "#FF9800",
      $type: "color"
    },
    "warning-600": {
      $value: "#FB8C00",
      $type: "color"
    },
    "warning-700": {
      $value: "#F57C00",
      $type: "color"
    },
    "warning-800": {
      $value: "#EF6C00",
      $type: "color"
    },
    "warning-900": {
      $value: "#E65100",
      $type: "color"
    },
    "info-50": {
      $value: "#E0F2F1",
      $type: "color"
    },
    "info-100": {
      $value: "#B2DFDB",
      $type: "color"
    },
    "info-200": {
      $value: "#80CBC4",
      $type: "color"
    },
    "info-300": {
      $value: "#4DB6AC",
      $type: "color"
    },
    "info-400": {
      $value: "#26A69A",
      $type: "color"
    },
    "info-500": {
      $value: "#009688",
      $type: "color"
    },
    "info-600": {
      $value: "#00897B",
      $type: "color"
    },
    "info-700": {
      $value: "#00796B",
      $type: "color"
    },
    "info-800": {
      $value: "#00695C",
      $type: "color"
    },
    "info-900": {
      $value: "#004D40",
      $type: "color"
    },
    "success-50": {
      $value: "#E8F5E9",
      $type: "color"
    },
    "success-100": {
      $value: "#C8E6C9",
      $type: "color"
    },
    "success-200": {
      $value: "#A5D6A7",
      $type: "color"
    },
    "success-300": {
      $value: "#81C784",
      $type: "color"
    },
    "success-400": {
      $value: "#66BB6A",
      $type: "color"
    },
    "success-500": {
      $value: "#4CAF50",
      $type: "color"
    },
    "success-600": {
      $value: "#43A047",
      $type: "color"
    },
    "success-700": {
      $value: "#388E3C",
      $type: "color"
    },
    "success-800": {
      $value: "#2E7D32",
      $type: "color"
    },
    "success-900": {
      $value: "#1B5E20",
      $type: "color"
    }
  },
  typography: {
    fontFamily: {
      primary: {
        $value: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        $type: "fontFamily"
      }
    },
    fontSize: {
      xs: {
        $value: "0.875rem",
        $type: "dimension"
      },
      sm: {
        $value: "1rem",
        $type: "dimension"
      },
      base: {
        $value: "1.125rem",
        $type: "dimension"
      },
      lg: {
        $value: "1.25rem",
        $type: "dimension"
      },
      xl: {
        $value: "1.5rem",
        $type: "dimension"
      },
      "2xl": {
        $value: "1.875rem",
        $type: "dimension"
      },
      "3xl": {
        $value: "2.25rem",
        $type: "dimension"
      },
      "4xl": {
        $value: "2.75rem",
        $type: "dimension"
      }
    },
    fontWeight: {
      light: {
        $value: 300,
        $type: "number"
      },
      regular: {
        $value: 400,
        $type: "number"
      },
      medium: {
        $value: 500,
        $type: "number"
      },
      semibold: {
        $value: 600,
        $type: "number"
      },
      bold: {
        $value: 700,
        $type: "number"
      }
    },
    lineHeight: {
      none: {
        $value: 1,
        $type: "number"
      },
      tight: {
        $value: 1.25,
        $type: "number"
      },
      snug: {
        $value: 1.375,
        $type: "number"
      },
      normal: {
        $value: 1.5,
        $type: "number"
      },
      relaxed: {
        $value: 1.625,
        $type: "number"
      },
      loose: {
        $value: 2,
        $type: "number"
      }
    }
  },
  spacing: {
    "0": {
      $value: "0px",
      $type: "dimension"
    },
    "1": {
      $value: "4px",
      $type: "dimension"
    },
    "2": {
      $value: "8px",
      $type: "dimension"
    },
    "3": {
      $value: "12px",
      $type: "dimension"
    },
    "4": {
      $value: "16px",
      $type: "dimension"
    },
    "5": {
      $value: "20px",
      $type: "dimension"
    },
    "6": {
      $value: "24px",
      $type: "dimension"
    },
    "7": {
      $value: "28px",
      $type: "dimension"
    },
    "8": {
      $value: "32px",
      $type: "dimension"
    },
    "9": {
      $value: "36px",
      $type: "dimension"
    },
    "10": {
      $value: "40px",
      $type: "dimension"
    },
    "12": {
      $value: "48px",
      $type: "dimension"
    },
    "14": {
      $value: "56px",
      $type: "dimension"
    },
    "16": {
      $value: "64px",
      $type: "dimension"
    },
    "20": {
      $value: "80px",
      $type: "dimension"
    },
    "24": {
      $value: "96px",
      $type: "dimension"
    },
    "32": {
      $value: "128px",
      $type: "dimension"
    },
    "40": {
      $value: "160px",
      $type: "dimension"
    },
    "48": {
      $value: "192px",
      $type: "dimension"
    },
    "56": {
      $value: "224px",
      $type: "dimension"
    },
    "64": {
      $value: "256px",
      $type: "dimension"
    }
  },
  shape: {
    borderRadius: {
      none: {
        $value: "0",
        $type: "dimension"
      },
      sm: {
        $value: "4px",
        $type: "dimension"
      },
      base: {
        $value: "8px",
        $type: "dimension"
      },
      md: {
        $value: "12px",
        $type: "dimension"
      },
      lg: {
        $value: "16px",
        $type: "dimension"
      },
      xl: {
        $value: "24px",
        $type: "dimension"
      },
      "2xl": {
        $value: "32px",
        $type: "dimension"
      },
      full: {
        $value: "9999px",
        $type: "dimension"
      }
    },
    elevation: {
      "0": {
        $value: "none",
        $type: "string"
      },
      "1": {
        $value: "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)",
        $type: "string"
      },
      "2": {
        $value: "0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)",
        $type: "string"
      },
      "3": {
        $value: "0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)",
        $type: "string"
      },
      "4": {
        $value: "0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22)",
        $type: "string"
      },
      "5": {
        $value: "0px 19px 38px rgba(0, 0, 0, 0.30), 0px 15px 12px rgba(0, 0, 0, 0.22)",
        $type: "string"
      }
    }
  },
  semantic: {
    surface: {
      default: {
        $value: "{color.neutral-50}",
        $type: "color"
      },
      elevated: {
        $value: "{color.neutral-0}",
        $type: "color"
      }
    },
    text: {
      primary: {
        $value: "{color.neutral-800}",
        $type: "color"
      },
      secondary: {
        $value: "{color.neutral-600}",
        $type: "color"
      }
    },
    border: {
      default: {
        $value: "{color.neutral-200}",
        $type: "color"
      },
      focus: {
        $value: "{color.primary-500}",
        $type: "color"
      },
      error: {
        $value: "{color.error-500}",
        $type: "color"
      }
    },
    action: {
      primary: {
        $value: "{color.primary-500}",
        $type: "color"
      },
      secondary: {
        $value: "{color.secondary-500}",
        $type: "color"
      }
    },
    feedback: {
      error: {
        $value: "{color.error-500}",
        $type: "color"
      },
      warning: {
        $value: "{color.warning-500}",
        $type: "color"
      },
      info: {
        $value: "{color.info-500}",
        $type: "color"
      },
      success: {
        $value: "{color.success-500}",
        $type: "color"
      }
    }
  }
};

// ../tokens/bu-c/tokens.json
var tokens_default4 = {
  $schema: "https://schemas.figma.com/tokens/v1",
  color: {
    "primary-50": {
      $value: "#EDE7F6",
      $type: "color"
    },
    "primary-100": {
      $value: "#D1C4E9",
      $type: "color"
    },
    "primary-200": {
      $value: "#B39DDB",
      $type: "color"
    },
    "primary-300": {
      $value: "#9575CD",
      $type: "color"
    },
    "primary-400": {
      $value: "#7E57C2",
      $type: "color"
    },
    "primary-500": {
      $value: "#673AB7",
      $type: "color"
    },
    "primary-600": {
      $value: "#5E35B1",
      $type: "color"
    },
    "primary-700": {
      $value: "#512DA8",
      $type: "color"
    },
    "primary-800": {
      $value: "#4527A0",
      $type: "color"
    },
    "primary-900": {
      $value: "#311B92",
      $type: "color"
    },
    "secondary-50": {
      $value: "#FAF5E6",
      $type: "color"
    },
    "secondary-100": {
      $value: "#F5EBCD",
      $type: "color"
    },
    "secondary-200": {
      $value: "#EDDEB3",
      $type: "color"
    },
    "secondary-300": {
      $value: "#E4CF99",
      $type: "color"
    },
    "secondary-400": {
      $value: "#DBC470",
      $type: "color"
    },
    "secondary-500": {
      $value: "#D4AF37",
      $type: "color"
    },
    "secondary-600": {
      $value: "#C09E2F",
      $type: "color"
    },
    "secondary-700": {
      $value: "#AC8D27",
      $type: "color"
    },
    "secondary-800": {
      $value: "#987C1F",
      $type: "color"
    },
    "secondary-900": {
      $value: "#846B17",
      $type: "color"
    },
    "neutral-50": {
      $value: "#FAFAFA",
      $type: "color"
    },
    "neutral-100": {
      $value: "#F5F5F5",
      $type: "color"
    },
    "neutral-200": {
      $value: "#EEEEEE",
      $type: "color"
    },
    "neutral-300": {
      $value: "#E0E0E0",
      $type: "color"
    },
    "neutral-400": {
      $value: "#BDBDBD",
      $type: "color"
    },
    "neutral-500": {
      $value: "#9E9E9E",
      $type: "color"
    },
    "neutral-600": {
      $value: "#757575",
      $type: "color"
    },
    "neutral-700": {
      $value: "#616161",
      $type: "color"
    },
    "neutral-800": {
      $value: "#424242",
      $type: "color"
    },
    "neutral-900": {
      $value: "#212121",
      $type: "color"
    },
    "error-50": {
      $value: "#FFEBEE",
      $type: "color"
    },
    "error-100": {
      $value: "#FFCDD2",
      $type: "color"
    },
    "error-200": {
      $value: "#EF9A9A",
      $type: "color"
    },
    "error-300": {
      $value: "#E57373",
      $type: "color"
    },
    "error-400": {
      $value: "#EF5350",
      $type: "color"
    },
    "error-500": {
      $value: "#F44336",
      $type: "color"
    },
    "error-600": {
      $value: "#E53935",
      $type: "color"
    },
    "error-700": {
      $value: "#D32F2F",
      $type: "color"
    },
    "error-800": {
      $value: "#C62828",
      $type: "color"
    },
    "error-900": {
      $value: "#B71C1C",
      $type: "color"
    },
    "warning-50": {
      $value: "#FFF3E0",
      $type: "color"
    },
    "warning-100": {
      $value: "#FFE0B2",
      $type: "color"
    },
    "warning-200": {
      $value: "#FFCC80",
      $type: "color"
    },
    "warning-300": {
      $value: "#FFB74D",
      $type: "color"
    },
    "warning-400": {
      $value: "#FFA726",
      $type: "color"
    },
    "warning-500": {
      $value: "#FF9800",
      $type: "color"
    },
    "warning-600": {
      $value: "#FB8C00",
      $type: "color"
    },
    "warning-700": {
      $value: "#F57C00",
      $type: "color"
    },
    "warning-800": {
      $value: "#EF6C00",
      $type: "color"
    },
    "warning-900": {
      $value: "#E65100",
      $type: "color"
    },
    "info-50": {
      $value: "#E0F2F1",
      $type: "color"
    },
    "info-100": {
      $value: "#B2DFDB",
      $type: "color"
    },
    "info-200": {
      $value: "#80CBC4",
      $type: "color"
    },
    "info-300": {
      $value: "#4DB6AC",
      $type: "color"
    },
    "info-400": {
      $value: "#26A69A",
      $type: "color"
    },
    "info-500": {
      $value: "#009688",
      $type: "color"
    },
    "info-600": {
      $value: "#00897B",
      $type: "color"
    },
    "info-700": {
      $value: "#00796B",
      $type: "color"
    },
    "info-800": {
      $value: "#00695C",
      $type: "color"
    },
    "info-900": {
      $value: "#004D40",
      $type: "color"
    },
    "success-50": {
      $value: "#E8F5E9",
      $type: "color"
    },
    "success-100": {
      $value: "#C8E6C9",
      $type: "color"
    },
    "success-200": {
      $value: "#A5D6A7",
      $type: "color"
    },
    "success-300": {
      $value: "#81C784",
      $type: "color"
    },
    "success-400": {
      $value: "#66BB6A",
      $type: "color"
    },
    "success-500": {
      $value: "#4CAF50",
      $type: "color"
    },
    "success-600": {
      $value: "#43A047",
      $type: "color"
    },
    "success-700": {
      $value: "#388E3C",
      $type: "color"
    },
    "success-800": {
      $value: "#2E7D32",
      $type: "color"
    },
    "success-900": {
      $value: "#1B5E20",
      $type: "color"
    }
  },
  typography: {
    fontFamily: {
      primary: {
        $value: '"Georgia", "Times New Roman", serif',
        $type: "fontFamily"
      },
      secondary: {
        $value: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        $type: "fontFamily"
      },
      mono: {
        $value: '"Roboto Mono", "Courier New", monospace',
        $type: "fontFamily"
      }
    },
    fontSize: {
      xs: {
        $value: "0.75rem",
        $type: "dimension"
      },
      sm: {
        $value: "0.875rem",
        $type: "dimension"
      },
      base: {
        $value: "1rem",
        $type: "dimension"
      },
      lg: {
        $value: "1.125rem",
        $type: "dimension"
      },
      xl: {
        $value: "1.25rem",
        $type: "dimension"
      },
      "2xl": {
        $value: "1.5rem",
        $type: "dimension"
      },
      "3xl": {
        $value: "1.875rem",
        $type: "dimension"
      },
      "4xl": {
        $value: "2.25rem",
        $type: "dimension"
      }
    },
    fontWeight: {
      light: {
        $value: 300,
        $type: "number"
      },
      regular: {
        $value: 400,
        $type: "number"
      },
      medium: {
        $value: 500,
        $type: "number"
      },
      semibold: {
        $value: 600,
        $type: "number"
      },
      bold: {
        $value: 700,
        $type: "number"
      }
    },
    lineHeight: {
      none: {
        $value: 1,
        $type: "number"
      },
      tight: {
        $value: 1.25,
        $type: "number"
      },
      snug: {
        $value: 1.375,
        $type: "number"
      },
      normal: {
        $value: 1.5,
        $type: "number"
      },
      relaxed: {
        $value: 1.625,
        $type: "number"
      },
      loose: {
        $value: 2,
        $type: "number"
      }
    }
  },
  spacing: {
    "0": {
      $value: "0px",
      $type: "dimension"
    },
    "1": {
      $value: "4px",
      $type: "dimension"
    },
    "2": {
      $value: "8px",
      $type: "dimension"
    },
    "3": {
      $value: "12px",
      $type: "dimension"
    },
    "4": {
      $value: "16px",
      $type: "dimension"
    },
    "5": {
      $value: "20px",
      $type: "dimension"
    },
    "6": {
      $value: "24px",
      $type: "dimension"
    },
    "7": {
      $value: "28px",
      $type: "dimension"
    },
    "8": {
      $value: "32px",
      $type: "dimension"
    },
    "9": {
      $value: "36px",
      $type: "dimension"
    },
    "10": {
      $value: "40px",
      $type: "dimension"
    },
    "12": {
      $value: "48px",
      $type: "dimension"
    },
    "14": {
      $value: "56px",
      $type: "dimension"
    },
    "16": {
      $value: "64px",
      $type: "dimension"
    },
    "20": {
      $value: "80px",
      $type: "dimension"
    },
    "24": {
      $value: "96px",
      $type: "dimension"
    },
    "32": {
      $value: "128px",
      $type: "dimension"
    },
    "40": {
      $value: "160px",
      $type: "dimension"
    },
    "48": {
      $value: "192px",
      $type: "dimension"
    },
    "56": {
      $value: "224px",
      $type: "dimension"
    },
    "64": {
      $value: "256px",
      $type: "dimension"
    }
  },
  shape: {
    borderRadius: {
      none: {
        $value: "0",
        $type: "dimension"
      },
      sm: {
        $value: "4px",
        $type: "dimension"
      },
      base: {
        $value: "8px",
        $type: "dimension"
      },
      md: {
        $value: "12px",
        $type: "dimension"
      },
      lg: {
        $value: "16px",
        $type: "dimension"
      },
      xl: {
        $value: "24px",
        $type: "dimension"
      },
      "2xl": {
        $value: "32px",
        $type: "dimension"
      },
      full: {
        $value: "9999px",
        $type: "dimension"
      }
    },
    elevation: {
      "0": {
        $value: "none",
        $type: "string"
      },
      "1": {
        $value: "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)",
        $type: "string"
      },
      "2": {
        $value: "0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)",
        $type: "string"
      },
      "3": {
        $value: "0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)",
        $type: "string"
      },
      "4": {
        $value: "0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22)",
        $type: "string"
      },
      "5": {
        $value: "0px 19px 38px rgba(0, 0, 0, 0.30), 0px 15px 12px rgba(0, 0, 0, 0.22)",
        $type: "string"
      }
    }
  },
  semantic: {
    surface: {
      default: {
        $value: "{color.neutral-50}",
        $type: "color"
      },
      elevated: {
        $value: "#FFFFFF",
        $type: "color"
      }
    },
    text: {
      primary: {
        $value: "{color.neutral-900}",
        $type: "color"
      },
      secondary: {
        $value: "{color.neutral-700}",
        $type: "color"
      }
    },
    border: {
      default: {
        $value: "{color.neutral-300}",
        $type: "color"
      },
      focus: {
        $value: "{color.primary-500}",
        $type: "color"
      },
      error: {
        $value: "{color.error-500}",
        $type: "color"
      }
    },
    action: {
      primary: {
        $value: "{color.primary-600}",
        $type: "color"
      },
      secondary: {
        $value: "{color.secondary-600}",
        $type: "color"
      }
    },
    feedback: {
      error: {
        $value: "{color.error-500}",
        $type: "color"
      },
      warning: {
        $value: "{color.warning-500}",
        $type: "color"
      },
      info: {
        $value: "{color.info-500}",
        $type: "color"
      },
      success: {
        $value: "{color.success-500}",
        $type: "color"
      }
    }
  }
};

// ../tokens/bu-d/tokens.json
var tokens_default5 = {
  $schema: "https://schemas.figma.com/tokens/v1",
  color: {
    "primary-50": {
      $value: "#E3F2FD",
      $type: "color"
    },
    "primary-100": {
      $value: "#BBDEFB",
      $type: "color"
    },
    "primary-200": {
      $value: "#90CAF9",
      $type: "color"
    },
    "primary-300": {
      $value: "#64B5F6",
      $type: "color"
    },
    "primary-400": {
      $value: "#42A5F5",
      $type: "color"
    },
    "primary-500": {
      $value: "#2196F3",
      $type: "color"
    },
    "primary-600": {
      $value: "#1E88E5",
      $type: "color"
    },
    "primary-700": {
      $value: "#1976D2",
      $type: "color"
    },
    "primary-800": {
      $value: "#1565C0",
      $type: "color"
    },
    "primary-900": {
      $value: "#0D47A1",
      $type: "color"
    },
    "secondary-50": {
      $value: "#F5F6F8",
      $type: "color"
    },
    "secondary-100": {
      $value: "#E8EBED",
      $type: "color"
    },
    "secondary-200": {
      $value: "#D1D5DB",
      $type: "color"
    },
    "secondary-300": {
      $value: "#B8BFC7",
      $type: "color"
    },
    "secondary-400": {
      $value: "#9CA5B3",
      $type: "color"
    },
    "secondary-500": {
      $value: "#8495AB",
      $type: "color"
    },
    "secondary-600": {
      $value: "#6B7C93",
      $type: "color"
    },
    "secondary-700": {
      $value: "#5A6B7F",
      $type: "color"
    },
    "secondary-800": {
      $value: "#4A556B",
      $type: "color"
    },
    "secondary-900": {
      $value: "#3A4057",
      $type: "color"
    },
    "neutral-50": {
      $value: "{color.neutral-50}",
      $type: "color"
    },
    "neutral-100": {
      $value: "{color.neutral-100}",
      $type: "color"
    },
    "neutral-200": {
      $value: "{color.neutral-200}",
      $type: "color"
    },
    "neutral-300": {
      $value: "{color.neutral-300}",
      $type: "color"
    },
    "neutral-400": {
      $value: "{color.neutral-400}",
      $type: "color"
    },
    "neutral-500": {
      $value: "{color.neutral-500}",
      $type: "color"
    },
    "neutral-600": {
      $value: "{color.neutral-600}",
      $type: "color"
    },
    "neutral-700": {
      $value: "{color.neutral-700}",
      $type: "color"
    },
    "neutral-800": {
      $value: "{color.neutral-800}",
      $type: "color"
    },
    "neutral-900": {
      $value: "{color.neutral-900}",
      $type: "color"
    },
    "error-50": {
      $value: "{color.error-50}",
      $type: "color"
    },
    "error-100": {
      $value: "{color.error-100}",
      $type: "color"
    },
    "error-200": {
      $value: "{color.error-200}",
      $type: "color"
    },
    "error-300": {
      $value: "{color.error-300}",
      $type: "color"
    },
    "error-400": {
      $value: "{color.error-400}",
      $type: "color"
    },
    "error-500": {
      $value: "{color.error-500}",
      $type: "color"
    },
    "error-600": {
      $value: "{color.error-600}",
      $type: "color"
    },
    "error-700": {
      $value: "{color.error-700}",
      $type: "color"
    },
    "error-800": {
      $value: "{color.error-800}",
      $type: "color"
    },
    "error-900": {
      $value: "{color.error-900}",
      $type: "color"
    },
    "warning-50": {
      $value: "{color.warning-50}",
      $type: "color"
    },
    "warning-100": {
      $value: "{color.warning-100}",
      $type: "color"
    },
    "warning-200": {
      $value: "{color.warning-200}",
      $type: "color"
    },
    "warning-300": {
      $value: "{color.warning-300}",
      $type: "color"
    },
    "warning-400": {
      $value: "{color.warning-400}",
      $type: "color"
    },
    "warning-500": {
      $value: "{color.warning-500}",
      $type: "color"
    },
    "warning-600": {
      $value: "{color.warning-600}",
      $type: "color"
    },
    "warning-700": {
      $value: "{color.warning-700}",
      $type: "color"
    },
    "warning-800": {
      $value: "{color.warning-800}",
      $type: "color"
    },
    "warning-900": {
      $value: "{color.warning-900}",
      $type: "color"
    },
    "info-50": {
      $value: "{color.info-50}",
      $type: "color"
    },
    "info-100": {
      $value: "{color.info-100}",
      $type: "color"
    },
    "info-200": {
      $value: "{color.info-200}",
      $type: "color"
    },
    "info-300": {
      $value: "{color.info-300}",
      $type: "color"
    },
    "info-400": {
      $value: "{color.info-400}",
      $type: "color"
    },
    "info-500": {
      $value: "{color.info-500}",
      $type: "color"
    },
    "info-600": {
      $value: "{color.info-600}",
      $type: "color"
    },
    "info-700": {
      $value: "{color.info-700}",
      $type: "color"
    },
    "info-800": {
      $value: "{color.info-800}",
      $type: "color"
    },
    "info-900": {
      $value: "{color.info-900}",
      $type: "color"
    },
    "success-50": {
      $value: "{color.success-50}",
      $type: "color"
    },
    "success-100": {
      $value: "{color.success-100}",
      $type: "color"
    },
    "success-200": {
      $value: "{color.success-200}",
      $type: "color"
    },
    "success-300": {
      $value: "{color.success-300}",
      $type: "color"
    },
    "success-400": {
      $value: "{color.success-400}",
      $type: "color"
    },
    "success-500": {
      $value: "{color.success-500}",
      $type: "color"
    },
    "success-600": {
      $value: "{color.success-600}",
      $type: "color"
    },
    "success-700": {
      $value: "{color.success-700}",
      $type: "color"
    },
    "success-800": {
      $value: "{color.success-800}",
      $type: "color"
    },
    "success-900": {
      $value: "{color.success-900}",
      $type: "color"
    }
  },
  typography: {
    fontFamily: {
      primary: {
        $value: '"Roboto Mono", "SF Mono", "Monaco", "Inconsolata", "Fira Code", "Droid Sans Mono", "Source Code Pro", monospace',
        $type: "fontFamily"
      },
      secondary: {
        $value: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        $type: "fontFamily"
      },
      mono: {
        $value: '"Roboto Mono", "Courier New", monospace',
        $type: "fontFamily"
      }
    },
    fontSize: {
      xs: {
        $value: "{typography.fontSize.xs}",
        $type: "dimension"
      },
      sm: {
        $value: "{typography.fontSize.sm}",
        $type: "dimension"
      },
      base: {
        $value: "1rem",
        $type: "dimension"
      },
      lg: {
        $value: "{typography.fontSize.lg}",
        $type: "dimension"
      },
      xl: {
        $value: "{typography.fontSize.xl}",
        $type: "dimension"
      },
      "2xl": {
        $value: "{typography.fontSize.2xl}",
        $type: "dimension"
      },
      "3xl": {
        $value: "{typography.fontSize.3xl}",
        $type: "dimension"
      },
      "4xl": {
        $value: "{typography.fontSize.4xl}",
        $type: "dimension"
      }
    },
    fontWeight: {
      light: {
        $value: "{typography.fontWeight.light}",
        $type: "number"
      },
      regular: {
        $value: "{typography.fontWeight.regular}",
        $type: "number"
      },
      medium: {
        $value: "{typography.fontWeight.medium}",
        $type: "number"
      },
      semibold: {
        $value: "{typography.fontWeight.semibold}",
        $type: "number"
      },
      bold: {
        $value: "{typography.fontWeight.bold}",
        $type: "number"
      }
    },
    lineHeight: {
      none: {
        $value: "{typography.lineHeight.none}",
        $type: "number"
      },
      tight: {
        $value: "{typography.lineHeight.tight}",
        $type: "number"
      },
      snug: {
        $value: "{typography.lineHeight.snug}",
        $type: "number"
      },
      normal: {
        $value: "{typography.lineHeight.normal}",
        $type: "number"
      },
      relaxed: {
        $value: "{typography.lineHeight.relaxed}",
        $type: "number"
      },
      loose: {
        $value: "{typography.lineHeight.loose}",
        $type: "number"
      }
    }
  },
  spacing: {
    "0": {
      $value: "{spacing.0}",
      $type: "dimension"
    },
    "1": {
      $value: "{spacing.1}",
      $type: "dimension"
    },
    "2": {
      $value: "{spacing.2}",
      $type: "dimension"
    },
    "3": {
      $value: "{spacing.3}",
      $type: "dimension"
    },
    "4": {
      $value: "{spacing.4}",
      $type: "dimension"
    },
    "5": {
      $value: "{spacing.5}",
      $type: "dimension"
    },
    "6": {
      $value: "{spacing.6}",
      $type: "dimension"
    },
    "7": {
      $value: "{spacing.7}",
      $type: "dimension"
    },
    "8": {
      $value: "{spacing.8}",
      $type: "dimension"
    },
    "9": {
      $value: "{spacing.9}",
      $type: "dimension"
    },
    "10": {
      $value: "{spacing.10}",
      $type: "dimension"
    },
    "12": {
      $value: "{spacing.12}",
      $type: "dimension"
    },
    "14": {
      $value: "{spacing.14}",
      $type: "dimension"
    },
    "16": {
      $value: "{spacing.16}",
      $type: "dimension"
    },
    "20": {
      $value: "{spacing.20}",
      $type: "dimension"
    },
    "24": {
      $value: "{spacing.24}",
      $type: "dimension"
    },
    "32": {
      $value: "{spacing.32}",
      $type: "dimension"
    },
    "40": {
      $value: "{spacing.40}",
      $type: "dimension"
    },
    "48": {
      $value: "{spacing.48}",
      $type: "dimension"
    },
    "56": {
      $value: "{spacing.56}",
      $type: "dimension"
    },
    "64": {
      $value: "{spacing.64}",
      $type: "dimension"
    }
  },
  shape: {
    borderRadius: {
      none: {
        $value: "{shape.borderRadius.none}",
        $type: "dimension"
      },
      sm: {
        $value: "{shape.borderRadius.sm}",
        $type: "dimension"
      },
      base: {
        $value: "{shape.borderRadius.base}",
        $type: "dimension"
      },
      md: {
        $value: "{shape.borderRadius.md}",
        $type: "dimension"
      },
      lg: {
        $value: "{shape.borderRadius.lg}",
        $type: "dimension"
      },
      xl: {
        $value: "{shape.borderRadius.xl}",
        $type: "dimension"
      },
      "2xl": {
        $value: "{shape.borderRadius.2xl}",
        $type: "dimension"
      },
      full: {
        $value: "{shape.borderRadius.full}",
        $type: "dimension"
      }
    },
    elevation: {
      "0": {
        $value: "{shape.elevation.0}",
        $type: "string"
      },
      "1": {
        $value: "{shape.elevation.1}",
        $type: "string"
      },
      "2": {
        $value: "{shape.elevation.2}",
        $type: "string"
      },
      "3": {
        $value: "{shape.elevation.3}",
        $type: "string"
      },
      "4": {
        $value: "{shape.elevation.4}",
        $type: "string"
      },
      "5": {
        $value: "{shape.elevation.5}",
        $type: "string"
      }
    }
  },
  semantic: {
    surface: {
      default: {
        $value: "{color.neutral-100}",
        $type: "color"
      },
      elevated: {
        $value: "#FFFFFF",
        $type: "color"
      }
    },
    text: {
      primary: {
        $value: "{color.neutral-900}",
        $type: "color"
      },
      secondary: {
        $value: "{color.neutral-700}",
        $type: "color"
      }
    },
    border: {
      default: {
        $value: "{color.neutral-300}",
        $type: "color"
      },
      focus: {
        $value: "{color.primary-500}",
        $type: "color"
      },
      error: {
        $value: "{color.error-500}",
        $type: "color"
      }
    },
    action: {
      primary: {
        $value: "{color.primary-600}",
        $type: "color"
      },
      secondary: {
        $value: "{color.secondary-600}",
        $type: "color"
      }
    },
    feedback: {
      error: {
        $value: "{color.error-500}",
        $type: "color"
      },
      warning: {
        $value: "{color.warning-500}",
        $type: "color"
      },
      info: {
        $value: "{color.info-500}",
        $type: "color"
      },
      success: {
        $value: "{color.success-500}",
        $type: "color"
      }
    }
  }
};

// src/loadTokens.browser.ts
function resolveReference(reference, tokenObject, visited = /* @__PURE__ */ new Set(), coreTokens) {
  if (!reference.startsWith("{") || !reference.endsWith("}")) {
    return reference;
  }
  if (visited.has(reference)) {
    return void 0;
  }
  visited.add(reference);
  const path = reference.slice(1, -1);
  const parts = path.split(".");
  if (parts.length === 2 && parts[0] === "color" && parts[1].includes("-")) {
    const colorKey = parts[1];
    const token = tokenObject.color?.[colorKey];
    if (token && typeof token === "object" && "$value" in token) {
      const value = token.$value;
      if (typeof value === "string" && value.startsWith("{")) {
        if (value === reference) {
          visited.delete(reference);
          if (coreTokens) {
            const coreResolved = resolveReference(reference, coreTokens, /* @__PURE__ */ new Set());
            if (coreResolved !== void 0 && coreResolved !== reference) {
              return coreResolved;
            }
          }
          return void 0;
        }
        const resolved = resolveReference(value, tokenObject, visited, coreTokens);
        visited.delete(reference);
        if (resolved === void 0 && coreTokens) {
          const coreResolved = resolveReference(value, coreTokens, /* @__PURE__ */ new Set());
          if (coreResolved !== void 0 && coreResolved !== value) {
            return coreResolved;
          }
        }
        return resolved;
      }
      visited.delete(reference);
      return value;
    }
    if (coreTokens) {
      const coreResolved = resolveReference(reference, coreTokens, /* @__PURE__ */ new Set());
      if (coreResolved !== void 0 && coreResolved !== reference) {
        visited.delete(reference);
        return coreResolved;
      }
    }
    visited.delete(reference);
    return void 0;
  }
  if (parts.length === 3 && parts[0] === "color") {
    const category = parts[1];
    const shade = parts[2];
    const flattenedKey = `${category}-${shade}`;
    const flattenedToken = tokenObject.color?.[flattenedKey];
    if (flattenedToken && typeof flattenedToken === "object" && "$value" in flattenedToken) {
      const value = flattenedToken.$value;
      if (typeof value === "string" && value.startsWith("{")) {
        if (value === reference) {
          visited.delete(reference);
          if (coreTokens) {
            const coreResolved = resolveReference(reference, coreTokens, /* @__PURE__ */ new Set());
            if (coreResolved !== void 0 && coreResolved !== reference) {
              return coreResolved;
            }
          }
          return void 0;
        }
        const resolved = resolveReference(value, tokenObject, visited, coreTokens);
        visited.delete(reference);
        if (resolved === void 0 && coreTokens) {
          const coreResolved = resolveReference(value, coreTokens, /* @__PURE__ */ new Set());
          if (coreResolved !== void 0 && coreResolved !== value) {
            return coreResolved;
          }
        }
        return resolved;
      }
      visited.delete(reference);
      return value;
    }
    if (coreTokens) {
      const coreResolved = resolveReference(reference, coreTokens, /* @__PURE__ */ new Set());
      if (coreResolved !== void 0 && coreResolved !== reference) {
        visited.delete(reference);
        return coreResolved;
      }
    }
  }
  let current = tokenObject;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      visited.delete(reference);
      if (coreTokens) {
        const coreResolved = resolveReference(reference, coreTokens, /* @__PURE__ */ new Set());
        if (coreResolved !== void 0 && coreResolved !== reference) {
          return coreResolved;
        }
      }
      return void 0;
    }
  }
  if (current && typeof current === "object" && "$value" in current) {
    const value = current.$value;
    if (typeof value === "string" && value.startsWith("{") && value !== reference) {
      const resolved = resolveReference(value, tokenObject, visited, coreTokens);
      visited.delete(reference);
      if (resolved === void 0 && coreTokens) {
        const coreResolved = resolveReference(value, coreTokens, /* @__PURE__ */ new Set());
        if (coreResolved !== void 0 && coreResolved !== value) {
          return coreResolved;
        }
      }
      return resolved;
    }
    visited.delete(reference);
    return value;
  }
  visited.delete(reference);
  if (coreTokens) {
    const coreResolved = resolveReference(reference, coreTokens, /* @__PURE__ */ new Set());
    if (coreResolved !== void 0 && coreResolved !== reference) {
      return coreResolved;
    }
  }
  return void 0;
}
function deepMerge(core, bu) {
  const merged = { ...core };
  for (const key in bu) {
    if (bu[key] && typeof bu[key] === "object" && !Array.isArray(bu[key])) {
      if ("$value" in bu[key]) {
        const buValue = bu[key].$value;
        if (typeof buValue === "string" && buValue.startsWith("{") && buValue.endsWith("}")) {
          const path = buValue.slice(1, -1);
          const parts = path.split(".");
          if (parts.length === 2 && parts[0] === "color" && parts[1].includes("-")) {
            const referencedKey = parts[1];
            if (referencedKey === key) {
              continue;
            }
          }
          if (parts.length === 3 && parts[0] === "color") {
            const category = parts[1];
            const shade = parts[2];
            const flattenedKey = `${category}-${shade}`;
            if (flattenedKey === key) {
              continue;
            }
          }
        }
        merged[key] = bu[key];
      } else {
        merged[key] = deepMerge(core[key] || {}, bu[key]);
      }
    } else {
      merged[key] = bu[key];
    }
  }
  return resolveAllReferences(merged, merged, core);
}
function resolveAllReferences(obj, resolveFrom, coreTokens, visited = /* @__PURE__ */ new Set()) {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  if ("$value" in obj && typeof obj.$value === "string" && obj.$value.startsWith("{") && obj.$value.endsWith("}")) {
    if (visited.has(obj.$value)) {
      const resolved2 = resolveReference(obj.$value, coreTokens, /* @__PURE__ */ new Set());
      if (resolved2 !== void 0 && resolved2 !== obj.$value) {
        return {
          ...obj,
          $value: resolved2
        };
      }
      return obj;
    }
    visited.add(obj.$value);
    const resolved = resolveReference(obj.$value, resolveFrom, visited, coreTokens);
    if (resolved === void 0) {
      visited.delete(obj.$value);
      return obj;
    }
    visited.delete(obj.$value);
    if (resolved !== obj.$value) {
      return {
        ...obj,
        $value: resolved
      };
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => resolveAllReferences(item, resolveFrom, coreTokens, visited));
  }
  const result = {};
  for (const key in obj) {
    result[key] = resolveAllReferences(obj[key], resolveFrom, coreTokens, visited);
  }
  return result;
}
var tokenRegistry = {
  "core": tokens_default,
  "bu-a": tokens_default2,
  "bu-b": tokens_default3,
  "bu-c": tokens_default4,
  "bu-d": tokens_default5
};
async function loadTokens(buId) {
  const tokens = tokenRegistry[buId];
  if (!tokens) {
    throw new Error(`Unknown business unit: ${buId}`);
  }
  if (buId === "core") {
    return tokens;
  }
  const merged = deepMerge(tokens_default, tokens);
  return merged;
}

// src/loadTokens.ts
var import_promises = require("fs/promises");
var import_path = require("path");
async function fileExists(filePath) {
  try {
    await (0, import_promises.access)(filePath);
    return true;
  } catch {
    return false;
  }
}
function resolveReference2(reference, tokenObject, visited = /* @__PURE__ */ new Set(), coreTokens) {
  if (!reference.startsWith("{") || !reference.endsWith("}")) {
    return reference;
  }
  if (visited.has(reference)) {
    return void 0;
  }
  visited.add(reference);
  const path = reference.slice(1, -1);
  const parts = path.split(".");
  if (parts.length === 2 && parts[0] === "color" && parts[1].includes("-")) {
    const colorKey = parts[1];
    const token = tokenObject.color?.[colorKey];
    if (token && typeof token === "object" && "$value" in token) {
      const value = token.$value;
      if (typeof value === "string" && value.startsWith("{")) {
        if (value === reference) {
          visited.delete(reference);
          if (coreTokens) {
            const coreResolved = resolveReference2(
              reference,
              coreTokens,
              /* @__PURE__ */ new Set()
            );
            if (coreResolved !== void 0 && coreResolved !== reference) {
              return coreResolved;
            }
          }
          return void 0;
        }
        const resolved = resolveReference2(
          value,
          tokenObject,
          visited,
          coreTokens
        );
        visited.delete(reference);
        if (resolved === void 0 && coreTokens) {
          const coreResolved = resolveReference2(value, coreTokens, /* @__PURE__ */ new Set());
          if (coreResolved !== void 0 && coreResolved !== value) {
            return coreResolved;
          }
        }
        return resolved;
      }
      visited.delete(reference);
      return value;
    }
    if (coreTokens) {
      const coreResolved = resolveReference2(reference, coreTokens, /* @__PURE__ */ new Set());
      if (coreResolved !== void 0 && coreResolved !== reference) {
        visited.delete(reference);
        return coreResolved;
      }
    }
    visited.delete(reference);
    return void 0;
  }
  if (parts.length === 3 && parts[0] === "color") {
    const category = parts[1];
    const shade = parts[2];
    const flattenedKey = `${category}-${shade}`;
    const flattenedToken = tokenObject.color?.[flattenedKey];
    if (flattenedToken && typeof flattenedToken === "object" && "$value" in flattenedToken) {
      const value = flattenedToken.$value;
      if (typeof value === "string" && value.startsWith("{")) {
        if (value === reference) {
          visited.delete(reference);
          if (coreTokens) {
            const coreResolved = resolveReference2(
              reference,
              coreTokens,
              /* @__PURE__ */ new Set()
            );
            if (coreResolved !== void 0 && coreResolved !== reference) {
              return coreResolved;
            }
          }
          return void 0;
        }
        const resolved = resolveReference2(
          value,
          tokenObject,
          visited,
          coreTokens
        );
        visited.delete(reference);
        if (resolved === void 0 && coreTokens) {
          const coreResolved = resolveReference2(value, coreTokens, /* @__PURE__ */ new Set());
          if (coreResolved !== void 0 && coreResolved !== value) {
            return coreResolved;
          }
        }
        return resolved;
      }
      visited.delete(reference);
      return value;
    }
    if (coreTokens) {
      const coreResolved = resolveReference2(reference, coreTokens, /* @__PURE__ */ new Set());
      if (coreResolved !== void 0 && coreResolved !== reference) {
        visited.delete(reference);
        return coreResolved;
      }
    }
  }
  let current = tokenObject;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      visited.delete(reference);
      if (coreTokens) {
        const coreResolved = resolveReference2(reference, coreTokens, /* @__PURE__ */ new Set());
        if (coreResolved !== void 0 && coreResolved !== reference) {
          return coreResolved;
        }
      }
      return void 0;
    }
  }
  if (current && typeof current === "object" && "$value" in current) {
    const value = current.$value;
    if (typeof value === "string" && value.startsWith("{") && value !== reference) {
      const resolved = resolveReference2(
        value,
        tokenObject,
        visited,
        coreTokens
      );
      visited.delete(reference);
      if (resolved === void 0 && coreTokens) {
        const coreResolved = resolveReference2(value, coreTokens, /* @__PURE__ */ new Set());
        if (coreResolved !== void 0 && coreResolved !== value) {
          return coreResolved;
        }
      }
      return resolved;
    }
    visited.delete(reference);
    return value;
  }
  visited.delete(reference);
  if (coreTokens) {
    const coreResolved = resolveReference2(reference, coreTokens, /* @__PURE__ */ new Set());
    if (coreResolved !== void 0 && coreResolved !== reference) {
      return coreResolved;
    }
  }
  return void 0;
}
function deepMerge2(core, bu) {
  const merged = { ...core };
  for (const key in bu) {
    if (bu[key] && typeof bu[key] === "object" && !Array.isArray(bu[key])) {
      if ("$value" in bu[key]) {
        const buValue = bu[key].$value;
        if (typeof buValue === "string" && buValue.startsWith("{") && buValue.endsWith("}")) {
          const path = buValue.slice(1, -1);
          const parts = path.split(".");
          if (parts.length === 2 && parts[0] === "color" && parts[1].includes("-")) {
            const referencedKey = parts[1];
            if (referencedKey === key) {
              continue;
            }
          }
          if (parts.length === 3 && parts[0] === "color") {
            const category = parts[1];
            const shade = parts[2];
            const flattenedKey = `${category}-${shade}`;
            if (flattenedKey === key) {
              continue;
            }
          }
        }
        merged[key] = bu[key];
      } else {
        merged[key] = deepMerge2(core[key] || {}, bu[key]);
      }
    } else {
      merged[key] = bu[key];
    }
  }
  return resolveAllReferences2(merged, merged, core);
}
function resolveAllReferences2(obj, resolveFrom, coreTokens, visited = /* @__PURE__ */ new Set()) {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  if ("$value" in obj && typeof obj.$value === "string" && obj.$value.startsWith("{") && obj.$value.endsWith("}")) {
    if (visited.has(obj.$value)) {
      const resolved2 = resolveReference2(obj.$value, coreTokens, /* @__PURE__ */ new Set());
      if (resolved2 !== void 0 && resolved2 !== obj.$value) {
        return {
          ...obj,
          $value: resolved2
        };
      }
      return obj;
    }
    visited.add(obj.$value);
    const resolved = resolveReference2(
      obj.$value,
      resolveFrom,
      visited,
      coreTokens
    );
    if (resolved === void 0) {
      visited.delete(obj.$value);
      return obj;
    }
    visited.delete(obj.$value);
    if (resolved !== obj.$value) {
      return {
        ...obj,
        $value: resolved
      };
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(
      (item) => resolveAllReferences2(item, resolveFrom, coreTokens, visited)
    );
  }
  const result = {};
  for (const key in obj) {
    result[key] = resolveAllReferences2(
      obj[key],
      resolveFrom,
      coreTokens,
      visited
    );
  }
  return result;
}
async function loadTokens2(buId) {
  if (buId === "core") {
    const tokensPath = (0, import_path.join)(process.cwd(), "tokens", "core", "tokens.json");
    const content = await (0, import_promises.readFile)(tokensPath, "utf-8");
    return JSON.parse(content);
  }
  const coreTokensPath = (0, import_path.join)(process.cwd(), "tokens", "core", "tokens.json");
  const coreContent = await (0, import_promises.readFile)(coreTokensPath, "utf-8");
  const coreTokens = JSON.parse(coreContent);
  const buTokensPath = (0, import_path.join)(process.cwd(), "tokens", buId, "tokens.json");
  if (!await fileExists(buTokensPath)) {
    throw new Error(`Token file not found at tokens/${buId}/tokens.json`);
  }
  const buContent = await (0, import_promises.readFile)(buTokensPath, "utf-8");
  const buTokens = JSON.parse(buContent);
  const merged = deepMerge2(coreTokens, buTokens);
  return merged;
}

// src/tokenSchema.ts
var import_zod = require("zod");
var dtcgTokenValueSchema = import_zod.z.object({
  $value: import_zod.z.any(),
  // Value can be string, number, or object
  $type: import_zod.z.string().optional(),
  // Type is optional but recommended
  $description: import_zod.z.string().optional()
});
var dtcgTokenOrGroup = import_zod.z.union([
  dtcgTokenValueSchema,
  import_zod.z.record(import_zod.z.string(), import_zod.z.any())
  // Nested groups
]);
var colorGroupSchema = import_zod.z.record(import_zod.z.string(), dtcgTokenOrGroup);
var typographyGroupSchema = import_zod.z.object({
  fontFamily: import_zod.z.record(import_zod.z.string(), dtcgTokenOrGroup).optional(),
  fontSize: import_zod.z.record(import_zod.z.string(), dtcgTokenOrGroup).optional(),
  fontWeight: import_zod.z.record(import_zod.z.string(), dtcgTokenOrGroup).optional(),
  lineHeight: import_zod.z.record(import_zod.z.string(), dtcgTokenOrGroup).optional()
});
var spacingGroupSchema = import_zod.z.record(import_zod.z.string(), dtcgTokenOrGroup);
var shapeGroupSchema = import_zod.z.object({
  borderRadius: import_zod.z.record(import_zod.z.string(), dtcgTokenOrGroup).optional(),
  elevation: import_zod.z.record(import_zod.z.string(), dtcgTokenOrGroup).optional()
});
var semanticGroupSchema = import_zod.z.object({
  surface: import_zod.z.record(import_zod.z.string(), dtcgTokenOrGroup).optional(),
  text: import_zod.z.record(import_zod.z.string(), dtcgTokenOrGroup).optional(),
  border: import_zod.z.record(import_zod.z.string(), dtcgTokenOrGroup).optional(),
  action: import_zod.z.record(import_zod.z.string(), dtcgTokenOrGroup).optional(),
  feedback: import_zod.z.record(import_zod.z.string(), dtcgTokenOrGroup).optional()
});
var dtcgTokenSchema = import_zod.z.object({
  $schema: import_zod.z.string().optional(),
  // Optional schema reference
  color: colorGroupSchema.optional(),
  typography: typographyGroupSchema.optional(),
  spacing: spacingGroupSchema.optional(),
  shape: shapeGroupSchema.optional(),
  semantic: semanticGroupSchema.optional()
});

// src/validators/validateTokens.ts
function validateTokens(tokens) {
  const result = dtcgTokenSchema.safeParse(tokens);
  if (result.success) {
    return { valid: true, errors: [] };
  }
  const errors = result.error.errors.map((err) => ({
    path: err.path.join("."),
    message: err.message
  }));
  return { valid: false, errors };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildTheme,
  loadTokens,
  loadTokensNode,
  validateTokens
});
