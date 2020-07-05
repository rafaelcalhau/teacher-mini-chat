import React from 'react'
import { Container, Label, TextInput } from './styled'

function InputText (props) {
  const { align, label, labelAlign, width, style } = props

  const containerProps = {
    style,
    width: width || '100%'
  }

  const inputProps = {
    ...props,
    align: align || 'left',
    width: '100%'
  }

  const labelProps = {
    align: labelAlign || 'left'
  }

  return (
    <Container {...containerProps}>
      {label && <Label {...labelProps}>{label}</Label>}
      <TextInput {...inputProps} />
    </Container>
  )
}

export default InputText
