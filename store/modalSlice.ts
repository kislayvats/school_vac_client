import { ModalSlice_ValueType } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define the initial state for the modal slice
const initialState: ModalSlice_ValueType = {
  modal_name: "",
  modal_id: "",
  data: {},
};

// Define the modal slice
const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    resetModal: () => initialState,
    currentModal: (
      state,
      { payload }: PayloadAction<ModalSlice_ValueType>
    ) => ({
      ...state,
      ...payload,
    }),
  },
});

export const { resetModal, currentModal } = modalSlice.actions;

export default modalSlice.reducer;
// Define the type for the entire modal store
export const modalStore = (state: { modal: any }) => state.modal;
