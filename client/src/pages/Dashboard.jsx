import { useState } from "react";
import { Tabs, Modal, Accordion } from "@rewind-ui/core";
import { useEffect } from "react";
import Button from "@mui/material/Button";
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
              <h1 className="text-2xl font-bold text-gray-800 text-center">
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
            <Tabs
              defaultTab="tab-1"
              color="black"
              radius="md"
              tone="pill"
              fullWidth={true}
            >
              <Tabs.List>
                {_.map(headings, (item, index) => (
                  <Tabs.Tab anchor={`tab-${index}`} key={index}>
                    {item.rubro}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
              {_.map(headings, (rubro, index) => (
                <Tabs.Content anchor={`tab-${index}`} key={index}>
                  <Accordion shadow="lg" activeColor="red">
                    {_.map(expectancy[rubro.id], (item, index) => (
                      <Accordion.Item anchor={`item-${index}`} key={index}>
                        <Accordion.Header>{item.expectativa}</Accordion.Header>
                        <Accordion.Body>
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
                            <ShippableTable
                              data={item.shippables}
                              fases={fases}
                              activeIndex={activeIndex}
                              advance={advance[item?.id]}
                              activeComment={activeComment}
                            />
                          )}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Tabs.Content>
              ))}
            </Tabs>
            <Modal
              position="center"
              radius="lg"
              open={openExp}
              onClose={() => setOpenExp(false)}
            >
              <ExpectationForm data={headings} setOpen={setOpenExp} />
            </Modal>
            <Modal
              position="center"
              radius="lg"
              open={openPha}
              onClose={() => setOpenPha(false)}
            >
              <PhaseForm
                setOpen={setOpenPha}
                data={machines}
                idGrupo={maxIdGrupo?.idGrupo + 1}
              />
            </Modal>
            <Modal
              radius="lg"
              position="center"
              open={openShi}
              onClose={() => setOpenShi(false)}
            >
              <ShippableForm setOpen={setOpenShi} idExpectancy={idExpectancy} />
            </Modal>
            <Modal
              position="center"
              radius="lg"
              open={openAdv}
              onClose={() => setOpenAdv(false)}
            >
              <AdvanceForm
                setOpen={setOpenAdv}
                data={changeShi}
                fases={fasesByidGrupo}
              />
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
