// @flow

import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  onClose: () => void,
  active: boolean,
  children: *,
}

const Container: (Props) => React$Element<*>
= styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  transition: all 0.3s ease-in-out 0s;
  transform: translateY(100%);

  ${(props) => props.active && css`
    transform: translateY(0%);
  `};
`

const CloseButton: (*) => *
= styled.button`
  position: relative;
  cursor: pointer;
  user-select: none;
  color: black;
  background: transparent;
  transition: all 0.03s ease-in-out 0s;
  transform: scale(1);
  z-index: 2;

  &::before {
    position: absolute;
    content: '\00d7';
    font-size: 36px;
    font-weight: 200;
    line-height: 1;
    left: 0;
    right: 0;
    top: -6px;
    bottom: 0;
  }

  position: absolute;
  right: 12px;
  top: 12px;
  text-decoration: none;
  padding: 4px;
  border: 2px solid black;
  border-radius: 100%;
  min-width: 32px;
  min-height: 32px;
  text-align: center;

  &:hover {
    background: black;
    color: white;
    transform: scale(1.1);
    @keyframes wobble-around-like-a-goof {
      0% { transform: translate(0%, 0%); }
      15% { transform: translate(-5%, 1%) rotate(-5deg); }
      30% { transform: translate(2%, -3%) rotate(3deg); }
      45% { transform: translate(-5%, 0%) rotate(-3deg); }
      60% { transform: translate(1%, 5%) rotate(2deg); }
      75% { transform: translate(-5%, -2%) rotate(-1deg); }
      100% { transform: translate(0%, 2%); }
    }
    animation: wobble-around-like-a-goof 1s;
    animation-iteration-count: infinite;
  }

  box-shadow: 0 10px 10px -10px ${props => props.theme.shadow};

  &:active {
    transform: translateY(2px);
    box-shadow: 0 2px 10px -3px ${props => props.theme.shadow};
    animation: unset;
  }
`

const Modal: (Props) => *
= ({ children, onClose, active }) => (
  <Container active={active}>
    <CloseButton onClick={(e) => onClose()} />
    {children}
  </Container>
)

export default Modal
