import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => navigate("/proyectos/1/registro")}
      >
        Plant Readiness
      </Button>
    </div>
  );
};

export default Home;
