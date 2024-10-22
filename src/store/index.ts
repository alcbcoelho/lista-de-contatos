import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import { fieldsReducer } from './fieldsSlice';

const store = configureStore({
  reducer: {
    contactList: contactsReducer,
    fields: fieldsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
