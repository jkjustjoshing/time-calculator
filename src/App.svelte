<script>
  import Buttons from './Buttons.svelte'
  import { store } from './reducerStore'

  export let name

  const { state, dispatch } = $store

  $: console.log($store.state)

  const handleButton = ({ detail }) => {
    console.log('button', detail)
    if (detail.type === 'number') {
      dispatch({ type: 'NUMBER', value: detail.value })
    } else if (detail.type === 'operand') {
      console.log('operand')
      dispatch({ type: 'OPERAND', value: detail.value })
    }
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps. {JSON.stringify($store.state)}
  </p>
  <Buttons on:button={handleButton} />
  <button on:click={() => dispatch({ type: 'GET_RESULT' })}>=</button>
</main>
