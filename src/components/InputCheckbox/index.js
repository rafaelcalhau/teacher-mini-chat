import React from 'react'
import { CheckBox } from 'react-native-elements'
import { Container, Label, Options } from './styled'
import theme from '../../theme'

function InputCheckbox (props) {
  let containerStyle = { ...props.style }
  const { center, horizontal, label, options, onChange, radio, value } = props
  const handlePress = onChange || (() => null)

  const optionsStyle = {
    ...props.optionsStyle,
    borderWidth: 0,
    backgroundColor: 'transparent',
    margin: 0,
    paddingHorizontal: 0,
    width: (props.optionWidth || 'auto')
  }

  if (props.style && Array.isArray(props.style)) {
    props.style.map(style => { containerStyle = { ...containerStyle, ...style } })
  }

  if (props.width) {
    containerStyle.width = props.width
  }

  return (
    <Container {...containerStyle}>
      {label && <Label>{label}</Label>}
      <Options horizontal={horizontal}>
        {
          (options || []).map((option, index) => (
            <CheckBox
              key={index}
              containerStyle={optionsStyle}
              center={center}
              checkedColor={theme.colors.primary}
              checkedIcon={radio ? 'dot-circle-o' : ''}
              uncheckedIcon={radio ? 'circle-o' : ''}
              textStyle={{ fontWeight: 'normal' }}
              title={option.label || 'Your label here'}
              checked={option.value === value}
              onPress={() => handlePress(option.value)}
            />
          ))
        }
      </Options>
    </Container>
  )
}

export default InputCheckbox
