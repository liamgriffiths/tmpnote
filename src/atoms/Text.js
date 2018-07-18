// @flow

import React from 'react'
import styled from 'styled-components'

const Text: (*) => React$Element<*>
= styled.div`
  color: ${props => props.theme.black};
  padding: 0;
  margin: 0;
  font-family: monospace;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  white-space: pre-wrap;

  a {
    color: ${props => props.theme.primary(800)};
  }

  @media (max-width: 340px) {
    max-width: 800px;
  }
`

export default (props: { safe?: true, children?: * }) => (
  props.safe ? <Text dangerouslySetInnerHTML={{ __html: props.children }} /> : <Text>{props.children}</Text>
)
