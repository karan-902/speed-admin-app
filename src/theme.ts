import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2a67ff",
    },
    text: {
      primary: "#0a193e",
    },
  },

  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Outfit-Regular",
        },
      },
    },
  },
});
