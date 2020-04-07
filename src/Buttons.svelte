<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  const numbers = Array(10)
    .fill()
    .map((_, i) => i)
  const operands = [
    { text: '+', fn: (a, b) => a + b },
    { text: '-', fn: (a, b) => a - b },
    { text: '/', fn: (a, b) => a / b },
    { text: '×', fn: (a, b) => a * b }
  ]

  const numberClick = e => {
    const number = parseInt(e.target.textContent, 10)
    dispatch('button', { type: 'number', value: number })
  }
  const operandClick = operand => {
    dispatch('button', { type: 'operand', value: operand })
  }
</script>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      'n-7 n-8 n-9'
      'n-4 n-5 n-6'
      'n-1 n-2 n-3'
      'n-0 . .';
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
  {#each operands as operand}
    <button on:click={() => operandClick(operand)}>{operand.text}</button>
  {/each}
</div>
