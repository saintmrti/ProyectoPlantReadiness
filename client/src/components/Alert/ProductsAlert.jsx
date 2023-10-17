import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { deleteProductsRequest } from "../../slices/products";
import { getMachine } from "../../selectors/products";

export const ProductsAlert = ({ open, onClose, deleteProd, setDeleteProd }) => {
  const dispatch = useDispatch();
  const machine = useSelector((state) => getMachine(state, deleteProd));
  const handleOnConfirm = () => {
    dispatch(deleteProductsRequest({ idMaquina: deleteProd }));
    setDeleteProd(null);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        ¿Estás seguro que quieres eliminar la maquina junto con sus productos?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Esta acción no se puede deshacer. Por favor, confirma si estás seguro
          de eliminar{" "}
          <span className="font-semibold">{machine[0]?.nombre}</span>
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
