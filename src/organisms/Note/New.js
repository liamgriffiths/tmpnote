// @flow

import React from 'react'
import styled from 'styled-components'
import { pipe, path, isEmpty } from 'ramda'
import { Textarea, Button } from '../../atoms'
import stateful from '../../lib/stateful'

import type { Update } from '../../lib/stateful'

const Form: (*) => React$Element<*>
= styled.form`
  display: grid;
  grid-template-rows: 1fr 60px;
  grid-gap: 20px;
  margin: 0 auto;
  padding: 0;
  text-align: center;

  max-height: 60vh;
  margin: auto;
  width: 100%;
`

type State = 'initial' | 'ready' | 'submitting'

type Props = {
  onSubmit: (string) => *,
  update: Update<State>,
  state: State,
}

const handleChange: (Update<State>) => (*) => void
= (update) => pipe(
  path(['target', 'value']),
  (val) => isEmpty(val) ? update('initial') : update('ready'),
)

const handleSubmit: (Update<State>) => ((string) => Promise<*>) => (*) => Promise<void>
= (update) => (onSubmit) => async (e) => {
  e.preventDefault()
  const note = e.target.querySelector('textarea').value
  update('submitting')
  try {
    await onSubmit(note)
  } catch (err) {
  }
}

const onMount = ({ update }) => {
}

const New: (Props) => React$Element<*>
= ({ onSubmit, update, state }) => (
  <Form onSubmit={handleSubmit(update)(onSubmit)} disabled={state === 'submitting'}>
    <Textarea
      disabled={state === 'submitting'}
      onChange={handleChange(update)}
      placeholder="Say something nice..." />
    <Button primary disabled={state !== 'ready'}>
      Save
    </Button>
  </Form>
)

export default stateful('initial', onMount)(New)
