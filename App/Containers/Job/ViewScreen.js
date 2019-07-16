import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../../Themes'
import {ScrollView, FlatList, Button, Text, Spacer, Section, Row, Avatar, HR, VR, FormLegend, Cover} from '../../Components'
import {Globals, Storage, Consts, Func} from '../../Utils'
import {API} from '../../Services'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const moment = require('moment')

class ViewScreen extends React.Component {

    state = {
        job: this.props.navigation.state.params.Job,
        types: '',
        is_applied: false,
        checking: true,
        today: Func.getToday()
    }

    componentWillMount = () => {
        this.prepareTypes()
        this.checkApplication()
    }

    prepareTypes = () => {
        const {job} = this.state
        let types = []

        for(let t in job.types) types.push(job.types[t].type.name)

        this.setState({types})
    }

    componentWillReceiveProps = nextProps => {
        if(nextProps.isUpdate) {
            this.handleRefresh()
            this.props.updateJob(false)
        }
    }

    checkApplication = async () => {
        if(this.props.isConnected) {
            try {
                let data = await API.checkApplication(this.state.job.id)
                
                if(data.status && (data.status === 'Pending' && data.status !== 'Approved')) {
                    this.setState({
                        is_applied: true,
                        checking: false
                    })
                }
                else {
                    this.setState({
                        checking: false
                    })
                }
            }
            catch(err) {

            }
        }
    }

