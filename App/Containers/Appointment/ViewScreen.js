import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../../Themes'
import {ScrollView, Button, Text, Spacer, Section, Row, Avatar, HR} from '../../Components'
import {Globals, Storage, Consts, Func} from '../../Utils'
import {API} from '../../Services'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const moment = require('moment')

class ViewScreen extends React.Component {

    state = {
        ...this.props.navigation.state.params.Appointment
    }

    componentWillReceiveProps = nextProps => {
        if(nextProps.isUpdate) {
            this.handleRefresh()
            this.props.updateAppointment(false)
        }
    }

    handleRegister = index => {
        if(this.props.isConnected) {
            try {

                let users = this.state.users.slice()

                Func.ask('Proceed?',`Complete Registration of ${users[index].user.firstname} ${users[index].user.lastname}`,[
                    {text:'Yes',onPress: async () => {

                        users[index].user.is_confirmed = true
                        await API.completeAppointment(users[index].user_id)
                        this.setState({users})
                        Toast.show('Registration Completed')

                    } },
                    {text: 'Cancel', style: 'cancel'}
                ])
            }
            catch(err) {
                Toast.show(Globals.error.generic)
            }
        }
        else {
            Toast.show(Globals.error.network)
        }
    }

    handleDelete = () => {
        if(this.props.isConnected) {
            try {
                Func.ask('Are you sure?','Delete Appointment',[
                    {text:'Yes',onPress: async () => {

                        let {id} = this.state

                        await API.deleteAppointment(id)

                        this.props.updateAppointments(true)
                        this.props.navigation.pop()

                    } },
                    {text: 'Cancel', style: 'cancel'}
                ])
            }
            catch(err) {
                Toast.show(Globals.error.generic)
            }
        }
        else {
            Toast.show(Globals.error.network)
        }
    }

    handleRefresh = async () => {
        if(this.props.isConnected) {
            try {
                let data = await API.getAppointment(this.state.id)
                this.setState({...data})
            }
            catch(err) {
    
            }
        }
    }

    renderData = ({item, index}) => {
        return (
            <Section>
                <Row bw>
                    <View>
                        <Row>
                            <Avatar source={null} />
                            <Spacer v />
                            <Text>{item.user.firstname} {item.user.lastname}</Text>
                        </Row>
                        <Text sm mute>{moment(item.user.created_at).format('YYYY-MM-DD HH:mm a')}</Text>
                    </View>

                    {!item.user.is_confirmed && <Button sm text='Complete Registration' onPress={() => this.handleRegister(index)} />}
                </Row>
            </Section>
        )
    }

    render() {

        const {from, to, max_slot, users} = this.state

        return (
            <ScrollView>
                <Section>
                    <Text sm branding>From</Text>
                    <Text>{moment(from).format('YYYY-MM-DD HH:mm a')}</Text>

                    <HR mv />

                    <Text sm branding>To</Text>
                    <Text>{moment(to).format('YYYY-MM-DD HH:mm a')}</Text>

                    <HR mv />

                    <Text sm branding>Max Slot</Text>
                    <Text>{max_slot}</Text>

                    <Spacer />

                    <Button type='danger' text='Delete' onPress={this.handleDelete} />
                </Section>

                <FlatList
                    data={users}
                    renderItem={this.renderData}
                />
            </ScrollView>
        )
    }
}

mapStateToProps = state => {
    return {
        user: state.user,
        isConnected: state.network.isConnected,
        isUpdate: state.appointment.isUpdateAppointmentScreen
    }
}

mapDispatchToProps = dispatch => {
    return {
        updateAppointments:isUpdate => dispatch(Actions.updateAppointmentsScreen(isUpdate)),
        updateAppointment:isUpdate => dispatch(Actions.updateAppointmentScreen(isUpdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewScreen)