import { DrawerSlice_ValueType } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: DrawerSlice_ValueType = {
  drawer_name: "",
  drawer_id: "",
  data: {},
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState: initialState,
  reducers: {
    resetDrawer: () => initialState,
    currentDrawer: (
      state,
      { payload }: PayloadAction<DrawerSlice_ValueType>
    ) => ({
      ...state,
      ...payload,
    }),
  },
});

export const { resetDrawer, currentDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
// Define the type for the entire modal store
export const drawerStore = (state: { drawer: any }) => state.drawer;
