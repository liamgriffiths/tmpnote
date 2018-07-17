// @flow

import loadable from 'loadable-components'

export const Home = loadable(() => import('./Home'))
export const Patterns = loadable(() => import('./Patterns'))
export const NewNote = loadable(() => import('./NewNote'))
export const ReadNote = loadable(() => import('./ReadNote'))
