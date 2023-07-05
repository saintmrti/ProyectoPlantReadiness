import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../../pages/Home";
import Progress from "../../pages/Progress";

const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/progreso/:idEntregable" element={<Progress />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
