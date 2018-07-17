// @flow

import sjcl from 'sjcl'
import { Base64 } from 'js-base64'
import ARSON from 'arson'
import { pipe } from 'ramda'

const randomKey: () => Array<number>
= () => sjcl.random.randomWords(8, 10)

const encode: (*) => string
= pipe(
  ARSON.encode,
  Base64.encode,
)

const decode: (string) => Object
= pipe(
  Base64.decode,
  ARSON.decode,
)

export const encrypt: (string) => { password: string, message: string }
= (input) => {
  const key = randomKey()
  return {
    password: encode(key),
    message: encode(sjcl.encrypt(key, input)),
  }
}

export const decrypt: (string, string) => string
= (key, input) => {
  const k = decode(key)
  const v = decode(input)
  return sjcl.decrypt(k, v)
}
