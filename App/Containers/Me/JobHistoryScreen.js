import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../../Themes'
import {ScrollView, Button, Text, Spacer, Section, Row, Cover} from '../../Components'
import {Globals, Storage, Consts} from '../../Utils'
import {API} from '../../Services'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const moment = require('moment')

class ListingScreen extends React.Component {

    state = {
        user: this.props.navigation.state.params.User,
        jobs: [],
        loading: true,
        refreshing: false
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        const {user} = this.state
        let jobs = []

        if(this.props.isConnected) {
            try {
                jobs = await API.getJobs(user.id)
            }
            catch(err) {
                Toast.show(Globals.error.generic)
            }
        }
        else {
            Toast.show(Globals.error.network)
        }

        this.setState({
            jobs,
            loading: false,
            refreshing: false
        })
    }

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    renderJobs = ({item, index}) => {
        return (
            <TouchableOpacity style={[style.card,{width:undefined}]} onPress={() => this.props.navigation.navigate('JobDetail',{Job:item.job})}>
                <View style={{flex:1,width:undefined}}>
                    <Cover source={item.job.cover || item.job.organization.logo} style={style.cover} />
                    <View style={{position:'absolute',bottom:0,padding:Metrics.psm}}>
                        <Text bold light numberOfLines={2}>{item.job.description}</Text>
                    </View>
                    <View style={{position:'absolute',top:10,right:10,padding:Metrics.psm}}>
                        <Row>
                            <Text bold light h3>${item.job.per_hour}</Text>
                            <Text bold light> / hr</Text>
                        </Row>
                    </View>
                </View>
                <View style={{padding:Metrics.pb,backgroundColor:Colors.light}}>
                    <Text sm>Status: {item.status}</Text>
                    <Row>
                        <FontAwesome name='map-marker' size={Metrics.icons.tiny} color={Colors.danger} style={{marginRight:Metrics.msm}} />
                        <Text branding sm numberOfLines={2}>{item.job.address}</Text>
                    </Row>

                    <Spacer xs />

                    <Row>
                        <FontAwesome name='calendar-o' size={Metrics.icons.tiny} color={Colors.info} style={{marginRight:Metrics.msm}} />
                        <Text branding sm numberOfLines={2}>{moment(item.job.from).format('DD-MM-YYYY')} to {moment(item.job.to).format('DD-MM-YYYY')}</Text>
                    </Row>

                    <Spacer xs />
                    
                    <Row>
                        <FontAwesome name='clock-o' size={Metrics.icons.tiny} color={Colors.warning} style={{marginRight:Metrics.msm}} />
                        <Text branding sm numberOfLines={2}>{moment(item.job.from).format('HH:mm a')} to {moment(item.job.to).format('HH:mm a')}</Text>
                    </Row>
                </View>
            </TouchableOpacity>
        )
    }

    render() {

        const {jobs, loading, refreshing} = this.state

        return (
            <ScrollView refreshing={refreshing} onRefresh={this.handleRefresh}>
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
    }
})

mapStateToProps = state => {
    return {
        isConnected: state.network.isConnected
    }
}

export default connect(mapStateToProps)(ListingScreen)