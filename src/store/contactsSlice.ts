import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface initialState {
  items: Contact[];
}

const initialState: initialState = {
  items: [
    {
      id: 1,
      name: 'Fred Flinstone',
      email: 'fred.flinstone@mail.com',
      phone: '(69) 93925-9526'
    }
  ]
};

const contactsSlice = createSlice({
  name: 'contactList',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.items.push(action.payload);
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const index = state.items.findIndex((c) => c.id === action.payload.id);

      state.items[index] = action.payload;
    },
    removeContact: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((c) => c.id !== action.payload);
      //   state.items.splice(action.payload - 1, 1);
    }
  }
});

export const contactsReducer = contactsSlice.reducer;
export const { addContact, editContact, removeContact } = contactsSlice.actions;
