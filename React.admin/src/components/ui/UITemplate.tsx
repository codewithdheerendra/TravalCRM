import { Box, IconButton, IconButtonProps, Tooltip, TooltipProps, Typography, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import React from "react";
import { designTokens } from "../designToken";

interface AppFieldsetProps {
  sx?: SxProps<Theme>;
  title?: string;
  children: React.ReactNode;
}

export function AppFieldset({ sx, title, children }: AppFieldsetProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const borderColor = isDark
    ? designTokens.color.dark.borderSecondary
    : designTokens.color.light.borderSecondary;

  return (
    <Box component={"fieldset"}
      sx={{
        ...sx,
        border: "1px solid",
        borderColor,
        borderRadius: 1,
        p: 2,
      }}
    >
      {title && <Typography component={"legend"} variant="subtitle1" fontWeight="bold">{title}</Typography>}
      {children}
    </Box>
  );
}


interface IconTooltipButtonProps extends IconButtonProps {
  title: string;
  tooltipProps?: Omit<TooltipProps, "title" | "children">;
  children: React.ReactNode;
}

export const IconTooltipButton: React.FC<IconTooltipButtonProps> = ({
  title,
  tooltipProps,
  children,
  ...iconButtonProps
}) => {
  return (
    <Tooltip title={title} {...tooltipProps}>
      <IconButton {...iconButtonProps}>
        {children}
      </IconButton>
    </Tooltip>
  );
};
