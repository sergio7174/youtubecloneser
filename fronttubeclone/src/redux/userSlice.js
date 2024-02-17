import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    /* El estado del usuario es 0' como valor inicial. */
    currentUser: null,
    /* El estado de carga será inicialmente falso, devolverá verdadero al iniciar sesión */
    loading: false,
    /* Si hay un error, el valor del error volverá a ser verdadero. ,*/
    error: false
};

export const userSlice = createSlice({
      name: 'user',
      initialState,
      reducers: {
        /* Reducers */
        loginStart: (state) => {
            /* El valor verdadero se establecerá cuando se inicie la aplicación. ,*/
            state.loading = true;
        },
        // Nuestros reducers reciben el estado actual y la información de action.
        // contiene el payload.
        loginSuccess: (state, action, payload) => {
            /* Si tiene éxito significa que tenemos un usuario.
            El usuario obtendrá una carga falsa.  */
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
           /* Se tomarán valores falsos cuando el usuario suba valores. */
            state.loading = false;
            state.error = true;
        },
        logout: (state)=> {
           /* El valor del estado inicial estará activo en el proceso de cierre de sesión. */
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        }
      }
});

/* createAction() permite exportar acciones, uso alternativo `export const {} = slice.actions` 'dur */
export const {
    loginStart, 
    loginSuccess, 
    loginFailure, 
    logout
} = userSlice.actions;

export default userSlice.reducer;

/* createReducer() Permite exportar los reductores.*/