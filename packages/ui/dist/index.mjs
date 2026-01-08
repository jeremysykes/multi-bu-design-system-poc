// src/atoms/Button/Button.tsx
import { Button as MuiButton } from "@mui/material";
import { jsx } from "react/jsx-runtime";
var Button = ({ children, ...props }) => {
  return /* @__PURE__ */ jsx(MuiButton, { ...props, children });
};

// src/atoms/Typography/Typography.tsx
import { Typography as MuiTypography } from "@mui/material";
import { jsx as jsx2 } from "react/jsx-runtime";
var Typography = (props) => {
  return /* @__PURE__ */ jsx2(MuiTypography, { ...props });
};

// src/molecules/TextField/TextField.tsx
import { TextField as MuiTextField } from "@mui/material";
import { jsx as jsx3 } from "react/jsx-runtime";
var TextField = (props) => {
  return /* @__PURE__ */ jsx3(MuiTextField, { ...props });
};

// src/molecules/Alert/Alert.tsx
import { Alert as MuiAlert } from "@mui/material";
import { jsx as jsx4 } from "react/jsx-runtime";
var Alert = (props) => {
  return /* @__PURE__ */ jsx4(MuiAlert, { ...props });
};

// src/organisms/Card/Card.tsx
import { Card as MuiCard } from "@mui/material";
import { jsx as jsx5 } from "react/jsx-runtime";
var Card = ({ children, ...props }) => {
  return /* @__PURE__ */ jsx5(MuiCard, { ...props, children });
};

// src/atoms/Checkbox/Checkbox.tsx
import { Checkbox as MuiCheckbox } from "@mui/material";
import { jsx as jsx6 } from "react/jsx-runtime";
var Checkbox = (props) => {
  return /* @__PURE__ */ jsx6(MuiCheckbox, { ...props });
};

// src/atoms/Radio/Radio.tsx
import { Radio as MuiRadio } from "@mui/material";
import { jsx as jsx7 } from "react/jsx-runtime";
var Radio = (props) => {
  return /* @__PURE__ */ jsx7(MuiRadio, { ...props });
};

// src/atoms/Switch/Switch.tsx
import { Switch as MuiSwitch } from "@mui/material";
import { jsx as jsx8 } from "react/jsx-runtime";
var Switch = (props) => {
  return /* @__PURE__ */ jsx8(MuiSwitch, { ...props });
};

// src/atoms/IconButton/IconButton.tsx
import { IconButton as MuiIconButton } from "@mui/material";
import { jsx as jsx9 } from "react/jsx-runtime";
var IconButton = (props) => {
  return /* @__PURE__ */ jsx9(MuiIconButton, { ...props });
};

// src/atoms/Link/Link.tsx
import { Link as MuiLink } from "@mui/material";
import { jsx as jsx10 } from "react/jsx-runtime";
var Link = (props) => {
  return /* @__PURE__ */ jsx10(MuiLink, { ...props });
};

// src/atoms/Chip/Chip.tsx
import { Chip as MuiChip } from "@mui/material";
import { jsx as jsx11 } from "react/jsx-runtime";
var Chip = (props) => {
  return /* @__PURE__ */ jsx11(MuiChip, { ...props });
};

// src/atoms/Badge/Badge.tsx
import { Badge as MuiBadge } from "@mui/material";
import { jsx as jsx12 } from "react/jsx-runtime";
var Badge = (props) => {
  return /* @__PURE__ */ jsx12(MuiBadge, { ...props });
};

// src/atoms/Avatar/Avatar.tsx
import { Avatar as MuiAvatar } from "@mui/material";
import { jsx as jsx13 } from "react/jsx-runtime";
var Avatar = (props) => {
  return /* @__PURE__ */ jsx13(MuiAvatar, { ...props });
};

// src/atoms/Divider/Divider.tsx
import { Divider as MuiDivider } from "@mui/material";
import { jsx as jsx14 } from "react/jsx-runtime";
var Divider = (props) => {
  return /* @__PURE__ */ jsx14(MuiDivider, { ...props });
};

// src/molecules/Select/Select.tsx
import {
  Select as MuiSelect,
  FormControl,
  InputLabel,
  MenuItem
} from "@mui/material";
import { jsx as jsx15 } from "react/jsx-runtime";
var Select = (props) => {
  return /* @__PURE__ */ jsx15(MuiSelect, { ...props });
};

