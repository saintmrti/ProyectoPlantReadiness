import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../../pages/Home";
import Register from "../../pages/Register";
import Advance from "../../pages/Advance";
import Dashboard from "../../pages/Dashboard";

// eslint-disable-next-line react-refresh/only-export-components
export const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos/:idProyecto/registro" element={<Register />} />
        <Route
          path="/proyectos/:idProyecto/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/proyectos/:idProyecto/avances/:idEntregable/:idGrupo"
          element={<Advance />}
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    ),
  },
]);

export const Root = () => <RouterProvider router={router} />;
