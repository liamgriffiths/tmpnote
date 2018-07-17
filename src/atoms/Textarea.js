// @flow

import styled, { css } from 'styled-components'

const Textarea: (*) => *
= styled.textarea`
  cursor: initial;

  color: ${props => props.theme.black};

  font-size: 22px;
  line-height: 1.5;
  font-weight: 500;

  padding: 13px;
  margin: 0;
  width: 100%;

  background: ${props => props.theme.white};
  border: 0;
  border-radius: 3px;
  box-shadow: 0 10px 10px -10px ${props => props.theme.shadow};

  transition: 0.3s background-color, 0.3s color, 0.3s border;

  ${(props) => props.disabled && css`
    cursor: not-allowed;
    background: ${(props) => props.theme.gray(200)};
    border-color: ${(props) => props.theme.gray(200)};
    box-shadow: 0 2px 10px -3px ${props => props.theme.shadow};

    &:hover {
      background: ${(props) => props.theme.gray(200)};
      border-color: ${(props) => props.theme.gray(200)};
      box-shadow: 0 2px 10px -3px ${props => props.theme.shadow};
    }
  `};
`

export default Textarea
