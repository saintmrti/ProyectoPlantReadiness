import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import moment from "moment";
import momentTz from "moment-timezone";
import es from "moment/locale/es";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";

import App from "./App.jsx";
import { store } from "./store";

moment.updateLocale("es", es);
momentTz.tz.setDefault("America/Mexico_City");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
