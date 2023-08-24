import { useSelector, useDispatch } from "react-redux";
import _ from 'lodash';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import {deleteShippableRequest} from '../../slices/shippable';

export const ShippableAlert = ({ open, onClose, deleteShi, setDeleteShi }) => {

  const dispatch = useDispatch();

  const { data: shippables } = useSelector((state) => state.shippable);

  const shippableFinded = _.find(shippables, { id: deleteShi });

  const handleOnConfirm = () => {
    dispatch(deleteShippableRequest({idEntregable: deleteShi}));
    setDeleteShi(null);
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        ¿Estás seguro que quieres eliminar el entregable?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Esta acción no se puede deshacer. Por favor, confirma si estás seguro
          de eliminar <span className="font-semibold">{shippableFinded?.nombre}</span>
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
