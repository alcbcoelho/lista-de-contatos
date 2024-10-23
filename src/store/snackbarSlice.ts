import { createSlice } from '@reduxjs/toolkit';

interface initialState {
  isFadedOut: boolean;
  isActive: boolean;
}

const initialState: initialState = {
  isFadedOut: false,
  isActive: false
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    fadeOut: (state) => {
      state.isFadedOut = true;
    },
    activate: (state) => {
      state.isActive = true;
    },
    resetToInitialState: (state) => {
      state.isFadedOut = false;
      state.isActive = false;
    }
  }
});

export const snackbarReducer = snackbarSlice.reducer;
export const { fadeOut, activate, resetToInitialState } = snackbarSlice.actions;
