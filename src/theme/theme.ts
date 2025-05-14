import { createTheme, PaletteMode } from "@mui/material";
const mode: PaletteMode = "light";
import "@mui/material/styles";
declare module "@mui/material/styles" {
  interface PaletteColor {
    lighter?: string;
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
}

const theme = createTheme({
  palette: {
    mode: mode,
    primary: {
      lighter: "#FFE3E7",
      light: "#FF8A98",
      main: "#FA374A",
      dark: "#C72C3B",
      darker: "#931F2A",
      contrastText: "#FFFFFF",
    },
    secondary: {
      lighter: "#E6E9FF",
      light: "#A5ADF3",
      main: "#4E5BA6",
      dark: "#3B447D",
      darker: "#2C335E",
      contrastText: "#FFFFFF",
    },
    info: {
      lighter: "#CAFDF5",
      light: "#61F3F3",
      main: "#00B8D9",
      dark: "#006C9C",
      darker: "#003768",
      contrastText: "#FFFFFF",
    },
    success: {
      lighter: "#D8F5DB",
      light: "#6FDA85",
      main: "#1BC35B",
      dark: "#158E44",
      darker: "#0C6330",
      contrastText: "#FFFFFF",
    },
    warning: {
      lighter: "#FFF4D5",
      light: "#FFD666",
      main: "#FFAB00",
      dark: "#C77700",
      darker: "#8C5700",
      contrastText: "#1C252E",
    },
    error: {
      lighter: "#FFE3D5",
      light: "#FF9966",
      main: "#FF5630",
      dark: "#D92A1F",
      darker: "#8B1414",
      contrastText: "#FFFFFF",
    },
    grey: {
      50: "#FCFDFD",
      100: "#F9FAFB",
      200: "#F4F6F8",
      300: "#DFE3E8",
      400: "#C4CDD5",
      500: "#919EAB",
      600: "#637381",
      700: "#454F5B",
      800: "#1C252E",
      900: "#141A21",
    },
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
    text: {
      primary: "#1C252E",
      secondary: "#637381",
      disabled: "#C4CDD5",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

export default theme;
