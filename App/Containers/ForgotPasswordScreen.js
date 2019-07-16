import React from 'react'
import {View, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../Themes'
import {ScrollView, Button, Text, Spacer, Section, Row} from '../Components'
import {Globals, Storage, Consts} from '../Utils'
import {API} from '../Services'
import Icon from 'react-native-vector-icons/Ionicons'

const {height, width} = Dimensions.get('window')

class ForgotPasswordScreen extends React.Component {

    state = {
        email: ''
    }

    handleSubmit = async () => {
        if(this.props.isConnected) {
            try {

                let {email} = this.state

                email = email.trim()

                if(email === '') alert('Please enter your email')
                else {
                    alert('Successful')
                }
            }
            catch(err) {
                alert(Globals.error.generic)
            }
        }
        else {
            alert(Globals.error.network)
        }
    }

    render() {

        const {email} = this.state

        return (
            <ScrollView style={style.container}>

                <View style={{marginTop:150}}>

                   <Section style={{elevation:0}}>

                        <View style={{paddingTop:50}}>

                            <View style={style.inputContainer}>
                                <TextInput
                                    ref='email'
                                    style={style.input}
                                    onChangeText={email => this.setState({email})}
                                    value={email}
                                    placeholder='Email'
                                    returnKeyType='next'
                                    onSubmitEditing={this.handleSubmit}
                                    keyboardType='default'
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    underlineColorAndroid='transparent'
                                />
                            </View>

                            <View style={{marginTop:30}}>
                                <Button lg text='Submit' type='success' onPress={this.handleSubmit} />
                            </View>
                        </View>

                   </Section>

                    <View style={style.imgContainer}>
                        <Image source={Images.logo} style={style.img} resizeMode='contain' />
                    </View>

                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        padding:Metrics.pdb,
        backgroundColor:Colors.branding
    },
    inputContainer: {
        marginVertical:Metrics.msm,
      },
    imgContainer: {
        position:'absolute',
        top:-150,
        left:70,
        paddingVertical:Metrics.py,
        justifyContent:'center',
        alignItems:'center',
    },
    img: {
        width:width / 2,
        height:height / 4,
    },
    input: {
        ...AppStyles.input,
        elevation:0,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.branding
    }
})

mapStateToProps = state => {
    return {
        isConnected: state.network.isConnected
    }
}

export default connect(mapStateToProps)(ForgotPasswordScreen)