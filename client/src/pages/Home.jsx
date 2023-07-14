import { useState } from "react";
import { Tabs, Modal, Button, Accordion } from "@rewind-ui/core";
import { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import ExpectationForm from "../components/Forms/ExpectationForm";
import ShippableForm from "../components/Forms/ShippableForm";
import ShippableTable from "../components/Tables/ShippableTable";
// import AdvanceTable from "../components/Tables/AdvanceTable";
import { fetchExpectancyRequest } from "../slices/expectancy";
import { fetchShippableRequest } from "../slices/shippable";
import { fetchAdvanceRequest } from "../slices/advance";
import { groupedByIdField } from "../selectors/expectancy";
import { summaryAdvanced } from "../selectors/advance";
import { headingsRequest } from "../slices/headings";
import { fases } from "../components/Tables/data";

const Home = () => {
  const dispatch = useDispatch();
  const [openExp, setOpenExp] = useState(false);
  const [openShi, setOpenShi] = useState(false);
  const [idExpectancy, setIdExpectancy] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const data = useSelector(groupedByIdField);
  const advance = useSelector(summaryAdvanced);
  const { list } = useSelector((state) => state.headings);

  const isFetching = useSelector((state) => state.expectancy.isFetching);
  const didError = useSelector((state) => state.expectancy.didError);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === 11 - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? 11 - 1 : prevIndex - 1));
  };

  const handleOnClick = (id) => {
    setIdExpectancy(id);
    setOpenShi(true);
  };

  useEffect(() => {
    dispatch(fetchExpectancyRequest());
    dispatch(fetchShippableRequest());
    dispatch(fetchAdvanceRequest());
    dispatch(headingsRequest());
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
            <Button
              color="blue"
              shadow="md"
              className="mb-3"
              onClick={() => setOpenExp(true)}
            >
              Agregar expectativa
            </Button>
            <Tabs defaultTab="tab-1" color="red">
              <Tabs.List>
                {_.map(list, (item, index) => (
                  <Tabs.Tab anchor={`tab-${index + 1}`} key={index}>
                    {item.rubro}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
              {_.map(list, (rubro, index) => (
                <Tabs.Content anchor={`tab-${index + 1}`} key={index}>
                  <Accordion shadow="base" activeColor="red" shadowColor="gray">
                    {_.map(data[rubro.id], (item, index) => (
                      <Accordion.Item anchor={`item-${index + 1}`} key={index}>
                        <Accordion.Header>{item.expectativa}</Accordion.Header>
                        <Accordion.Body>
                          <div className="flex">
                            <IconButton
                              aria-label="add"
                              size="small"
                              onClick={() => handleOnClick(item.id)}
                            >
                              <AddCircleOutlineIcon />
                            </IconButton>
                            <div className="flex ml-auto">
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
                          </div>
                          {item.shippables && item.shippables.length > 0 && (
                            <ShippableTable
                              data={item.shippables}
                              fases={fases}
                              activeIndex={activeIndex}
                              advance={advance[item.id]}
                            />
                          )}
                          {/* <div className="flex overflow-x-auto">
                            {_.map(advance[1], (item) => (
                              <div key={item.id} style={{ minWidth: "700px" }}>
                                <AdvanceTable data={item} />
                              </div>
                            ))}
                          </div> */}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Tabs.Content>
              ))}
            </Tabs>
            <Modal
              position="center"
              size="md"
              open={openExp}
              onClose={() => setOpenExp(false)}
            >
              <ExpectationForm data={list} setOpen={setOpenExp} />
            </Modal>
            <Modal size="md" open={openShi} onClose={() => setOpenShi(false)}>
              <ShippableForm setOpen={setOpenShi} idExpectancy={idExpectancy} />
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
