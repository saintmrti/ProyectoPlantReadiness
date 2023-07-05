import { useState } from "react";
import { Tabs, Modal, Button, Accordion } from "@rewind-ui/core";
import { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import ExpectationForm from "../components/Forms/ExpectationForm";
import ShippableForm from "../components/Forms/ShippableForm";
import ShippableTable from "../components/Tables/ShippableTable";
import { fetchExpectancyRequest } from "../slices/expectancy";
import { fetchShippableRequest } from "../slices/shippable";
import { groupedByIdField } from "../selectors/expectancy";
import { headingsRequest } from "../slices/headings";

const Home = () => {
  const dispatch = useDispatch();
  const [openExp, setOpenExp] = useState(false);
  const [openShi, setOpenShi] = useState(false);
  const [idExpectancy, setIdExpectancy] = useState(null);

  const data = useSelector(groupedByIdField);

  const { list } = useSelector((state) => state.headings);

  const isFetching = useSelector((state) => state.expectancy.isFetching);
  const didError = useSelector((state) => state.expectancy.didError);

  const handleOnClick = (id) => {
    setIdExpectancy(id);
    setOpenShi(true);
  };

  useEffect(() => {
    dispatch(fetchExpectancyRequest());
    dispatch(fetchShippableRequest());
    dispatch(headingsRequest());
  }, [dispatch]);
  return (
    <>
      <div className="container mx-auto p-4">
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
        {isFetching ? (
          <div>Cargando...</div>
        ) : didError ? (
          <div>Error</div>
        ) : (
          <Tabs defaultTab="tab-1" color="red">
            <Tabs.List>
              {_.map(list, (item, index) => (
                <Tabs.Tab anchor={`tab-${index + 1}`} key={index}>
                  {item.rubro}
                </Tabs.Tab>
              ))}
            </Tabs.List>
            {_.map(list, (item, index) => (
              <Tabs.Content anchor={`tab-${index + 1}`} key={index}>
                <Accordion shadow="base" activeColor="red" shadowColor="gray">
                  {_.map(data[item.id], (item, index) => (
                    <Accordion.Item anchor={`item-${index + 1}`} key={index}>
                      <Accordion.Header>{item.expectativa}</Accordion.Header>
                      <Accordion.Body>
                        <IconButton
                          aria-label="add"
                          size="small"
                          onClick={() => handleOnClick(item.id)}
                        >
                          <AddCircleOutlineIcon />
                        </IconButton>
                        {item.shippables && item.shippables.length > 0 && (
                          <ShippableTable data={item.shippables} />
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Tabs.Content>
            ))}
          </Tabs>
        )}
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
      </div>
    </>
  );
};

export default Home;
