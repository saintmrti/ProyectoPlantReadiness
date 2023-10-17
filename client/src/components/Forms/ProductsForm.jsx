import { useEffect, useState } from "react";
import _ from "lodash";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";

import {
  insertProductsRequest,
  updateProductsRequest,
} from "../../slices/products";
import { textFieldValidation } from "./validated";
import { getMachine } from "../../selectors/products";

const ProductsForm = ({ setOpen, editProd, idProyecto }) => {
  const dispatch = useDispatch();
  const machine = useSelector((state) => getMachine(state, editProd));
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    producto: "",
    mts: 0,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddProduct = () => {
    setProducts([...products, newProduct]);
    setNewProduct({
      producto: "",
      mts: 0,
    });
  };

  const onSubmit = (values) => {
    const machine = {
      ...values,
      products,
      idProyecto,
      idMaquina: editProd,
    };
    editProd
      ? dispatch(updateProductsRequest(machine))
      : dispatch(insertProductsRequest(machine));
    setOpen(false);
  };

  useEffect(() => {
    if (editProd) {
      setProducts(
        _.map(machine, (item) => ({
          producto: item.producto,
          mts: item.mts_fabricar,
        }))
      );
      reset({
        maquina: machine[0]?.nombre,
      });
    }
  }, [editProd, machine, reset]);

  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center items-center flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-3 w-full text-center">
          {editProd ? "Editar Maquina" : "Nueva Maquina"}
        </h1>
        <div className="flex justify-center items-center w-full mt-5">
          <TextField
            sx={{ width: "15rem" }}
            type="text"
            label="Maquina"
            autoComplete="off"
            error={Boolean(errors.maquina)}
            defaultValue={machine[0]?.nombre || ""}
            helperText={errors.maquina?.message}
            {...register("maquina", {
              required: true,
              validate: (value) => textFieldValidation(value, 40),
            })}
          />
        </div>
        <div className="flex items-center justify-between w-full mt-5">
          <div className="text-lg">Agregar productos</div>
          <Button variant="text" onClick={handleAddProduct}>
            Agregar
          </Button>
        </div>
        <div className="max-h-72 overflow-y-auto">
          {products.map((producto, index) => (
            <div
              className="flex justify-between items-center my-4 w-full"
              key={index}
            >
              <TextField
                sx={{ width: "15rem", mr: 2 }}
                type="text"
                label="Producto"
                autoComplete="off"
                value={producto.producto}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setProducts((prevProductos) =>
                    prevProductos.map((p, i) =>
                      i === index ? { ...p, producto: newValue } : p
                    )
                  );
                }}
              />
              <TextField
                sx={{ width: "15rem" }}
                type="number"
                label="Mts a fabricar"
                autoComplete="off"
                value={producto.mts}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setProducts((prevProductos) =>
                    prevProductos.map((p, i) =>
                      i === index ? { ...p, mts: newValue } : p
                    )
                  );
                }}
              />
              <IconButton
                aria-label="Eliminar"
                onClick={() => {
                  setProducts((prevProductos) =>
                    prevProductos.filter((p, i) => i !== index)
                  );
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center mt-5">
          <Button
            variant="contained"
            type="submit"
            disabled={products.length > 0 ? false : true}
          >
            {editProd ? "Actualizar" : "Guardar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductsForm;
