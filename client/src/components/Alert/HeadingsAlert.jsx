import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { deleteHeadingsRequest } from "../../slices/headings";
import { getHeading } from "../../selectors/headings";

export const HeadingsAlert = ({
  open,
  onClose,
  deleteHead,
  setDeleteHead,
  setValue,
}) => {
  const dispatch = useDispatch();

  const heading = useSelector((state) => getHeading(state, deleteHead));

  const handleOnConfirm = () => {
    dispatch(deleteHeadingsRequest({ idRubro: deleteHead }));
    setDeleteHead(null);
    setValue(0);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        ¿Estás seguro que quieres eliminar el rubro junto con todo su contenido?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Esta acción no se puede deshacer. Por favor, confirma si estás seguro
          de eliminar <span className="font-semibold">{heading?.rubro}</span>
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
