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

class ApprovedApplicationsScreen extends React.Component {

    state = {
        job: this.props.navigation.state.params.Job,
        list: this.props.navigation.state.params.Job.approved_applicants
    }

    handleComplete = index => {
        if(this.props.isConnected) {
            try {
                Func.ask('Are you sure?','Mark as Completed',[
                    {text:'Yes',onPress: async () => {

                        let {job} = this.state
                        let list = this.state.list.slice()

                        await API.completeJob(job.id, list[index].user_id)

                        this.props.updateJob(true)
                        this.props.updateJobs(true)
                        list[index].status = 'Completed'
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

    handleMissed = index => {
        if(this.props.isConnected) {
            try {
                Func.ask('Are you sure?','Mark as Missed',[
                    {text:'Yes',onPress: async () => {

                        let {job} = this.state
                        let list = this.state.list.slice()

                        await API.missedJob(job.id, list[index].user_id)

                        this.props.updateJob(true)
                        this.props.updateJobs(true)
                        list[index].status = 'Missed'
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
                <Row bw>
                    <Row f>
                        <Avatar source={item.user.avatar} />
                        <Spacer v />
                        <View>
                            <Text>{item.user.firstname} {item.user.lastname}</Text>
                            <Text sm mute>Date Applied: {moment(item.created_at).format('YYYY-MM-DD')}</Text>
                        </View>
                    </Row>
                </Row>

                <Spacer />

                {item.status === 'Approved' &&
                <Row>
                    <Button sm text='Complete' type='success' onPress={() => this.handleComplete(index)} mr />
                    <Button sm text='Missed' type='danger' onPress={() => this.handleMissed(index)} />
                </Row>
                }

                {item.status === 'Completed' &&
                <Row>
                    <Icon name='ios-checkmark' size={Metrics.icons.regular} color={Colors.success} />
                    <Spacer v />
                    <Text sm success>Completed</Text>
                </Row>
                }

                {item.status === 'Missed' &&
                <Row>
                    <Icon name='ios-close' size={Metrics.icons.regular} color={Colors.danger} />
                    <Spacer v />
                    <Text sm danger>Missed</Text>
                </Row>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(ApprovedApplicationsScreen)