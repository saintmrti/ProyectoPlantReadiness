import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";

import Advance from "../../pages/Advance";
import Dashboard from "../../pages/Dashboard";
import Register from "../../pages/Register";

// eslint-disable-next-line react-refresh/only-export-components
export const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Register />} />
        <Route path="/avances/:idEntregable/:idGrupo" element={<Advance />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    ),
  },
]);

export const Root = () => <RouterProvider router={router} />;
