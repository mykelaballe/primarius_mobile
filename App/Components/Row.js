import React from 'react'
import {View} from 'react-native'

export default Row = props => {

	let style = {
		flexDirection:'row',
		alignItems:'center'
	}

	if(props.f) style.flex = 1

	if(props.bw) style.justifyContent = 'space-between'

	return <View style={[style,{...props.style}]}>{props.children}</View>
}