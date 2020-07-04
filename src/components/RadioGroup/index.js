import React from 'react'
import { RadioButton } from 'react-native-paper'
import { Container, Label, Options } from './styled'

function RadioGroup (props) {
  const { horizontal, onChange, options, title, value } = props
  const handleChange = onChange || (() => null)
  const containerStyles = [{ ...props.style }, props.width ? { width: props.width } : null]

  return (
    <Container style={containerStyles}>
      {title && <Label>{title}</Label>}
      <Options horizontal={horizontal}>
        {
          (options || []).map((option, index) => (
            <RadioButton
              key={index}
              value={value}
              status={option.checked === option.value ? 'checked' : 'unchecked'}
              onPress={() => handleChange(option.value)}
            />
          ))
        }
      </Options>
    </Container>
  )
}

export default RadioGroup
