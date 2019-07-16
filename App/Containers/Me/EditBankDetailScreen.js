import React from 'react'
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../../Themes'
import {ScrollView, Button, Text, Spacer, HR, Section, Row, ActivityIndicator, Picker} from '../../Components'
import {Globals, Storage, Func, Consts} from '../../Utils'
import {API} from '../../Services'
import Icon from 'react-native-vector-icons/Ionicons'
import FromDateTimePicker from 'react-native-modal-datetime-picker'
import ToDateTimePicker from 'react-native-modal-datetime-picker'

const moment = require('moment')

class EditBankDetailScreen extends React.Component {

    state = {
        name: '',
        account_number: ''
    }

    componentWillMount = () => {
        const {bank} = this.props.navigation.state.params.User
        
        if(bank) {
            this.setState({
                name: bank.name,
                account_number: bank.account_number
            })
        }
    }

    handleSave = async () => {
        const {id} = this.props.navigation.state.params.User
        let {name, account_number} = this.state

        if(this.props.isConnected) {
            try {

                name = name.trim()
                account_number = account_number.trim()

                if(name === '' || account_number === '') alert('Please complete all required fields')
                else {
                    let payload = {
                        user_id: id,
                        name,
                        account_number
                    }

                    await API.updateBankDetails(payload)

                    this.props.updateUser(true)
                    this.props.updateUsers(true)
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

    render() {

        const {name, account_number} = this.state

        return (
            <ScrollView>
                
                <Section>
                    <Text sm branding>Bank Name*</Text>
                    <TextInput
                        ref='name'
                        style={AppStyles.input_simple}
                        onChangeText={name => this.setState({name})}
                        value={name}
                        placeholder='Required'
                        returnKeyType='next'
                        onSubmitEditing={() => this.refs.account_number.focus()}
                        keyboardType='default'
                        autoCorrect={false}
                        autoCapitalize='words'
                        underlineColorAndroid='transparent'
                    />
                </Section>

                <Section>
                    <Text sm branding>Account Number*</Text>
                    <TextInput
                        ref='account_number'
                        style={AppStyles.input_simple}
                        onChangeText={account_number => this.setState({account_number})}
                        value={account_number}
                        placeholder='Required'
                        returnKeyType='go'
                        onSubmitEditing={this.handleSave}
                        keyboardType='default'
                        autoCorrect={false}
                        autoCapitalize='none'
                        underlineColorAndroid='transparent'
                    />
                </Section>

                <Button text='Save' onPress={this.handleSave} />
            </ScrollView>
        )
    }
}

mapStateToProps = state => {
    return {
        user: state.user,
        isConnected: state.network.isConnected
    }
}

mapDispatchToProps = dispatch => {
    return {
        updateUsers:isUpdate => dispatch(Actions.updateUsersScreen(isUpdate)),
        updateUser:isUpdate => dispatch(Actions.updateUserScreen(isUpdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBankDetailScreen)