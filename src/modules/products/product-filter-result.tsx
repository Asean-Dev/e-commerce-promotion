import { Box, Button, SxProps } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
type Props = {
  children: React.ReactNode;
  onReset: () => void;
  isShow: boolean;
  sx: SxProps;
};

export function ProductFilterResult({ children, onReset, isShow, sx }: Props) {
  if (!isShow) {
    return null;
  }
  return (
    <Box
      flexGrow={1}
      gap={1}
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      sx={sx}
    >
      {children}

      <Button
        color="error"
        size="small"
        variant={"outlined"}
        onClick={onReset}
        startIcon={<DeleteIcon />}
      >
        Reset
      </Button>
    </Box>
  );
}
