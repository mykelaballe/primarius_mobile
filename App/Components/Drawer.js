import React, {Component} from 'react'
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../Actions/Creators'
import {NavigationActions} from 'react-navigation'
import {Metrics, Images, Colors, Fonts} from '../Themes'
import {ScrollView, DrawerItem, Text, Avatar, Row, Spacer} from './'
import {Globals, Storage, Fetch, Translator, Consts} from '../Utils'
import Icon from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-root-toast'

class Drawer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current:Consts.initialRoute
        }
    }

    componentWillReceiveProps = nextProps => {
        if(nextProps.activeDrawerItem !== this.state.current) {
            this.setState({
                current:nextProps.activeDrawerItem
            })
        }
    }

    navigateToScreen = routeName => {
        const {current} = this.state
        if(current !== routeName) {
            const route = NavigationActions.reset({
                index:0,
                actions:[NavigationActions.navigate({ routeName:routeName })]
            })
            this.props.setActiveDrawerItem(routeName)
            this.props.setLastVisitedRoute(routeName)
            this.props.navigation.dispatch(route)
        }
        else this.props.navigation.navigate('DrawerClose')
    }

    render () {

        const {role_id, avatar} = this.props.user

        return (
            <ScrollView style={{backgroundColor:Colors.branding}}>

                <View style={style.logoContainer}>
                    <Image source={Images.logo} style={{width:150,height:150}} resizeMode='contain' />
                </View>
                
                {/*<DrawerItem label='Dashboard' icon='ios-stats' onPress={() => this.navigateToScreen('Dashboard')} />*/}
                <DrawerItem label='Jobs' icon='ios-briefcase' onPress={() => this.navigateToScreen('JobFeed')} />
                <DrawerItem label='Appointments' icon='ios-clipboard' onPress={() => this.navigateToScreen('Appointments')} />
                <DrawerItem label='Users' icon='ios-people' onPress={() => this.navigateToScreen('Users')} />
                <DrawerItem label='Organizations' icon='building-o' iconType='fa' onPress={() => this.navigateToScreen('Organizations')} />
                <DrawerItem label='Settings' icon='ios-cog' onPress={() => this.navigateToScreen('Settings')} />
                <DrawerItem label='Report' icon='ios-stats' onPress={() => this.navigateToScreen('ReportIndex')} />
                <TouchableOpacity onPress={() => this.navigateToScreen('Me')}>
                    <Row>
                        <Avatar source={avatar} />
                        <Spacer v />
                        <Text light>Profile</Text>
                    </Row>
                </TouchableOpacity>
                
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    logoContainer: {
        justifyContent:'flex-start',
        alignItems:'center',
        paddingTop:Metrics.pdb
    },
})

mapStateToProps = state => {
    return {
        user: state.user,
        activeDrawerItem: state.app.activeDrawerItem
    }
}

mapDispatchToProps = dispatch => {
    return {
      setActiveDrawerItem: (item) => dispatch(Actions.setActiveDrawerItem(item)),
      setLastVisitedRoute: (route) => dispatch(Actions.setLastVisitedRoute(route))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)