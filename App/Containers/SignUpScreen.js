import React from 'react'
import {View, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../Themes'
import {ScrollView, Button, Text, Spacer, Section, Row, ListItem} from '../Components'
import {Globals, Storage, Consts, Func} from '../Utils'
import {API} from '../Services'
import Icon from 'react-native-vector-icons/Ionicons'
import RNFetchBlob from 'react-native-fetch-blob'
import FilePickerManager from 'react-native-file-picker'

const {height, width} = Dimensions.get('window')

class SignUpScreen extends React.Component {

    state = {
        firstname: '',
        lastname: '',
        email: '',
        nric: '',
        contact_no: '',
        username: '',
        password: '',
        documents: []
    }

    handleRegister = async () => {
        if(this.props.isConnected) {
            try {

                let {firstname, lastname, email, nric, contact_no, username, password, documents} = this.state

                firstname = firstname.trim()
                lastname = lastname.trim()
                email = email.trim()
                nric = nric.trim()
                contact_no = contact_no.trim()
                username = username.trim()
                password = password.trim()

                if(firstname === '') alert('Name is required')
                else if(lastname === '') alert('Surname is required')
                else if(email === '') alert('Email is required')
                else if(nric === '') alert('NRIC is required')
                else if(nric.length < 6) alert('NRIC must have atleast 6 characters')
                else if(contact_no === '') alert('Contact No is required')
                //else if(username === '') alert('Username is required')
                //else if(password === '') alert('Password is required')
                else {

                    let payload = {
                        firstname,
                        lastname,
                        email,
                        nric,
                        //username,
                        //password,
                        contact_no
                    }

                    if(documents.length > 0) payload.documents = documents.map(d => d.data)

                    let res = await API.signup(payload)
                    
                    if(res.username_exists) {
                        Toast.show(res.message)
                    }
                    else {
                        this.props.setUser(res.user)
                        this.props.navigation.replace('Appointments')
                        Toast.show('Sign up successful')
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

    handleBrowseDoc = () => {
        FilePickerManager.showFilePicker(null, (response) => {
            
            if(response.error) {}

            else if(!response.didCancel) {
            
            this.setState({attaching:true})
            
            let data = ''
            
            RNFetchBlob.fs.readStream(
                response.uri,
                'base64',
                12285)
                .then((ifstream) => {
                    ifstream.open()
                    ifstream.onData((chunk) => {
                        data += chunk
                    })
                    ifstream.onError((err) => {
                        
                    })
                    ifstream.onEnd(() => {
                        let documents = this.state.documents.slice()
                        documents.push({
                            ...response,
                            data:`data:${response.type};base64,${data}`
                        })
                        this.setState({documents})
                    })
                })
            }
        })
    }
    
    handleRemoveDoc = index => {
        let documents = this.state.documents.slice()
        documents.splice(index,1)
        this.setState({documents})
    }

    renderDocs = ({item, index}) => {
        return (
          <ListItem>
            <Row bw>
                <Row f>
                    <Icon name='ios-document' size={Metrics.icons.regular} color={Colors.lightgray} />
                    <Spacer v />
                    <Text numberOfLines={1}>{item.fileName}</Text>
                </Row>
                <TouchableOpacity onPress={() => this.handleRemoveDoc(index)} style={{width:30}}>
                    <Icon name='ios-close-circle' color={Colors.danger} size={Metrics.icons.regular} />
                </TouchableOpacity>
            </Row>
          </ListItem>
        )
    }

    render() {

        const {firstname, lastname, email, nric, contact_no, username, password, documents} = this.state

        return (
            <ScrollView style={style.container}>

                <View style={{marginTop:130}}>

                   <Section style={{elevation:0}}>

                        <View style={{paddingTop:50}}>
                            <View style={style.inputContainer}>
                                <TextInput
                                    ref='firstname'
                                    style={style.input}
                                    onChangeText={firstname => this.setState({firstname})}
                                    value={firstname}
                                    placeholder='Name'
                                    returnKeyType='next'
                                    onSubmitEditing={() => this.refs.lastname.focus()}
                                    keyboardType='default'
                                    autoCorrect={false}
                                    autoCapitalize='words'
                                    underlineColorAndroid='transparent'
                                />
                            </View>

                            <View style={style.inputContainer}>
                                <TextInput
                                    ref='lastname'
                                    style={style.input}
                                    onChangeText={lastname => this.setState({lastname})}
                                    value={lastname}
                                    placeholder='Surname'
                                    returnKeyType='next'
                                    onSubmitEditing={() => this.refs.email.focus()}
                                    keyboardType='default'
                                    autoCorrect={false}
                                    autoCapitalize='words'
                                    underlineColorAndroid='transparent'
                                />
                            </View>

                            <View style={style.inputContainer}>
                                <TextInput
                                    ref='email'
                                    style={style.input}
                                    onChangeText={email => this.setState({email})}
                                    value={email}
                                    placeholder='Email'
                                    returnKeyType='next'
                                    onSubmitEditing={() => this.refs.nric.focus()}
                                    keyboardType='default'
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    underlineColorAndroid='transparent'
                                />
                            </View>

                            <View style={style.inputContainer}>
                                <TextInput
                                    ref='nric'
                                    style={style.input}
                                    onChangeText={nric => this.setState({nric})}
                                    value={nric}
                                    placeholder='NRIC'
                                    returnKeyType='next'
                                    onSubmitEditing={() => this.refs.contact_no.focus()}
                                    keyboardType='default'
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    underlineColorAndroid='transparent'
                                />
                                <Spacer sm />
                                <Text sm>Your Username: {Func.generateUsername(nric)}</Text>
                            </View>

                            <View style={style.inputContainer}>
                                <Row f>
                                    <Text xl>+65</Text>
                                    <Spacer v />
                                    <TextInput
                                        ref='contact_no'
                                        style={[style.input,{flex:1}]}
                                        onChangeText={contact_no => this.setState({contact_no})}
                                        value={contact_no}
                                        placeholder='Mobile'
                                        returnKeyType='go'
                                        onSubmitEditing={() => this.handleRegister()}
                                        keyboardType='numeric'
                                        autoCorrect={false}
                                        autoCapitalize='none'
                                        underlineColorAndroid='transparent'
                                    />
                                </Row>
                                <Spacer sm />
                                <Text sm>Your Password: {contact_no}</Text>
                            </View>

                            {/*<View style={style.inputContainer}>
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
                            </View>*/}
                            
                            {/*<View style={style.inputContainer}>
                                <TextInput
                                    ref='password'
                                    style={style.input}
                                    onChangeText={password => this.setState({password})}
                                    value={password}
                                    placeholder='Password'
                                    returnKeyType='go'
                                    onSubmitEditing={this.handleRegister}
                                    keyboardType='default'
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    underlineColorAndroid='transparent'
                                    secureTextEntry
                                />
                            </View>*/}

                            {/*<View style={style.inputContainer}>
                                {documents.length > 0 &&
                                <FlatList
                                data={documents}
                                renderItem={this.renderDocs}
                                />
                                }

                                <Button text='Add Document' type='info' onPress={this.handleBrowseDoc} />
                            </View>*/}

                            <View style={{marginTop:30}}>
                                <Button lg text='Register' type='success' onPress={this.handleRegister} />
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

mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch(Actions.login()),
        setUser: (user) => dispatch(Actions.setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)