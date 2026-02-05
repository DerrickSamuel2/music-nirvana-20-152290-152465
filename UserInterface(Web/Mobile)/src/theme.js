import { createTheme } from "@mui/material/styles";

// PUBLIC_INTERFACE
/**
 * Application-wide MUI theme with accessibility-conscious color contrast settings.
 */
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1db954", contrastText: "#fff" },
    secondary: { main: "#191414", contrastText: "#fff" },
    background: { default: "#fafafa" },
    error: { main: "#e53935" },
    warning: { main: "#ffa726" },
    info: { main: "#29b6f6" },
    success: { main: "#43a047" }
  },
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif"
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 48, // touch targets and accessibility
        }
      }
    }
  }
});

export default theme;
