import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { deleteExpectancyRequest } from "../../slices/expectancy";

export const ExpectancyAlert = ({ open, onClose, deleteExp, setDeleteExp }) => {
  const dispatch = useDispatch();

  const { data: expectancy } = useSelector((state) => state.expectancy);

  const expectancyFinded = _.find(expectancy, { id: deleteExp });

  const handleOnConfirm = () => {
    dispatch(deleteExpectancyRequest({ idExpectativa: deleteExp }));
    setDeleteExp(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        ¿Estás seguro que quieres eliminar la expectativa y todos sus
        entregables?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Esta acción no se puede deshacer. Por favor, confirma si estás seguro
          de eliminar{" "}
          <span className="font-semibold">{expectancyFinded?.expectativa}</span>
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
