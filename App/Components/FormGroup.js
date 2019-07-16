import React, {Component, PropTypes} from 'react'
import {View} from 'react-native'
import {Metrics} from '../Themes'

export default FormGroup = props => {
	return (
		<View style={{marginVertical:Metrics.msm,...props.style}}>
			{props.children}
		</View>
	)
}