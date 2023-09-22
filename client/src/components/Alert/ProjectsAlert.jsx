import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { deleteProjectRequest } from "../../slices/projects";
import { getProject } from "../../selectors/projects";

export const ProjectsAlert = ({
  open,
  onClose,
  deleteProject,
  setDeleteProject,
}) => {
  const dispatch = useDispatch();

  const project = useSelector((state) => getProject(state, deleteProject));

  const handleOnConfirm = () => {
    dispatch(deleteProjectRequest({ idProyecto: deleteProject }));
    setDeleteProject(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        ¿Estás seguro que quieres eliminar el proyecto junto con todo su
        contenido?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Esta acción no se puede deshacer. Por favor, confirma si estás seguro
          de eliminar <span className="font-semibold">{project?.nombre}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleOnConfirm} color="primary" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
