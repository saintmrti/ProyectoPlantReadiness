import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Toggle } from "../Toggle";

export default function FilterButton({
  setSelectedFilter,
  selectedFilter,
  handleBtnClickFilter,
}) {
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
    <div className="flex justify-end items-center mb-4 transition ease-in-out delay-150">
      <div className="flex items-center mx-3">
        <p className="xs mr-3">Fase</p>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
        >
          <Button
            variant={
              selectedFilter.phase.includes("1") ? "contained" : "outlined"
            }
            onClick={() => handleBtnClick("1", "phase")}
          >
            1
          </Button>
          <Button
            variant={
              selectedFilter.phase.includes("2") ? "contained" : "outlined"
            }
            onClick={() => handleBtnClick("2", "phase")}
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
          {[1, 2, 3].map((priority) => (
            <Button
              key={priority}
              variant={
                selectedFilter.priority.includes(`P${priority}`)
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleBtnClick(`P${priority}`, "priority")}
            >
              {priority}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div className="ml-3">
        <Button
          variant="contained"
          className="bg-primary text-white"
          onClick={handleBtnClickFilter}
        >
          Filtrar
        </Button>
      </div>
      <div className="ml-5">
        <Toggle />
      </div>
    </div>
  );
}
