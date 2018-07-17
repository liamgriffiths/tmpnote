// @flow

import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Text } from '../atoms'

const Page: (*) => React$Element<*>
= styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${props => props.theme.primary(100)};
`

const NotFound: () => React$Element<*>
= () => (
  <Page>
    <Helmet title="tmp/note - Not Found" />
    <Text>404 😅</Text>
  </Page>
)

export default NotFound
