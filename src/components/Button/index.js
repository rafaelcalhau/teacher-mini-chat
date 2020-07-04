import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Button, Label } from './styled'
import theme from '../../theme'

function CustomButton (props) {
  const { label, loading, outline } = props
  const indicatorColor = outline
    ? theme.colors.primary
    : theme.colors.gray

  return (
    <Button {...props}>
      <Label outline={outline}>
        {!loading ? label : <ActivityIndicator color={indicatorColor} />}
      </Label>
    </Button>
  )
}

export default CustomButton
