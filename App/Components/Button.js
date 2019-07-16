import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import {Metrics, Colors, Fonts} from '../Themes'
import {ActivityIndicator} from './'

const DEF_COLOR = Colors.branding

class Button extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      processing:false
    }
  }

  componentWillReceiveProps = nextProps => this.setState({processing:nextProps.processing})

  handleOnPress = async () => {
    const {processing} = this.state
    if(processing) return false
    this.setState({processing:true})
    await this.props.onPress()
    this.setState({processing:false})
  }
  
  render() {

    const {processing} = this.state
    const {text, style, xs, sm, rg, type, ml, mr, mt, mb, mv, outline} = this.props
    let loader_color = Colors.light

    let btnStyle = {
      btn: {
        backgroundColor:DEF_COLOR,
        padding:Metrics.pb,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:Metrics.rb,
        flexDirection:'row'
      },
      btnText: {
          color:Colors.light,
          fontWeight:'bold',
          textAlign:'center',
      },
    }

    if(xs) {
      btnStyle.btnText.fontSize = Fonts.size.xsmall
      btnStyle.btn.padding = Metrics.psm
    }
    else if(sm) btnStyle.btnText.fontSize = Fonts.size.small

    if(rg) delete btnStyle.btnText.fontSize

    if(type) btnStyle.btn.backgroundColor = Colors[type]

    if(style) {
      btnStyle.btn = {
        ...btnStyle.btn,
        ...style
      }
    }

    if(ml) btnStyle.btn.marginLeft = Metrics.msm
    if(mr) btnStyle.btn.marginRight = Metrics.msm
    if(mt) btnStyle.btn.marginTop = Metrics.msm
    if(mb) btnStyle.btn.marginBottom = Metrics.msm
    if(mv) btnStyle.btn.marginVertical = Metrics.msm

    if(outline) {
      delete btnStyle.btn.backgroundColor
      btnStyle.btn.borderWidth = 1
      btnStyle.btn.borderColor = type ? Colors[type] : DEF_COLOR
      btnStyle.btnText.color = type ? Colors[type] : DEF_COLOR
      loader_color = type ? Colors[type] : DEF_COLOR
    }

    return (
      <TouchableOpacity onPress={() => this.handleOnPress()} style={btnStyle.btn}>
        {(this.props.processing || processing) &&
        <View style={{marginRight:Metrics.mxs}}>
          <ActivityIndicator animating={true} color={loader_color} />
        </View>
        }
        <Text style={btnStyle.btnText}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

export default Button