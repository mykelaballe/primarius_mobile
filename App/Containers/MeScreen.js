import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../Themes'
import {ScrollView, FlatList, Button, Text, Spacer, Section, Row, Avatar, HR, VR, FormLegend, ListItem, ActivityIndicator} from '../Components'
import {Globals, Storage, Consts, Func} from '../Utils'
import {API} from '../Services'
import Icon from 'react-native-vector-icons/Ionicons'

class MeScreen extends React.Component {

    state = {
        user: {...((this.props.navigation.state.params && this.props.navigation.state.params.User) || this.props.user)},
        types: '',
        completed_jobs: 0,
        demerit: null,
        loading: true
    }

    componentWillMount = () => {
        this.prepareTypes()
        this.getData()
    }

    componentWillReceiveProps = nextProps => {
        if(nextProps.isUpdate) {
            this.handleRefresh()
            this.props.updateUser(false)
        }
    }

    prepareTypes = () => {
        const {user} = this.state
        let types = []

        for(let t in user.types) types.push(user.types[t].type.name)

        this.setState({types})
    }

    getData = async () => {
        if(this.props.isConnected) {
            try {
                const {user} = this.state
                const {role_id} = this.props.user
                const {roles} = Consts

                if(role_id !== roles.user && user.role_id === roles.user) {
                    
                    let demerit = 0
                    let data = await API.getUser(user.id)

                    for(let d in data.demerits) demerit += data.demerits[d].amount

                    this.setState({
                        demerit,
                        loading: false
                    })
                }
            }
            catch(err) {

            }
        }
    }

    handleLogout = async () => {
        let user = (await Storage.doLoad(Globals.db.user)).data
        await Storage.doSave(Globals.db.user,{data:null})
        this.props.setActiveDrawerItem('Dashboard')
        this.props.logout()
        this.props.clearUser()
    }

    handleDelete = () => {
        if(this.props.isConnected) {
            try {
                Func.ask('Are you sure?','Delete User',[
                    {text:'Yes',onPress: async () => {

                        let {user} = this.state

                        await API.deleteUser(user.id)

                        this.props.updateUsers(true)
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
                let data = await API.getUser(this.state.user.id)
                this.setState({
                    user: {...data}
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

    renderDocs = ({item}) => {
        return (
            <TouchableOpacity onPress={() => Func.downloadFile(item.path)}>
                <ListItem>
                    <Text flex>{item.path}</Text>
                </ListItem>
            </TouchableOpacity>
        )
    }

    render() {

        const {user, types, completed_jobs, demerit, loading} = this.state
        const {id, role_id} = this.props.user
        const {roles} = Consts

        return (
            <ScrollView>
                <Section style={{alignItems:'center'}}>
                    <Avatar source={user.avatar} size={Metrics.images.xxlarge} />
                    <Spacer />
                    <Text xl center>{user.firstname} {user.lastname}</Text>
                    <Text mute>{user.username}</Text>

                    <Spacer />

                    <View style={style.pill}>
                        <Text sm light>{Consts.role_names[user.role_id]}</Text>
                    </View>

                    <Spacer />

                    <Row bw>
                        {user.role_id === roles.user &&
                        <React.Fragment>
                            <View style={style.stat}>
                                <Text bold warning>{user.applications.length}</Text>
                                <Text sm mute>Submitted</Text>
                                <Text sm mute>Applications</Text>
                            </View>

                            <Spacer v />

                            <View style={style.stat}>
                                <Text bold info>{completed_jobs}</Text>
                                <Text sm mute>Completed</Text>
                                <Text sm mute>Jobs</Text>
                            </View>
                        </React.Fragment>
                        }
                        
                        {demerit !== null &&
                        <React.Fragment>
                            <Spacer v />

                            <View style={style.stat}>
                                {loading && <ActivityIndicator />}
                                {!loading && <Text bold danger>{demerit}</Text>}
                                <Text sm mute>Demerit</Text>
                                <Text sm mute>Points</Text>
                            </View>
                        </React.Fragment>
                        }
                    </Row>
                </Section>

                <Section>
                    <Text sm branding>Email</Text>
                    <Text>{user.email}</Text>

                    <Spacer />

                    <Text sm branding>NRIC</Text>
                    <Text>{user.nric}</Text>

                    <Spacer />

                    <Text sm branding>Contact No</Text>
                    <Text>{user.contact_no}</Text>

                    <Spacer />

                    <Text sm branding>Person-In-Charge</Text>
                    <Text>{user.is_in_charge ? 'Yes' : 'No'}</Text>
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
                </Section>

                {/*<Section>
                    <FormLegend title='Documents' />
                    <FlatList
                        data={user.documents}
                        renderItem={this.renderDocs}
                    />
                </Section>*/}

                <Section>
                    <Row bw>
                        <FormLegend title='Bank Details' />
                        <Button sm text='Set' onPress={() => this.props.navigation.navigate('EditUserBank',{User:user})} />
                    </Row>

                    <HR mv />
                    
                    {user.bank &&
                    <React.Fragment>
                        <Text sm branding>Name</Text>
                        <Text>{user.bank.name}</Text>

                        <Spacer />

                        <Text sm branding>Account Number</Text>
                        <Text>{user.bank.account_number}</Text>
                    </React.Fragment>
                    }
                </Section>

                <Section>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EditUser', {User:user})}>
                        <Row bw style={{padding:Metrics.pb}}>
                            <Row>
                                <Icon name='ios-person' size={Metrics.icons.small} color={Colors.branding} />
                                <Spacer v />
                                <Text>Edit Profile</Text>
                            </Row>
                            <Icon name='ios-arrow-forward' size={Metrics.icons.small} color={Colors.mute} />
                        </Row>
                    </TouchableOpacity>
                    
                    <HR mv />
                    
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('UserJobHistory',{User:user})}>
                        <Row bw style={{padding:Metrics.pb}}>
                            <Row>
                                <Icon name='ios-refresh' size={Metrics.icons.small} color={Colors.branding} />
                                <Spacer v />
                                <Text>Job History</Text>
                            </Row>
                            <Icon name='ios-arrow-forward' size={Metrics.icons.small} color={Colors.mute} />
                        </Row>
                    </TouchableOpacity>
                </Section>

                {(role_id !== roles.user && id !== user.id) &&
                <Button text='Delete' type='danger' onPress={this.handleDelete} />
                }

                {id === user.id && <Button text='Logout' type='inverse' onPress={this.handleLogout} />}
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
    },
    badge: {
        backgroundColor:Colors.branding,
        borderRadius:Metrics.rb,
        paddingHorizontal:Metrics.pb,
        paddingVertical:Metrics.psm,
        elevation:2
    },
    stat: {
        alignItems:'center',
        marginHorizontal:Metrics.msm,
        borderRightWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.mute,
        paddingRight:Metrics.pb
    }
})

mapStateToProps = state => {
    return {
        user: state.user,
        isConnected: state.network.isConnected,
        isUpdate: state.user.isUpdateUserScreen
    }
}

mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(Actions.logout()),
        clearUser: () => dispatch(Actions.clearUser()),
        setActiveDrawerItem: (item) => dispatch(Actions.setActiveDrawerItem(item)),
        updateUsers:isUpdate => dispatch(Actions.updateUsersScreen(isUpdate)),
        updateUser:isUpdate => dispatch(Actions.updateUserScreen(isUpdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeScreen)