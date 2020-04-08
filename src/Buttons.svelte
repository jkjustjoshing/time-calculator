<script>
  import { store } from './reducerStore'

  $: state = $store.state
  $: dispatch = $store.dispatch

  const numbers = Array(10)
    .fill()
    .map((_, i) => i)

  const times = ['h', 'm', 's']

  const operands = [
    { text: '+', fn: (a, b) => a + b },
    { text: '-', fn: (a, b) => a - b },
    { text: '÷', fn: (a, b) => a / b },
    { text: '×', fn: (a, b) => a * b }
  ]

  const numberClick = e => {
    dispatch({ type: 'NUMBER', value: e.target.textContent })
  }
  const timeClick = value => {
    dispatch({ type: 'TIME', value })
  }
  const operandClick = operand => {
    dispatch({ type: 'OPERAND', value: operand })
  }
</script>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      'n-7 n-8 n-9 t-h'
      'n-4 n-5 n-6 t-m'
      'n-1 n-2 n-3 t-s'
      'n-0 .   .   .  ';
  }
  .grid button {
    color: red;
  }
</style>

<div class="grid">
  {#each numbers as number}
    <button on:click={numberClick} style="grid-area: n-{number};">
      {number}
    </button>
  {/each}
  {#each times as time}
    <button on:click={() => timeClick(time)} style="grid-area: t-{time};">
      {time}
    </button>
  {/each}
  {#each operands as operand}
    <button on:click={() => operandClick(operand)}>{operand.text}</button>
  {/each}
</div>
