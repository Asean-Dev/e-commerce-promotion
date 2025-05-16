import type { Theme, SxProps } from "@mui/material/styles";

import Box from "@mui/material/Box";

// ----------------------------------------------------------------------

export type ProductFilterBlockProps = {
  isShow: boolean;
  sx?: SxProps<Theme>;
  children: React.ReactNode;
};

// ----------------------------------------------------------------------

export function ProductFiltersBlock({
  children,
  isShow,
  sx,
}: ProductFilterBlockProps) {
  if (!isShow) {
    return null;
  }

  return (
    <Box
      gap={1}
      display="flex"
      sx={{
        overflow: "hidden",
        ...sx,
      }}
    >
      <Box gap={1} display="flex" flexWrap="wrap">
        {children}
      </Box>
    </Box>
  );
}
