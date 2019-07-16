import React from 'react'
import {View, TextInput, TouchableOpacity} from 'react-native'
import {StackNavigator} from 'react-navigation'
import * as Screen from '../'
import {RouteTitle, Row, Text, Avatar} from '../../Components'
import {Colors, Metrics} from '../../Themes'
import Icon from 'react-native-vector-icons/Ionicons'

export default StackNavigator({
  Login: {
    screen: Screen.LoginScreen,
    navigationOptions: { header:null }
  },
  SignUp: {
    screen: Screen.SignUpScreen,
    navigationOptions:() => ({
      headerTitle: <RouteTitle t='Sign Up' />
    })
  },
  ForgotPassword: {
    screen: Screen.ForgotPasswordScreen,
    navigationOptions:() => ({
      headerTitle: <RouteTitle t='Reset Password' />
    })
  },
},{
  initialRouteName: 'Login',
  navigationOptions:() => ({
    headerRight: <View />
  })
})