import React from 'react'
import {Image} from 'react-native'
import {Metrics, Images} from '../Themes'
import {Globals} from '../Utils'

export default Cover = props => {
	let width = props.width || undefined,
		height = props.height || 160,
		source = props.source ? {uri:`${props.source.path ? Globals.s3 + props.source.path : props.source}`} : Images.default.cover

	return (
		<Image
			style={
				[
					{width, height},
					props.style
				]
			}
			source={source}
			resizeMode='cover'
		/>
	)
}