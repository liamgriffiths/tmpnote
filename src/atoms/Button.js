// @flow

import styled, { css } from 'styled-components'
import { readableColor, lighten } from 'polished'

const Button: (*) => *
= styled.button`
  cursor: pointer;
  user-select: none;
  outline: none;

  color: ${props => props.theme.black}
  font-size: 22px;
  line-height: 1.5;
  font-weight: 500;

  display: inline-block;
  padding: 11px 0;
  width: 100%;

  background: transparent;
  border: 2px solid ${props => props.theme.black};
  border-radius: 3px;

  transition: 0.03s box-shadow, 0.3s background-color, 0.3s color, 0.3s border, 0.03s ease-in-out transform;
  box-shadow: 0 10px 10px -10px ${props => props.theme.shadow};

  &:hover {
    background: ${props => props.theme.black};
    color: ${props => props.theme.white};
    box-shadow: 0 12px 10px -10px ${props => props.theme.shadow};
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 2px 10px -3px ${props => props.theme.shadow};
  }

  ${(props) => props.primary && css`
    background: ${(props) => props.theme.primary(800)};
    border-color: ${(props) => props.theme.primary(800)};
    color: ${(props) => readableColor(props.theme.primary(800))};
    box-shadow: 0 2px 10px -3px ${props => props.theme.shadow};

    &:hover {
      background: ${(props) => props.theme.primary(700)};
      border-color: ${(props) => props.theme.primary(700)};
      color: ${(props) => readableColor(props.theme.primary(700))};
      box-shadow: 0 2px 10px -3px ${props => props.theme.shadow};
    }
  `};

  ${(props) => props.danger && css`
    background: ${(props) => props.theme.error};
    border-color: ${(props) => props.theme.error};
    color: ${(props) => readableColor(props.theme.error)};
    box-shadow: 0 2px 10px -3px ${props => props.theme.shadow};

    &:hover {
      background: ${(props) => lighten(.03, props.theme.error)};
      border-color: ${(props) => lighten(.03, props.theme.error)};
      color: ${(props) => readableColor(lighten(.03, props.theme.error))};
      box-shadow: 0 2px 10px -3px ${props => props.theme.shadow};
    }
  `};

  ${(props) => props.disabled && css`
    cursor: not-allowed;
    background: ${(props) => props.theme.gray(200)};
    border-color: ${(props) => props.theme.gray(200)};
    color: ${(props) => readableColor(props.theme.gray(200))};
    box-shadow: 0 2px 10px -3px ${props => props.theme.shadow};

    &:hover {
      background: ${(props) => props.theme.gray(200)};
      border-color: ${(props) => props.theme.gray(200)};
      color: ${(props) => readableColor(props.theme.gray(200))};
      box-shadow: 0 2px 10px -3px ${props => props.theme.shadow};
    }
  `};
`

export default Button
