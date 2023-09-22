import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const Toggle = ({ idProyecto }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialValue =
    location.pathname === `/proyectos/${idProyecto}/dashboard`
      ? "dashboard"
      : "register";
  const [toggleValue, setToggleValue] = useState(initialValue);

  const handleToggleChange = (event, newValue) => {
    if (newValue !== null) {
      setToggleValue(newValue);
    }
  };

  const handleClickDashboard = () => {
    navigate(`/proyectos/${idProyecto}/dashboard`);
  };

  const handleClickRegister = () => {
    navigate(`/proyectos/${idProyecto}/registro`);
  };

  return (
    <ToggleButtonGroup
      value={toggleValue}
      exclusive
      onChange={handleToggleChange}
    >
      <ToggleButton value="register" onClick={handleClickRegister}>
        <AssignmentIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton value="dashboard" onClick={handleClickDashboard}>
        <DashboardIcon fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
