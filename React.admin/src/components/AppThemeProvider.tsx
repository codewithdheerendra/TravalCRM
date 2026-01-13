"use client";

import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "@/app/theme";

import type {} from "@mui/material/styles";
import { designTokens } from "./designToken";

const { radius, color, shadow } = designTokens;

declare module "@mui/material/styles" {
  interface Shape {
    borderRadius: number;
    inputBorderRadius: number;
    buttonBorderRadius: number;
    dialogBorderRadius: number;
  }
  interface Palette {
    neutral: Palette["secondary"];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions["secondary"];
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

lightTheme.shape = {
  ...lightTheme.shape,
  borderRadius: 10,
  inputBorderRadius: 12,
  buttonBorderRadius: 16,
  dialogBorderRadius: 20,
} as typeof lightTheme.shape & { inputBorderRadius: number; buttonBorderRadius: number };

darkTheme.shape = {
  ...darkTheme.shape,
  borderRadius: 10,
  inputBorderRadius: 12,
  buttonBorderRadius: 16,
  dialogBorderRadius: 20,
} as typeof darkTheme.shape & { inputBorderRadius: number; buttonBorderRadius: number };

lightTheme.components = {
  ...lightTheme.components,
  // MuiOutlinedInput: {styleOverrides: {root: {borderRadius: 10}}},
  MuiButton: {styleOverrides: {root: {borderRadius: 10,textTransform: 'capitalize'}}},
  // MuiDialog: {styleOverrides:{paper: {borderRadius: 20}}},
  MuiCard: {styleOverrides:{root: {
    borderRadius: 10,
    "&.MuiPaper-outlined": {backgroundColor: color.light.background, boxShadow: shadow.md},
    "&.MuiPaper-outlined.clear": {backgroundColor: "transparent"},
  }}},
  MuiPaper: {styleOverrides:{root: {
    borderRadius: radius.base,
    "&.MuiPaper-outlined": {backgroundColor: color.light.background},
    "&.MuiPaper-outlined.clear": {backgroundColor: "transparent"},
  }}},
  MuiAccordion: {styleOverrides:{root: {
    backgroundColor: color.light.secondary, border: "1px solid", borderColor: color.light.secondary, borderRadius: radius.base,
    "&::before": {height:0},
    "&.shadow-none": {boxShadow: "none"},
    "&.Mui-expanded": {borderColor:  color.light.borderSecondary},
  }}},
  MuiStepIcon: {
    styleOverrides: {
      root: {
        // color: "#cbd5e1",
        "&.Mui-active": {
          color: "#1976d2",
        },
        "&.Mui-completed": {
        },
      },
    },
  },
};

darkTheme.components = {
  ...darkTheme.components,
  MuiButton: {styleOverrides: {root: {borderRadius: 10,textTransform: 'capitalize'}}},
  MuiCard: {styleOverrides:{root: {
    borderRadius: radius.base,
    "&.MuiPaper-outlined": {backgroundColor: color.dark.background, boxShadow: shadow.md},
    "&.MuiPaper-outlined.clear": {backgroundColor: "transparent"},
  }}},
  MuiPaper: {styleOverrides:{root: {
    borderRadius: radius.base,
    "&.MuiPaper-outlined": {backgroundColor: color.dark.background},
    "&.MuiPaper-outlined.clear": {backgroundColor: "transparent"},
  }}},
  MuiAccordion: {styleOverrides:{root: {
    backgroundColor: color.dark.secondary, borderColor: color.dark.secondary, border: "1px solid", borderRadius: radius.base,
    "&::before": {height:0},
    "&.shadow-none": {boxShadow: "none"},
    "&.Mui-expanded": {borderColor:  color.dark.borderSecondary},
  }}},
  MuiStepIcon: {
    styleOverrides: {
      root: {
        color: "#cbd5e1",
        "&.Mui-active": {
          color: "#1976d2",
        },
        "&.Mui-completed": {
        },
      },
    },
  },
};

lightTheme.palette = {
  ...lightTheme.palette,
  secondary: {
    main: "#f50057",
    light: "#ff4081",
    dark: "#c51162",
    contrastText: "#fff",
  },
  neutral: {
    main: "#94a3b8",
    light: "#cbd5e1",
    dark: "#64748b",
    contrastText: "#000",
  },
}
darkTheme.palette = {
  ...darkTheme.palette,
  neutral: {
    main: "#94a3b8",
    light: "#cbd5e1",
    dark: "#64748b",
    contrastText: "#000",
  },
}
function MUIProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = resolvedTheme === "dark" ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light" // <--- value can be system(so it will pickit from system preference)
      enableSystem={false} // Keep true if you want 'system' as an option for the user to switch to later
      // Set to false if you only want 'light' and 'dark' options
      disableTransitionOnChange
    >
      <MUIProvider>{children}</MUIProvider>
    </NextThemesProvider>
  );
}