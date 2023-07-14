import { BrowserRouter, Routes, Route } from "react-router-dom";

import MachinesForm from "../Forms/MachinesForm";

import Home from "../../pages/Home";

const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/avances/:idEntregable" element={<MachinesForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
