import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../../Themes'
import {ScrollView, Button, Text, Spacer, Section, Row, Avatar} from '../../Components'
import {Globals, Storage, Consts} from '../../Utils'
import {API} from '../../Services'

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
                list = await API.getUsers()
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

    renderList = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserProfile',{User:item})}>
                <Section>
                    <Row>
                        <Avatar source={item.avatar} />
                        <Spacer v />
                        <Text>{item.firstname} {item.lastname}</Text>
                    </Row>
                </Section>
            </TouchableOpacity>
        )
    }

    render() {

        const {list, loading, refreshing} = this.state

        return (
            <ScrollView refreshing={refreshing} onRefresh={this.handleRefresh}>
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
        isConnected: state.network.isConnected,
        isUpdateList: state.user.isUpdateUsersScreen
    }
}

mapDispatchToProps = dispatch => {
    return {
        updateList:isUpdate => dispatch(Actions.updateUsersScreen(isUpdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingScreen)