import { useState } from "react";
import { useEffect } from "react";

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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CommentIcon from "@mui/icons-material/Comment";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import AddchartIcon from "@mui/icons-material/Addchart";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import ExpectationForm from "../components/Forms/ExpectationForm";
import ShippableForm from "../components/Forms/ShippableForm";
import PhaseForm from "../components/Forms/PhaseForm";
import AdvanceForm from "../components/Forms/AdvanceForm";
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

const Dashboard = () => {
  const dispatch = useDispatch();
  const [openExp, setOpenExp] = useState(false);
  const [openShi, setOpenShi] = useState(false);
  const [openPha, setOpenPha] = useState(false);
  const [openAdv, setOpenAdv] = useState(false);
  const [idExpectancy, setIdExpectancy] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [activeComment, setActiveComment] = useState(true);
  const [changeShi, setChangeShi] = useState([]);

  const expectancy = useSelector(groupedByIdExpectancy);
  const advance = useSelector(summaryAdvanced);
  const { list: headings } = useSelector((state) => state.headings);
  const { list: machines } = useSelector((state) => state.machines);
  const { data: shippables } = useSelector((state) => state.shippable);
  const { list: fases } = useSelector((state) => state.phase);
  const { isFetching, didError } = useSelector((state) => state.expectancy);

  const fasesByidGrupo = _.uniqBy(_.values(fases), "idGrupo");
  const maxIdGrupo = _.maxBy(_.values(fases), "idGrupo");

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === _.size(fases) ? 1 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 1 ? _.size(fases) : prevIndex - 1
    );
  };

  const handleOnClickShi = (id) => {
    setIdExpectancy(id);
    setOpenShi(true);
  };

  const handleOnClickAdv = (id) => {
    const arrayShippable = _.filter(
      shippables,
      (item) => item.idExpectativa === id
    );
    setChangeShi(arrayShippable);
    setOpenAdv(true);
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
      <div className="container mx-auto p-4">
        {isFetching ? (
          <div>Cargando...</div>
        ) : didError ? (
          <div>Error</div>
        ) : (
          <>
            <div className="flex flex-col items-center mb-6">
              <h1 className="text-3xl font-bold text-center">
                Plant Readiness
              </h1>
              <div className="w-2/3 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
            </div>
            <div className="flex mb-3">
              <div className="mr-2">
                <Button variant="contained" onClick={() => setOpenExp(true)}>
                  Agregar expectativa
                </Button>
              </div>
              <Button variant="contained" onClick={() => setOpenPha(true)}>
                Agregar fase
              </Button>
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
                          <div className="flex">
                            <IconButton
                              aria-label="add"
                              size="small"
                              onClick={() => handleOnClickShi(item.id)}
                            >
                              <AddCircleOutlineIcon />
                            </IconButton>
                            {item.shippables && item.shippables.length > 0 && (
                              <>
                                <IconButton
                                  aria-label="addAdvance"
                                  size="small"
                                  onClick={() => handleOnClickAdv(item.id)}
                                >
                                  <AddchartIcon />
                                </IconButton>
                                <div className="flex ml-auto">
                                  <IconButton
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
                                  </IconButton>
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
                                </div>
                              </>
                            )}
                          </div>
                          {item.shippables && item.shippables.length > 0 && (
                            <div className="mb-5">
                              <ShippableTable
                                data={item.shippables}
                                fases={fases}
                                activeIndex={activeIndex}
                                advance={advance[item?.id]}
                                activeComment={activeComment}
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
            <Modal open={openExp} onClose={() => setOpenExp(false)}>
              <Box sx={style}>
                <ExpectationForm data={headings} setOpen={setOpenExp} />
              </Box>
            </Modal>
            <Modal open={openPha} onClose={() => setOpenPha(false)}>
              <Box sx={style}>
                <PhaseForm
                  setOpen={setOpenPha}
                  data={machines}
                  idGrupo={maxIdGrupo?.idGrupo + 1}
                />
              </Box>
            </Modal>
            <Modal open={openShi} onClose={() => setOpenShi(false)}>
              <Box sx={style}>
                <ShippableForm
                  setOpen={setOpenShi}
                  idExpectancy={idExpectancy}
                />
              </Box>
            </Modal>
            <Modal open={openAdv} onClose={() => setOpenAdv(false)}>
              <Box sx={style}>
                <AdvanceForm
                  setOpen={setOpenAdv}
                  data={changeShi}
                  fases={fasesByidGrupo}
                />
              </Box>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
