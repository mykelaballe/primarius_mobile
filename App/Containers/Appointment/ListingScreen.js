import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../../Themes'
import {ScrollView, Button, Text, Spacer, Section, Row} from '../../Components'
import {Globals, Storage, Consts, Func} from '../../Utils'
import {API} from '../../Services'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const moment = require('moment')

class ListingScreen extends React.Component {

    state = {
        list: [],
        loading: true,
        refreshing: false
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    componentWillReceiveProps = nextProps => {
        if(nextProps.isUpdateList) {
            this.handleRefresh()
            this.props.updateList(false)
        }
    }

    getData = async () => {
        let list = []

        if(this.props.isConnected) {
            try {
                list = await API.getAppointments()
            }
            catch(err) {
                Toast.show(Globals.error.generic)
            }
        }
        else {
            Toast.show(Globals.error.network)
        }

        this.setState({
            list,
            loading: false,
            refreshing: false
        })
    }

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    handleSetAppointment = index => {
        if(this.props.isConnected) {
            try {
                Func.ask('Proceed?','Set Appointment',[
                    {text:'Yes',onPress: async () => {

                        const {user} = this.props
                        let list = this.state.list.slice()

                        let payload = {
                            appointment_id: list[index].id,
                            user_id: user.id
                        }

                        await API.setAppointment(payload)
                        await this.storeUserLocal()
                        this.props.login()
                        Toast.show('Appointment set')

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

    handleSkip = async () => {
        await this.storeUserLocal()
        this.props.login()
    }

    storeUserLocal = async () => {
        await Storage.doSave(Globals.db.user,{data: this.props.user})
    }

    renderData = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewAppointment',{Appointment:item})}>
                <Section>
                    <Text>From: {moment(item.from).format('YYYY-MM-DD HH:mm a')}</Text>
                    <Text>To: {moment(item.to).format('YYYY-MM-DD HH:mm a')}</Text>
                    <Row>
                        <Text sm mute>Max Slot: {item.max_slot}</Text>
                        <Spacer v />
                        <Text sm mute>Users: {item.users.length}</Text>
                    </Row>

                    <Spacer />

                    {this.props.user.role_id === Consts.roles.user && <Button text='Set' onPress={() => this.handleSetAppointment(index)} />}
                </Section>
            </TouchableOpacity>
        )
    }

    render() {

        const {list, loading, refreshing} = this.state
        const {isLoggedIn} = this.props
        const {user} = Consts.roles
        const {role_id, username, password} = this.props.user
        const {params = {}} = this.props.navigation.state

        return (
            <ScrollView refreshing={refreshing} onRefresh={this.handleRefresh}>
                {role_id === user &&
                <Section>
                    <Text bold>Your Account:</Text>
                    <Row>
                        <Text mute>Username:</Text>
                        <Spacer v />
                        <Text>{username}</Text>
                    </Row>
                    <Row>
                        <Text mute>Password:</Text>
                        <Spacer v />
                        <Text>{password}</Text>
                    </Row>
                </Section>
                }

                <FlatList
                    data={list}
                    renderItem={this.renderData}
                    loading={loading}
                />

                <Spacer />

                {/*(!loading && role_id === user && !isLoggedIn) && <Button text='Skip' onPress={this.handleSkip} />*/}
            </ScrollView>
        )
    }
}

mapStateToProps = state => {
    return {
        user: state.user,
        isLoggedIn: state.auth.isLoggedIn,
        isConnected: state.network.isConnected,
        isUpdateList: state.appointment.isUpdateAppointmentsScreen
    }
}

mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch(Actions.login()),
        setUser: (user) => dispatch(Actions.setUser(user)),
        updateList:isUpdate => dispatch(Actions.updateAppointmentsScreen(isUpdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingScreen)