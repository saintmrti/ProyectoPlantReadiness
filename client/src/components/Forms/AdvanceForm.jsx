import { useForm } from "react-hook-form";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

const AdvanceForm = ({ setOpen, fases, data }) => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    const { idEntregable, idGrupo } = values;
    setOpen(false);
    reset();
    navigate(`/avances/${idEntregable}/${idGrupo}`);
  };

  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center items-center flex-wrap h-80"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-5 w-full text-center">Agregar avances</h1>
        <div>
          {/* <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4 py-2 w-40">Responsable</label>
            <Input
              type="text"
              placeholder="Nombre del responsable"
              autoComplete="off"
              {...register("responsable", { required: true })}
            />
          </div> */}
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Entregable</label>
            <FormControl sx={{ width: "15rem" }}>
              <InputLabel id="entregable">Seleccionar entregable</InputLabel>
              <Select
                labelId="entregable"
                id="select-entregable"
                label="Seleccionar entregable"
                autoComplete="off"
                defaultValue=""
                {...register("idEntregable", { required: true })}
              >
                <MenuItem value="">Seleccione un entregable</MenuItem>
                {_.map(data, (item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex justify-end items-center w-full mb-3">
            <label className="px-4">Fase</label>
            <FormControl sx={{ width: "15rem" }}>
              <InputLabel id="fase">Seleccionar fase</InputLabel>
              <Select
                labelId="fase"
                id="select-phase"
                label="Seleccionar fase"
                autoComplete="off"
                defaultValue=""
                {...register("idGrupo", { required: true })}
              >
                <MenuItem value="">
                  <em>Seleccionar fase</em>
                </MenuItem>
                {_.map(fases, (item) => (
                  <MenuItem key={item.id} value={item.idGrupo}>
                    {item.fase}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Button variant="contained" type="submit">
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdvanceForm;
