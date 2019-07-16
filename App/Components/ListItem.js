import React from 'react'
import {View} from 'react-native'
import {AppStyles} from '../Themes'

export default ListItem = props => <View style={[AppStyles.listItem,{...props.style}]}>{props.children}</View>