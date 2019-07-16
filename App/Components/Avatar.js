import React from 'react'
import {Image} from 'react-native'
import {Metrics, Images} from '../Themes'
import {Globals} from '../Utils'

export default Avatar = props => {
	let wh = Metrics.images.medium,
		width = props.size || wh,
		height = props.size || wh,
		borderRadius = 0,
		source = props.source ? {uri:`${props.source.path ? Globals.s3 + props.source.path : props.source}`} : Images.default.avatar
	  
	borderRadius = (height > width) ? height / 2 : width / 2

	return (
		<Image
			style={
				[
					{width, height, borderRadius},
					props.style
				]
			}
			source={source}
		/>
	)
}