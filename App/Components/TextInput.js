import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Metrics} from '../Themes'

export default Spacer = props => {

  const {sm, xs, v} = props

  let style = {
    marginVertical:Metrics.mb
  }

  if(sm) style.marginVertical = Metrics.msm
  if(xs) style.marginVertical = Metrics.mxs

  if(v) {
    style.marginVertical = 0
    style.marginHorizontal = Metrics.msm
  }

  return <View style={style} />
}