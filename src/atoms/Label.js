// @flow

import styled from 'styled-components'

const Label: (*) => React$Element<*>
= styled.div`
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  color: ${props => props.theme.gray(500)};
`

export default Label
