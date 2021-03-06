import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../../Themes'
import {ScrollView, Button, Text, Spacer, Section, Row, Avatar} from '../../Components'
import {Globals, Storage, Consts, Func} from '../../Utils'
import {API} from '../../Services'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const moment = require('moment')

class PendingApplicationsScreen extends React.Component {

    state = {
        list: this.props.navigation.state.params.Job.pending_applicants
    }

    handleApprove = index => {
        if(this.props.isConnected) {
            try {
                Func.ask('Are you sure?','Approve Application',[
                    {text:'Yes',onPress: async () => {

                        const {Job} = this.props.navigation.state.params
                        let list = this.state.list.slice()

                        let payload = {
                            job_id: Job.id,
                            user_id: list[index].user_id
                        }

                        await API.approveApplication(payload)

                        this.props.updateJob(true)
                        this.props.updateJobs(true)
                        list.splice(index,1)
                        this.setState({list})

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

    handleReject = index => {
        if(this.props.isConnected) {
            try {
                Func.ask('Are you sure?','Reject Application',[
                    {text:'Yes',onPress: async () => {

                        const {Job} = this.props.navigation.state.params
                        let list = this.state.list.slice()

                        let payload = {
                            job_id: Job.id,
                            user_id: list[index].user_id
                        }

                        await API.rejectApplication(payload)

                        this.props.updateJob(true)
                        this.props.updateJobs(true)
                        list.splice(index,1)
                        this.setState({list})

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

    renderList = ({item, index}) => {
        return (
            <Section>
                <Row f>
                    <Avatar source={item.user.avatar} />
                    <Spacer v />
                    <View>
                        <Text>{item.user.firstname} {item.user.lastname}</Text>
                        <Text sm mute>Date Applied: {moment(item.created_at).format('YYYY-MM-DD')}</Text>
                    </View>
                </Row>

                <Spacer />

                <View>
                    <Button sm type='success' text='Approve' onPress={() => this.handleApprove(index)} mb />
                    <Button sm type='danger' text='Reject' onPress={() => this.handleReject(index)} />
                </View>
            </Section>
        )
    }

    render() {

        const {list} = this.state

        return (
            <ScrollView>
                <FlatList
                    data={list}
                    renderItem={this.renderList}
                />
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
        updateJobs:isUpdate => dispatch(Actions.updateJobsScreen(isUpdate)),
        updateJob:isUpdate => dispatch(Actions.updateJobScreen(isUpdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingApplicationsScreen)