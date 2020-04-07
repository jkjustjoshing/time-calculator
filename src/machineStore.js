import { interpret } from 'xstate'
import { readable } from 'svelte/store'
import { calculationMachine } from './machines/calculationMachine'

const service = interpret(calculationMachine, {})

export const store = readable(calculationMachine.initialState, (set) => {
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
