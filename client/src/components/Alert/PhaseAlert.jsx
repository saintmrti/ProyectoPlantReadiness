import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

import { deletePhaseRequest } from "../../slices/phase";
import { getPhase } from "../../selectors/phase";

export const PhaseAlert = ({ open, onClose, deletePha, setDeletePha }) => {
  const dispatch = useDispatch();

  const phase = useSelector((state) => getPhase(state, deletePha));

  const handleOnConfirm = () => {
    dispatch(deletePhaseRequest({ idFase: phase.id }));
    setDeletePha(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        ¿Estás seguro que quieres eliminar la fase junto con sus avances?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Esta acción no se puede deshacer. Por favor, confirma si estás seguro
          de eliminar <span className="font-semibold">{phase?.fase}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleOnConfirm} color="primary" variant="contained">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
