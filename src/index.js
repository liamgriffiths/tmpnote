import React from 'react'
import { hydrate, render } from 'react-dom'
import { loadComponents, getState } from 'loadable-components'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

window.snapSaveState = () => getState()

const rootElement = document.getElementById('root')
if (rootElement.hasChildNodes()) {
  loadComponents().then(() => {
    hydrate(<App />, rootElement)
  });
} else {
  render(<App />, rootElement)
}

registerServiceWorker()
