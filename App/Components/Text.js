import React from 'react'
import { View, StyleSheet, Text as Txt } from 'react-native'
import {Metrics, Colors, Fonts} from '../Themes'
import {Translator} from '../Utils'

export default Text = props => {
  let style = {
    color:Colors.dark,
    fontSize:Fonts.size.lgmedium
  }

  if(props.xs) style.fontSize = Fonts.size.tiny
  else if(props.sm) style.fontSize = Fonts.size.small
  else if(props.lg) style.fontSize = Fonts.size.input
  else if(props.xl) style.fontSize = Fonts.size.h5
  else if(props.h3) style.fontSize = Fonts.size.h3
  else if(props.h4) style.fontSize = Fonts.size.h4

  if(props.bold) style.fontWeight = 'bold'

  if(props.mute) style.color = Colors.mute
  if(props.primary) style.color = Colors.primary
  if(props.success) style.color = Colors.success
  if(props.info) style.color = Colors.info
  if(props.warning) style.color = Colors.warning
  if(props.danger) style.color = Colors.danger
  if(props.color) style.color = props.color
  if(props.light) style.color = Colors.light
  if(props.branding) style.color = Colors.branding
  if(props.purple) style.color = Colors.purple

  if(props.center) style.textAlign = 'center'
  if(props.right) style.textAlign = 'right'

  if(props.italic) style.fontStyle = 'italic'

  return <Txt style={style} {...props}>{props.children}</Txt>
}