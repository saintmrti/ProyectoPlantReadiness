import { useState } from "react";
import { Tabs, Modal, Button, Accordion } from "@rewind-ui/core";
import { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import ExpectationForm from "../components/Forms/ExpectationForm";
import ShippableForm from "../components/Forms/ShippableForm";
import ShippableTable from "../components/ShippableTable";
import { expectativas } from "../components/ShippableTable/data";
import { fetchExpectancyRequest } from "../slices/expectancy";
import { groupedByIdField } from "../selectors/expectancy";

const Home = () => {
  const dispatch = useDispatch();
  const [openExp, setOpenExp] = useState(false);
  const [openShi, setOpenShi] = useState(false);

  const list = useSelector(groupedByIdField);

  useEffect(() => {
    dispatch(fetchExpectancyRequest());
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
        <Tabs defaultTab="item-1" color="red">
          <Tabs.List>
            <Tabs.Tab anchor="tab-1">Seguridad</Tabs.Tab>
            <Tabs.Tab anchor="tab-2">Calidad</Tabs.Tab>
            <Tabs.Tab anchor="tab-3">RH</Tabs.Tab>
            <Tabs.Tab anchor="tab-4">Producción</Tabs.Tab>
            <Tabs.Tab anchor="tab-5">Mantenimiento</Tabs.Tab>
          </Tabs.List>
          <Tabs.Content anchor="tab-1">
            <Accordion
              defaultItem="item-1"
              bordered={false}
              shadow="base"
              activeColor="red"
              shadowColor="gray"
            >
              {_.map(list["1"], (item, index) => (
                <Accordion.Item anchor={`item-${index + 1}`} key={index}>
                  <Accordion.Header>{item.expectativa}</Accordion.Header>
                  <Accordion.Body>
                    <IconButton
                      aria-label="add"
                      size="small"
                      onClick={() => setOpenShi(true)}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <ShippableTable data={expectativas} />
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Tabs.Content>
          <Tabs.Content anchor="tab-2">Content B</Tabs.Content>
          <Tabs.Content anchor="tab-3">Content C</Tabs.Content>
          <Tabs.Content anchor="tab-4">Content D</Tabs.Content>
          <Tabs.Content anchor="tab-5">Content E</Tabs.Content>
        </Tabs>
        <Modal
          position="center"
          size="md"
          open={openExp}
          onClose={() => setOpenExp(false)}
        >
          <ExpectationForm />
        </Modal>
        <Modal size="md" open={openShi} onClose={() => setOpenShi(false)}>
          <ShippableForm />
        </Modal>
      </div>
    </>
  );
};

export default Home;
