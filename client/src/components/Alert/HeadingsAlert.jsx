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
import { deleteHeadingsRequest } from "../../slices/headings";

export const HeadingsAlert = ({ open, onClose, deleteHead, setDeleteHead }) => {
  const dispatch = useDispatch();

  const { list: headings } = useSelector((state) => state.headings);

  const headingFinded = _.find(headings, { id: deleteHead });

  const handleOnConfirm = () => {
    dispatch(deleteHeadingsRequest({ idRubro: deleteHead }));
    setDeleteHead(null);
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
          de eliminar{" "}
          <span className="font-semibold">{headingFinded?.rubro}</span>
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
