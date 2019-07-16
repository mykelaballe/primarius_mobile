import React from 'react'
import {View, StyleSheet, TouchableOpacity, PermissionsAndroid, NetInfo, Dimensions, Platform} from 'react-native'
import {connect} from 'react-redux'
import Actions from './App/Actions/Creators'
import NavigationRouter from './App/Navigation/NavigationRouter'
import {Globals, Storage, Consts, Translator, Fetch} from './App/Utils'
import {Colors, Metrics} from './App/Themes'
import {Text, NetworkStatus} from './App/Components'
import Toast from 'react-native-root-toast'
import SplashScreen from 'react-native-splash-screen'
import codePush from 'react-native-code-push'
import Orientation from 'react-native-orientation'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isLoggedIn: false, 
      router: null,
    }
  }

  componentDidMount = () => {
    this.handleOrientationChange()
    SplashScreen.hide()
    if(Platform.OS === 'android') this.requestPermissions()
    codePush.sync({...Consts.codepush})
  }

  componentWillReceiveProps = nextProps => this.setState({ isLoggedIn:nextProps.isLoggedIn })

  componentWillMount = () => {
    const {networkSuccess, networkFailure} = this.props
    Orientation.addOrientationListener(this.handleOrientationChange)
    NetInfo.isConnected.addEventListener('connectionChange',this.handleConnectivityChange)

    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected) networkSuccess()
      else networkFailure()
    })

    this.createLocalDBs().then(() => this.checkUser() )
  }

  componentWillUnmount = () => {
    Orientation.removeOrientationListener(this.handleOrientationChange)
    NetInfo.isConnected.removeEventListener('connectionChange',this.handleConnectivityChange)
  }

  handleConnectivityChange = isConnected => {
		if(isConnected) this.props.networkSuccess()
		else this.props.networkFailure()
  }

  handleOrientationChange = orientation => {
    Orientation.getOrientation((err, orientation) => {
      let {width, height} = Dimensions.get('window')
      this.props.updateDeviceDimensions(orientation, width, height)
    })
  }

  requestPermissions = async () => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
    }
    catch(err) {

    }
  }

  createLocalDBs = async () => {
    try {
      await Storage.doLoad(Globals.db.user)
    }
    catch(err) {
      if(err.name === 'NotFoundError') await Storage.doSave(Globals.db.user,{ data:null })
    }
  }

  checkUser = () => {
    Storage.doLoad(Globals.db.user)
    .then(db => {

      let user = db.data

      if(user) {
        this.props.setUser(user)
        this.setState({ isLoading:false, isLoggedIn: true })
      }
      else {
        this.setState({ isLoading:false, isLoggedIn: false })
      }

    })
  }

  render() {

    const {isLoading, isLoggedIn, router} = this.state
    
    return (
      <View style={{flex:1}}>
        <NetworkStatus />
        {!isLoading && <NavigationRouter isLoggedIn={isLoggedIn} />}
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    isConnected: state.network.isConnected,
    isLoggedIn: state.auth.isLoggedIn
  }
}

mapDispatchToProps = dispatch => {
  return {
    updateDeviceDimensions: (orientation, width, height) => dispatch(Actions.updateDeviceDimensions(orientation, width, height)),
    networkSuccess: () => dispatch(Actions.networkSuccess()),
    networkFailure: () => dispatch(Actions.networkFailure()),
    setUser: (user) => dispatch(Actions.setUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)