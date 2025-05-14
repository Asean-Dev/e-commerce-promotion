"use client";

import { Box, useTheme } from "@mui/material";
import { MainContainer } from "modules/components";

export function CheckOutView() {
  const theme = useTheme();
  const colors = theme.palette;

  console.log("colors", colors);

  return <MainContainer>aaaaaaa</MainContainer>;
}
