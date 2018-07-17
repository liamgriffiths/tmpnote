// @flow

import styled from 'styled-components'

const DisplayText: (*) => *
= styled.div`
  font-size: 42px;
  font-weight: 200;
  margin: 0;
  padding: 0;
  color: ${props => props.theme.black }
`

export default DisplayText
