import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../../Themes'
import {ScrollView, Button, Text, Spacer, Section, Row, Cover} from '../../Components'
import {Globals, Storage} from '../../Utils'
import {API} from '../../Services'
import Icon from 'react-native-vector-icons/Ionicons'

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
                list = await API.getOrganizations()
            }
            catch(err) {
                
            }
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
            <TouchableOpacity style={[style.card,{width:undefined}]} onPress={() => this.props.navigation.navigate('ViewOrganization',{Organization:item})}>
                <View style={{flex:1,width:undefined}}>
                    <Cover source={item.logo} style={style.cover} />
                    <View style={{position:'absolute',bottom:0,padding:Metrics.psm}}>
                        <Text bold light numberOfLines={2}>{item.name}</Text>
                    </View>
                </View>
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
        isConnected: state.network.isConnected,
        isUpdateList: state.organization.isUpdateOrganizationsScreen
    }
}

mapDispatchToProps = dispatch => {
    return {
        updateList:isUpdate => dispatch(Actions.updateOrganizationsScreen(isUpdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingScreen)