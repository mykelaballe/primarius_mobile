/* created by mykelaballe on 4/19/18 */

import React, {Component, PropTypes} from 'react'
import {TouchableOpacity, View, Text, TouchableWithoutFeedback, StyleSheet, Dimensions, Modal as Mdl, Platform} from 'react-native'
import {connect} from 'react-redux'
import {Metrics, Colors} from '../Themes'
import Mdl2 from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'

const OS = Platform.OS

class Modal extends Component {
	
  constructor(props){
	  super(props)
	  this.state={
		  visible: false
	  }
  }
  
  componentWillReceiveProps(newProps){
	  this.setState({ visible: newProps.visible })
  }
  
  render() {
	
	const onRequestClose = this.props.onRequestClose
	const onBackButtonPress = typeof this.props.persist === 'undefined' ? onRequestClose : undefined
	const onBackdropPress = typeof this.props.persist === 'undefined' ? onRequestClose : undefined
	const {deviceWidth, deviceHeight} = this.props
	let minHeight = 0.10

	if(this.props.md) minHeight = 0.30
	  
	return (
		<Mdl2
			isVisible={this.state.visible}
			supportedOrientations={['portrait', 'landscape']}
			animationIn='zoomInDown'
			animationOut='zoomOutUp'
			onBackButtonPress={onBackButtonPress}
			onBackdropPress={onBackdropPress}
			onModalHide={onRequestClose}
		>

			{OS === 'ios' &&
			<View style={{alignItems:'flex-end'}}>
				<TouchableOpacity onPress={onBackdropPress}>
					<Icon name='ios-close-circle-outline' size={Metrics.icons.lgmedium} color={Colors.light} />
				</TouchableOpacity>
			</View>
			}
		
			<View style={styles.wrapper}>

				<View style={[styles.content,{width:deviceWidth * 0.75,minHeight:deviceHeight * minHeight}]}>
					{this.props.children}
				</View>
			
			</View>
			
		</Mdl2>
	)
  }
}

const styles = StyleSheet.create({
	wrapper: {
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	content: {
		backgroundColor:Colors.light,
		borderRadius:Metrics.rb,
		shadowColor: Colors.dark,
		shadowOffset: { width:0, height:2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
	}
})

const mapStateToProps = (state) => {
  return {
		deviceHeight: state.app.deviceHeight,
		deviceWidth: state.app.deviceWidth
	}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)