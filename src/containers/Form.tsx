import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../store';
import { addContact } from '../store/contactsSlice';
import { changeValue } from '../store/fieldsSlice';
import Input from '../components/Input';
import { inputs } from '../utils/data';

const FormStyle = styled.form`
  h2 {
    margin-bottom: 16px;
    font-size: 1.25rem;
  }
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputFlexContainer = styled.div`
  display: flex;
  gap: 12px;
  // display: grid;
  // grid-template-columns: 30% 30% 30% 10%;
`;

// const inputs: InputProps[] = [
//   {
//     id: 'name',
//     label: 'Nome',
//     type: 'text'
//   },
//   {
//     id: 'email',
//     label: 'Email',
//     type: 'email'
//   },
//   {
//     id: 'phone',
//     label: 'Telefone',
//     type: 'tel'
//   }
// ];

export default function Form() {
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contactList.items);
  const inputValues = useSelector(
    (state: RootState) => state.fields.registration
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, phone } = inputValues;

    dispatch(
      addContact({
        id: contacts.length + 1,
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
            <Input key={i.id} {...i} />
          ))}
        </InputFlexContainer>
        <button type="submit">Adicionar</button>
      </FormContainer>
    </FormStyle>
  );
}
