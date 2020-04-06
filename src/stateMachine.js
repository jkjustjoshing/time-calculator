import { Machine, assign } from 'xstate'

const inputNumber = assign({
  number1: (context, event) => {
    return context.number1 + event.value
  },
})

export const stateMachine = Machine(
  {
    id: 'calculator',
    initial: 'init',
    context: {
      number1: '',
      operand: null,
      number2: '',
    },
    states: {
      init: {
        on: {
          NUMBER: {
            target: 'waitingForInput',
            actions: 'inputNumber',
          },
        },
      },
      waitingForInput: {
        on: {
          NUMBER: {
            target: 'waitingForInput',
            actions: 'inputNumber',
          },
          OPERAND: 'waitingForSecondInput',
        },
      },
      waitingForSecondInput: {
        on: {
          NUMBER: 'waitingForSecondInput',
          GET_RESULT: 'result',
        },
      },
      result: {
        type: 'final',
      },
    },
  },
  {
    actions: { inputNumber },
  }
)
