import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import DarkUnica from "highcharts/themes/dark-unica";
import Highcharts from "highcharts";
import moment from "moment";

import { Root } from "./components/routes";
import { getTheme } from "./utilities/getTheme";

Highcharts.setOptions({
  time: {
    timezone: "America/Mexico_City",
    useUTC: false,
    moment,
  },
});

const App = () => {
  const { theme } = useSelector((state) => state.settings);
  if (theme !== "light") DarkUnica(Highcharts);

  return (
    <>
      <ThemeProvider theme={getTheme("light")}>
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
