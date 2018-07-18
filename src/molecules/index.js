// @flow

import loadable from 'loadable-components'

import Message from './Message'
const CopyLink = loadable(() => import('./CopyLink'))

export {
  Message,
  CopyLink,
}
