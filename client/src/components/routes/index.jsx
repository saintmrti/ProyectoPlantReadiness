import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";

import Projects from "../../pages/Projects";
import Register from "../../pages/Register";
import Dashboard from "../../pages/Dashboard";
import Advance from "../../pages/Advance";
import Champions from "../../pages/Champions";
import UserAccess from "../../pages/UserAccess";
import PrivateRoute from "../PrivateRoute";
import ProjectAccessRoute from "../ProjectAccessRoute";
import Authentication from "../Authentication";

// eslint-disable-next-line react-refresh/only-export-components
export const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route element={<PrivateRoute />}>
          <Route path="/proyectos" element={<Projects />} />
          <Route element={<ProjectAccessRoute />}>
            <Route
              path="/proyectos/:idProyecto/registro"
              element={<Register />}
            />
            <Route
              path="/proyectos/:idProyecto/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/proyectos/:idProyecto/avances/:idEntregable/:idFase"
              element={<Advance />}
            />
            <Route
              path="/proyectos/:idProyecto/champions"
              element={<Champions />}
            />
            <Route
              path="/proyectos/:idProyecto/usuarios"
              element={<UserAccess />}
            />
          </Route>
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    ),
  },
]);

export const Root = () => <RouterProvider router={router} />;
