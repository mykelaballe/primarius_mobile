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

class LoginScreen extends React.Component {

    state = {
        username: '',
        password: ''
    }

    handleLogin = async () => {
        if(this.props.isConnected) {
            try {

                let {username, password} = this.state

                username = username.trim()
                password = password.trim()

                if(username === '' || password === '') {
                    alert('Please fill in all fields')
                }
                else {
                    let data = await API.login({username, password})
            
                    if(data.user) {
                        this.props.login()
                        this.props.setUser(data.user)
                    }
                    else {
                        alert(data.message)
                    }
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

        const {username, password} = this.state
        const {navigate} = this.props.navigation

        return (
            <ScrollView style={style.container}>

                <View style={{marginTop:150}}>

                   <Section style={{elevation:0}}>

                        <View style={{paddingTop:50}}>
                            <View style={style.inputContainer}>
                                <TextInput
                                    ref='username'
                                    style={style.input}
                                    onChangeText={username => this.setState({username})}
                                    value={username}
                                    placeholder='Username'
                                    returnKeyType='next'
                                    onSubmitEditing={() => this.refs.password.focus()}
                                    keyboardType='default'
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    underlineColorAndroid='transparent'
                                />
                            </View>
                            
                            <View style={style.inputContainer}>
                                <TextInput
                                    ref='password'
                                    style={style.input}
                                    onChangeText={password => this.setState({password})}
                                    value={password}
                                    placeholder='Password'
                                    returnKeyType='go'
                                    onSubmitEditing={this.handleLogin}
                                    keyboardType='default'
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    underlineColorAndroid='transparent'
                                    secureTextEntry
                                />
                            </View>

                            <View style={{marginTop:30}}>
                                <Button lg text='Login' type='success' onPress={this.handleLogin} />
                            </View>
                        </View>

                   </Section>

                    <View style={style.imgContainer}>
                        <Image source={Images.logo} style={style.img} resizeMode='contain' />
                    </View>

                </View>

                <Row bw style={{paddingTop:Metrics.pb}}>    
                    <TouchableOpacity onPress={() => navigate('SignUp')}>
                        <Text bold light>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
                        <Text bold light>Reset Password</Text>
                    </TouchableOpacity>
                </Row>
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

mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch(Actions.login()),
        setUser: (user) => dispatch(Actions.setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)