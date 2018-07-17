// @flow

import styled from 'styled-components'

const StaticInput: (*) => *
= styled.textarea`
  outline: none;
  font-size: 22px;
  font-weight: 200;
  font-family: monospace;
  margin: 0;
  padding: 11px;
  width: 100%;
  color: ${props => props.theme.black }

  background: ${props => props.theme.primary(50)};
  border: 0;
  box-shadow: 0 10px 10px -10px ${props => props.theme.shadow};
`

export default StaticInput
