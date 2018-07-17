// @flow

import React from 'react'

export type Update<State> = (State) => Promise<State>
export type Mounted<State> = ({ update: Update<State> }) => *

const stateful: (*, ?Mounted<*>) => (*) => *
= (initialState, mounted) => (Component) => {
  return class StatefulComponent extends React.Component<*, *> {
    state = {
      store: initialState,
    }

    componentDidMount() {
      if (mounted) mounted({ update: this.update })
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