// src/molecules/Autocomplete/Autocomplete.tsx
import { Autocomplete as MuiAutocomplete } from "@mui/material";
var Autocomplete = MuiAutocomplete;

// src/molecules/CheckboxGroup/CheckboxGroup.tsx
import {
  FormGroup,
  FormControlLabel
} from "@mui/material";
import { jsx as jsx16 } from "react/jsx-runtime";
var CheckboxGroup = (props) => {
  return /* @__PURE__ */ jsx16(FormGroup, { ...props });
};

// src/molecules/RadioGroup/RadioGroup.tsx
import {
  RadioGroup as MuiRadioGroup,
  FormControlLabel as FormControlLabel2
} from "@mui/material";
import { jsx as jsx17 } from "react/jsx-runtime";
var RadioGroup = (props) => {
  return /* @__PURE__ */ jsx17(MuiRadioGroup, { ...props });
};

// src/molecules/index.ts
import { FormControlLabel as FormControlLabel3 } from "@mui/material";

// src/molecules/Slider/Slider.tsx
import { Slider as MuiSlider } from "@mui/material";
var Slider = MuiSlider;

// src/molecules/Tabs/Tabs.tsx
import {
  Tabs as MuiTabs,
  Tab
} from "@mui/material";
import { jsx as jsx18 } from "react/jsx-runtime";
var Tabs = (props) => {
  return /* @__PURE__ */ jsx18(MuiTabs, { ...props });
};

// src/molecules/Breadcrumbs/Breadcrumbs.tsx
import {
  Breadcrumbs as MuiBreadcrumbs
} from "@mui/material";
import { jsx as jsx19 } from "react/jsx-runtime";
var Breadcrumbs = (props) => {
  return /* @__PURE__ */ jsx19(MuiBreadcrumbs, { ...props });
};

// src/molecules/Progress/Progress.tsx
import {
  CircularProgress,
  LinearProgress
} from "@mui/material";

// src/organisms/Dialog/Dialog.tsx
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { jsx as jsx20 } from "react/jsx-runtime";
var Dialog = (props) => {
  return /* @__PURE__ */ jsx20(MuiDialog, { ...props });
};

// src/organisms/Drawer/Drawer.tsx
import { Drawer as MuiDrawer } from "@mui/material";
import { jsx as jsx21 } from "react/jsx-runtime";
var Drawer = (props) => {
  return /* @__PURE__ */ jsx21(MuiDrawer, { ...props });
};

// src/organisms/AppBar/AppBar.tsx
import {
  AppBar as MuiAppBar,
  Toolbar
} from "@mui/material";
import { jsx as jsx22 } from "react/jsx-runtime";
var AppBar = (props) => {
  return /* @__PURE__ */ jsx22(MuiAppBar, { ...props });
};

// src/organisms/Table/Table.tsx
import {
  Table as MuiTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";
import { jsx as jsx23 } from "react/jsx-runtime";
var Table = (props) => {
  return /* @__PURE__ */ jsx23(MuiTable, { ...props });
};

// src/organisms/List/List.tsx
import {
  List as MuiList,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton
} from "@mui/material";
import { jsx as jsx24 } from "react/jsx-runtime";
var List = (props) => {
  return /* @__PURE__ */ jsx24(MuiList, { ...props });
};

// src/organisms/Accordion/Accordion.tsx
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import { jsx as jsx25 } from "react/jsx-runtime";
var Accordion = (props) => {
  return /* @__PURE__ */ jsx25(MuiAccordion, { ...props });
};

// src/organisms/Paper/Paper.tsx
import { Paper as MuiPaper } from "@mui/material";
import { jsx as jsx26 } from "react/jsx-runtime";
var Paper = (props) => {
  return /* @__PURE__ */ jsx26(MuiPaper, { ...props });
};

// src/templates/FormLayout/FormLayout.tsx
import { Box, Stack, useTheme } from "@mui/material";
import { jsx as jsx27 } from "react/jsx-runtime";
var FormLayout = ({ children, ...props }) => {
  const theme = useTheme();
  return /* @__PURE__ */ jsx27(
    Box,
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
      children: /* @__PURE__ */ jsx27(Stack, { spacing: 3, children })
    }
  );
};

