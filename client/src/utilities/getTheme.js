import { createTheme } from "@mui/material/styles";

export const getTheme = (theme) => {
  if (theme === "light")
    return createTheme({
      palette: {
        mode: "light",
        header: "#FAFAFA",
        bgcolor: "#F0F2F5",
        primary: {
          main: "#f51919",
        },
        status: {
          error: "#f44336",
          warning: "#ffb428",
          info: "#0082ff",
          success: "#00b978",
          disabled: "#9E9E9E",
        },
        other: {
          yellow: "#F9A825",
        },
      },
      typography: {
        fontFamily: "'Montserrat', sans-serif",
      },
    });
  return createTheme({
    palette: {
      mode: "dark",
      bgcolor: "#0F0D0A",
      status: {
        error: "#f44336",
        warning: "#ffb428",
        info: "#0082ff",
        success: "#00b978",
        disabled: "#9E9E9E",
      },
      other: {
        yellow: "#FDD835",
      },
    },
  });
};
