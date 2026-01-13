import "./globals.css";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { AppThemeProvider } from "@/components/AppThemeProvider";

export const metadata: Metadata = {
  title: "Next.js MUI & Tailwind Theme",
  description: "A robust theme setup for modern web apps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider>
          <AppThemeProvider>{children}</AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
