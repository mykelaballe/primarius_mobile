import React from 'react'
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../../Themes'
import {ScrollView, FlatList, Button, Text, Spacer, HR, Section, Row, ActivityIndicator, Picker, Avatar} from '../../Components'
import {Globals, Storage, Func, Consts} from '../../Utils'
import {API} from '../../Services'
import Icon from 'react-native-vector-icons/Ionicons'

const moment = require('moment')
const ImagePicker = require('react-native-image-picker')

class CreateScreen extends React.Component {

    state = {
        role_id: null,
        firstname: '',
        lastname: '',
        email: '',
        nric: '',
        contact_no: '',
        gender: 'Male',
        username: '',
        avatar: null,
        is_in_charge: false,
        roles: [],
        loading: true
    }

    componentWillMount = () => this.getData()

    getData = async () => {
        const {su, user} = Consts.roles
        let roles = [], role_id = null

        if(this.props.isConnected) {
            try {
                let data = await API.getRoles()

                for(let d in data) {
                    if(data[d].id !== su && data[d].id !== user) {
                        roles.push({
                            label: data[d].name,
                            value: data[d].id
                        })
                    }
                }

                if(roles.length > 0) role_id = roles[0].value
            }
            catch(err) {

            }
        }

        this.setState({
            role_id,
            roles,
            loading: false
        })
    }

    handleSave = async () => {
        let {role_id, firstname, lastname, email, nric, contact_no, gender, username, avatar, is_in_charge} = this.state

        if(this.props.isConnected) {
            try {
                firstname = firstname.trim()
                lastname = lastname.trim()
                email = email.trim()
                nric = nric.trim()

                if(firstname === '' || lastname === '' || username === '') alert('Please complete all required fields')
                else {

                    let payload = {
                        role_id,
                        firstname,
                        lastname,
                        email,
                        nric,
                        contact_no,
                        gender,
                        username,
                        is_in_charge
                    }

                    if(avatar) payload.avatar = avatar

                    let res = await API.createUser(payload)
                    
                    if(res.username_exists) {
                        Toast.show(res.message)
                    }
                    else {
                        this.props.updateUsers(true)
                        this.reset()
                        Toast.show('Saved')
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

    reset = () => {
        this.setState({
            firstname: '',
            lastname: '',
            email: '',
            nric: '',
            contact_no: '',
            username: '',
            avatar: null,
            is_in_charge: false
        })
    }

    handleBrowseAvatar = () => {
        const options = {
            title: 'Browse Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }

        ImagePicker.showImagePicker(options, (response) => {
        
            if(response.didCancel) {
                
            }
            else if(response.error) {
                
            }
            else {
                let avatar = 'data:image/jpeg;base64,' + response.data
            
                this.setState({avatar})
            }
        })
    }

    handleRemoveAvatar = () => this.setState({avatar:null})

    render() {

        const {role_id, firstname, lastname, email, nric, contact_no, gender, username, avatar, is_in_charge, roles, loading} = this.state

        return (
            <ScrollView>

                <Section>
                    <TouchableOpacity onPress={this.handleBrowseAvatar} style={{alignItems:'center'}}>
                        <Avatar source={avatar} size={Metrics.images.xxlarge} />
                        <Spacer sm />
                        <Text sm branding center>Tap to change avatar</Text>
                    </TouchableOpacity>

                    <Spacer />

                    {avatar && <Button text='Remove Avatar' type='danger' onPress={this.handleRemoveAvatar} />}
                </Section>

                <Section>
                    <Text sm branding>Role</Text>
                    {loading && <ActivityIndicator />}
                    {!loading &&
                    <Picker
                        prompt='Role'
                        selectedValue={role_id}
                        style={[AppStyles.input_simple,{flex:1}]}
                        onValueChange={role_id => this.setState({role_id})}
                        data={roles}
                    />
                    }
                </Section>

                <Section>
                    <Text sm branding>Name*</Text>
                    <TextInput
                        ref='firstname'
                        style={AppStyles.input_simple}
                        onChangeText={firstname => this.setState({firstname})}
                        onSubmitEditing={() => this.refs.lastname.focus()}
                        value={firstname}
                        placeholder='Required'
                        returnKeyType='next'
                        keyboardType='default'
                        autoCorrect={false}
                        autoCapitalize='words'
                        underlineColorAndroid='transparent'
                    />
                </Section>

                <Section>
                    <Text sm branding>Surname*</Text>
                    <TextInput
                        ref='lastname'
                        style={AppStyles.input_simple}
                        onChangeText={lastname => this.setState({lastname})}
                        onSubmitEditing={() => this.refs.email.focus()}
                        value={lastname}
                        placeholder='Required'
                        returnKeyType='next'
                        keyboardType='default'
                        autoCorrect={false}
                        autoCapitalize='words'
                        underlineColorAndroid='transparent'
                    />
                </Section>

                <Section>
                    <Text sm branding>Email</Text>
                    <TextInput
                        ref='email'
                        style={AppStyles.input_simple}
                        onChangeText={email => this.setState({email})}
                        onSubmitEditing={() => this.refs.nric.focus()}
                        value={email}
                        placeholder='Type here'
                        returnKeyType='next'
                        keyboardType='default'
                        autoCapitalize='none'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                    />
                </Section>

                <Section>
                    <Text sm branding>NRIC</Text>
                    <TextInput
                        ref='nric'
                        style={AppStyles.input_simple}
                        onChangeText={nric => this.setState({nric})}
                        onSubmitEditing={() => this.refs.contact_no.focus()}
                        value={nric}
                        placeholder='Type here'
                        returnKeyType='next'
                        keyboardType='default'
                        autoCapitalize='none'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                    />
                </Section>

                <Section>
                    <Text sm branding>Contact No</Text>
                    <TextInput
                        ref='contact_no'
                        style={AppStyles.input_simple}
                        onChangeText={contact_no => this.setState({contact_no})}
                        onSubmitEditing={() => this.refs.username.focus()}
                        value={contact_no}
                        placeholder='Type here'
                        returnKeyType='next'
                        keyboardType='numeric'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                    />
                </Section>

                <Section>
                    <Text sm branding>Gender</Text>
                    <Picker
                        prompt='Gender'
                        selectedValue={gender}
                        style={[AppStyles.input_simple,{flex:1}]}
                        onValueChange={gender => this.setState({gender})}
                        data={[
                            {label:'Male',value:'Male'},
                            {label:'Female',value:'Female'}
                        ]}
                    />
                </Section>

                <Section>
                    <Text sm branding>Username*</Text>
                    <TextInput
                        ref='username'
                        style={AppStyles.input_simple}
                        onChangeText={username => this.setState({username})}
                        value={username}
                        placeholder='Required'
                        returnKeyType='go'
                        keyboardType='default'
                        autoCapitalize='none'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                    />
                </Section>

                <Section>
                    <Text sm branding>Person-In-Charge</Text>
                    <Picker
                        prompt='Person-In-Charge'
                        selectedValue={is_in_charge}
                        style={[AppStyles.input_simple,{flex:1}]}
                        onValueChange={is_in_charge => this.setState({is_in_charge})}
                        data={[
                            {label:'Yes',value:true},
                            {label:'No',value:false}
                        ]}
                    />
                </Section>

                <Button text='Save' onPress={this.handleSave} />
            </ScrollView>
        )
    }
}

mapStateToProps = state => {
    return {
        isConnected: state.network.isConnected
    }
}

mapDispatchToProps = dispatch => {
    return {
        updateUsers:isUpdate => dispatch(Actions.updateUsersScreen(isUpdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateScreen)