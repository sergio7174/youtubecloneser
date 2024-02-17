import {createSlice} from "@reduxjs/toolkit";

const initialState = {
      currentVideo: null,
      loading: false,
      error: false,
};

export const videoSlice = createSlice({
      name: "video",
      initialState,
      reducers: {
        fetchStart: (state) => {
            /* Al iniciar la plicacion obtendrás los valores verdaderos. */
            state.loading = true;
        },
        fetchSuccess: (state, action, payload) => {
            /* Si tiene éxito significa que tenemos un usuario.
            El usuario obtendrá una carga falsa. */
            state.loading = false;
            state.currentVideo = action.payload;
        },
        fetchFailure: (state) => {
            /* Se tomarán valores falsos cuando el usuario suba valores. */
            state.loading = false;
            state.error = true;
        },
      }
});

export const {
    fetchStart, 
    fetchSuccess, 
    fetchFailure, 
} = videoSlice.actions;

export default videoSlice.reducer;
