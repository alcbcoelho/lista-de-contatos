import styled from 'styled-components';

export const ButtonContainerStyle = styled.div`
  display: flex;
  gap: 4px;
`;

interface ButtonContainerProps {
  children: JSX.Element | JSX.Element[];
}

export default function ButtonContainer({ children }: ButtonContainerProps) {
  return <ButtonContainerStyle>{children}</ButtonContainerStyle>;
}
