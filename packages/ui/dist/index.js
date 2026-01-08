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
  Accordion: () => Accordion,
  AccordionDetails: () => import_material29.AccordionDetails,
  AccordionSummary: () => import_material29.AccordionSummary,
  Alert: () => Alert,
  AppBar: () => AppBar,
  Autocomplete: () => Autocomplete,
  Avatar: () => Avatar,
  Badge: () => Badge,
  Breadcrumbs: () => Breadcrumbs,
  Button: () => Button,
  Card: () => Card,
  Checkbox: () => Checkbox,
  CheckboxGroup: () => CheckboxGroup,
  CheckboxGroupFormControlLabel: () => import_material17.FormControlLabel,
  Chip: () => Chip,
  CircularProgress: () => import_material22.CircularProgress,
  DashboardTemplate: () => DashboardTemplate,
  Dialog: () => Dialog,
  DialogActions: () => import_material24.DialogActions,
  DialogContent: () => import_material24.DialogContent,
  DialogTitle: () => import_material24.DialogTitle,
  Divider: () => Divider,
  Drawer: () => Drawer,
  FormControl: () => import_material15.FormControl,
  FormControlLabel: () => import_material23.FormControlLabel,
  FormLayout: () => FormLayout,
  IconButton: () => IconButton,
  InputLabel: () => import_material15.InputLabel,
  LinearProgress: () => import_material22.LinearProgress,
  Link: () => Link,
  List: () => List,
  ListItem: () => import_material28.ListItem,
  ListItemButton: () => import_material28.ListItemButton,
  ListItemIcon: () => import_material28.ListItemIcon,
  ListItemText: () => import_material28.ListItemText,
  LoginPage: () => LoginPage,
  MenuItem: () => import_material15.MenuItem,
  Paper: () => Paper,
  Radio: () => Radio,
  RadioGroup: () => RadioGroup,
  RadioGroupFormControlLabel: () => import_material18.FormControlLabel,
  Select: () => Select,
  SettingsTemplate: () => SettingsTemplate,
  Slider: () => Slider,
  Switch: () => Switch,
  Tab: () => import_material20.Tab,
  Table: () => Table,
  TableBody: () => import_material27.TableBody,
  TableCell: () => import_material27.TableCell,
  TableHead: () => import_material27.TableHead,
  TableRow: () => import_material27.TableRow,
  Tabs: () => Tabs,
  TextField: () => TextField,
  Toolbar: () => import_material26.Toolbar,
  Typography: () => Typography
});
module.exports = __toCommonJS(index_exports);

// src/atoms/Button/Button.tsx
var import_material = require("@mui/material");
var import_jsx_runtime = require("react/jsx-runtime");
var Button = ({ children, ...props }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.Button, { ...props, children });
};

// src/atoms/Typography/Typography.tsx
var import_material2 = require("@mui/material");
var import_jsx_runtime2 = require("react/jsx-runtime");
var Typography = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_material2.Typography, { ...props });
};

// src/molecules/TextField/TextField.tsx
var import_material3 = require("@mui/material");
var import_jsx_runtime3 = require("react/jsx-runtime");
var TextField = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_material3.TextField, { ...props });
};

// src/molecules/Alert/Alert.tsx
var import_material4 = require("@mui/material");
var import_jsx_runtime4 = require("react/jsx-runtime");
var Alert = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_material4.Alert, { ...props });
};

// src/organisms/Card/Card.tsx
var import_material5 = require("@mui/material");
var import_jsx_runtime5 = require("react/jsx-runtime");
var Card = ({ children, ...props }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_material5.Card, { ...props, children });
};

// src/atoms/Checkbox/Checkbox.tsx
var import_material6 = require("@mui/material");
var import_jsx_runtime6 = require("react/jsx-runtime");
var Checkbox = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_material6.Checkbox, { ...props });
};

// src/atoms/Radio/Radio.tsx
var import_material7 = require("@mui/material");
var import_jsx_runtime7 = require("react/jsx-runtime");
var Radio = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_material7.Radio, { ...props });
};

// src/atoms/Switch/Switch.tsx
var import_material8 = require("@mui/material");
var import_jsx_runtime8 = require("react/jsx-runtime");
var Switch = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_material8.Switch, { ...props });
};

// src/atoms/IconButton/IconButton.tsx
var import_material9 = require("@mui/material");
var import_jsx_runtime9 = require("react/jsx-runtime");
var IconButton = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_material9.IconButton, { ...props });
};

// src/atoms/Link/Link.tsx
var import_material10 = require("@mui/material");
var import_jsx_runtime10 = require("react/jsx-runtime");
var Link = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_material10.Link, { ...props });
};

