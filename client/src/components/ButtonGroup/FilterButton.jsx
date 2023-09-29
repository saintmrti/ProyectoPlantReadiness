import _ from "lodash";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import { Toggle } from "../Toggle";

export function FilterButton({
  setSelectedFilter,
  selectedFilter,
  handleBtnClickFilter,
  idProyecto,
  phases,
}) {
  const navigate = useNavigate();
  const handleBtnClick = (button, key) => {
    setSelectedFilter((prevFilter) => {
      const updatedValues = new Set(prevFilter[key]);

      if (updatedValues.has(button)) {
        updatedValues.delete(button);
      } else {
        updatedValues.add(button);
      }

      return {
        ...prevFilter,
        [key]: Array.from(updatedValues),
      };
    });
  };

  return (
    <div className="flex justify-between items-center mb-2 transition ease-in-out delay-150">
      <div className="flex justify-center items-center">
        <div className="flex items-center mx-3">
          <p className="xs mr-3">Fase</p>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined primary button group"
          >
            {_.map(phases, (phase, index) => (
              <Button
                key={phase}
                variant={
                  selectedFilter.phase.includes(phase)
                    ? "outlined"
                    : "contained"
                }
                onClick={() => handleBtnClick(phase, "phase")}
              >
                {index + 1}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <div className="flex items-center mx-3">
          <p className="xs mr-3">Prioridad</p>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined primary button group"
          >
            {[1, 2, 3].map((priority) => (
              <Button
                key={priority}
                variant={
                  selectedFilter.priority.includes(`P${priority}`)
                    ? "outlined"
                    : "contained"
                }
                onClick={() => handleBtnClick(`P${priority}`, "priority")}
              >
                {priority}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <div className="ml-2">
          <Button
            variant="contained"
            className="bg-primary text-white"
            onClick={handleBtnClickFilter}
          >
            Filtrar
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div>
          <Button
            variant="contained"
            className="bg-primary text-white"
            onClick={() => navigate(`/proyectos/${idProyecto}/champions`)}
            sx={{ mr: 2 }}
          >
            Champions
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            className="bg-primary text-white"
            onClick={() => navigate("/")}
          >
            Inicio
          </Button>
        </div>
        <div className="ml-5">
          <Toggle idProyecto={idProyecto} />
        </div>
      </div>
    </div>
  );
}
