<script>
  import Buttons from './Buttons.svelte'
  import Screen from './Screen.svelte'
  import { store } from './reducerStore'

  $: state = $store.state
  $: dispatch = $store.dispatch
</script>

<style>

</style>

<main>
  <Screen {state} />
  <Buttons />
  <button on:click={() => dispatch({ type: 'GET_RESULT' })}>=</button>
  <button on:click={() => dispatch({ type: 'CLEAR' })}>C</button>
</main>
