// @flow

import React from 'react'
import styled from 'styled-components'
import { Text } from '../../atoms'

const Container: (*) => React$Element<*>
= styled.div`
  display: grid;
  grid-template-rows: 1fr 60px;
  grid-gap: 20px;
  margin: 0 auto;
  padding: 0;
  text-align: center;
  height: 100%;

  & div {
    text-align: left;
    padding: 0 10px;
  }
`

type Props = {
  note: string,
}

const Show: (Props) => React$Element<*>
= ({ note }) => (
  <Container>
    <Text>{note}</Text>
  </Container>
)

export default Show
