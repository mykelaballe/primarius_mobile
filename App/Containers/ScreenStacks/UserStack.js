import React from 'react'
import {View, TextInput, TouchableOpacity} from 'react-native'
import {StackNavigator} from 'react-navigation'
import * as Screen from '../'
import {RouteTitle, Row, Text, Avatar, HeaderButton} from '../../Components'
import {Colors, Metrics} from '../../Themes'
import Icon from 'react-native-vector-icons/Ionicons'
import HomeStack from './HomeStack'

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

  JobFeed: {
    screen: Screen.JobFeedScreen,
    navigationOptions:({navigation}) => {
      const {navigate, setParams} = navigation
      const {params = {}} = navigation.state
      let isSearching = params.isSearching || false

      if(isSearching) {
        return {
          headerLeft: null,
          headerTitle: (
            <View style={{flex:1,backgroundColor:Colors.light,marginHorizontal:Metrics.msm,borderRadius:5,elevation:1}}>
              <Row bw>
                <TextInput
                  style={{flex:1,padding:Metrics.mb}}
                  underlineColorAndroid='transparent'
                  autoFocus
                  placeholder='What are you looking for?'
                  returnKeyType='go'
                  onSubmitEditing={() => params.func()}
                />
                <TouchableOpacity onPress={() => setParams({isSearching:false})} style={{marginRight:Metrics.mb}}>
                  <Icon name='ios-close-circle' size={Metrics.icons.regular} color={Colors.lightgray} />
                </TouchableOpacity>
              </Row>
            </View>
          ),
          headerRight: null,
          headerStyle: {
            backgroundColor:Colors.branding
          }
        }
      }
      else {
        return {
          headerLeft: (
            <TouchableOpacity onPress={() => navigate('Me')}>
              <Avatar source={null} size={Metrics.images.regular} style={{marginLeft:Metrics.mb}}/>
            </TouchableOpacity>
          ),
          headerTitle: <RouteTitle t='Job Feed' />,
          /*headerRight: (
            <TouchableOpacity onPress={() => setParams({isSearching:true,func:() => alert('searched')})}>
              <Icon name='ios-search' size={Metrics.icons.regular} color={Colors.branding} style={{marginRight:Metrics.mb}} />
            </TouchableOpacity>
          )*/
        }
      }
    }
  },
  JobDetail: {
    screen: Screen.JobDetailScreen,
    navigationOptions:({navigation}) => ({
      headerTitle: <RouteTitle t='Job Detail' />
    })
  },
  PendingApplications: {
    screen: Screen.PendingApplicationsScreen,
    navigationOptions:({navigation}) => ({
      headerTitle: <RouteTitle t='Pending Applications' />
    })
  },
  ApprovedApplications: {
    screen: Screen.ApprovedApplicationsScreen,
    navigationOptions:({navigation}) => ({
      headerTitle: <RouteTitle t='Approved Applications' />
    })
  },
  CompletedApplications: {
    screen: Screen.CompletedApplicationsScreen,
    navigationOptions:({navigation}) => ({
      headerTitle: <RouteTitle t='Completed Applications' />
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
  UserProfile: {
    screen: Screen.UserProfileScreen,
    navigationOptions:({navigation}) => ({
      headerTitle: <RouteTitle t='User Profile' />
    })
  },

  PDFViewer: {
    screen: Screen.PDFViewerScreen,
    navigationOptions:({navigation}) => ({
      headerTitle: <RouteTitle t={navigation.state.params.title || 'View PDF'} />
    })
  },
  WebView: { screen: Screen.WebViewScreen },

  ViewOrganization: {
    screen: Screen.ViewOrganizationScreen,
    navigationOptions:({navigation}) => ({
      headerTitle: <RouteTitle t={navigation.state.params.Organization.name} s='Organization' />
    })
  },

  Appointments: {
    screen: Screen.AppointmentsScreen,
    navigationOptions:() => ({
      headerTitle: <RouteTitle t='Appointments' />
    })
  },
  ViewAppointment: {
    screen: Screen.ViewAppointmentScreen,
    navigationOptions:() => ({
      headerTitle: <RouteTitle t='Appointment' />
    })
  },
},{
  initialRouteName: 'JobFeed',
  navigationOptions:() => ({
    headerRight: <View />
  })
})