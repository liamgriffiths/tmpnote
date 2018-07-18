// @flow

import React from 'react'
import styled from 'styled-components'
import { StaticInput, Button } from '../atoms'
import { Message } from '../molecules'
import stateful from '../lib/stateful'
import copy from 'copy-to-clipboard'

import type { Update, Action } from '../lib/stateful'

const Container: (*) => React$Element<*>
= styled.div`
  display: grid;
  grid-template-rows: 1fr 100px 60px;
  grid-gap: 20px;
  padding: 0;
  text-align: center;
  margin-bottom: 40px;

  @media (min-width: 667px) {
    grid-template-rows: 1fr 120px 60px;
  }

  & textarea {
    font-size: 16px;
    font-weight: 200;

    @media (min-width: 667px) {
      font-size: 22px;
      font-weight: 200;
    }
  }
`

type State = 'initial' | 'copied'

type Props = {
  link: string,
  update: Update<State>,
  state: State,
}

const copyLink: Action<State, (string) => (Event) => void>
= ({ update, state }) => (link) => (e) => {
  e.preventDefault()
  copy(link)
  update('copied')
  setTimeout(() => update('initial'), 2000)
}

const CopyLink: (Props) => React$Element<*>
= ({ link, update, state }) => (
  <Container>
    <Message title="Created." body="Share the following link.✨" />
    <StaticInput defaultValue={link} />
    <Button primary onClick={copyLink({ update, state })(link)}>
      { state === 'initial' ? 'Copy' : 'Copied' }
    </Button>
  </Container>
)

export default stateful('initial')(CopyLink)
