// @flow

import React from 'react'
import styled from 'styled-components'
import stateful from '../lib/stateful'
import { encrypt } from '../lib/crypto'
import * as api from '../lib/api'
import * as Note from '../organisms/Note'

import type { Update, Action } from '../lib/stateful'

const Page: (*) => React$Element<*>
= styled.div`
  height: 100vh;
  overflow-y: hidden;
  background: ${props => props.theme.primary(100)};
`

const Container: (*) => React$Element<*>
= styled.div`
  display: flex;
  height: 100%;
  max-width: 800px;
  padding: 0 10px;
  margin: auto;

  & form {
    height: 35vh;

    @media (min-width: 667px) {
      height: 100%;
    }
  }
`

type State =
  | {| screen: 'new' |}
  | {| screen: 'created', id: string, secret: string |}
  | {| screen: 'deleted' |}

type Props = {
  update: Update<State>,
  state: State,
}

const createNote: Action<State, (string) => Promise<*>>
= ({ update, state }) => async (note) => {
  const { cipher, secret } = encrypt(note)
  const { id } = await api.create(cipher)
  update({ screen: 'created', secret, id })
}

const deleteNote: Action<State, (string) => Promise<*>>
= ({ update, state }) => async (id) => {
  await api.destroy(id)
  update({ screen: 'deleted' })
}

const Screen: (Props) => React$Element<*>
= ({ update, state }) => {
  switch (state.screen) {
    case 'new':
      return <Note.New onSubmit={createNote({ update, state })} />
    case 'created':
      return (
        <Note.Created
          id={state.id}
          secret={state.secret}
          onDelete={deleteNote({ update, state })} />
        )
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