// src/templates/DashboardTemplate/DashboardTemplate.tsx
import { Box as Box2, Grid, useTheme as useTheme2 } from "@mui/material";
import { Fragment, jsx as jsx28, jsxs } from "react/jsx-runtime";
var DashboardTemplate = ({ children, ...props }) => {
  const theme = useTheme2();
  return /* @__PURE__ */ jsx28(
    Box2,
    {
      sx: {
        p: { xs: 3, md: 4 },
        bgcolor: theme.palette.background.default,
        minHeight: "100vh"
      },
      ...props,
      children: /* @__PURE__ */ jsx28(Grid, { container: true, spacing: 3, children: children || /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx28(Grid, { item: true, xs: 12, md: 4, children: /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx28(Typography, { variant: "h6", children: "Metric Card 1" }),
          /* @__PURE__ */ jsx28(Typography, { variant: "body2", color: "text.secondary", children: "Dashboard content goes here" })
        ] }) }),
        /* @__PURE__ */ jsx28(Grid, { item: true, xs: 12, md: 4, children: /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx28(Typography, { variant: "h6", children: "Metric Card 2" }),
          /* @__PURE__ */ jsx28(Typography, { variant: "body2", color: "text.secondary", children: "Dashboard content goes here" })
        ] }) }),
        /* @__PURE__ */ jsx28(Grid, { item: true, xs: 12, md: 4, children: /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx28(Typography, { variant: "h6", children: "Metric Card 3" }),
          /* @__PURE__ */ jsx28(Typography, { variant: "body2", color: "text.secondary", children: "Dashboard content goes here" })
        ] }) })
      ] }) })
    }
  );
};

// src/templates/SettingsTemplate/SettingsTemplate.tsx
import { Box as Box3, Stack as Stack2, Divider as Divider2, useTheme as useTheme3 } from "@mui/material";
import { jsx as jsx29, jsxs as jsxs2 } from "react/jsx-runtime";
var SettingsTemplate = ({ sections, children, ...props }) => {
  const theme = useTheme3();
  return /* @__PURE__ */ jsxs2(
    Box3,
    {
      sx: {
        p: { xs: 3, md: 4 },
        maxWidth: theme.breakpoints.values.md,
        mx: "auto",
        bgcolor: theme.palette.background.default
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx29(Typography, { variant: "h4", gutterBottom: true, children: "Settings" }),
        /* @__PURE__ */ jsx29(Stack2, { spacing: 4, sx: { mt: 3 }, children: sections ? sections.map((section, index) => /* @__PURE__ */ jsxs2(Box3, { children: [
          /* @__PURE__ */ jsx29(Typography, { variant: "h6", gutterBottom: true, children: section.title }),
          /* @__PURE__ */ jsx29(Divider2, { sx: { mb: 2 } }),
          section.children
        ] }, index)) : children })
      ]
    }
  );
};

// src/pages/LoginPage/LoginPage.tsx
import { Container, Box as Box4, Stack as Stack3, useTheme as useTheme4 } from "@mui/material";
import { jsx as jsx30, jsxs as jsxs3 } from "react/jsx-runtime";
var LoginPage = () => {
  const theme = useTheme4();
  return /* @__PURE__ */ jsx30(Container, { maxWidth: "sm", children: /* @__PURE__ */ jsx30(
    Box4,
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
      children: /* @__PURE__ */ jsx30(Card, { sx: { width: "100%" }, children: /* @__PURE__ */ jsxs3(Stack3, { spacing: 4, sx: { p: 4 }, children: [
        /* @__PURE__ */ jsx30(Typography, { variant: "h5", component: "h1", children: "Login" }),
        /* @__PURE__ */ jsx30(TextField, { label: "Email", type: "email", fullWidth: true }),
        /* @__PURE__ */ jsx30(TextField, { label: "Password", type: "password", fullWidth: true }),
        /* @__PURE__ */ jsx30(Button, { variant: "contained", color: "primary", fullWidth: true, children: "Sign In" })
      ] }) })
    }
  ) });
};
export {
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
  FormControlLabel as CheckboxGroupFormControlLabel,
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
  FormControlLabel3 as FormControlLabel,
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
  FormControlLabel2 as RadioGroupFormControlLabel,
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
};
