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

<div>
  {#each numbers as number}
    <button on:click={numberClick}>{number}</button>
  {/each}
  {#each operands as operand}
    <button on:click={() => operandClick(operand)}>{operand.text}</button>
  {/each}
</div>
