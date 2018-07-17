// @flow

import React from 'react'
import styled from 'styled-components'
import stateful from '../lib/stateful'

import { Modal, Button, Logo } from '../atoms'
import { Message } from '../molecules'
import { NewNote } from './index'

import type { Update } from '../lib/stateful'

const Page: (*) => React$Element<*>
= styled.div`
  position: relative;
  display: flex;
  height: 100vh;
  max-height: 100%;
  overflow-y: hidden;
  background: ${props => props.theme.primary(100)};
`

const Container: (*) => React$Element<*>
= styled.div`
  display: grid;
  grid-template-rows: 10% 20% 1fr 60px;

  max-width: 800px;
  height: 60vh;
  margin: auto;
  padding: 0 10px;

  & > button {
    grid-row: 4;
    max-width: 380px;
    margin: 0 auto;
  }
`

type State = 'initial' | 'modal-open'

type Props = {
  update: Update<State>,
  state: State,
}

const text = `Self-destructs when read.
Self-destructs in 7 days.
Encrypted with AES-256.
No trackers or ads.`

const onModalButtonClick = (update) => (e) => {
 update('modal-open')
 setTimeout(() => {
   const t = document.querySelector('textarea')
   if (t) t.focus()
 }, 300)
}

const Home: (Props) => React$Element<*>
= ({ update, state }) => (
  <Page>
    <Container>
      <Logo />
      <Message
        title="Create & Share Encrypted Notes"
        body={text} />
      <Button primary onClick={onModalButtonClick(update)}>
        New Note
      </Button>
    </Container>
    <Modal onClose={() => update('initial')} active={state === 'modal-open'}>
      <NewNote />
    </Modal>
  </Page>
)

export default stateful('initial')(Home)
