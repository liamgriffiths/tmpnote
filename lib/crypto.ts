import { randomBytes, secretbox } from "tweetnacl";
import {
  encodeUTF8,
  decodeUTF8,
  encodeBase64,
  decodeBase64,
} from "tweetnacl-util";

type Credentials = {
  nonce: Uint8Array;
  key: Uint8Array;
};

type Encrypted = {
  cipher: string;
  secret: string;
};

// Generates a new random credentials
const generateCredentials = (
  nonceLength = secretbox.nonceLength,
  keyLength = secretbox.keyLength
): Credentials => {
  return {
    nonce: randomBytes(nonceLength),
    key: randomBytes(keyLength),
  };
};

// Joins two Uint8Arrays into one
const join = (a: Uint8Array, b: Uint8Array): Uint8Array => {
  const c = new Uint8Array(a.length + b.length);
  c.set(a);
  c.set(b, a.length);
  return c;
};

// Splits a Uint8Array into two Uint8Arrays at the given offset
const split = (offset: number, bytes: Uint8Array): [Uint8Array, Uint8Array] => {
  return [bytes.subarray(0, offset), bytes.subarray(offset)];
};

// Encrypts a message with a given credentials and encode as Base64
export const encrypt = (
  plaintext: string,
  credentials = generateCredentials()
): Encrypted => {
  // encode as typed array
  const bytes = decodeUTF8(plaintext);

  // encrypt, then encode to b64
  const box = secretbox(bytes, credentials.nonce, credentials.key);
  const cipher = encodeBase64(box);

  // combine nonce + key and encode to b64
  const secret = encodeBase64(join(credentials.nonce, credentials.key));

  return { cipher, secret };
};

// Decrypts a base64 encoded cipher with a base64 encoded secret and returns as UTF8
export const decrypt = (
  cipher: string,
  secret: string,
  nonceLength = secretbox.nonceLength
): string => {
  // convert base64 secret to nonce + key typed arrays
  const [nonce, key] = split(nonceLength, decodeBase64(secret));

  // convert base64 cipher to typed array "box", then open it
  const box = decodeBase64(cipher);
  const bytes = secretbox.open(box, nonce, key);

  // encode message as utf8 string
  const message = bytes === null ? "" : encodeUTF8(bytes);

  return message;
};
