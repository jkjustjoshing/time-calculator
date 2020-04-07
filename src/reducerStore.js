import { readable } from 'svelte/store'

const reducer = (state, action) => {
  if (action.type === 'NUMBER') {
    if (state.result != null) {
      return state
    }

    const key = state.operand ? 'number2' : 'number1'
    return { ...state, [key]: (state[key] || '') + action.value }
  }

  if (action.type === 'OPERAND') {
    return { ...state, operand: action.value }
  }

  if (action.type === 'GET_RESULT') {
    const number1 = parseInt(state.number1)
    const number2 = parseInt(state.number2)
    return { ...state, result: state.operand.fn(number1, number2) }
  }

  if (action.type === 'CLEAR') {
    return initValue
  }

  return state
}

const initValue = { number1: null, operand: null, number2: null }

export const store = readable(null, (set) => {
  const innerStore = { state: initValue }

  const dispatch = (action) => {
    const newState = reducer(innerStore.state, action)
    innerStore.state = newState
    set({ dispatch, state: newState })
  }

  set({ dispatch, state: initValue })
})
