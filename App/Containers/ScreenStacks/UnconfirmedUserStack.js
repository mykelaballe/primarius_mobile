import React from 'react'
import {View, TextInput, TouchableOpacity} from 'react-native'
import {StackNavigator} from 'react-navigation'
import * as Screen from '../'
import {RouteTitle, Row, Text, Avatar, HeaderButton} from '../../Components'
import {Colors, Metrics} from '../../Themes'
import Icon from 'react-native-vector-icons/Ionicons'
import HomeStack from './HomeStack'

export default StackNavigator({
  Home: {
    screen: Screen.CompleteAppointmentReminderScreen,
    navigationOptions:({navigation}) => ({
      headerTitle: <RouteTitle t='Complete Registration' />,
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('Me')}>
          <Avatar source={null} size={Metrics.images.regular} style={{marginLeft:Metrics.mb}}/>
        </TouchableOpacity>
      )
    })
  },
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

  Me: {
    screen: Screen.MeScreen,
    navigationOptions:({navigation}) => ({
      headerTitle: <RouteTitle t='Me' />
    })
  },
  EditUser: {
    screen: Screen.EditUserScreen,
    navigationOptions:({navigation}) => ({
      headerTitle: <RouteTitle t='Edit Profile' />
    })
  },
  UserJobHistory: {
    screen: Screen.UserJobHistoryScreen,
    navigationOptions:({navigation}) => ({
      headerTitle: <RouteTitle t='Job History' />
    })
  },
},{
  initialRouteName: 'Home',
  navigationOptions:() => ({
    headerRight: <View />
  })
})