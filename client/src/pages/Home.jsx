import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => navigate("/proyectos/1/registro")}
        sx={{ mr: 2 }}
      >
        Plant Readiness
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate("/proyectos/2/registro")}
      >
        Proyecto 2
      </Button>
    </div>
  );
};

export default Home;
