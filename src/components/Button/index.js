import React from 'react'
import { Button, Label } from './styled'

function CustomButton (props) {
  return (
    <Button {...props}>
      <Label outline={props.outline}>{props.label}</Label>
    </Button>
  )
}

export default CustomButton
