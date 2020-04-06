<script>
  import Numbers from './Numbers.svelte'
  import { store, send } from './machineStore'

  export let name

  const handleNumber = ({ detail }) => {
    send({ type: 'NUMBER', value: detail.number })
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
  <Numbers on:number={handleNumber} />
</main>
