import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../store';
import { addContact } from '../store/contactsSlice';
import { changeValue } from '../store/fieldsSlice';

import Input, { InputStyle } from '../components/Input';

import { inputs } from '../utils/data';
import { breakpoints } from '../global-style';

const FormStyle = styled.form`
  margin-bottom: 16px;

  h2 {
    margin-bottom: 16px;
    font-size: 1.25rem;

    @media screen and (max-width: ${breakpoints.maxSmallTablet}) {
      text-align: center;
    }
  }

  @media screen and (min-width: ${breakpoints.minSmallTablet}) and (max-width: ${breakpoints.maxSmallTablet}) {
    button {
      margin-top: 16px;
    }
  }
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${breakpoints.maxMobile}) {
    flex-direction: column;
    gap: 16px;
    justify-content: flex-start;
    align-items: center;
  }

  @media screen and (min-width: ${breakpoints.minSmallTablet}) and (max-width: ${breakpoints.maxSmallTablet}) {
    display: block;
    text-align: center;
  }
`;

const InputFlexContainer = styled.div`
  display: flex;
  gap: 12px;

  @media screen and (max-width: ${breakpoints.maxMobile}) {
    gap: 16px;
    flex-direction: column;
    align-items: center;

    ${InputStyle} {
      input {
        display: block;
      }
    }
  }

  @media screen and (min-width: ${breakpoints.minSmallTablet}) and (max-width: ${breakpoints.maxLargeTablet}) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export default function Form() {
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contactList.items);
  const inputValues = useSelector(
    (state: RootState) => state.fields.registration
  );
  const isThereAContactBeingEdited = useSelector((state: RootState) =>
    state.contactList.items.map((i) => i.isInEditingMode).find((i) => i)
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, phone } = inputValues;
    const highestId = contacts.map((c) => c.id).sort((a, b) => b - a)[0];

    dispatch(
      addContact({
        id: highestId ? highestId + 1 : 1,
        name,
        email,
        phone
      })
    );

    Object.keys(inputValues).forEach((property) => {
      dispatch(
        changeValue({
          operation: 'registration',
          fieldId: property,
          fieldValue: ''
        })
      );
    });
  };

  return (
    <FormStyle className="card" onSubmit={handleSubmit}>
      <h2>Adicionar novo contato</h2>
      <FormContainer>
        <InputFlexContainer>
          {inputs.map((i) => (
            <Input key={i.id} {...i} disabled={isThereAContactBeingEdited} />
          ))}
        </InputFlexContainer>
        <button type="submit" disabled={isThereAContactBeingEdited}>
          Adicionar
        </button>
      </FormContainer>
    </FormStyle>
  );
}
