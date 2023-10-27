import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ExpectationForm from "../components/Forms/ExpectationForm";
import ShippableForm from "../components/Forms/ShippableForm";
import PhaseForm from "../components/Forms/PhaseForm";
import AdvanceForm from "../components/Forms/AdvanceForm";
import HeadingForm from "../components/Forms/HeadingForm";
import ProductsForm from "../components/Forms/ProductsForm";
import ShippableTable from "../components/Tables/ShippableTable";
import ProductsTable from "../components/Tables/ProductsTable";
import { fetchExpectancyRequest } from "../slices/expectancy";
import { fetchShippableRequest } from "../slices/shippable";
import { fetchAdvanceRequest } from "../slices/advance";
import { fetchProjectsRequest } from "../slices/projects";
import { fetchHeadingsRequest } from "../slices/headings";
import { fetchMachinesRequest } from "../slices/machines";
import { fetchPhaseRequest } from "../slices/phase";
import { fetchProductsRequest } from "../slices/products";
import { groupedByIdExpectancy } from "../selectors/expectancy";
import { summaryHeadings } from "../selectors/headings";
import { summaryAdvanced } from "../selectors/advance";
import { summaryMachines } from "../selectors/machines";
import { summaryProducts } from "../selectors/products";
import { getProject } from "../selectors/projects";
import { CustomTabPanel, a11yProps } from "../components/Tabs/CustomTabPanel";
import { Spinner } from "../components/Spinner";
import { Error } from "../components/Error";
import { Toggle } from "../components/Toggle";
import { ShippableAlert } from "../components/Alert/ShippableAlert";
import { ExpectancyAlert } from "../components/Alert/ExpectancyAlert";
import { AdvanceAlert } from "../components/Alert/AdvanceAlert";
import { HeadingsAlert } from "../components/Alert/HeadingsAlert";
import { PhaseAlert } from "../components/Alert/PhaseAlert";
import { ProductsAlert } from "../components/Alert/ProductsAlert";

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
  const navigate = useNavigate();
  const theme = useTheme();
  const { idProyecto } = useParams();

  const [openExp, setOpenExp] = useState(false);
  const [openShi, setOpenShi] = useState(false);
  const [openPha, setOpenPha] = useState(false);
  const [openAdv, setOpenAdv] = useState(false);
  const [openHead, setOpenHead] = useState(false);
  const [openProd, setOpenProd] = useState(false);
  const [idExpectancy, setIdExpectancy] = useState(null);
  const [activeComment, setActiveComment] = useState(true);
  const [changeShi, setChangeShi] = useState(null);
  const [editShi, setEditShip] = useState(null);
  const [editAdv, setEditAdv] = useState(null);
  const [editExp, setEditExp] = useState(null);
  const [editHead, setEditHead] = useState(null);
  const [editPha, setEditPha] = useState(null);
  const [editProd, setEditProd] = useState(null);
  const [deleteShi, setDeleteShi] = useState(null);
  const [deleteExp, setDeleteExp] = useState(null);
  const [deleteHead, setDeleteHead] = useState(null);
  const [deletePha, setDeletePha] = useState(null);
  const [deleteProd, setDeleteProd] = useState(null);
  const [alertShi, setAlertShi] = useState(false);
  const [alertExp, setAlertExp] = useState(false);
  const [alertHead, setAlertHead] = useState(false);
  const [alertAdv, setAlertAdv] = useState(false);
  const [alertPha, setAlertPha] = useState(false);
  const [alertProd, setAlertProd] = useState(false);
  const [selectedPhases, setSelectedPhases] = useState(null);
  const [tooling, setTooling] = useState(false);

  const expectancy = useSelector(groupedByIdExpectancy);
  const advance = useSelector(summaryAdvanced);
  const headings = useSelector(summaryHeadings);
  const machines = useSelector(summaryMachines);
  const products = useSelector(summaryProducts);
  const project = useSelector((state) => getProject(state, idProyecto));
  const { list: phases } = useSelector((state) => state.phase);
  const { isFetching, didError } = useSelector((state) => state.advance);
  const { tokenData } = useSelector((state) => state.auth);
  const arrayPhases = _.values(phases);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOnClickShi = (id) => {
    setIdExpectancy(id);
    setEditShip(null);
    setOpenShi(true);
  };

  const handleOnClickExp = () => {
    setEditExp(null);
    setOpenExp(true);
  };

  const handleOnClickHead = () => {
    setEditHead(null);
    setOpenHead(true);
  };

  const handleOnClickPha = () => {
    setEditPha(null);
    setOpenPha(true);
  };

  const handleOnClickProd = () => {
    setEditProd(null);
    setTooling(false);
    setOpenProd(true);
  };

  const handleOnClickTool = () => {
    setEditProd(null);
    setTooling(true);
    setOpenProd(true);
  };

  const handleOnClickAdv = (id, advance) => {
    setChangeShi(id);
    setEditAdv(null);
    if (advance && advance[id] && advance[id].length > 0) {
      const arrayAdv = advance[id];
      const removePhase = arrayPhases.filter(
        (fase) =>
          !arrayAdv.some((advanceItem) => advanceItem.idFase === fase.id)
      );
      if (removePhase.length > 0) {
        setSelectedPhases(removePhase);
        setOpenAdv(true);
      } else {
        setSelectedPhases(null);
        setAlertAdv(true);
      }
    } else {
      setSelectedPhases(arrayPhases);
      setOpenAdv(true);
    }
  };

  const handleOnClickEditShi = (id) => {
    setEditShip(id);
    setOpenShi(true);
  };

  const handleOnClickEditExp = (id) => {
    setEditExp(id);
    setOpenExp(true);
  };

  const handleOnClickEditAdv = (id) => {
    setEditAdv(id);
    setOpenAdv(true);
  };

  const handleOnClickEditHead = (id) => {
    setEditHead(id);
    setOpenHead(true);
  };

  const handleOnClickEditPha = (id) => {
    setEditPha(id);
    setOpenPha(true);
  };

  const handleOnClickEditProd = (id, isTooling) => {
    setEditProd(id);
    isTooling ? setTooling(true) : setTooling(false);
    setOpenProd(true);
  };

  const handleOnClickDeleteShi = (id) => {
    setDeleteShi(id);
    setAlertShi(true);
  };

  const handleOnClickDeleteExp = (id) => {
    setDeleteExp(id);
    setAlertExp(true);
  };

  const handleOnClickDeleteHead = (id) => {
    setDeleteHead(id);
    setAlertHead(true);
  };

  const handleOnClickDeletePha = (id) => {
    setDeletePha(id);
    setAlertPha(true);
  };

  const handleOnClickDeleteProd = (id) => {
    setDeleteProd(id);
    setAlertProd(true);
  };

  useEffect(() => {
    dispatch(fetchProjectsRequest());
    dispatch(fetchPhaseRequest({ idProyecto }));
    dispatch(fetchMachinesRequest({ idProyecto }));
    dispatch(fetchShippableRequest({ idProyecto }));
    dispatch(fetchExpectancyRequest({ idProyecto }));
    dispatch(fetchHeadingsRequest({ idProyecto }));
    dispatch(fetchAdvanceRequest({ idProyecto }));
    dispatch(fetchProductsRequest({ idProyecto }));
  }, [dispatch, idProyecto]);
  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : didError ? (
        <Error />
      ) : (
        <>
          <div className="flex flex-col items-center mb-2">
            <h1 className="text-3xl font-bold text-center">
              {project?.nombre}
            </h1>
            <div
              className="w-full h-1 bg-gradient-to-r from-transparent to-transparent"
              style={{ backgroundColor: theme.palette.primary.main }}
            ></div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              {tokenData?.n_pr === 2 && (
                <div className="flex">
                  <div className="mr-5">
                    <Button variant="contained" onClick={handleOnClickHead}>
                      Agregar rubro
                    </Button>
                  </div>
                  <div className="mr-5">
                    <Button variant="contained" onClick={handleOnClickExp}>
                      Agregar expectativa
                    </Button>
                  </div>
                  <div>
                    <Button variant="contained" onClick={handleOnClickPha}>
                      Agregar fase
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center">
              {tokenData?.n_pr === 2 && (
                <div className="mr-5">
                  <Button
                    variant="contained"
                    onClick={() =>
                      navigate(`/proyectos/${idProyecto}/usuarios`)
                    }
                  >
                    Champions
                  </Button>
                </div>
              )}
              <div className="mr-5">
                <Button variant="contained" onClick={() => navigate("/")}>
                  Proyectos
                </Button>
              </div>
              <Toggle idProyecto={idProyecto} />
            </div>
          </div>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange}>
                {_.map(headings, (item, index) => (
                  <Tab
                    key={item.id}
                    label={item.rubro}
                    {...a11yProps(parseInt(index))}
                  />
                ))}
                {tokenData?.n_pr === 2 && (
                  <Tab
                    label="Herramental"
                    {...a11yProps(headings.length || 0)}
                  />
                )}
                {tokenData?.n_pr === 2 && (
                  <Tab
                    label="Productos Commissioning"
                    {...a11yProps(headings.length + 1 || 0)}
                  />
                )}
              </Tabs>
            </Box>
            {_.map(headings, (rubro, index) => (
              <CustomTabPanel
                value={value}
                key={rubro.id}
                index={parseInt(index)}
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
                        <div className="flex justify-between mb-2">
                          <div>
                            {tokenData?.n_pr === 2 && (
                              <div className="flex">
                                <IconButton
                                  aria-label="add"
                                  size="small"
                                  onClick={() => handleOnClickEditExp(item.id)}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="add"
                                  size="small"
                                  onClick={() =>
                                    handleOnClickDeleteExp(item.id)
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </div>
                            )}
                          </div>
                          <div className="flex">
                            {tokenData?.n_pr === 2 && (
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleOnClickShi(item.id)}
                                sx={{ mr: 1 }}
                              >
                                Agregar Entregable
                              </Button>
                            )}
                            {item.shippables &&
                              item.shippables.length > 0 &&
                              Object.keys(machines).length > 0 && (
                                <>
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
                                </>
                              )}
                          </div>
                        </div>
                        {item.shippables && item.shippables.length > 0 && (
                          <div className="mb-3">
                            <ShippableTable
                              data={item.shippables}
                              idExpectancy={item.id}
                              machines={machines}
                              advance={advance[item?.id]}
                              activeComment={activeComment}
                              setActiveComment={setActiveComment}
                              handleOnClickAdv={handleOnClickAdv}
                              handleOnClickEditShi={handleOnClickEditShi}
                              handleOnClickEditAdv={handleOnClickEditAdv}
                              handleOnClickDeleteShi={handleOnClickDeleteShi}
                              handleOnClickEditPha={handleOnClickEditPha}
                              handleOnClickDeletePha={handleOnClickDeletePha}
                              tokenData={tokenData}
                            />
                          </div>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                  {tokenData?.n_pr === 2 && (
                    <div className="flex justify-end mt-3">
                      <Button
                        variant="outlined"
                        onClick={() => handleOnClickEditHead(rubro.id)}
                        sx={{ mr: 1 }}
                      >
                        Editar Rubro
                      </Button>
                      <Button
                        variant="text"
                        onClick={() => handleOnClickDeleteHead(rubro.id)}
                      >
                        Eliminar Rubro
                      </Button>
                    </div>
                  )}
                </div>
              </CustomTabPanel>
            ))}
            {tokenData?.n_pr === 2 && (
              <CustomTabPanel value={value} index={headings.length || 0}>
                <div className="flex justify-end">
                  <Button variant="contained" onClick={handleOnClickTool}>
                    Nueva Maquina
                  </Button>
                </div>
                <div>
                  {_.isEmpty(products) ? (
                    <div></div>
                  ) : (
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mt-5">
                      {_.map(products?.productsHerramental, (item, index) => (
                        <ProductsTable
                          key={index}
                          idMaquina={index}
                          data={item}
                          handleOnClickEditProd={handleOnClickEditProd}
                          handleOnClickDeleteProd={handleOnClickDeleteProd}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </CustomTabPanel>
            )}
            {tokenData?.n_pr === 2 && (
              <CustomTabPanel value={value} index={headings.length + 1 || 0}>
                <div className="flex justify-end">
                  <Button variant="contained" onClick={handleOnClickProd}>
                    Nueva Maquina
                  </Button>
                </div>
                <div>
                  {_.isEmpty(products) ? (
                    <div></div>
                  ) : (
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mt-5">
                      {_.map(products?.productsMts, (item, index) => (
                        <ProductsTable
                          key={index}
                          idMaquina={index}
                          data={item}
                          handleOnClickEditProd={handleOnClickEditProd}
                          handleOnClickDeleteProd={handleOnClickDeleteProd}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </CustomTabPanel>
            )}
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
              <HeadingForm
                setOpen={setOpenHead}
                editHead={editHead}
                idProyecto={idProyecto}
              />
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
              <ExpectationForm
                data={headings}
                setOpen={setOpenExp}
                editExp={editExp}
                idProyecto={idProyecto}
              />
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
                idProyecto={idProyecto}
                editPha={editPha}
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
                idProyecto={idProyecto}
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
                phases={selectedPhases}
                editAdv={editAdv}
                idProyecto={idProyecto}
              />
            </Box>
          </Modal>
          <Modal open={openProd} onClose={() => setOpenProd(false)}>
            <Box sx={style}>
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => setOpenProd(false)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
              <ProductsForm
                setOpen={setOpenProd}
                editProd={editProd}
                idProyecto={idProyecto}
                tooling={tooling}
              />
            </Box>
          </Modal>
          <ShippableAlert
            open={alertShi}
            onClose={() => setAlertShi(false)}
            deleteShi={deleteShi}
            setDeleteShi={setDeleteShi}
          />
          <ExpectancyAlert
            open={alertExp}
            onClose={() => setAlertExp(false)}
            deleteExp={deleteExp}
            setDeleteExp={setDeleteExp}
          />
          <HeadingsAlert
            open={alertHead}
            onClose={() => setAlertHead(false)}
            deleteHead={deleteHead}
            setDeleteHead={setDeleteHead}
            setValue={setValue}
          />
          <AdvanceAlert open={alertAdv} setOpen={setAlertAdv} />
          <PhaseAlert
            open={alertPha}
            onClose={() => setAlertPha(false)}
            deletePha={deletePha}
            setDeletePha={setDeletePha}
          />
          <ProductsAlert
            open={alertProd}
            onClose={() => setAlertProd(false)}
            deleteProd={deleteProd}
            setDeleteProd={setDeleteProd}
          />
        </>
      )}
    </>
  );
};

export default Register;
