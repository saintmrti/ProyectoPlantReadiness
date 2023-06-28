import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../../pages/Home";
import Register from "../../pages/Register";
import MachinesForm from "../Forms/MachinesForm";

const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entregables" element={<Register />} />
        <Route path="/fases" element={<MachinesForm />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
