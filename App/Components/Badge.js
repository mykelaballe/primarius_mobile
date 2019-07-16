import React, {Component, PropTypes} from 'react'
import {StyleSheet, View} from 'react-native'
import {Text} from './'
import {Metrics, Colors} from '../Themes'

export default Badge = props => {
	const {value, color, style, sm, xs} = props
		let size = 25

		if(sm) size = 20
		else if(xs) size = 18

		let badgeStyle = {
			width:size,
			height:size,
			borderRadius:size,
			justifyContent:'center',
			alignItems:'center',
		}

		if(color) badgeStyle.backgroundColor = color

		if(style) {
			badgeStyle = {
				...badgeStyle,
				...style
			}
		}

    return (
		<View style={badgeStyle}>
			{sm && <Text sm light>{value}</Text>}
			{xs && <Text xs light>{value}</Text>}
		</View>
	)
}