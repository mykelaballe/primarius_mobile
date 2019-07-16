import React from 'react'
import { View, StyleSheet, Text, TouchableHighlight, ActivityIndicator } from 'react-native'
import {Metrics, Colors, Fonts} from '../Themes'
import Ionicon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

class DrawerItem extends React.Component {
  
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} style={style.drawerItem} underlayColor={Colors.secondary}>
          <View style={{flexDirection:'row'}}>
              {(!this.props.iconType || (this.props.iconType && this.props.iconType === 'ios')) && <Ionicon name={this.props.icon} size={Metrics.icons.small} style={style.icon} />}
              {(this.props.iconType && this.props.iconType === 'fa') && <FontAwesome name={this.props.icon} size={Metrics.icons.small} style={style.icon} />}
              <Text style={style.drawerItemText}>{this.props.label}</Text>
          </View>
      </TouchableHighlight>
    )
  }
}

const style = StyleSheet.create({
  drawerItem: {
    flexDirection:'row',
    padding:Metrics.pmb,
    alignItems:'center'
  },
  drawerItemText: {
    color:Colors.light,
    fontSize:Fonts.size.lgmedium
  },
  icon: {
    marginRight:Metrics.mb,
    color:Colors.light
  }
})

export default DrawerItem