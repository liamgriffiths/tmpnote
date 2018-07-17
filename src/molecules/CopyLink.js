// @flow

import React from 'react'
import styled from 'styled-components'
import { StaticInput, Button } from '../atoms'
import { Message } from '../molecules'
import stateful from '../lib/stateful'

import type { Update } from '../lib/stateful'

const Container: (*) => React$Element<*>
= styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 60px;
  grid-gap: 20px;
  padding: 0;
  text-align: center;
  margin-bottom: 40px;

  & input {
    margin-top: 40px;
  }
`

type State = 'initial' | 'copied'

type Props = {
  link: string,
  update: Update<State>,
  state: State,
}

const handleSubmit: (Update<State>) => (*) => void
= (update) => (e) => {
  e.preventDefault()
  const link = e.target.previousSibling
  link.select()
  document.execCommand('copy')
  update('copied')
  setTimeout(() => update('initial'), 2000)
}

const CopyLink: (Props) => React$Element<*>
= ({ link, update, state }) => (
  <Container>
    <Message title="Created ✨" body="Share the following link." />
    <StaticInput readOnly value={link} />
    <Button primary onClick={handleSubmit(update)}>
      { state === 'initial' ? 'Copy' : 'Copied' }
    </Button>
  </Container>
)

export default stateful('initial')(CopyLink)
