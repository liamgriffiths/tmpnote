// @flow

import React from 'react'
import styled from 'styled-components'
import { pipe, path, isEmpty } from 'ramda'
import { Textarea, Button } from '../../atoms'
import stateful from '../../lib/stateful'

import type { Update, Action } from '../../lib/stateful'

const Form: (*) => React$Element<*>
= styled.form`
  display: grid;
  grid-template-rows: 1fr 60px;
  grid-gap: 20px;
  padding: 0;
  text-align: center;

  max-height: 50vh;
  margin: 20vh auto;
  width: 100%;
`

type State = 'initial' | 'ready' | 'submitting'

type Props = {
  onSubmit: (string) => *,
  update: Update<State>,
  state: State,
}

const handleChange: Action<State, (Event) => *>
= ({ update }) => pipe(
  path(['target', 'value']),
  (val) => isEmpty(val) ? update('initial') : update('ready'),
)

const handleSubmit: Action<State, ({ e: *, onSubmit: * }) => Promise<void>>
= ({ update, state }) => async ({ onSubmit, e }) => {
  e.preventDefault()
  const note = e.target.querySelector('textarea').value
  update('submitting')
  try {
    await onSubmit(note)
  } catch (err) {
  }
}

const New: (Props) => React$Element<*>
= ({ onSubmit, update, state }) => (
  <Form onSubmit={(e) => handleSubmit({ update, state })({ e, onSubmit})} disabled={state === 'submitting'}>
    <Textarea
      disabled={state === 'submitting'}
      onChange={handleChange({ update ,state })}
      placeholder="Say something nice..." />
    <Button primary disabled={state !== 'ready'}>
      Save
    </Button>
  </Form>
)

export default stateful('initial')(New)
