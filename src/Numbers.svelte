<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  const numbers = Array(10)
    .fill()
    .map((_, i) => i + 1)

  const buttonClick = e => {
    const number = parseInt(e.target.textContent, 10)
    dispatch('number', { number })
  }
</script>

<div>
  {#each numbers as number}
    <button on:click={buttonClick}>{number}</button>
  {/each}
</div>
