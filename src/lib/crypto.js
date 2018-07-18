// @flow

import { randomBytes, secretbox } from 'tweetnacl'
import { encodeUTF8, decodeUTF8, encodeBase64, decodeBase64 } from 'tweetnacl-util'

const NONCE_LEN = secretbox.nonceLength
const KEY_LEN = secretbox.keyLength

type Utf8 = string
type Base64 = string

const generateCredentials: () => { nonce: Uint8Array, key: Uint8Array }
= () => ({
  nonce: randomBytes(NONCE_LEN),
  key: randomBytes(KEY_LEN),
})

const join: (Uint8Array, Uint8Array) => Uint8Array
= (a, b) => {
  const c = new Uint8Array(a.length + b.length)
  c.set(a)
  c.set(b, a.length)
  return c
}

const split: (number, Uint8Array) => [Uint8Array, Uint8Array]
= (offest, bytes) => ([
  bytes.subarray(0, offest),
  bytes.subarray(offest),
])

export const encrypt: (Utf8) => { cipher: Base64, secret: Base64 }
= (message) => {
  // generate randomly
  const { nonce, key } = generateCredentials()

  // encode as typed array
  const bytes = decodeUTF8(message)

  // encrypt, then encode to b64
  const box = secretbox(bytes, nonce, key)
  const cipher = encodeBase64(box)

  // combine nonce + key and encode to b64
  const secret = encodeBase64(join(nonce, key))

  return {
    cipher,
    secret,
  }
}

export const decrypt: ({ cipher: Base64, secret: Base64 }) => Utf8
= ({ cipher, secret }) => {
  // convert b64 secret to nonce + key typed arrays
  const [nonce, key] = split(NONCE_LEN, decodeBase64(secret))

  // convert b64 cipher to typed array "box", then open it
  const box = decodeBase64(cipher)
  const bytes = secretbox.open(box, nonce, key)

  // return the utf8 message
  return encodeUTF8(bytes)
}

const demo = () => {
  const { cipher, secret } = encrypt('hello world')
  console.log(cipher, secret)
  const message = decrypt({ cipher, secret })
  console.log(message)
}

export default demo
