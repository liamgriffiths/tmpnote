// @flow

import React from 'react'
import styled from 'styled-components'
import stateful from '../lib/stateful'
import { encrypt } from '../lib/crypto'
import * as api from '../lib/api'
import * as Note from '../organisms/Note'

import type { Update } from '../lib/stateful'

const Page: (*) => React$Element<*>
= styled.div`
  height: 100vh;
  overflow-y: hidden;
  background: ${props => props.theme.primary(100)};
`

const Container: (*) => React$Element<*>
= styled.div`
  height: calc(100% - 80px);

  max-width: 800px;
  margin: 60px auto 20px;
  padding: 0 10px;
  display: flex;

  & form {
    height: 100%;
  }
`

type State =
  | {| screen: 'new' |}
  | {| screen: 'created', id: string, password: string |}
  | {| screen: 'deleted' |}

type Props = {
  update: Update<State>,
  state: State,
}

const Screen: (Props) => React$Element<*>
= ({ update, state }) => {

  const createNote: (string) => Promise<*>
  = async (note) => {
    const { password, message } = encrypt(note)
    const { id } = await api.create(message)
    update({ screen: 'created', password, id })
  }

  const deleteNote: (string) => Promise<*>
  = async (id) => {
    await api.destroy(id)
    update({ screen: 'deleted' })
  }

  switch (state.screen) {
    case 'new':
      return <Note.New onSubmit={createNote} />
    case 'created':
      return <Note.Created id={state.id} password={state.password} onDelete={deleteNote} />
    case 'deleted':
      return <Note.Deleted />
    default:
      throw new Error('impossible')
  }
}

const Home: (Props) => React$Element<*>
= ({ update, state }) => (
  <Page>
    <Container>
      <Screen update={update} state={state} />
    </Container>
  </Page>
)

export default stateful({ screen: 'new' })(Home)
