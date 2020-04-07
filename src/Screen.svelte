<script>
  export let state

  const format = ({ value, isTime }) => {
    console.log('foo')
    if (!isTime) {
      return value
    }
    const hours = Math.floor(value / 3600)
    const minutes = Math.floor((value - hours * 3600) / 60)
    const seconds = (value - hours * 3600 - minutes * 60).toFixed(2)

    let output = []
    if (hours) {
      output.push(hours + 'h')
    }
    if (hours || minutes) {
      output.push(minutes + 'm')
    }
    output.push(seconds + 's')

    return output.join('')
  }

  $: text =
    (state.number1 || '') +
    (state.operand ? state.operand.text : '') +
    (state.number2 || '')

  $: if (state.result != null) {
    text += '=' + format(state.result)
  }
</script>

<div>{text}</div>