    handleApply = () => {
        if(this.props.isConnected) {
            try {
                Func.ask('Proceed?','Apply Job',[
                    {text:'Yes',onPress: async () => {

                        let {job} = this.state

                        let payload = {
                            job_id: job.id
                        }

                        await API.applyJob(payload)
                        this.setState({
                            is_applied: true
                        })
                        Toast.show('Applied!')

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

    handleCancel = () => {
        if(this.props.isConnected) {
            try {
                Func.ask('If you cancel this application 48 hours before the start of the job, you will receive demerit points. Are you sure?','Cancel Application',[
                    {text:'Yes',onPress: async () => {

                        let {job} = this.state

                        await API.cancelJob(job.id)
                        this.setState({
                            is_applied: false
                        })
                        Toast.show('Application cancelled')

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
                Func.ask('Are you sure?','Delete Job Post',[
                    {text:'Yes',onPress: async () => {

                        let {job} = this.state

                        await API.deleteJob(job.id)

                        this.props.updateJobs(true)
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
                let data = await API.getJob(this.state.job.id)
                this.setState({
                    job: {...data}
                },() => this.prepareTypes())
            }
            catch(err) {
    
            }
        }
    }

    renderTypes = ({item}) => {
        return (
            <View style={style.pill}>
                <Text sm light>{item}</Text>
            </View>
        )
    }

    render() {

        const {job, types, is_applied, checking, today} = this.state
        const {navigate} = this.props.navigation
        const {role_id} = this.props.user
        const {user} = Consts.roles

        return (
            <ScrollView>
                <Section>
                    <Text branding center>Looking for:</Text>
                    <Text center bold lg>{job.hiring_for}</Text>
                </Section>

                <Section>
                    <Cover source={job.cover || job.organization.logo} />
                </Section>

                <Section>
                    <FormLegend title='Type' />
                    
                    {types.length > 0 &&
                    <FlatList
                        data={types}
                        renderItem={this.renderTypes}
                        horizontal
                    />
                    }

                    {types.length === 0 && <Text>None</Text>}

                    <Spacer />

                    <Row>
                        <FontAwesome name='briefcase' size={Metrics.icons.tiny} color={Colors.branding} />
                        <Spacer v />
                        <View>
                            <Text sm mute>Company</Text>
                            <Text>{job.organization.name}</Text>
                        </View>
                    </Row>

                    <Spacer />

                    <Row>
                        <FontAwesome name='map-marker' size={Metrics.icons.tiny} color={Colors.danger} />
                        <Spacer v />
                        <View>
                            <Text sm mute>Address</Text>
                            <Text>{job.address || job.organization.address}</Text>
                        </View>
                    </Row>

                    <Spacer />

                    <Row>
                        <FontAwesome name='calendar-o' size={Metrics.icons.tiny} color={Colors.info} />
                        <Spacer v />
                        <View>
                            <Text sm mute>Date</Text>
                            <Text>{moment(job.from).format('YYYY-MM-DD')} to {moment(job.to).format('YYYY-MM-DD')}</Text>
                        </View>
                    </Row>

                    <Spacer />

                    <Row>
                        <FontAwesome name='clock-o' size={Metrics.icons.tiny} color={Colors.warning} />
                        <Spacer v />
                        <View>
                            <Text sm mute>Time</Text>
                            <Text>{moment(job.from).format('HH:mm a')} to {moment(job.to).format('HH:mm a')}</Text>
                        </View>
                    </Row>
                </Section>

                {/*<Section>
                    <FormLegend title='Required Candidate' />
                    <Row>
                        <Icon name='ios-radio-button-on' size={Metrics.icons.tiny} color={Colors.branding} />
                        <Spacer v />
                        <View>
                            <Text sm mute>Age</Text>
                            <Text>16-20, 21-30, 31-40, 41-50</Text>
                        </View>
                    </Row>

                    <Spacer />

                    <Row>
                        <Icon name='ios-radio-button-on' size={Metrics.icons.tiny} color={Colors.branding} />
                        <Spacer v />
                        <View>
                            <Text sm mute>Language</Text>
                            <Text>English, Chinese</Text>
                        </View>
                    </Row>

                    <Spacer />

                    <Row>
                        <Icon name='ios-radio-button-on' size={Metrics.icons.tiny} color={Colors.branding} />
                        <Spacer v />
                        <View>
                            <Text sm mute>Gender</Text>
                            <Text>Male</Text>
                        </View>
                    </Row>

                    <Spacer />

                    <Row>
                        <Icon name='ios-radio-button-on' size={Metrics.icons.tiny} color={Colors.branding} />
                        <Spacer v />
                        <View>
                            <Text sm mute>Nationality</Text>
                            <Text>Singaporean</Text>
                        </View>
                    </Row>
                </Section>*/}

                <Section>
                    <Text sm branding>Remaining Slots</Text>
                    <Text>{job.max_slot - job.approved_applicants.length}</Text>

                    <Spacer />

                    <Text sm branding>Per Hour</Text>
                    <Text>${job.per_hour}</Text>
                </Section>

                <Section>
                    <FormLegend title='Description' />
                    <Text>{job.description}</Text>
                </Section>

                <Section>
                    <FormLegend title='Instructions' />
                    <Text>{job.instructions}</Text>
                </Section>

                {job.remarks &&
                <Section>
                    <FormLegend title='Remarks' />
                    <Text>{job.remarks}</Text>
                </Section>
                }

                {/*<Section>
                    <FormLegend title='Job Requirement' />
                    <Text>Transporting of products (from cold room to orking area), labeling and packing of food products.</Text>
                </Section>

                <Section>
                    <FormLegend title='Payment' />
                    <Text>The payment of this job is not under Primarius Staffing. The employer you worked for will pay you directly. Please read job requirement and details carefully before you apply for this job.</Text>
                </Section>*/}

                {role_id !== user &&
                <React.Fragment>
                    {job.pending_applicants.length > 0 &&
                    <Section>
                        <Row bw>
                            <Text sm>Submitted Applications: {job.pending_applicants.length}</Text>
                            <Button sm outline type='branding' text='View' onPress={() => navigate('PendingApplications', {Job:job})} />
                        </Row>
                    </Section>
                    }

                    {job.approved_applicants.length > 0 &&
                    <Section>
                        <Row bw>
                            <Text sm>Approved Applications: {job.approved_applicants.length}</Text>
                            <Button sm outline type='branding' text='View' onPress={() => navigate('ApprovedApplications', {Job:job})} />
                        </Row>
                    </Section>
                    }

                    {job.completed_applicants.length > 0 &&
                    <Section>
                        <Row bw>
                            <Text sm>Completed Applications: {job.completed_applicants.length}</Text>
                            <Button sm outline type='branding' text='View' onPress={() => navigate('CompletedApplications', {Job:job})} />
                        </Row>
                    </Section>
                    }

                    {job.missed_applicants.length > 0 &&
                    <Section>
                        <Row bw>
                            <Text sm>Missed Applications: {job.missed_applicants.length}</Text>
                            <Button sm outline type='branding' text='View' onPress={() => navigate('MissedApplications', {Job:job})} />
                        </Row>
                    </Section>
                    }
                </React.Fragment>
                }

                {(this.props.isLoggedIn && !checking && role_id === user) &&
                <React.Fragment>
                    {(!is_applied && moment(today).isSameOrBefore(job.from)) &&
                    <Button text='Apply' type='success' onPress={this.handleApply} />
                    }
                    {(is_applied && moment(today).isSameOrBefore(job.from)) &&
                    <Button text='Cancel' type='inverse' onPress={this.handleCancel} />
                    }
                </React.Fragment>
                }

                {!this.props.isLoggedIn && <Button text='Login to submit application' onPress={() => this.props.navigation.navigate('Login')} />}

                {(this.props.isLoggedIn && role_id !== user) &&
                <React.Fragment>
                    <Button text='Edit Job' type='info' onPress={() => this.props.navigation.navigate('EditJob',{Job:job})} mb />
                    <Button text='Delete Job' type='danger' onPress={this.handleDelete} />
                </React.Fragment>
                }
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
        isConnected: state.network.isConnected,
        isLoggedIn: state.auth.isLoggedIn,
        isUpdate: state.job.isUpdateJobScreen
    }
}

mapDispatchToProps = dispatch => {
    return {
        updateJobs:isUpdate => dispatch(Actions.updateJobsScreen(isUpdate)),
        updateJob:isUpdate => dispatch(Actions.updateJobScreen(isUpdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewScreen)