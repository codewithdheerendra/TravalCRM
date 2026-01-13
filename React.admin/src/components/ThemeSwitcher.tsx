"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Don't render on the server
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="contained"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </Button>
  );
}
