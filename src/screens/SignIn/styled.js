import styled from 'styled-components/native'

export const Container = styled.View`
  align-items: center;
  flex: 1;
  padding: 20px
`

export const Logo = styled.Image.attrs({
  source: require('../../assets/logo.png')
})`
  margin: 106px 0 48px;
  height: 28px;
  width: 183px;
`

export const Title = styled.Text`
  font-size: 16px;
`
