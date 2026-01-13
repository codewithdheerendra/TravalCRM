"use client";

import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Light theme configuration
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1A3C6C",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

// Dark theme configuration
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
