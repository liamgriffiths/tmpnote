// @flow

import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Logo: (*) => *
= styled.div`
  font-family: 'Bungee Inline', cursive;
  font-size: 30px;
  text-decoration: none;
  color: ${props => props.theme.black};
  margin: 0 auto 60px;
  padding: 0;
  align-self: center;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  background-image: linear-gradient(0deg, hotpink, hotpink 50%, black 50%);
  background-size: 100% 200%;
  background-position: 0% 0%;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-position: 100% 100%;
    transform: scale(1.5);
  }

  &:active {
    background-position: 0% 0%;
    transform: scale(1.4);
  }
`
export default () => (
  <Logo>
    <Link to="/">
      tmp/note
    </Link>
 </Logo>
)
