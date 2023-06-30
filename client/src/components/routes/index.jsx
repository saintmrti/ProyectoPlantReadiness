import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../../pages/Home";
import Register from "../../pages/Register";

const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fases" element={<Register />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
