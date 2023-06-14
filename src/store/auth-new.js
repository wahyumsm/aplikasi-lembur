import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roleList: {},
  user: {},
  token: "",
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateRoleList: (state, payload) => {
      state = {
        // ... artinya kita menyalin nilai lama kedalam object state
        ...state,
        roleList: payload,
      };
    },
    updateUser: (state, payload) => {
      state = {
        // ... artinya kita menyalin nilai lama kedalam object state
        ...state,
        user: payload,
      };
    },
    updateToken: (state, payload) => {
      state = {
        // ... artinya kita menyalin nilai lama kedalam object state
        ...state,
        token: payload,
      };
    },
  },
});
export const { updateRoleList, updateUser, updateToken } = auth.actions;
export default auth.reducer;
