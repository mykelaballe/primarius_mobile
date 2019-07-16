import React, {Component, PropTypes} from 'react'
import { ScrollView as MainScrollView, StyleSheet, View, RefreshControl, Dimensions, Keyboard, LayoutAnimation, KeyboardAvoidingView } from 'react-native'
import {connect} from 'react-redux'
import {Globals} from '../Utils'
import {Metrics, Colors} from '../Themes'
import Toast from 'react-native-root-toast'

class ScrollView extends Component {

  	constructor(props) {
	  super(props)
	  const {height, width} = Dimensions.get('window')
	  this.state={
			refreshing: false,
			height,
			width
		}
	}
	
	componentWillMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove()
		this.keyboardDidHideListener.remove()
	}

	keyboardDidShow = e => LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

	keyboardDidHide = e => LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

	handleOnRefresh() {
		if(this.props.isConnected) this.props.onRefresh()
		else Toast.show(Globals.error.generic)
		//this.props.onRefresh()
	}
  
	render() {
		const {onRefresh, clip, height, deviceWidth, nopad} = this.props

		let refreshStatus = this.props.refreshing ? this.props.refreshing : this.state.refreshing
		
		let clipSubview = typeof clip !== 'undefined' && !clip ? false : true
		
		let refreshControl = typeof onRefresh !== 'undefined' ? 
												<RefreshControl
														refreshing={refreshStatus}
														colors={[Colors.branding]}
														onRefresh={() => this.handleOnRefresh()}
													/> : null
			
		let baseStyles = {
			backgroundColor:Colors.gray,
		}

		let styles = baseStyles

		if(this.props.style) {
			styles = [
				styles,
				this.props.style,
			]
		}

		if(this.props.light) styles.backgroundColor = Colors.light

		let keyboardStyle = {
			padding:Metrics.pb,
			marginBottom:Metrics.mtb
		}

		if(nopad) {
			keyboardStyle.padding = 0
			keyboardStyle.marginBottom = 0
		}

		return (
			<MainScrollView
				ref='scrollView'
				enableEmptySections={true}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				refreshControl={refreshControl}
				removeClippedSubviews={clipSubview}
				{...this.props}
				style={styles}
			>
			
			<KeyboardAvoidingView style={keyboardStyle}>
				{this.props.children}
			</KeyboardAvoidingView>
			
		</MainScrollView>
		)
	}
}

const mapStateToProps = (state) => {
  return {
	isConnected: state.network.isConnected,
	deviceWidth: state.app.deviceWidth
  }
}

export default connect(mapStateToProps)(ScrollView)