// src/atoms/Chip/Chip.tsx
var import_material11 = require("@mui/material");
var import_jsx_runtime11 = require("react/jsx-runtime");
var Chip = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_material11.Chip, { ...props });
};

// src/atoms/Badge/Badge.tsx
var import_material12 = require("@mui/material");
var import_jsx_runtime12 = require("react/jsx-runtime");
var Badge = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_material12.Badge, { ...props });
};

// src/atoms/Avatar/Avatar.tsx
var import_material13 = require("@mui/material");
var import_jsx_runtime13 = require("react/jsx-runtime");
var Avatar = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_material13.Avatar, { ...props });
};

// src/atoms/Divider/Divider.tsx
var import_material14 = require("@mui/material");
var import_jsx_runtime14 = require("react/jsx-runtime");
var Divider = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_material14.Divider, { ...props });
};

// src/molecules/Select/Select.tsx
var import_material15 = require("@mui/material");
var import_jsx_runtime15 = require("react/jsx-runtime");
var Select = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_material15.Select, { ...props });
};

// src/molecules/Autocomplete/Autocomplete.tsx
var import_material16 = require("@mui/material");
var Autocomplete = import_material16.Autocomplete;

// src/molecules/CheckboxGroup/CheckboxGroup.tsx
var import_material17 = require("@mui/material");
var import_jsx_runtime16 = require("react/jsx-runtime");
var CheckboxGroup = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_material17.FormGroup, { ...props });
};

// src/molecules/RadioGroup/RadioGroup.tsx
var import_material18 = require("@mui/material");
var import_jsx_runtime17 = require("react/jsx-runtime");
var RadioGroup = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_material18.RadioGroup, { ...props });
};

// src/molecules/index.ts
var import_material23 = require("@mui/material");

// src/molecules/Slider/Slider.tsx
var import_material19 = require("@mui/material");
var Slider = import_material19.Slider;

// src/molecules/Tabs/Tabs.tsx
var import_material20 = require("@mui/material");
var import_jsx_runtime18 = require("react/jsx-runtime");
var Tabs = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_material20.Tabs, { ...props });
};

// src/molecules/Breadcrumbs/Breadcrumbs.tsx
var import_material21 = require("@mui/material");
var import_jsx_runtime19 = require("react/jsx-runtime");
var Breadcrumbs = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_material21.Breadcrumbs, { ...props });
};

// src/molecules/Progress/Progress.tsx
var import_material22 = require("@mui/material");

// src/organisms/Dialog/Dialog.tsx
var import_material24 = require("@mui/material");
var import_jsx_runtime20 = require("react/jsx-runtime");
var Dialog = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_material24.Dialog, { ...props });
};

// src/organisms/Drawer/Drawer.tsx
var import_material25 = require("@mui/material");
var import_jsx_runtime21 = require("react/jsx-runtime");
var Drawer = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_material25.Drawer, { ...props });
};

// src/organisms/AppBar/AppBar.tsx
var import_material26 = require("@mui/material");
var import_jsx_runtime22 = require("react/jsx-runtime");
var AppBar = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_material26.AppBar, { ...props });
};

// src/organisms/Table/Table.tsx
var import_material27 = require("@mui/material");
var import_jsx_runtime23 = require("react/jsx-runtime");
var Table = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_material27.Table, { ...props });
};

// src/organisms/List/List.tsx
var import_material28 = require("@mui/material");
var import_jsx_runtime24 = require("react/jsx-runtime");
var List = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_material28.List, { ...props });
};

// src/organisms/Accordion/Accordion.tsx
var import_material29 = require("@mui/material");
var import_jsx_runtime25 = require("react/jsx-runtime");
var Accordion = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_material29.Accordion, { ...props });
};

// src/organisms/Paper/Paper.tsx
var import_material30 = require("@mui/material");
var import_jsx_runtime26 = require("react/jsx-runtime");
var Paper = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_material30.Paper, { ...props });
};

