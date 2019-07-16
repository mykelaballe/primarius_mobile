import React, {Component, PropTypes} from 'react'
import {TouchableOpacity} from 'react-native'
import {Metrics, Colors} from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'

export default HeaderButton = props => {
	const {icon, onPress, children} = props

	return (
		<TouchableOpacity onPress={onPress} style={{paddingHorizontal:Metrics.pb}}>
			<Icon name={`ios-${icon}`} size={Metrics.icons.medium} color={Colors.branding} />
			{children}
		</TouchableOpacity>
	)
}