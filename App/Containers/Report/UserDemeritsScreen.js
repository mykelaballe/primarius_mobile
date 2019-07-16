import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../../Themes'
import {ScrollView, Button, Text, Spacer, Section, Row, Avatar} from '../../Components'
import {Globals, Func} from '../../Utils'
import {API} from '../../Services'
import Icon from 'react-native-vector-icons/Ionicons'
import FromDateTimePicker from 'react-native-modal-datetime-picker'
import ToDateTimePicker from 'react-native-modal-datetime-picker'

const moment = require('moment')

class UserDemeritsScreen extends React.Component {

    state = {
        list: [],
        from: moment(),
        to: moment(),
        showFromDatePicker: false,
        showToDatePicker: false,
        loading: true,
        refreshing: false
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        let {from, to} = this.state
        let list = []

        if(this.props.isConnected) {
            try {
                from = moment(from).format('YYYY-MM-DD')
                to = moment(to).format('YYYY-MM-DD')

                list = await API.getReportUserDemerits({from, to})
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

    handleChangeFromDate = from => {
        this.setState({
            from,
            showFromDatePicker: false
        },() => this.handleRefresh())
    }

    handleChangeToDate = to => {
        this.setState({
            to,
            showToDatePicker: false
        },() => this.handleRefresh())
    }

    renderList = ({item, index}) => {
        return (
            <Section>
                <Row>
                    <Avatar source={item.avatar} />
                    <Spacer v />
                    <View>
                        <Text>{item.firstname} {item.lastname}</Text>
                        <Text mute>Demerits: {item.demerits.length}</Text>
                    </View>
                </Row>
            </Section>
        )
    }

    render() {

        const {list, from, to, showFromDatePicker, showToDatePicker, loading, refreshing} = this.state
        let from_formatted = moment(from).format('YYYY-MM-DD')
        let to_formatted = moment(to).format('YYYY-MM-DD')

        return (
            <ScrollView refreshing={refreshing} onRefresh={this.handleRefresh}>
                <FromDateTimePicker
                    value={from}
                    mode='date'
                    isVisible={showFromDatePicker}
                    onConfirm={this.handleChangeFromDate}
                    onCancel={() => this.setState({showFromDatePicker:false})}
                />

                <ToDateTimePicker
                    value={to}
                    mode='date'
                    isVisible={showToDatePicker}
                    onConfirm={this.handleChangeToDate}
                    onCancel={() => this.setState({showToDatePicker:false})}
                />

                <Section>
                    <Row bw>
                        <View>
                            <Text sm branding>From</Text>
                            <Row>
                                <TouchableOpacity onPress={() => this.setState({showFromDatePicker:true})}>
                                    <Text>{from_formatted}</Text>
                                </TouchableOpacity>
                                
                                <Spacer v />

                                <Icon name='md-arrow-dropdown' color={Colors.dark} size={Metrics.icons.regular} />
                            </Row>
                        </View>

                        <View>
                            <Text sm branding>To</Text>
                            <Row>
                                <TouchableOpacity onPress={() => this.setState({showToDatePicker:true})}>
                                    <Text>{to_formatted}</Text>
                                </TouchableOpacity>
                                
                                <Spacer v />

                                <Icon name='md-arrow-dropdown' color={Colors.dark} size={Metrics.icons.regular} />
                            </Row>
                        </View>
                    </Row>
                </Section>

                <FlatList
                    data={list}
                    renderItem={this.renderList}
                    loading={loading}
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

export default connect(mapStateToProps)(UserDemeritsScreen)