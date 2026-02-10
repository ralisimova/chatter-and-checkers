import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2575fc",
      light: "#64b5f6",
      dark: "#1e53e5",
    },
    secondary: {
      main: "#6a11cb",
      light: "#9c27b0",
      dark: "#4a0e91",
    },
    background: {
      default: "#ffffff",
      paper: "#fafafa",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
    action: {
      disabled: "#f3f3f3",
    },
  },
  typography: {
    fontFamily: '"Inter", "Open Sans", sans-serif',
    h4: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
      opacity: 0.9,
    },
  },
  shape: {
    borderRadius: 16,
  },
  spacing: 8,
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        },
      },
    },
  },
});

export const gradients = {
  primary: "linear-gradient(135deg, #6a11cb, #2575fc)",
  secondary: "linear-gradient(135deg, #2575fc, #1e53e5)",
};
