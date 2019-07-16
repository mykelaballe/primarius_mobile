import React from 'react'
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../../Themes'
import {ScrollView, Button, Text, Spacer, HR, Section, Row, ActivityIndicator, Picker} from '../../Components'
import {Globals, Storage, Func} from '../../Utils'
import {API} from '../../Services'
import Icon from 'react-native-vector-icons/Ionicons'
import FromDateTimePicker from 'react-native-modal-datetime-picker'
import ToDateTimePicker from 'react-native-modal-datetime-picker'

const moment = require('moment')

class CreateScreen extends React.Component {

    state = {
        from: moment(),
        to: moment(),
        max_slot: '',
        loading: true,
        showFromDateTimePicker: false,
        showToDateTimePicker: false
    }

    handleSave = async () => {
        let {from, to, max_slot} = this.state

        if(this.props.isConnected) {
            try {

                from = moment(from).format('YYYY-MM-DD HH:mm')
                to = moment(to).format('YYYY-MM-DD HH:mm')

                let payload = {
                    from,
                    to,
                    max_slot
                }
                await API.createAppointment(payload)

                this.props.updateAppointments(true)
                this.reset()
                Toast.show('Saved')
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
            from: moment(),
            to: moment(),
            max_slot: ''
        })
    }

    handleChangeFromDate = from => {
        this.setState({
            from,
            showFromDateTimePicker: false
        })
    }

    handleChangeToDate = to => {
        this.setState({
            to,
            showToDateTimePicker: false
        })
    }

    render() {

        const {from, to, max_slot, loading, showFromDateTimePicker, showToDateTimePicker} = this.state
        let from_formatted = moment(from).format('YYYY-MM-DD HH:mm')
        let to_formatted = moment(to).format('YYYY-MM-DD HH:mm')

        return (
            <ScrollView>

                <FromDateTimePicker
                    value={from}
                    mode='datetime'
                    isVisible={showFromDateTimePicker}
                    onConfirm={this.handleChangeFromDate}
                    onCancel={() => this.setState({showFromDateTimePicker:false})}
                />

                <ToDateTimePicker
                    value={to}
                    mode='datetime'
                    isVisible={showToDateTimePicker}
                    onConfirm={this.handleChangeToDate}
                    onCancel={() => this.setState({showToDateTimePicker:false})}
                />

                <Section>
                    <Text sm branding>From*</Text>
                    <Row>
                        <TouchableOpacity onPress={() => this.setState({showFromDateTimePicker:true})}>
                            <Text>{from_formatted}</Text>
                        </TouchableOpacity>
                        
                        <Spacer v />

                        <Icon name='md-arrow-dropdown' color={Colors.dark} size={Metrics.icons.regular} />
                    </Row>

                    <Spacer />

                    <Text sm branding>To*</Text>
                    <Row>
                        <TouchableOpacity onPress={() => this.setState({showToDateTimePicker:true})}>
                            <Text>{to_formatted}</Text>
                        </TouchableOpacity>
                        
                        <Spacer v />

                        <Icon name='md-arrow-dropdown' color={Colors.dark} size={Metrics.icons.regular} />
                    </Row>
                </Section>

                <Section>
                    <Text sm branding>Max Slot</Text>
                    <TextInput
                        ref='max_slot'
                        style={AppStyles.input_simple}
                        onChangeText={max_slot => this.setState({max_slot})}
                        value={max_slot}
                        placeholder='Type here'
                        returnKeyType='next'
                        keyboardType='numeric'
                        autoCorrect={false}
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
        isConnected: state.network.isConnected
    }
}

mapDispatchToProps = dispatch => {
    return {
        updateAppointments:isUpdate => dispatch(Actions.updateAppointmentsScreen(isUpdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateScreen)