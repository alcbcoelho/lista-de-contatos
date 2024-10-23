import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, FormEvent } from 'react';

import Input, { InputStyle } from './Input';
import Modal from './Modal';
import ButtonContainer, {
  ButtonContainerStyle
} from '../containers/ButtonContainer';

import { RootState } from '../store';
import { editContact, removeContact } from '../store/contactsSlice';
import { activate as activateSnackbar } from '../store/snackbarSlice';
import { changeValue } from '../store/fieldsSlice';
import { inputs } from '../utils/data';

import { breakpoints } from '../global-style';

const ContactStyle = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  li:first-child {
    font-size: 1.25rem;
    font-weight: bold;
  }

  @media screen and (max-width: ${breakpoints.maxMobile}) {
    flex-direction: column;
    justify-content: center;

    ul {
      text-align: center;
    }

    ${ButtonContainerStyle} {
      margin-top: 16px;
    }
  }
`;

const InputContainer = styled.div`
  display: block;

  @media screen and (max-width: ${breakpoints.maxMobile}) {
    ${InputStyle} {
      margin-bottom: 16px;

      &:last-of-type {
        margin-bottom: 0;
      }

      input {
        display: block;
      }
    }
  }
`;

type ContactProps = Contact;

export default function Contact({ id, name, email, phone }: ContactProps) {
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const contact = useSelector((state: RootState) =>
    state.contactList.items.find((c) => c.id === id)
  );
  const isThereAContactBeingEdited = useSelector((state: RootState) =>
    state.contactList.items
      .map(({ isInEditingMode }) => isInEditingMode)
      .find((i) => i)
  );
  const editedFields = useSelector((state: RootState) => state.fields.edition);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      editContact({
        id,
        name,
        email,
        phone,
        isInEditingMode: editingMode
      })
    );
  }, [editingMode, dispatch, id, name, email, phone]);

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    setEditingMode(true);

    inputs.forEach(({ id: inputId }) => {
      dispatch(
        changeValue({
          operation: 'edition',
          fieldId: inputId,
          fieldValue: (contact as Contact)[
            inputId as 'name' | 'email' | 'phone'
          ]
        })
      );
    });
  };

  const handleRemoveContact = () => {
    dispatch(removeContact(id));
    dispatch(activateSnackbar());
    closeModal();
  };

  const propsToRender = [name, email, phone];

  return (
    <>
      {openModal && (
        <Modal onClickOutside={closeModal}>
          <p>
            Tem certeza que deseja excluir o contato <b>{name}</b>?
          </p>
          <ButtonContainer>
            <button type="button" onClick={closeModal}>
              Cancelar
            </button>
            <button type="button" onClick={handleRemoveContact}>
              Excluir
            </button>
          </ButtonContainer>
        </Modal>
      )}
      <ContactStyle className="card" onSubmit={handleSubmit}>
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
              <button type="submit">Salvar</button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleEdit}
                disabled={isThereAContactBeingEdited}
                style={{
                  cursor: isThereAContactBeingEdited ? 'default' : 'pointer'
                }}
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => setOpenModal(true)}
                disabled={isThereAContactBeingEdited}
                style={{
                  cursor: isThereAContactBeingEdited ? 'default' : 'pointer'
                }}
              >
                Excluir
              </button>
            </>
          )}
        </ButtonContainer>
      </ContactStyle>
    </>
  );
}
