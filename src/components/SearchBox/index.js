import React from 'react'
import { Container, Icon, Input } from './styled'

function SearchBox (props) {
  const { onChangeText, value } = props
  const handleChange = onChangeText || (() => null)
  const containerStyles = [{ ...props.style }, props.width ? { width: props.width } : null]
  const inputStyles = { ...props.inputStyle }
  const inputProps = {
    autoCapitalize: props.autoCapitalize || 'sentences',
    autoCorrect: props.autoCorrect || true,
    onChangeText: handleChange,
    placeholder: props.placeholder || '',
    value
  }

  return (
    <Container style={containerStyles}>
      <Icon name='search' size={24} />
      <Input {...inputProps} {...inputStyles} />
    </Container>
  )
}

export default SearchBox
