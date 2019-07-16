import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Colors, Metrics} from '../Themes'

export default VR = props => {

  const {m, style} = props

  let baseStyle = {
    borderRightWidth:StyleSheet.hairlineWidth,
    borderColor:Colors.gray,
  }

  if(m) baseStyle.marginHorizontal = Metrics.mb

  return <View style={[baseStyle,{...style}]} />
}