import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
// import _ from "lodash";

export default function FilterButton() {
  const [selectedBtnPhase, setselectedBtnPhase] = useState(0);
  const [selectedBtnPriority, setselectedBtnPriority] = useState(0);
  const [selectedBtnWeight, setselectedBtnWeight] = useState(0);

  const handleBtnClickPhase = (button) => {
    setselectedBtnPhase((prevSelected) =>
      prevSelected === button ? 0 : button
    );
  };

  const handleBtnClickPriority = (button) => {
    setselectedBtnPriority((prevSelected) =>
      prevSelected === button ? 0 : button
    );
  };

  const handleBtnClickWeight = (button) => {
    setselectedBtnWeight((prevSelected) =>
      prevSelected === button ? 0 : button
    );
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
            variant={selectedBtnPhase === 1 ? "contained" : "outlined"}
            onClick={() => handleBtnClickPhase(1)}
          >
            1
          </Button>
          <Button
            variant={selectedBtnPhase === 2 ? "contained" : "outlined"}
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
            variant={selectedBtnPriority === 1 ? "contained" : "outlined"}
            onClick={() => handleBtnClickPriority(1)}
          >
            1
          </Button>
          <Button
            variant={selectedBtnPriority === 2 ? "contained" : "outlined"}
            onClick={() => handleBtnClickPriority(2)}
          >
            2
          </Button>
          <Button
            variant={selectedBtnPriority === 3 ? "contained" : "outlined"}
            onClick={() => handleBtnClickPriority(3)}
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
            variant={selectedBtnWeight === 1 ? "contained" : "outlined"}
            onClick={() => handleBtnClickWeight(1)}
          >
            1
          </Button>
          <Button
            variant={selectedBtnWeight === 2 ? "contained" : "outlined"}
            onClick={() => handleBtnClickWeight(2)}
          >
            2
          </Button>
          <Button
            variant={selectedBtnWeight === 3 ? "contained" : "outlined"}
            onClick={() => handleBtnClickWeight(3)}
          >
            3
          </Button>
        </ButtonGroup>
      </div>
      <div className="ml-3">
        <Button variant="contained" className="bg-primary text-white">
          Filtrar
        </Button>
      </div>
    </div>
  );
}
