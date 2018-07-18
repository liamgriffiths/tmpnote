// @flow

import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import stateful from '../lib/stateful'

import { Modal, Button, Logo } from '../atoms'
import { Message } from '../molecules'
import { NewNote } from './index'

import type { Update } from '../lib/stateful'

const PageContainer: (*) => React$Element<*>
= styled.div`
  position: fixed;
  height: 100vh;
  overflow-y: hidden;
  max-height: 100%;
  width: 100vw;
`

const Page: (*) => React$Element<*>
= styled.div`
  position: relative;
  height: 100%;
  display: flex;
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

type State =
  | {| modal: 'open', form: number |}
  | {| modal: 'closed', form: number |}

type Props = {
  update: Update<State>,
  state: State,
}

const text = `Self-destructs when read.
Self-destructs in 7 days.
Encrypted with AES-256.
No trackers or ads.`

const openModal = ({ update, state }) => (e) => {
 update({ modal: 'open', form: state.form + 1 })
 setTimeout(() => {
   const t = document.querySelector('textarea')
   if (t) t.focus()
 }, 300)
}

const closeModal = ({ update, state }) => (e) => {
  update({ modal: 'closed', form: state.form })
}

const Home: (Props) => React$Element<*>
= ({ update, state }) => (
  <PageContainer>
    <Page>
      <Helmet title="tmp/note - Create & share encrypted notes" />
      <Container>
        <Logo />
        <Message
          title="Create & Share Encrypted Notes"
          body={text} />
        <Button primary onClick={openModal({ update, state })}>
          New Note
        </Button>
      </Container>
    </Page>
    <Modal onClose={closeModal} active={state.modal === 'open'}>
      <NewNote key={state.form} />
    </Modal>
  </PageContainer>
)

export default stateful({ modal: 'closed', form: 0 })(Home)
