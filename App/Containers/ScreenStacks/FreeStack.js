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
  Banner: {
    screen: Screen.BannerScreen,
    navigationOptions: { header:null }
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
            <TouchableOpacity onPress={() => navigate('Login')}>
              <Icon name='ios-exit' size={Metrics.icons.regular} color={Colors.branding} style={{marginLeft:Metrics.mb}}/>
            </TouchableOpacity>
          ),
          headerTitle: <RouteTitle t='Job Feed' />,
          headerRight: (
            <TouchableOpacity onPress={() => setParams({isSearching:true,func:() => alert('searched')})}>
              <Icon name='ios-search' size={Metrics.icons.regular} color={Colors.branding} style={{marginRight:Metrics.mb}} />
            </TouchableOpacity>
          )
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
  Me: {
    screen: Screen.MeScreen,
    navigationOptions:({navigation}) => ({
      headerTitle: <RouteTitle t='Me' />
    })
  },
  PDFViewer: {
    screen: Screen.PDFViewerScreen,
    navigationOptions:({navigation}) => ({
      headerTitle: <RouteTitle t={navigation.state.params.title || 'View PDF'} />
    })
  },
  WebView: { screen: Screen.WebViewScreen },

  Appointments: {
    screen: Screen.AppointmentsScreen,
    navigationOptions:() => ({
      headerTitle: <RouteTitle t='Appointments' />
    })
  },
},{
  initialRouteName: 'Banner',
  navigationOptions:() => ({
    headerRight: <View />
  })
})