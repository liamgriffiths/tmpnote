// @flow

import React from 'react'
import styled from 'styled-components'
import { readableColor } from 'polished'

import * as Theme from '../Theme'
import * as Atoms from '../atoms'
import * as Molecules from '../molecules'
import * as Note from '../organisms/Note'

const Label = Atoms.Label;

const Page: (*) => React$Element<*>
= styled.div`
  margin: 5vh 1vw;
`

const Container: (*) => React$Element<*>
= styled.div`
`
const Title: (*) => React$Element<*>
= styled.div`
  font-size: 26px;
  font-weight: 200;
  padding-bottom: 20px;
`

const Section: (*) => React$Element<*>
= styled.section`
  padding 20px;
  margin-bottom: 40px;
  border: 1px dashed black;
  background: whitesmoke;
`

const Example: (*) => React$Element<*>
= styled.div`
  margin: 20px 0px 40px;
`

const ColorDemo: (*) => React$Element<*>
= styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 10%;
  background: ${(props) => props.color};
  color: ${(props) => readableColor(props.color)};
`

const ColorRange: ({ color: (number) => string }) => *
= (props) => (
  <React.Fragment>
    {[900, 800, 700, 600, 500, 400, 300, 200, 100, 50].map((swatch) => (
      <ColorDemo key={swatch} color={props.color(swatch)}>
        {swatch}
      </ColorDemo>
    ))}
  </React.Fragment>
)


const Patterns: () => React$Element<*>
= (props) => (
  <Page>
    <Container>
      <Section>
        <Title>Theme</Title>

        <Label>Primary</Label>
        <Example>
          <ColorRange color={Theme.main.primary} />
        </Example>

        <Label>Secondary</Label>
        <Example>
          <ColorRange color={Theme.main.secondary} />
        </Example>

        <Label>Gray</Label>
        <Example>
          <ColorRange color={Theme.main.gray} />
        </Example>

        <Label>Constants</Label>
        <Example>
          <ColorDemo color={Theme.main.error}>error</ColorDemo>
          <ColorDemo color={Theme.main.black}>black</ColorDemo>
          <ColorDemo color={Theme.main.white}>white</ColorDemo>
        </Example>

      </Section>

      <Section>
        <Title>Atoms</Title>

        <Label>Logo</Label>
        <Example>
          <Atoms.Logo />
        </Example>

        <Label>DisplayText</Label>
        <Example>
          <Atoms.DisplayText>I'm some display text.</Atoms.DisplayText>
        </Example>

        <Label>Text</Label>
        <Example>
          <Atoms.Text>I'm some normal text you might see somewhere.</Atoms.Text>
        </Example>

        <Label>Button</Label>
        <Example>
          <Atoms.Button>Click Me</Atoms.Button>
        </Example>
        <Example>
          <Atoms.Button primary>Primary Action</Atoms.Button>
        </Example>
        <Example>
          <Atoms.Button disabled>I'm Disabled</Atoms.Button>
        </Example>
        <Example>
          <Atoms.Button danger>Do something dangerous</Atoms.Button>
        </Example>

        <Label>Textarea</Label>
        <Example>
          <Atoms.Textarea placeholder="Say something nice..." />
        </Example>

        <Label>StaticInput</Label>
        <Example>
          <Atoms.StaticInput defaultValue="This is something" />
        </Example>
      </Section>

      <Section>
        <Title>Molecules</Title>

        <Label>Message</Label>
        <Example>
          <Molecules.Message title="Hello" body="You look nice today." />
        </Example>

        <Label>CopyLink</Label>
        <Example>
          <Molecules.CopyLink readOnly link="http://google.com" />
        </Example>
      </Section>

      <Section>
        <Title>Organisims</Title>

        <Label>NoteForm</Label>
        <Example>
          <Note.New onSubmit={async (note) => console.log(note)} />
        </Example>
      </Section>
    </Container>
  </Page>
)

export default Patterns
