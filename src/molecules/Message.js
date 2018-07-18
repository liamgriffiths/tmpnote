// @flow

import React from 'react'
import styled from 'styled-components'
import { DisplayText, Text } from '../atoms'

const Message: (*) => React$Element<*>
= styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 40px;

  margin: 0 auto;
  padding: 0;

  text-align: center;
`

type Props = {
  safe?: true,
  title: string,
  body: string,
}

export default (props: Props): React$Element<*> => (
  <Message>
    <DisplayText>{props.title}</DisplayText>
    <Text safe>{props.body}</Text>
  </Message>
)
