import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../../Themes'
import {ScrollView, FlatList, Button, Text, Spacer, Section, Row, ListItem, Cover} from '../../Components'
import {Globals, Storage, Func, Consts} from '../../Utils'
import {API} from '../../Services'
import Icon from 'react-native-vector-icons/Ionicons'

class ViewScreen extends React.Component {

    state = {
        ...this.props.navigation.state.params.Organization
    }

    componentWillReceiveProps = nextProps => {
        if(nextProps.isUpdate) {
            this.handleRefresh()
            this.props.updateOrganization(false)
        }
    }

    handleDelete = () => {
        if(this.props.isConnected) {
            try {
                Func.ask('Are you sure?','Delete Organization',[
                    {text:'Yes',onPress: async () => {

                        let {id} = this.state

                        await API.deleteOrganization(id)

                        this.props.updateOrganizations(true)
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
                let data = await API.getOrganization(this.state.id)
                this.setState({...data})
            }
            catch(err) {
    
            }
        }
    }

    renderJobs = ({item, index}) => {
        return (
            <ListItem>
                <Text>Hiring for {item.hiring_for}</Text>
                <Text mute>{item.description}</Text>
            </ListItem>
        )
    }

    render() {

        const {name, about, address, logo, jobs} = this.state
        const {navigation} = this.props
        const {role_id} = this.props.user
        const {user} = Consts.roles

        return (
            <ScrollView>
                <Section>
                    <Cover source={logo} />
                </Section>

                <Section>
                    <Text sm branding>Name</Text>
                    <Text>{name}</Text>
                </Section>

                <Section>
                    <Text sm branding>About</Text>
                    <Text>{about}</Text>
                </Section>

                <Section>
                    <Text sm branding>Address</Text>
                    <Text>{address}</Text>
                </Section>

                <Section>
                    <FormLegend title='Jobs Posted' />

                    <FlatList
                        data={jobs}
                        renderItem={this.renderJobs}
                    />
                </Section>

                {role_id !== user &&
                <React.Fragment>
                    <Button text='Edit' type='info' onPress={() => navigation.navigate('EditOrganization',{Organization:this.state})} mb />
                    <Button text='Delete' type='danger' onPress={this.handleDelete} />
                </React.Fragment>
                }
            </ScrollView>
        )
    }
}

mapStateToProps = state => {
    return {
        user: state.user,
        isConnected: state.network.isConnected,
        isUpdate: state.organization.isUpdateOrganizationScreen
    }
}

mapDispatchToProps = dispatch => {
    return {
        updateOrganizations:isUpdate => dispatch(Actions.updateOrganizationsScreen(isUpdate)),
        updateOrganization:isUpdate => dispatch(Actions.updateOrganizationScreen(isUpdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewScreen)