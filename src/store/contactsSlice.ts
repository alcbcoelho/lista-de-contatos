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
    },
    {
      id: 2,
      name: 'Shrek',
      email: 'shrek@mail.com',
      phone: '(68) 98414-9005'
    },
    {
      id: 3,
      name: 'Jimmy Neutron',
      email: 'jimmy.neutron@mail.com',
      phone: '(82) 97994-1391'
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
    }
  }
});

export const contactsReducer = contactsSlice.reducer;
export const { addContact, editContact, removeContact } = contactsSlice.actions;
