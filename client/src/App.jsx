import { ThemeProvider } from "@mui/material/styles";

import { Root } from "./components/routes";
import { getTheme } from "./getTheme";

const App = () => {
  return (
    <>
      <ThemeProvider theme={getTheme("light")}>
        <Root />
      </ThemeProvider>
    </>
  );
};

export default App;
