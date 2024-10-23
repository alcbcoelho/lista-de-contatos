import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { fadeOut, resetToInitialState } from '../store/snackbarSlice';
import { RootState } from '../store';

import { ContainerStyle } from '../containers/Container';

import { colors } from '../global-style';
import { useEffect } from 'react';

interface SnackbarProps {
  children: string;
  duration: number;
}

const timeToDeactivate = 200;

const SnackbarContainer = styled(ContainerStyle)`
  position: relative;
  background-color: #000;
  border: 1px red solid;

  transition: opacity ${timeToDeactivate / 1000}s;

  &.fade-out {
    opacity: 0;
  }
`;

const SnackbarStyle = styled(ContainerStyle)`
  position: fixed;
  bottom: 16px;
  color: ${colors.lightGreen};

  &.card {
    background-color: ${colors.green};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.175);
  }
`;

export default function Snackbar({ children, duration }: SnackbarProps) {
  const { isFadedOut, isActive } = useSelector(
    (state: RootState) => state.snackbar
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isActive) setTimeout(() => dispatch(fadeOut()), duration);
  }, [isActive, dispatch, duration]);

  useEffect(() => {
    if (isFadedOut) {
      setTimeout(() => {
        dispatch(resetToInitialState());
      }, timeToDeactivate);
    }
  }, [isFadedOut, dispatch]);

  return (
    <SnackbarContainer
      className={isFadedOut ? 'fade-out' : ''}
      style={{ display: isActive ? 'block' : 'none' }}
    >
      <SnackbarStyle className="card">{children}</SnackbarStyle>
    </SnackbarContainer>
  );
}
