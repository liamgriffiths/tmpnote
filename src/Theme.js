// @flow

// Borrowed a lot of ideas from:
// https://material.io/design/color/the-color-system.html

import { shade, tint, darken, opacify, complement } from 'polished'
import { memoize } from 'ramda'

type Swatch =
  | 900 | 800 | 700 | 600 | 500 | 400 | 300 | 200 | 100 | 50

type Color = string // hex, rgba
type Coloring = (Swatch) => Color

const color: (Color) => Coloring
= (base) => memoize((swatch) => {
  switch(swatch) {
    case 900:
      return shade(.3, base)
    case 800:
      return shade(.5, base)
    case 700:
      return shade(.7, base)
    case 600:
      return shade(.9, base)
    case 500:
      return base
    case 400:
      return tint(.9, base)
    case 300:
      return tint(.7, base)
    case 200:
      return tint(.5, base)
    case 100:
      return tint(.3, base)
    case 50:
      return tint(.1, base)
    default:
      return base
  }
})

const gray: Coloring
= memoize((swatch) => darken((swatch / 900), '#ffffff'))

type Theme = {
  primary: Coloring,
  secondary: Coloring,
  gray: Coloring,
  black: Color,
  white: Color,
  shadow: Color,
  error: Color,
}

const colors = [
  '#3F51B5',
  '#2196F3',
  '#673AB7',
  '#E91E63',
  '#9C27B0',
  '#F44336',
  '#03A9F4',
  '#03A9F4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#607D8B',
]

const baseColor = colors[Math.floor(Math.random()* colors.length)]

export const main: Theme
= {
  primary: color(baseColor),
  secondary: color(complement(baseColor)),
  gray: gray,
  black: '#000000',
  white: '#ffffff',
  shadow: opacify(0.5, gray(800)),
  error: '#b00020',
}
