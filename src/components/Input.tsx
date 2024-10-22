import { useDispatch, useSelector } from 'react-redux';
import { changeValue } from '../store/fieldsSlice';
import { RootState } from '../store';
import styled from 'styled-components';

const InputStyle = styled.div`
  label {
    margin-right: 4px;
  }
`;

export interface InputProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel';
  operation?: 'registration' | 'edition';
}

export default function Input({
  id,
  label,
  type,
  operation = 'registration'
}: InputProps) {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.fields[operation][id]);

  return (
    <InputStyle>
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        id={id}
        onChange={({ target: { value: newValue } }) =>
          dispatch(
            changeValue({
              operation,
              fieldId: id,
              fieldValue: newValue
            })
          )
        }
        value={value}
        required
      />
    </InputStyle>
  );
}
