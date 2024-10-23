import styled from 'styled-components';

import { breakpoints, containerMaxWidths } from '../global-style';

interface ContainerProps {
  children: JSX.Element | JSX.Element[];
}

export const ContainerStyle = styled.div`
  max-width: ${containerMaxWidths.default};
  width: 100%;
  margin: 0 auto;

  @media screen and (max-width: ${breakpoints.maxMobile}) {
    max-width: ${containerMaxWidths.mobile};
  }

  @media screen and (min-width: ${breakpoints.minSmallTablet}) and (max-width: ${breakpoints.maxLargeTablet}) {
    max-width: ${containerMaxWidths.tablet};
  }
`;

export default function Container({ children }: ContainerProps) {
  return <ContainerStyle>{children}</ContainerStyle>;
}
