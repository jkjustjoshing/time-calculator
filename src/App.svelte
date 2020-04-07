<script>
  import Buttons from './Buttons.svelte'
  import Screen from './Screen.svelte'
  import { store } from './reducerStore'

  $: state = $store.state
  $: dispatch = $store.dispatch

  const handleButton = ({ detail }) => {
    if (detail.type === 'number') {
      dispatch({ type: 'NUMBER', value: detail.value })
    } else if (detail.type === 'operand') {
      dispatch({ type: 'OPERAND', value: detail.value })
    }
  }
</script>

<style>

</style>

<main>
  <Screen {state} />
  <Buttons on:button={handleButton} />
  <button on:click={() => dispatch({ type: 'GET_RESULT' })}>=</button>
  <button on:click={() => dispatch({ type: 'CLEAR' })}>C</button>
</main>
