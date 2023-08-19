import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
  name: "setAdvance",
  initialState: {
    responsable: "",
    fecha_inicio: "",
    fecha_termino: "",
    fecha_real: "",
    avance: "",
    comentarios: "",
  },
  reducers: {
    changeAdvance: (state, action) => {
      state.responsable = action.payload.responsable;
      state.fecha_inicio = action.payload.fecha_inicio;
      state.fecha_termino = action.payload.fecha_termino;
      state.fecha_real = action.payload.fecha_real;
      state.avance = action.payload.avance;
      state.comentarios = action.payload.comentarios;
    },
  },
});

export const { changeAdvance } = Slice.actions;
export default Slice.reducer;
