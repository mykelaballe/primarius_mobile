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

class MissedApplicationsScreen extends React.Component {

    state = {
        list: this.props.navigation.state.params.Job.missed_applicants
    }

    renderList = ({item, index}) => {
        return (
            <Section>
                <Row f>
                    <Avatar source={item.user.avatar} />
                    <Spacer v />
                    <View>
                        <Text>{item.user.firstname} {item.user.lastname}</Text>
                    </View>
                </Row>
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

export default connect(mapStateToProps)(MissedApplicationsScreen)