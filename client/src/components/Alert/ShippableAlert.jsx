import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

export const ShippableAlert = ({ open, onClose, onConfirm, deleteShi }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        ¿Estás seguro que quieres eliminar el entregable {deleteShi}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Esta acción no se puede deshacer. Por favor, confirma si estás seguro
          de eliminar este entregable.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
