// @flow

import React from 'react'

export type Update<State> = (State) => Promise<State>
export type Action<State, Fn> = ({ state: State, update: Update<State> }) => Fn

const stateful: (*) => (*) => *
= (initialState, mounted) => (Component) => {
  return class StatefulComponent extends React.Component<*, *> {
    state = {
      store: initialState,
    }

    update: Update<*>
    = (nextState) => new Promise((resolve) => {
      this.setState({ store: nextState }, resolve(this.state))
    })

    render() {
      return (
        <Component
          {...this.props}
          state={this.state.store}
          update={this.update} />
      )
    }
  }
}

export default stateful
