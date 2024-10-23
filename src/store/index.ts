import { configureStore } from '@reduxjs/toolkit';

import { contactsReducer } from './contactsSlice';
import { fieldsReducer } from './fieldsSlice';
import { snackbarReducer } from './snackbarSlice';

const store = configureStore({
  reducer: {
    contactList: contactsReducer,
    fields: fieldsReducer,
    snackbar: snackbarReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
