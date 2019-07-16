import React, {Component, PropTypes} from 'react'
import {ActivityIndicator as AI, Platform} from 'react-native'
import {Metrics, Colors} from '../Themes'

export default ActivityIndicator = props => {
	const {animating, color} = props
	return <AI animating={animating || true} size={Platform.OS === 'ios' ? 1 : Metrics.icons.tiny} color={color || Colors.branding} />
}