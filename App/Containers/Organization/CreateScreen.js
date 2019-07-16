import React from 'react'
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../../Themes'
import {ScrollView, Button, Text, Spacer, Section, Row, Cover} from '../../Components'
import {Globals, Storage} from '../../Utils'
import {API} from '../../Services'
import Icon from 'react-native-vector-icons/Ionicons'

const ImagePicker = require('react-native-image-picker')

class CreateScreen extends React.Component {

    state = {
        name: '',
        about: '',
        address: '',
        logo: null
    }

    handleSave = async () => {
        let {name, about, address, logo} = this.state

        if(this.props.isConnected) {
            try {
                name = name.trim()
                about = about.trim()
                address = address.trim()

                if(name === '') alert('Please enter name')
                else {
                    let payload = {
                        name,
                        about,
                        address
                    }

                    if(logo) payload.logo = logo

                    await API.createOrganization(payload)

                    this.props.updateOrganizations(true)
                    this.reset()
                    Toast.show('Saved')
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
            name: '',
            about: '',
            address: '',
            logo: null
        })
    }

    handleBrowseLogo = () => {
        const options = {
            title: 'Browse Logo',
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
                let logo = 'data:image/jpeg;base64,' + response.data
            
                this.setState({logo})
            }
        })
    }

    handleRemoveLogo = () => this.setState({logo:null})

    render() {

        const {name, about, address, logo} = this.state

        return (
            <ScrollView>

                <Section>
                    <TouchableOpacity onPress={this.handleBrowseLogo}>
                        <Cover source={logo} />
                        <Spacer sm />
                        <Text sm branding center>Tap to change logo</Text>
                    </TouchableOpacity>

                    <Spacer />

                    {logo && <Button text='Remove Logo' type='danger' onPress={this.handleRemoveLogo} />}
                </Section>
                
                <Section>
                    <Text sm branding>Name*</Text>
                    <TextInput
                        ref='name'
                        style={AppStyles.input_simple}
                        onChangeText={name => this.setState({name})}
                        value={name}
                        placeholder='Required'
                        returnKeyType='go'
                        keyboardType='default'
                        autoCorrect={false}
                        autoCapitalize='words'
                        underlineColorAndroid='transparent'
                    />
                </Section>

                <Section>
                    <Text sm branding>About</Text>
                    <TextInput
                        ref='about'
                        style={AppStyles.textarea}
                        onChangeText={about => this.setState({about})}
                        value={about}
                        placeholder='Type here'
                        returnKeyType='next'
                        keyboardType='default'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        multiline={true}
                    />
                </Section>

                <Section>
                    <Text sm branding>Address</Text>
                    <TextInput
                        ref='address'
                        style={AppStyles.textarea}
                        onChangeText={address => this.setState({address})}
                        value={address}
                        placeholder='Type here'
                        returnKeyType='go'
                        keyboardType='default'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        multiline={true}
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
        updateOrganizations:isUpdate => dispatch(Actions.updateOrganizationsScreen(isUpdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateScreen)