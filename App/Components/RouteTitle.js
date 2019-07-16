import React from 'react'
import {View} from 'react-native'
import {Text} from './'
import {Metrics} from '../Themes'

export default RouteTitle = props => {
	const {t, s} = props

	return (
	<View style={{flex:1}}>
		<Text bold center lg numberOfLines={2} branding>{t}</Text>
		{s && <Text sm mute center numberOfLines={1}>{s}</Text>}
	</View>
	)
}