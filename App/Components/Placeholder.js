import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Metrics, Colors, Fonts} from '../Themes'
import {Text} from './'
import Icon from 'react-native-vector-icons/Ionicons'

export default Placeholder = props => {
  let text = props.text ? props.text : 'No data'

    return (
      <View style={style.container}>
        <Icon name='ios-alert' size={100} color={Colors.mute} />
        <Text>{text}</Text>
      </View>
    )
}

const style = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center'
  }
})