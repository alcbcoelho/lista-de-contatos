import { useDispatch, useSelector } from 'react-redux';
import InputMask from 'react-input-mask';

import { changeValue } from '../store/fieldsSlice';
import { RootState } from '../store';
import styled from 'styled-components';

export const InputStyle = styled.div`
  label {
    margin-right: 4px;
  }
`;

export interface InputProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel';
  operation?: 'registration' | 'edition';
  disabled?: boolean;
}

export default function Input({
  id,
  label,
  type,
  operation = 'registration',
  disabled = false
}: InputProps) {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.fields[operation][id]);

  const props = {
    id,
    type,
    value,
    disabled
  };

  const handleChange = ({
    target: { value: newValue }
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeValue({
        operation,
        fieldId: id,
        fieldValue: newValue
      })
    );
  };

  return (
    <InputStyle>
      <label htmlFor={id}>{label}:</label>
      {type === 'tel' ? (
        <InputMask
          {...props}
          required
          onChange={handleChange}
          mask="(99) 99999-9999"
        />
      ) : (
        <input {...props} required onChange={handleChange} />
      )}
    </InputStyle>
  );
}
