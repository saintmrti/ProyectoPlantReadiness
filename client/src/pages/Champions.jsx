import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import ChampionsTable from "../components/Tables/ChampionsTable";
import { ChampionsForm } from "../components/Forms/ChampionsForm";
import { ChampionsAlert } from "../components/Alert/ChampionsAlert";
import { Spinner } from "../components/Spinner";
import { Error } from "../components/Error";
import { fetchChampionsRequest } from "../slices/champions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Champions = () => {
  const dispatch = useDispatch();
  const { idProyecto } = useParams();
  const {
    list: champions,
    isFetching,
    didError,
  } = useSelector((state) => state.champions);

  const [editCham, setEditCham] = useState(null);
  const [openCham, setOpenCham] = useState(false);
  const [deleteCham, setDeleteCham] = useState(null);
  const [chamAlert, setChamAlert] = useState(false);

  const handleClickCham = () => {
    setOpenCham(true);
    setEditCham(null);
  };

  const handleEditCham = (id) => {
    setEditCham(id);
    setOpenCham(true);
  };

  const handleDeleteCham = (id) => {
    setDeleteCham(id);
    setChamAlert(true);
  };

  useEffect(() => {
    dispatch(fetchChampionsRequest({ idProyecto }));
  }, [dispatch, idProyecto]);

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : didError ? (
        <Error />
      ) : (
        <>
          <ChampionsTable
            list={champions}
            handleClickCham={handleClickCham}
            handleEditCham={handleEditCham}
            handleDeleteCham={handleDeleteCham}
            idProyecto={idProyecto}
            setChamAlert={setChamAlert}
          />
          <Modal open={openCham} onClose={() => setOpenCham(false)}>
            <Box sx={style}>
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => setOpenCham(false)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
              <ChampionsForm
                idProyecto={idProyecto}
                editCham={editCham}
                setOpen={setOpenCham}
              />
            </Box>
          </Modal>
          <ChampionsAlert
            open={chamAlert}
            onClose={() => setChamAlert(false)}
            deleteCham={deleteCham}
            setDeleteCham={setDeleteCham}
          />
        </>
      )}
    </>
  );
};

export default Champions;