// src/templates/FormLayout/FormLayout.tsx
var import_material31 = require("@mui/material");
var import_jsx_runtime27 = require("react/jsx-runtime");
var FormLayout = ({ children, ...props }) => {
  const theme = (0, import_material31.useTheme)();
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    import_material31.Box,
    {
      component: "form",
      sx: {
        // All spacing from tokens: spacing.3 = 12px, spacing.4 = 16px
        p: { xs: 3, md: 4 },
        // Responsive padding using theme spacing (from tokens)
        // Max width uses theme breakpoint (tokenized) or spacing token
        maxWidth: theme.breakpoints.values.sm,
        // Uses theme breakpoint, not hardcoded
        mx: "auto",
        // Center horizontally (layout utility, no value needed)
        // Background uses semantic meaning (background.default maps to surface semantic token)
        // Note: Semantic tokens (surface.default) are used internally in component overrides
        // For templates, we use MUI's background.default which aligns with semantic meaning
        bgcolor: theme.palette.background.default,
        // ✅ Semantic meaning: "default surface"
        // Border uses semantic meaning (divider aligns with border.default semantic token)
        border: `1px solid ${theme.palette.divider}`
        // ✅ Semantic meaning: "default border"
      },
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_material31.Stack, { spacing: 3, children })
    }
  );
};

// src/templates/DashboardTemplate/DashboardTemplate.tsx
var import_material32 = require("@mui/material");
var import_jsx_runtime28 = require("react/jsx-runtime");
var DashboardTemplate = ({ children, ...props }) => {
  const theme = (0, import_material32.useTheme)();
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    import_material32.Box,
    {
      sx: {
        p: { xs: 3, md: 4 },
        bgcolor: theme.palette.background.default,
        minHeight: "100vh"
      },
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_material32.Grid, { container: true, spacing: 3, children: children || /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_jsx_runtime28.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_material32.Grid, { item: true, xs: 12, md: 4, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(Card, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(Typography, { variant: "h6", children: "Metric Card 1" }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(Typography, { variant: "body2", color: "text.secondary", children: "Dashboard content goes here" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_material32.Grid, { item: true, xs: 12, md: 4, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(Card, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(Typography, { variant: "h6", children: "Metric Card 2" }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(Typography, { variant: "body2", color: "text.secondary", children: "Dashboard content goes here" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_material32.Grid, { item: true, xs: 12, md: 4, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(Card, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(Typography, { variant: "h6", children: "Metric Card 3" }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(Typography, { variant: "body2", color: "text.secondary", children: "Dashboard content goes here" })
        ] }) })
      ] }) })
    }
  );
};

// src/templates/SettingsTemplate/SettingsTemplate.tsx
var import_material33 = require("@mui/material");
var import_jsx_runtime29 = require("react/jsx-runtime");
var SettingsTemplate = ({ sections, children, ...props }) => {
  const theme = (0, import_material33.useTheme)();
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
    import_material33.Box,
    {
      sx: {
        p: { xs: 3, md: 4 },
        maxWidth: theme.breakpoints.values.md,
        mx: "auto",
        bgcolor: theme.palette.background.default
      },
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Typography, { variant: "h4", gutterBottom: true, children: "Settings" }),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_material33.Stack, { spacing: 4, sx: { mt: 3 }, children: sections ? sections.map((section, index) => /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_material33.Box, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Typography, { variant: "h6", gutterBottom: true, children: section.title }),
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_material33.Divider, { sx: { mb: 2 } }),
          section.children
        ] }, index)) : children })
      ]
    }
  );
};

// src/pages/LoginPage/LoginPage.tsx
var import_material34 = require("@mui/material");
var import_jsx_runtime30 = require("react/jsx-runtime");
var LoginPage = () => {
  const theme = (0, import_material34.useTheme)();
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_material34.Container, { maxWidth: "sm", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    import_material34.Box,
    {
      sx: {
        // All spacing from tokens: spacing.4 = 16px, spacing.8 = 32px
        py: { xs: 4, md: 8 },
        // Responsive vertical padding (from tokens)
        minHeight: "100vh",
        // Viewport unit (layout constraint, acceptable)
        display: "flex",
        alignItems: "center",
        // Background uses semantic meaning (background.default maps to surface semantic token)
        bgcolor: theme.palette.background.default
        // ✅ Semantic meaning: "default surface"
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Card, { sx: { width: "100%" }, children: /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(import_material34.Stack, { spacing: 4, sx: { p: 4 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Typography, { variant: "h5", component: "h1", children: "Login" }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(TextField, { label: "Email", type: "email", fullWidth: true }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(TextField, { label: "Password", type: "password", fullWidth: true }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Button, { variant: "contained", color: "primary", fullWidth: true, children: "Sign In" })
      ] }) })
    }
  ) });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AppBar,
  Autocomplete,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  CheckboxGroupFormControlLabel,
  Chip,
  CircularProgress,
  DashboardTemplate,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLayout,
  IconButton,
  InputLabel,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  LoginPage,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  RadioGroupFormControlLabel,
  Select,
  SettingsTemplate,
  Slider,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Toolbar,
  Typography
});
