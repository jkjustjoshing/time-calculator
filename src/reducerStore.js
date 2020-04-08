import { readable } from 'svelte/store'

const units = {
  h: 3600,
  m: 60,
  s: 1,
}

const parseTime = (timeString) => {
  const parts = Array.from(timeString).reduce(
    (acc, nextChar) => {
      const obj = acc[acc.length - 1]
      if (nextChar.match(/\d|\./)) {
        obj.text += nextChar
      } else {
        obj.unit = nextChar
        acc.push({ text: '' })
      }
      return acc
    },
    [{ text: '' }]
  )
  parts.pop()

  return parts.reduce((acc, next) => acc + +next.text * units[next.unit], 0)
}

const reducer = (state, action) => {
  if (action.type === 'NUMBER') {
    if (state.result != null) {
      return state
    }

    const key = state.operand ? 'number2' : 'number1'
    return { ...state, [key]: (state[key] || '') + action.value }
  }

  if (action.type === 'DECIMAL') {
    if (state.result != null) {
      return state
    }

    const key = state.operand ? 'number2' : 'number1'
    return { ...state, [key]: (state[key] || '') + '.' }
  }

  if (action.type === 'TIME') {
    const key = state.operand ? 'number2' : 'number1'
    if (!state[key] || !state[key].match(/\d$/)) {
      return state
    }
    if (state[key].includes(action.value)) {
      return state
    }

    return { ...state, [key]: (state[key] || '') + action.value }
  }

  if (action.type === 'OPERAND') {
    return { ...state, operand: action.value }
  }

  if (action.type === 'GET_RESULT') {
    let number1,
      number2,
      isTime = false

    if (state.number1.match(/^(\d|\.)+$/)) {
      number1 = parseInt(state.number1, 10)
    } else {
      isTime = true
      number1 = parseTime(state.number1)
    }
    if (state.number2.match(/^(\d|\.)+$/)) {
      number2 = parseInt(state.number2, 10)
    } else {
      isTime = true
      number2 = parseTime(state.number2)
    }
    return {
      ...state,
      result: { value: state.operand.fn(number1, number2), isTime },
    }
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
