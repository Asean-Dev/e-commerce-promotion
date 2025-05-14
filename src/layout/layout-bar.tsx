"use client";
import { Box } from "@mui/material";

export function LayoutBar() {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        boxShadow: (theme) => `0px 4px 20px ${theme.palette.divider}`,
        width: "100%",
        backgroundColor: "white",
        height: "60px",
      }}
    />
  );
}
