import React from 'react'
import {View} from 'react-native'
import {StackNavigator} from 'react-navigation'
import * as Screen from '../'
import {RouteTitle, Hamburger, HeaderButton} from '../../Components'

let DrawerStack = StackNavigator({
  Dashboard: {
    screen: Screen.DashboardScreen,
    navigationOptions:() => ({
      headerTitle: <RouteTitle t='Dashboard' />
    })
  },
  JobFeed: {
    screen: Screen.JobFeedScreen,
    navigationOptions:({navigation}) => ({
      headerTitle: <RouteTitle t='Jobs' />,
      headerRight: <HeaderButton icon='add-circle-outline' onPress={() => navigation.navigate('PostJob')} />
    })
  },
  Appointments: {
    screen: Screen.AppointmentsScreen,
    navigationOptions:({navigation}) => ({
      headerTitle: <RouteTitle t='Appointments' />,
      headerRight: <HeaderButton icon='add-circle-outline' onPress={() => navigation.navigate('CreateAppointment')} />
    })
  },
  Users: {
    screen: Screen.UsersScreen,
    navigationOptions:({navigation}) => ({
      headerTitle: <RouteTitle t='Users' />,
      headerRight: <HeaderButton icon='add-circle-outline' onPress={() => navigation.navigate('CreateUser')} />
    })
  },
  Organizations: {
    screen: Screen.OrganizationsScreen,
    navigationOptions:({navigation}) => ({
      headerTitle: <RouteTitle t='Organizations' />,
      headerRight: <HeaderButton icon='add-circle-outline' onPress={() => navigation.navigate('CreateOrganization')} />
    })
  },
  Me: {
    screen: Screen.MeScreen,
    navigationOptions:() => ({
      headerTitle: <RouteTitle t='Me' />
    })
  },
  Settings: {
    screen: Screen.SettingsScreen,
    navigationOptions:() => ({
      headerTitle: <RouteTitle t='Settings' />
    })
  },
  ReportIndex: {
    screen: Screen.ReportIndexScreen,
    navigationOptions:() => ({
      headerTitle: <RouteTitle t='Report' />
    })
  },
},{
  initialRouteName: 'JobFeed',
  navigationOptions:() => ({
    headerLeft: <Hamburger />,
    headerRight: <View />
  })
})

export default DrawerStack