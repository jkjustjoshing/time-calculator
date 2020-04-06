import { interpret } from 'xstate'
import { readable } from 'svelte/store'
import { stateMachine } from './stateMachine'

const service = interpret(stateMachine, {})

export const store = readable(stateMachine.initialState, (set) => {
  service.onTransition((state) => {
    console.log('new state', state)
    if (state.changed) {
      set(state)
    }
  })

  service.start()

  return () => service.stop()
})

export const send = service.send
