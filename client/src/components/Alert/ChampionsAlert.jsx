import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

import { deleteChampionRequest } from "../../slices/champions";
import { getChampion } from "../../selectors/champions";

export const ChampionsAlert = ({
  open,
  onClose,
  deleteCham,
  setDeleteCham,
}) => {
  const dispatch = useDispatch();

  const champion = useSelector((state) => getChampion(state, deleteCham));

  const handleOnConfirm = () => {
    dispatch(deleteChampionRequest({ idChampion: deleteCham }));
    setDeleteCham(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        ¿Estás seguro que quieres eliminar el champion pilar?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Esta acción no se puede deshacer. Por favor, confirma si estás seguro
          de eliminar al champion{" "}
          <span className="font-semibold">{champion?.nombre}</span>
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
