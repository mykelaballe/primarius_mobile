import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image, InteractionManager, Alert} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../../Themes'
import {ScrollView, Button, Text, Spacer, Section, Row, Cover, Picker} from '../../Components'
import {Globals, Storage, Consts, Func} from '../../Utils'
import {API} from '../../Services'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {Calendar} from 'react-native-calendars'

const moment = require('moment')

const completed = {color: Colors.success}
const upcoming = {color: Colors.info}
const missed = {color: Colors.danger}
const cancelled = {color: Colors.warning}
const has_job = {color: Colors.inverse}

class ListingScreen extends React.Component {

    state = {
        featured: [],
        jobs: [],
        /*events: {
            '2019-06-10': {startingDay: true, color: Colors.warning, textColor: Colors.light, title: 'Birthday'},
            '2019-06-11': {color: Colors.success, textColor: Colors.light, title: 'Birthday'},
            '2019-06-12': {color: Colors.danger, textColor: Colors.light, title: 'Birthday'},
            '2019-06-13': {color: Colors.inverse, textColor: Colors.light, title: 'Birthday'},
            '2019-06-14': {color: Colors.info, textColor: Colors.light, title: 'Birthday'},
            [Func.getToday()]: {startingDay: true, endingDay: true, color:Colors.branding, selected: true}
        },*/
        events: {},//multi-dot
        /*events: {//multi-period
            '2019-06-19': {
                periods: [
                    { startingDay: false, endingDay: true, color: Colors.success },
                    { startingDay: false, endingDay: true, color: Colors.info },
                    { startingDay: false, endingDay: true, color: Colors.danger },
                    { startingDay: false, endingDay: true, color: Colors.inverse },
                    { startingDay: false, endingDay: true, color: Colors.warning },
                ]
            },
        },*/
        today: Func.getToday(),
        date: null,
        organization_id: null,
        status: null,
        organizations: [],
        loading: true,
        refreshing: false
    }

