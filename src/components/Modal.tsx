import styled from 'styled-components';

import { ButtonContainerStyle } from '../containers/ButtonContainer';

import { breakpoints } from '../global-style';

interface ModalProps {
  onClickOutside?: () => void;
  children: JSX.Element | JSX.Element[];
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  ${ButtonContainerStyle} {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;

    @media screen and (max-width: ${breakpoints.maxMobile}) {
      justify-content: center;
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #0000007f;
`;

const ModalStyle = styled.div`
  max-width: calc(960px / 1.5);
  width: 100%;
  z-index: 1;

  @media screen and (max-width: ${breakpoints.maxMobile}) {
    text-align: center;
  }

  @media screen and (max-width: ${breakpoints.maxLargeTablet}) {
    max-width: calc(960px / 1.5);
    width: 85%;
  }
`;

export default function Modal({ children, onClickOutside }: ModalProps) {
  return (
    <>
      <ModalContainer>
        <Overlay onClick={onClickOutside} />
        <ModalStyle className="card">{children}</ModalStyle>
      </ModalContainer>
    </>
  );
}
