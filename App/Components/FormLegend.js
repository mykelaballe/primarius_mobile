import React from 'react'
import {View} from 'react-native'
import {Metrics, Colors} from '../Themes'
import {FormGroup, Text} from './'

export default FormLegend = props => {
  return (
    <FormGroup>
      <Text bold lg style={{color:Colors.branding}}>{props.title}</Text>
    </FormGroup>
  )
}