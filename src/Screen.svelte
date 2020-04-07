<script>
  export let state

  $: text =
    (state.number1 || '') +
    (state.operand ? state.operand.text : '') +
    (state.number2 || '')

  $: if (state.result != null) {
    text += '=' + state.result
  }
</script>

<div>{text}</div>
