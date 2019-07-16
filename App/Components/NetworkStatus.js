import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {View} from 'react-native'
import {Metrics, Images, Colors} from '../Themes'
import {Text} from './'
import Toast from 'react-native-root-toast'

class NetworkStatus extends Component {
  
  render() {

    if(this.props.isConnected) return null
	
		return (
			<View style={{backgroundColor:Colors.danger,paddingVertical:Metrics.pxs}}>
				<Text light sm center bold>No Network</Text>
			</View>
		)
  }
}

const mapStateToProps = (state) => {
  return {
		isConnected: state.network.isConnected
	}
}

export default connect(mapStateToProps)(NetworkStatus)