import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Colors, Metrics} from '../Themes'

export default HR = props => {

  let baseStyle = {
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:Colors.gray,
  }

  if(props.mv) baseStyle.marginVertical = Metrics.mb

  return <View style={[baseStyle,{...props.style}]} />
}