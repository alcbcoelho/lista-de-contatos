import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import Input from './Input';
import { RootState } from '../store';
import { editContact, removeContact } from '../store/contactsSlice';
import { changeValue } from '../store/fieldsSlice';
import { inputs } from '../utils/data';

const ContactStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.125);

  li:first-child {
    font-size: 1.25rem;
    font-weight: bold;
  }
`;

const InputContainer = styled.div`
  display: block;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 4px;

  button {
    cursor: pointer;
  }
`;

type ContactProps = Contact;

export default function Contact({ id, name, email, phone }: ContactProps) {
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const dispatch = useDispatch();
  const contact = useSelector(
    (state: RootState) => state.contactList.items[id - 1]
  );
  const editedFields = useSelector((state: RootState) => state.fields.edition);

  const handleSave = () => {
    const { name, email, phone } = editedFields;

    dispatch(
      editContact({
        id,
        name,
        email,
        phone
      })
    );

    setEditingMode(false);
  };

  const handleEdit = () => {
    inputs.forEach(({ id: inputId }) => {
      dispatch(
        changeValue({
          operation: 'edition',
          fieldId: inputId,
          fieldValue: contact[inputId as 'name' | 'email' | 'phone']
        })
      );
    });
    setEditingMode(true);
  };

  const handleRemoveContact = () => {
    dispatch(removeContact(id));
  };

  const propsToRender = [name, email, phone];

  return (
    <ContactStyle>
      {editingMode ? (
        <InputContainer>
          {inputs.map((i) => (
            <Input key={i.id} {...i} operation="edition" />
          ))}
        </InputContainer>
      ) : (
        <ul>
          {propsToRender.map((prop, index) => (
            <li key={index}>{prop}</li>
          ))}
        </ul>
      )}
      <ButtonContainer>
        {editingMode ? (
          <>
            <button type="button" onClick={() => setEditingMode(false)}>
              Cancelar
            </button>
            <button type="button" onClick={handleSave}>
              Salvar
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={handleEdit}>
              Editar
            </button>
            <button type="button" onClick={handleRemoveContact}>
              Excluir
            </button>
          </>
        )}
      </ButtonContainer>
    </ContactStyle>
  );
}

// TODO: turn editingMode into a global state
