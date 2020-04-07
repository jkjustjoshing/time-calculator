import { Machine, assign } from 'xstate'

export const calculationMachine = Machine(
  {
    id: 'calculator',
    initial: 'init',
    context: {
      number1: '',
      operand: null,
      number2: '',
      result: null,
    },
    states: {
      init: {
        on: {
          NUMBER: {
            target: 'waitingForInput',
            actions: 'inputNumber1',
          },
        },
      },
      waitingForInput: {
        on: {
          NUMBER: {
            target: 'waitingForInput',
            actions: 'inputNumber1',
          },
          OPERAND: {
            target: 'waitingForSecondInput',
            actions: 'inputOperand',
          },
        },
      },
      waitingForSecondInput: {
        on: {
          NUMBER: {
            target: 'waitingForSecondInput',
            actions: 'inputNumber2',
          },
          GET_RESULT: {
            target: 'result',
            actions: 'computeResult',
          },
        },
      },
      result: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      inputNumber1: assign({
        number1: (context, event) => context.number1 + event.value,
      }),
      inputNumber2: assign({
        number2: (context, event) => context.number2 + event.value,
      }),
      inputOperand: assign({
        operand: (context, event) => event.value,
      }),
      computeResult: assign({
        result: (context) => {
          const a = parseInt(context.number1, 10)
          const b = parseInt(context.number2, 10)
          return context.operand.fn(a, b)
        },
      }),
    },
  }
)
