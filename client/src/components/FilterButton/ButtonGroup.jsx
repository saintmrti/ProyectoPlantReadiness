import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import _ from "lodash";

export default function BasicButtonGroup({ nombre, quantity }) {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setSelectedButton((prevSelected) =>
      prevSelected === buttonName ? null : buttonName
    );
  };

  return (
    <>
      <div className="flex items-center mx-3">
        <p className="xs font-bold mr-3">{nombre}</p>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          {_.range(1, quantity + 1).map((i) => (
            <>
              <Button
                variant={selectedButton === i ? "contained" : "outlined"}
                onClick={() => handleButtonClick(i)}
              >
                {i}
              </Button>
            </>
          ))}
        </ButtonGroup>
      </div>
    </>
  );
}
