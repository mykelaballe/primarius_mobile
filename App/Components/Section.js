import React from 'react'
import {View} from 'react-native'
import {AppStyles} from '../Themes'

export default Section = props => <View style={[AppStyles.list,{...props.style}]}>{props.children}</View>