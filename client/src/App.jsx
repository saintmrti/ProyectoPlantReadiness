import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { Root } from "./components/routes";
import { getTheme } from "./utilities/getTheme";

const App = () => {
  return (
    <>
      <ThemeProvider theme={getTheme("light")}>
        <Box sx={{ flexGrow: 1 }}>
          <CssBaseline />
          <Box
            sx={{
              flexGrow: 1,
              p: 2,
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
