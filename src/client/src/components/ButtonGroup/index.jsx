// import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Toggle } from "../Toggle";
// import _ from "lodash";

export default function FilterButton({setSelectedFilter, selectedFilter, handleBtnClickFiler}) {
  // const [selectedBtnPhase, setselectedBtnPhase] = useState(0);
  // const [selectedBtnPriority, setselectedBtnPriority] = useState(0);
  // const [selectedBtnWeight, setselectedBtnWeight] = useState(0);

  const handleBtnClickPhase = (button) => {
    setSelectedFilter((prevFilter) => ({
      ...prevFilter,
      phase: prevFilter.phase === button ? 0 : button
    }));
  };

  const handleBtnClickPriority = (button) => {
    setSelectedFilter((prevFilter) => ({
      ...prevFilter,
      priority: prevFilter.priority === button ? "P0" : button
    }));
  };

  const handleBtnClickWeight = (button) => {
    setSelectedFilter((prevFilter) => ({
      ...prevFilter,
      weighting: prevFilter.weighting === button ? 0 : button
    }));
  };

  return (
    <div className="flex justify-end items-center mb-4 transition ease-in-out delay-150">
      <div className="flex items-center mx-3">
        <p className="xs mr-3">Fase</p>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
        >
          <Button
            variant={selectedFilter.phase === 1 ? "contained" : "outlined"}
            onClick={() => handleBtnClickPhase(1)}
          >
            1
          </Button>
          <Button
            variant={selectedFilter.phase === 2 ? "contained" : "outlined"}
            onClick={() => handleBtnClickPhase(2)}
          >
            2
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex items-center mx-3">
        <p className="xs mr-3">Prioridad</p>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
        >
          <Button
            variant={selectedFilter.priority === "P1" ? "contained" : "outlined"}
            onClick={() => handleBtnClickPriority("P1")}
          >
            1
          </Button>
          <Button
            variant={selectedFilter.priority === "P2" ? "contained" : "outlined"}
            onClick={() => handleBtnClickPriority("P2")}
          >
            2
          </Button>
          <Button
            variant={selectedFilter.priority === "P3" ? "contained" : "outlined"}
            onClick={() => handleBtnClickPriority("P3")}
          >
            3
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex items-center mx-3">
        <p className="xs mr-3">Ponderación</p>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
        >
          <Button
            variant={selectedFilter.weighting === 1 ? "contained" : "outlined"}
            onClick={() => handleBtnClickWeight(1)}
          >
            1
          </Button>
          <Button
            variant={selectedFilter.weighting === 2 ? "contained" : "outlined"}
            onClick={() => handleBtnClickWeight(2)}
          >
            2
          </Button>
          <Button
            variant={selectedFilter.weighting === 3 ? "contained" : "outlined"}
            onClick={() => handleBtnClickWeight(3)}
          >
            3
          </Button>
        </ButtonGroup>
      </div>
      <div className="ml-3">
        <Button variant="contained" className="bg-primary text-white" onClick={handleBtnClickFiler}>
          Filtrar
        </Button>
      </div>
      <div className="ml-5">
        <Toggle />
      </div>
    </div>
  );
}
