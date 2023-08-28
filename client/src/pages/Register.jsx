import { useState, useEffect } from "react";
import _ from "lodash";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";

import ExpectationForm from "../components/Forms/ExpectationForm";
import ShippableForm from "../components/Forms/ShippableForm";
import PhaseForm from "../components/Forms/PhaseForm";
import AdvanceForm from "../components/Forms/AdvanceForm";
import HeadingForm from "../components/Forms/HeadingForm";
import ShippableTable from "../components/Tables/ShippableTable";
import { fetchExpectancyRequest } from "../slices/expectancy";
import { fetchShippableRequest } from "../slices/shippable";
import { fetchAdvanceRequest } from "../slices/advance";
import { headingsRequest } from "../slices/headings";
import { machinesRequest } from "../slices/machines";
import { fetchPhaseRequest } from "../slices/phase";
import { groupedByIdExpectancy } from "../selectors/expectancy";
import { summaryAdvanced } from "../selectors/advance";
import { CustomTabPanel, a11yProps } from "../components/Tabs/CustomTabPanel";
import { Spinner } from "../components/Spinner";
import { Error } from "../components/Error";
import { Toggle } from "../components/Toggle";
import { ShippableAlert } from "../components/Alert/ShippableAlert";

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

const Register = () => {
  const dispatch = useDispatch();
  const [openExp, setOpenExp] = useState(false);
  const [openShi, setOpenShi] = useState(false);
  const [openPha, setOpenPha] = useState(false);
  const [openAdv, setOpenAdv] = useState(false);
  const [openHead, setOpenHead] = useState(false);
  const [idExpectancy, setIdExpectancy] = useState(null);
  const [activeComment, setActiveComment] = useState(true);
  const [changeShi, setChangeShi] = useState(null);
  const [editShi, setEditShip] = useState(null);
  const [editAdv, setEditAdv] = useState(null);
  const [deleteShi, setDeleteShi] = useState(null);
  const [alertShi, setAlertShi] = useState(false);

  const expectancy = useSelector(groupedByIdExpectancy);
  const advance = useSelector(summaryAdvanced);
  const { list: headings } = useSelector((state) => state.headings);
  const { list: machines } = useSelector((state) => state.machines);
  // const { data: shippables } = useSelector((state) => state.shippable);
  const { list: fases } = useSelector((state) => state.phase);
  const { isFetching, didError } = useSelector((state) => state.expectancy);

  const fasesByidGrupo = _.uniqBy(_.values(fases), "idGrupo");
  const maxIdGrupo = _.maxBy(_.values(fases), "idGrupo");
  const usedMachines = _.uniqBy(_.values(fases), "idMaquina");
  const updatedMachines = _.filter(machines, (machine) => {
    return !_.some(
      usedMachines,
      (usedMachine) => usedMachine.idMaquina === machine.id
    );
  });

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOnClickShi = (id) => {
    setIdExpectancy(id);
    setEditShip(null);
    setOpenShi(true);
  };

  const handleOnClickAdv = (id) => {
    setChangeShi(id);
    setEditAdv(null);
    setOpenAdv(true);
  };

  const handleOnClickEditShi = (id) => {
    setEditShip(id);
    setOpenShi(true);
  };

  const handleOnClickEditAdv = (id) => {
    setEditAdv(id);
    setOpenAdv(true);
  };

  const handleOnClickDeleteShi = (id) => {
    setDeleteShi(id);
    setAlertShi(true);
  };

  useEffect(() => {
    dispatch(fetchExpectancyRequest());
    dispatch(fetchShippableRequest());
    dispatch(fetchAdvanceRequest());
    dispatch(fetchPhaseRequest());
    dispatch(headingsRequest());
    dispatch(machinesRequest());
  }, [dispatch]);
  return (
    <>
      <div className="">
        {isFetching ? (
          <Spinner />
        ) : didError ? (
          <Error />
        ) : (
          <>
            <div className="flex flex-col items-center mb-6">
              <h1 className="text-3xl font-bold text-center">
                Plant Readiness
              </h1>
              <div className="w-2/3 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
            </div>
            <div className="flex mb-3 justify-between">
              <div className="flex">
                <div className="mr-2">
                  <Button variant="contained" onClick={() => setOpenHead(true)}>
                    Agregar rubro
                  </Button>
                </div>
                <div className="mr-2">
                  <Button variant="contained" onClick={() => setOpenExp(true)}>
                    Agregar expectativa
                  </Button>
                </div>
                <div>
                  <Button variant="contained" onClick={() => setOpenPha(true)}>
                    Agregar fase
                  </Button>
                </div>
              </div>
              <Toggle />
            </div>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange}>
                  {_.map(headings, (item, index) => (
                    <Tab
                      key={index}
                      label={item.rubro}
                      {...a11yProps(parseInt(index - 1))}
                    />
                  ))}
                </Tabs>
              </Box>
              {_.map(headings, (rubro, index) => (
                <CustomTabPanel
                  value={value}
                  key={index}
                  index={parseInt(index - 1)}
                >
                  <div>
                    {_.map(expectancy[rubro.id], (item, index) => (
                      <Accordion anchor={`item-${index}`} key={index}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>{item.expectativa}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="flex justify-end mb-3">
                            {/* <IconButton
                              aria-label="add"
                              size="small"
                              onClick={() => handleOnClickShi(item.id)}
                            >
                              <AddCircleOutlineIcon />
                            </IconButton> */}
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleOnClickShi(item.id)}
                              sx={{ mr: 1 }}
                            >
                              Agregar Entregable
                            </Button>
                            {item.shippables && item.shippables.length > 0 && (
                              <>
                                {/* <IconButton
                                  aria-label="addAdvance"
                                  size="small"
                                  onClick={() => handleOnClickAdv(item.id)}
                                >
                                  <AddchartIcon />
                                </IconButton> */}

                                <Button
                                  variant="text"
                                  size="small"
                                  onClick={() =>
                                    setActiveComment(!activeComment)
                                  }
                                >
                                  {activeComment
                                    ? "Mostrar Avances"
                                    : "Ocultar Avances"}
                                </Button>
                                {/* <IconButton
                                    aria-label="comment"
                                    size="small"
                                    onClick={() =>
                                      setActiveComment(!activeComment)
                                    }
                                  >
                                    {activeComment ? (
                                      <CommentIcon />
                                    ) : (
                                      <CommentsDisabledIcon />
                                    )}
                                  </IconButton> */}
                                {/* {!activeComment && (
                                  <>
                                    <IconButton
                                      aria-label="back"
                                      size="small"
                                      onClick={() => handlePrev(item.id)}
                                    >
                                      <ArrowBackIcon />
                                    </IconButton>
                                    <IconButton
                                      aria-label="forward"
                                      size="small"
                                      onClick={() => handleNext(item.id)}
                                    >
                                      <ArrowForwardIcon />
                                    </IconButton>
                                  </>
                                )} */}
                              </>
                            )}
                          </div>
                          {item.shippables && item.shippables.length > 0 && (
                            <div className="mb-3">
                              <ShippableTable
                                data={item.shippables}
                                idExpectancy={item.id}
                                fases={fases}
                                advance={advance[item?.id]}
                                activeComment={activeComment}
                                handleOnClickAdv={handleOnClickAdv}
                                handleOnClickEditShi={handleOnClickEditShi}
                                handleOnClickEditAdv={handleOnClickEditAdv}
                                handleOnClickDeleteShi={handleOnClickDeleteShi}
                              />
                            </div>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </div>
                </CustomTabPanel>
              ))}
            </Box>
            <Modal open={openHead} onClose={() => setOpenHead(false)}>
              <Box sx={style}>
                <IconButton
                  aria-label="close"
                  size="small"
                  onClick={() => setOpenHead(false)}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <HeadingForm setOpen={setOpenHead} />
              </Box>
            </Modal>
            <Modal open={openExp} onClose={() => setOpenExp(false)}>
              <Box sx={style}>
                <IconButton
                  aria-label="close"
                  size="small"
                  onClick={() => setOpenExp(false)}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <ExpectationForm data={headings} setOpen={setOpenExp} />
              </Box>
            </Modal>
            <Modal open={openPha} onClose={() => setOpenPha(false)}>
              <Box sx={style}>
                <IconButton
                  aria-label="close"
                  size="small"
                  onClick={() => setOpenPha(false)}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <PhaseForm
                  setOpen={setOpenPha}
                  data={updatedMachines}
                  idGrupo={maxIdGrupo?.idGrupo + 1}
                />
              </Box>
            </Modal>
            <Modal open={openShi} onClose={() => setOpenShi(false)}>
              <Box sx={style}>
                <IconButton
                  aria-label="close"
                  size="small"
                  onClick={() => setOpenShi(false)}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <ShippableForm
                  setOpen={setOpenShi}
                  idExpectancy={idExpectancy}
                  editShi={editShi}
                />
              </Box>
            </Modal>
            <Modal open={openAdv} onClose={() => setOpenAdv(false)}>
              <Box sx={style}>
                <IconButton
                  aria-label="close"
                  size="small"
                  onClick={() => setOpenAdv(false)}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <AdvanceForm
                  setOpen={setOpenAdv}
                  idEntregable={changeShi}
                  fases={fasesByidGrupo}
                  editAdv={editAdv}
                />
              </Box>
            </Modal>
            <ShippableAlert
              open={alertShi}
              onClose={() => setAlertShi(false)}
              deleteShi={deleteShi}
              setDeleteShi={setDeleteShi}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Register;