    componentWillMount = () => {
        API.getOrganizations().then(data => {
            let organizations = []

            for(let d in data) {
                organizations.push({
                    label: data[d].name,
                    value: data[d].id
                })
            }

            if(organizations.length > 0) {
                organizations.unshift({
                    label: 'All',
                    value: null
                })
            }
            
            this.setState({organizations})
        })
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    componentWillReceiveProps = nextProps => {
        if(nextProps.isUpdateList) {
            this.handleRefresh()
            this.props.updateList(false)
        }
    }

    getData = async () => {
        const {role_id} = this.props.user
        const {roles} = Consts
        let {date, organization_id, status, today} = this.state
        let featured = jobs = []
        let events = {}

        if(this.props.isConnected) {
            try {
                jobs = await API.getJobFeed({date, organization:organization_id, status})

                if(role_id === roles.user) {
                    for(let j in jobs) {
                        let job = jobs[j]
                        let fromDate = moment(job.from).format('YYYY-MM-DD')
                        if(typeof events[fromDate] === 'undefined') events[fromDate] = {dots:[]}
    
                        if(job.approved_applicants.length > 0 && moment(today).isSameOrBefore(fromDate)) {
                            events[fromDate].dots.push(upcoming)
                        }
    
                        if(job.completed_applicants.length > 0) events[fromDate].dots.push(completed)
                        if(job.missed_applicants.length > 0) events[fromDate].dots.push(missed)
                        if(job.cancelled_applicants.length > 0) events[fromDate].dots.push(cancelled)
                    }
                }

                if(typeof events[date] !== 'undefined') events[date] = {...events[date]}
                else events[date] = {}

                if(date) {
                    events[date].selected = true
                    events[date].selectedColor = Colors.branding
                }
            }
            catch(err) {
                Toast.show(Globals.error.generic)
            }
        }
        else {
            Toast.show(Globals.error.network)
        }

        this.setState({
            featured,
            jobs,
            events,
            loading: false,
            refreshing: false
        })
    }

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    handleViewDate = day => {
        let {date, today} = this.state
        let events = {...this.state.events}
        let newDate = day.dateString
        let obj = events[newDate]
        let formattedDate = moment(newDate).format('YYYY-MM-DD')
        //if(obj && obj.title) Alert.alert(moment(date).format('MMMM DD, YYYY'), obj.title)
        
        /*if(date && typeof events[date] !== 'undefined') {
            delete events[date].selected
            delete events[date].selectedColor
        }
        
        if(typeof events[formattedDate] === 'undefined') {
            events[formattedDate] = {
                selected: true,
                selectedColor: Colors.branding
            }
        }*/

        if(date === formattedDate) {
            events[formattedDate].selected = false
            formattedDate = null
            today = Func.getToday()
        }
        else {
            today = formattedDate
        }
        
        this.setState({
            date: formattedDate,
            today,
            events
        },this.handleRefresh)
    }

    renderFeatured = ({item, index}) => {
        return (
            <View style={[style.card,{height:150}]}>
                <Image source={{uri:item.photo}} style={[style.cover,{opacity:1}]} resizeMode='cover' />
            </View>
        )
    }

    renderJobs = ({item, index}) => {
        return (
            <TouchableOpacity style={[style.card,{width:undefined}]} onPress={() => this.props.navigation.navigate('JobDetail',{Job:item})}>
                <View style={{flex:1,width:undefined}}>
                    <Cover source={item.cover || item.organization.logo} style={style.cover} />
                    <View style={{position:'absolute',bottom:0,padding:Metrics.psm}}>
                        <Text bold light numberOfLines={2}>{item.description}</Text>
                    </View>
                    {this.props.user.role_id === Consts.roles.user &&
                    <View style={{position:'absolute',top:5,left:5,padding:Metrics.psm}}>
                        {item.approved_applicants.length > 0 && <View style={[style.badge,{backgroundColor:Colors.info}]} />}
                        {item.completed_applicants.length > 0 && <View style={[style.badge,{backgroundColor:Colors.success}]} />}
                        {item.missed_applicants.length > 0 && <View style={[style.badge,{backgroundColor:Colors.danger}]} />}
                        {item.cancelled_applicants.length > 0 && <View style={[style.badge,{backgroundColor:Colors.warning}]} />}
                    </View>
                    }
                    <View style={{position:'absolute',top:10,right:10,padding:Metrics.psm}}>
                        <Row>
                            <Text bold light h3>${item.per_hour}</Text>
                            <Text bold light> / hr</Text>
                        </Row>
                    </View>
                </View>
                <View style={{padding:Metrics.pb,backgroundColor:Colors.light}}>
                    <Row>
                        <FontAwesome name='map-marker' size={Metrics.icons.tiny} color={Colors.danger} style={{marginRight:Metrics.msm}} />
                        <Text branding sm numberOfLines={2}>{item.address}</Text>
                    </Row>

                    <Spacer xs />

                    <Row>
                        <FontAwesome name='calendar-o' size={Metrics.icons.tiny} color={Colors.info} style={{marginRight:Metrics.msm}} />
                        <Text branding sm numberOfLines={2}>{moment(item.from).format('DD-MM-YYYY')} to {moment(item.to).format('DD-MM-YYYY')}</Text>
                    </Row>

                    <Spacer xs />

                    <Row>
                        <FontAwesome name='clock-o' size={Metrics.icons.tiny} color={Colors.warning} style={{marginRight:Metrics.msm}} />
                        <Text branding sm numberOfLines={2}>{moment(item.from).format('HH:mm a')} to {moment(item.to).format('HH:mm a')}</Text>
                    </Row>

                    <Spacer xs />

                    <Text branding sm numberOfLines={2}>Remaining Slots: {item.max_slot - item.approved_applicants.length}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {

        const {featured, jobs, events, today, organization_id, status, organizations, date, loading, refreshing} = this.state
        const {role_id} = this.props.user
        const {roles} = Consts

        return (
            <ScrollView refreshing={refreshing} onRefresh={this.handleRefresh}>

                {role_id === roles.user &&
                <Section style={{padding:Metrics.pb}}>
                    <Row style={{justifyContent:'space-around'}}>
                        <Text sm inverse bold>Avail</Text>
                        <Spacer v />
                        <Text sm info bold>Upcoming</Text>
                        <Spacer v />
                        <Text sm success bold>Completed</Text>
                        <Spacer v />
                        <Text sm danger bold>Missed</Text>
                        <Spacer v />
                        <Text sm warning bold>Cancelled</Text>
                    </Row>
                </Section>
                }

                <Section style={{padding:Metrics.pb}}>
                    <Row bw>
                        <View style={{flex:1}}>
                            <Text sm mute>Company</Text>
                            <Picker
                                prompt='Company'
                                selectedValue={organization_id}
                                style={[AppStyles.input_simple,{flex:1}]}
                                onValueChange={organization_id => this.setState({organization_id},this.handleRefresh)}
                                data={organizations}
                            />
                        </View>

                        {role_id === roles.user &&
                        <View style={{flex:1}}>
                            <Text sm mute>Status</Text>
                            <Picker
                                prompt='Status'
                                selectedValue={status}
                                style={[AppStyles.input_simple,{flex:1}]}
                                onValueChange={status => this.setState({status},this.handleRefresh)}
                                data={[
                                    {label:'Avail',value:null},
                                    {label:'Upcoming',value:'upcoming'},
                                    {label:'Completed',value:'completed'},
                                    {label:'Missed',value:'missed'},
                                    {label:'Cancelled',value:'cancelled'},
                                ]}
                            />
                        </View>
                        }
                    </Row>
                </Section>

                <Calendar
                    current={today}
                    hideExtraDays={true}
                    onDayPress={this.handleViewDate}
                    markedDates={events}
                    markingType='multi-dot'
                />

                {/*date &&
                <React.Fragment>
                    <Spacer sm />
                    <TouchableOpacity onPress={() => this.setState({date:null},this.handleRefresh)} style={style.pill}>
                        <Row>
                            <Text light>Selected Date: {moment(date).format('DD MMM YYYY')}</Text>
                            <Spacer v />
                            <Icon name='ios-close-circle' size={Metrics.icons.regular} color={Colors.light} />
                        </Row>
                    </TouchableOpacity>
                </React.Fragment>
                */}

                {featured.length > 0 &&
                <FlatList
                    data={featured}
                    renderItem={this.renderFeatured}
                    horizontal
                />
                }

                <FlatList
                    data={jobs}
                    renderItem={this.renderJobs}
                    loading={loading}
                />
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    card: {
        width:300,
        height:200,
        borderRadius:Metrics.rb,
        marginHorizontal:Metrics.msm,
        marginVertical:Metrics.mb,
        backgroundColor:Colors.dark,
        elevation:1
    },
    cover: {
        flex:1,
        width:undefined,
        height:undefined,
        borderTopLeftRadius:Metrics.rb,
        borderTopRightRadius:Metrics.rb,
        opacity:.5
    },
    badge: {
        width: 13,
        height: 13,
        borderRadius: 13
    },
    pill: {
        width:250,
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
        isUpdateList: state.job.isUpdateJobsScreen
    }
}

mapDispatchToProps = dispatch => {
    return {
        updateList:isUpdate => dispatch(Actions.updateJobsScreen(isUpdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingScreen)