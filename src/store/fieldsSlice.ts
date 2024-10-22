import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface initialState {
  registration: {
    [fieldId: string]: string;
  };
  edition: {
    [fieldId: string]: string;
  };
}

const initialState: initialState = {
  registration: {
    name: '',
    email: '',
    phone: ''
  },
  edition: {
    name: '',
    email: '',
    phone: ''
  }
};

const fieldsSlice = createSlice({
  name: 'registrationFields',
  initialState,
  reducers: {
    changeValue: (
      state,
      {
        payload: { operation, fieldId, fieldValue }
      }: PayloadAction<{
        operation: 'registration' | 'edition';
        fieldId: string;
        fieldValue: string;
      }>
    ) => {
      state[operation][fieldId] = fieldValue;
    }
  }
});

export const fieldsReducer = fieldsSlice.reducer;
export const { changeValue } = fieldsSlice.actions;
