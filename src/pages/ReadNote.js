// @flow

import React from 'react'
import styled from 'styled-components'
import stateful from '../lib/stateful'
import { decrypt } from '../lib/crypto'
import * as api from '../lib/api'
import { Logo } from '../atoms'
import { Message } from '../molecules'
import * as Note from '../organisms/Note'

import type { Update } from '../lib/stateful'

const Page: (*) => React$Element<*>
= styled.div`
  position: relative;
  height: 100vh;
  max-height: 100%;
  overflow-y: hidden;
  background: ${props => props.theme.primary(100)};
`

const Container: (*) => React$Element<*>
= styled.div`
  display: grid;
  grid-template-rows: 20% 30% 1fr 60px;

  height: calc(100% - 20px);
  max-width: 800px;
  margin: 0px auto 20px;
  padding: 0 10px;

  & div {
    align-self: center;
    text-align: center;
  }

  & button {
    grid-row: 4;
  }
`

type State =
  | {| screen: 'initial' |}
  | {| screen: 'fetching' |}
  | {| screen: 'fetched', note: string |}
  | {| screen: 'not-found' |}
  | {| screen: 'error', error: string |}

type Props = {
  update: Update<State>,
  state: State,
  match: {
    params: {
      id: string,
    }
  },
  location: {
    hash: string,
  },
}

const Screen: (Props) => React$Element<*>
= ({ state, update, match: { params }, location: { hash }}) => {

  const fetchNote = async (id, password) => {
    update({ screen: 'fetching' })

    try {
      const { note } = await api.read(id)
      if (note) {
        const decrypted = decrypt(password, note)
        update({ screen: 'fetched', note: decrypted })
      } else {
        update({ screen: 'not-found' })
      }
    } catch (err) {
      update({ screen: 'error', error: err })
    }
  }

  switch (state.screen) {
    case 'initial':
      fetchNote(params.id, hash.slice(1))
    case 'fetching':
      return <div />
    case 'fetched':
      return <Note.Show note={state.note} />
    case 'error':
      return <Message title="Error" body="Couldn't decrypt - but we delete the note anyway." />
    case 'not-found':
      return <Message title="Not Found" body="If you expected to see the note here, it may have already been read." />
    default:
      throw new Error('impossible')
  }
}


const ReadNote: (Props) => React$Element<*>
= (props) => (
  <Page>
    <Container>
      <Logo />
      <Screen {...props} />
    </Container>
  </Page>
)

export default stateful({ screen: 'initial' })(ReadNote)
