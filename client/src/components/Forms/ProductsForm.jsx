import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";

import {
  insertHeadingsRequest,
  updateHeadingsRequest,
} from "../../slices/headings";
import { textFieldValidation } from "./validated";
import { getHeading } from "../../selectors/headings";

const ProductsForm = ({ setOpen, editHead, idProyecto }) => {
  const dispatch = useDispatch();
  const heading = useSelector((state) => getHeading(state, editHead));
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
    editHead
      ? dispatch(updateHeadingsRequest({ ...values, id: editHead }))
      : dispatch(insertHeadingsRequest({ ...values, idProyecto }));
    setOpen(false);
  };

  useEffect(() => {
    heading && reset(heading);
  }, [heading, reset]);

  return (
    <div className="max-w-lg">
      <form
        className="flex justify-center items-center flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl mb-3 w-full text-center">
          {editHead ? "Editar Maquina" : "Nueva Maquina"}
        </h1>
        <div className="flex justify-center items-center w-full mt-5">
          <TextField
            sx={{ width: "15rem" }}
            type="text"
            label="Maquina"
            autoComplete="off"
            error={Boolean(errors.name)}
            defaultValue={heading?.rubro || ""}
            helperText={errors.name?.message}
            {...register("name", {
              required: true,
              validate: (value) => textFieldValidation(value, 25),
            })}
          />
        </div>
        {console.log(products)}
        <div className="flex items-center justify-between w-full mt-5">
          <div className="text-lg">Agregar productos</div>
          <Button variant="text" onClick={handleAddProduct}>
            Agregar
          </Button>
        </div>
        {products.map((producto, index) => (
          <div
            className="flex justify-between items-center my-2 w-full"
            key={index}
          >
            <TextField
              sx={{ width: "15rem" }}
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
          </div>
        ))}
        <div className="w-full flex justify-center mt-5">
          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductsForm;
