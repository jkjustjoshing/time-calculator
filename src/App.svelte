<script>
  import Buttons from './Buttons.svelte'
  import { store, send } from './machineStore'

  export let name

  const handleButton = ({ detail }) => {
    console.log('button', detail)
    if (detail.type === 'number') {
      send({ type: 'NUMBER', value: detail.value })
    } else if (detail.type === 'operand') {
      console.log('operand')
      send({ type: 'OPERAND', value: detail.value })
    }
  }

  $: context = JSON.stringify($store.context)
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
    to learn how to build Svelte apps. {context}
  </p>
  <Buttons on:button={handleButton} />
  <button on:click={() => send({ type: 'GET_RESULT' })}>=</button>
</main>
