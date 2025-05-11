import { UserSlice_ValueType } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
};

const schoolAdminSlice = createSlice({
  name: "schoolAdmin",
  initialState: initialState,
  reducers: {
    logoutUser: () => initialState,
    setCurrentUser: (state, { payload }: PayloadAction<UserSlice_ValueType>) => ({
      ...payload,
    }),
  },
});

export const { logoutUser, setCurrentUser } = schoolAdminSlice.actions;

export default schoolAdminSlice.reducer;
// Define the type for the entire user store
export const schoolAdminStore = (state: { schoolAdmin: UserSlice_ValueType }) => state.schoolAdmin;
