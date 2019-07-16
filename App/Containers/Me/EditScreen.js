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

class EditScreen extends React.Component {

    state = {
        ...this.props.navigation.state.params.User,
        type: null,
        selectedTypes: {},
        types: [],
        loading: true
    }

    componentWillMount = () => this.getData()

    getData = async () => {
        let type = null, types = []

        if(this.props.isConnected) {
            try {
                let data_types = await API.getTypes()

                for(let d in data_types) {
                    types.push({
                        label: data_types[d].name,
                        value: data_types[d].id
                    })
                }

                if(types.length > 0) type = types[0].value
            }
            catch(err) {

            }
        }

        this.setState({
            type,
            types,
            loading: false
        })
    }

    handleSave = async () => {
        let {id, firstname, lastname, email, nric, contact_no, is_in_charge, selectedTypes} = this.state

        if(this.props.isConnected) {
            try {

                firstname = firstname.trim()
                lastname = lastname.trim()
                email = email.trim()
                nric = nric.trim()

                if(firstname === '' || lastname === '' || email === '' || nric === '' || contact_no === '') alert('Please complete all required fields')
                else {
                    let payload = {
                        firstname,
                        lastname,
                        email,
                        nric,
                        contact_no,
                        is_in_charge
                    }

                    if(Object.keys(selectedTypes).length > 0) {
                        payload.types = Object.keys(selectedTypes)
                    }

                    let user = await API.updateUser({id, payload})

                    this.props.updateUser(true)
                    this.props.updateUsers(true)
                    //this.props.setUser(user)
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

    handleAddType = () => {
        let {type, types} = this.state
        let selectedTypes = {...this.state.selectedTypes}
        if(typeof selectedTypes[type] === 'undefined') {
            for(let t in types) {
                if(types[t].value === type) {
                    selectedTypes[type] = types[t]
                    this.setState({selectedTypes})
                }
            }
        }
        else {
            Toast.show('Type already added')
        }
    }

    handleRemoveType = item => {
        let selectedTypes = this.state.selectedTypes
        delete selectedTypes[item.value]
        this.setState({selectedTypes})
    }

    renderTypes = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => this.handleRemoveType(item)} style={style.pill}>
                <Text sm light>{item.label}</Text>
            </TouchableOpacity>
        )
    }

    render() {

        const {firstname, lastname, email, nric, contact_no , is_in_charge, selectedTypes, types, type, loading} = this.state
        const {su, admin, hr} = Consts.roles
        const {role_id} = this.props.user

        const allowEdit = [su, admin, hr]

        return (
            <ScrollView>
                
                {allowEdit.indexOf(role_id) >= 0 &&
                <Section>
                    <Text sm branding>Name*</Text>
                    <TextInput
                        ref='firstname'
                        style={AppStyles.input_simple}
                        onChangeText={firstname => this.setState({firstname})}
                        value={firstname}
                        placeholder='Required'
                        returnKeyType='next'
                        onSubmitEditing={() => this.refs.lastname.focus()}
                        keyboardType='default'
                        autoCorrect={false}
                        autoCapitalize='words'
                        underlineColorAndroid='transparent'
                    />
                </Section>
                }

                {allowEdit.indexOf(role_id) >= 0 &&
                <Section>
                    <Text sm branding>Surname*</Text>
                    <TextInput
                        ref='lastname'
                        style={AppStyles.input_simple}
                        onChangeText={lastname => this.setState({lastname})}
                        value={lastname}
                        placeholder='Required'
                        returnKeyType='next'
                        onSubmitEditing={() => this.refs.contact_no.focus()}
                        keyboardType='default'
                        autoCorrect={false}
                        autoCapitalize='words'
                        underlineColorAndroid='transparent'
                    />
                </Section>
                }

                <Section>
                    <Text sm branding>Email*</Text>
                    <TextInput
                        ref='email'
                        style={AppStyles.input_simple}
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
                </Section>

                {allowEdit.indexOf(role_id) >= 0 &&
                <Section>
                    <Text sm branding>NRIC*</Text>
                    <TextInput
                        ref='nric'
                        style={AppStyles.input_simple}
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
                </Section>
                }

                <Section>
                    <Text sm branding>Contact No*</Text>
                    <TextInput
                        ref='contact_no'
                        style={AppStyles.input_simple}
                        onChangeText={contact_no => this.setState({contact_no})}
                        value={contact_no}
                        placeholder='Required'
                        returnKeyType='next'
                        keyboardType='numeric'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                    />
                </Section>

                {allowEdit.indexOf(role_id) >= 0 &&
                <React.Fragment>
                    <Section>
                        <Text sm branding>Type*</Text>
                        {loading && <ActivityIndicator />}
                        {(!loading && allowEdit.indexOf(role_id) >= 0) &&
                        <Row>
                            <Picker
                                prompt='Type'
                                selectedValue={type}
                                style={[AppStyles.input_simple,{flex:1}]}
                                onValueChange={type => this.setState({type})}
                                data={types}
                            />
                            <Button sm text='Add' onPress={this.handleAddType} />
                        </Row>
                        }

                        {Object.keys(selectedTypes).length > 0 &&
                        <FlatList
                            data={Object.values(selectedTypes)}
                            renderItem={this.renderTypes}
                            horizontal
                        />
                        }
                    </Section>

                    <Section>
                        <Text sm branding>Person-In-Charge</Text>
                        <Picker
                            prompt='Person-In-Charge'
                            selectedValue={is_in_charge}
                            style={[AppStyles.input_simple,{flex:1}]}
                            onValueChange={is_in_charge => this.setState({is_in_charge})}
                            data={[
                                {label:'Yes',value:1},
                                {label:'No',value:0}
                            ]}
                        />
                    </Section>
                </React.Fragment>
                }

                <Button text='Save' onPress={this.handleSave} />
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    pill: {
        padding: Metrics.psm,
        backgroundColor: Colors.branding,
        borderRadius: Metrics.rb,
        marginHorizontal: Metrics.mxs
    }
})

mapStateToProps = state => {
    return {
        user: state.user,
        isConnected: state.network.isConnected
    }
}

mapDispatchToProps = dispatch => {
    return {
        setUser: user => dispatch(Actions.setUser(user)),
        updateUsers:isUpdate => dispatch(Actions.updateUsersScreen(isUpdate)),
        updateUser:isUpdate => dispatch(Actions.updateUserScreen(isUpdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditScreen)