import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
  name: "setAdvance",
  initialState: {
    responsible: "",
    startDate: "",
    endDate: "",
    realDate: "",
    advance: "",
    comments: "",
  },
  reducers: {
    changeAdvance: (state, action) => {
      state.responsible = action.payload.responsible;
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      state.realDate = action.payload.realDate;
      state.advance = action.payload.advance;
      state.comments = action.payload.comments;
    },
  },
});

export const { changeAdvance } = Slice.actions;
export default Slice.reducer;
