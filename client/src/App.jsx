import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import DarkUnica from "highcharts/themes/dark-unica";
import Highcharts from "highcharts";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import moment from "moment";

import { Root } from "./components/routes";
import { getTheme } from "./utilities/getTheme";
// import { changeTheme } from "./slices/settings";

Highcharts.setOptions({
  time: {
    timezone: "America/Mexico_City",
    useUTC: false,
    moment,
  },
});

const App = () => {
  const { theme } = useSelector((state) => state.settings);

  // const dispatch = useDispatch();
  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // const urlTheme = urlParams.get("theme");
  // if (urlTheme && urlTheme !== theme) dispatch(changeTheme(urlTheme));

  useEffect(() => {
    if (theme !== "light") {
      DarkUnica(Highcharts);
    }
  }, [theme]);

  return (
    <>
      <ThemeProvider theme={getTheme(theme)}>
        <Box sx={{ flexGrow: 1 }}>
          <CssBaseline />
          <Box
            sx={{
              flexGrow: 1,
              px: 2,
              pt: 1,
              pb: 2,
              bgcolor: "bgcolor",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Root />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;
