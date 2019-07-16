import React, {Component, PropTypes} from 'react'
import {TouchableOpacity, View, StyleSheet, Dimensions, Picker as Pckr, Platform} from 'react-native'
import {Text, Modal} from './'
import {Metrics, Colors} from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'

const OS = Platform.OS

class Picker extends Component {
	
  constructor(props){
	  super(props)
	  this.state={
		selectedValue: props.selectedValue,
		showModal: false
	  }
  }

  componentWillReceiveProps = nextProps => this.setState({selectedValue:nextProps.selectedValue})
  
  handleValueChange = (itemValue, itemIndex) => {
		const {onValueChange, data} = this.props
		this.setState({
			selectedValue:data[itemIndex].value,
			showModal:false
		},() => onValueChange(data[itemIndex].value))
  }
  
  render() {

		const {showModal, selectedValue} = this.state
		const {style, data, prompt} = this.props
	
		if(OS === 'android') {
			return (
				<Pckr
					prompt={prompt}
					selectedValue={selectedValue}
					style={style}
					onValueChange={this.handleValueChange}>
					{data.map((d, i) => <Pckr.Item key={i} label={d.label} value={d.value} />)}
				</Pckr>
			)
		}

		if(OS === 'ios') {
			let filteredOpts = data.filter(d => d.value === selectedValue)
			let selected = data[0].label

			if(filteredOpts.length > 0) selected = filteredOpts[0].label

			return (
				<View style={{flex:1}}>
					<Modal
						visible={showModal}
						md
						onRequestClose={() => this.setState({showModal:false})}
					>
						<Pckr
							selectedValue={selectedValue}
							style={[style,{marginTop:0}]}
							onValueChange={this.handleValueChange}>
							{data.map((d, i) => <Pckr.Item key={i} label={d.label} value={d.value} />)}
						</Pckr>
					</Modal>

					<TouchableOpacity onPress={() => this.setState({showModal:true})} style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
						<Text>{selected}</Text>
						<Icon name='ios-arrow-forward' size={Metrics.icons.regular} color={Colors.dark} />
					</TouchableOpacity>
				</View>
			)
		}
	
  }
}

export default Picker