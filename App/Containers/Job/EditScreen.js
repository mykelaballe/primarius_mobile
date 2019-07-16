import React from 'react'
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../../Themes'
import {ScrollView, Button, Text, Spacer, HR, Section, Row, ActivityIndicator, Picker} from '../../Components'
import {Globals, Storage, Func} from '../../Utils'
import {API} from '../../Services'
import Icon from 'react-native-vector-icons/Ionicons'
import FromDateTimePicker from 'react-native-modal-datetime-picker'
import ToDateTimePicker from 'react-native-modal-datetime-picker'

const moment = require('moment')

class EditScreen extends React.Component {

    state = {
        id: this.props.navigation.state.params.Job.id,
        organization_id: this.props.navigation.state.params.Job.organization_id,
        hiring_for: this.props.navigation.state.params.Job.hiring_for,
        description: this.props.navigation.state.params.Job.description,
        instructions: this.props.navigation.state.params.Job.instructions,
        address: this.props.navigation.state.params.Job.address,
        max_slot: this.props.navigation.state.params.Job.max_slot.toString(),
        from: moment(this.props.navigation.state.params.Job.from),
        to: moment(this.props.navigation.state.params.Job.to),
        per_hour: this.props.navigation.state.params.Job.per_hour,
        remarks: this.props.navigation.state.params.Job.remarks,
        organizations: [],
        loading: true,
        showFromDateTimePicker: false,
        showToDateTimePicker: false
    }

    componentWillMount = () => this.getOrganizations()

    getOrganizations = async () => {
        let organizations = []

        if(this.props.isConnected) {
            try {
                let data = await API.getOrganizations()

                for(let d in data) {
                    organizations.push({
                        label: data[d].name,
                        value: data[d].id
                    })
                }
            }
            catch(err) {

            }
        }

        this.setState({
            organizations,
            loading: false
        })
    }

    handleSave = async () => {
        let {id, organization_id, hiring_for, description, instructions, address, max_slot, from, to, per_hour, remarks} = this.state

        if(this.props.isConnected) {
            try {
                hiring_for = hiring_for.trim()
                description = description.trim()
                address = address.trim()
                remarks = remarks.trim()

                from = moment(from).format('YYYY-MM-DD')
                to = moment(to).format('YYYY-MM-DD')

                if(hiring_for === '' || description === '' || address === '' || max_slot === '' || per_hour === '') alert('Please complete all required fields')
                else {
                    let payload = {
                        organization_id,
                        hiring_for,
                        description,
                        instructions,
                        address,
                        max_slot,
                        from,
                        to,
                        per_hour,
                        remarks
                    }
                    await API.editJob({id, payload})

                    this.props.updateJob(true)
                    this.props.updateJobs(true)
                    Toast.show('Saved')
                }
            }
            catch(err) {
                alert(Globals.error.generic)
            }
        }
        else {
            alert(Globals.error.network)
        }
    }

    handleChangeFromDate = from => {
        this.setState({
            from,
            showFromDateTimePicker: false
        })
    }

    handleChangeToDate = to => {
        this.setState({
            to,
            showToDateTimePicker: false
        })
    }

    render() {

        const {organization_id, hiring_for, description, instructions, address, max_slot, from, to, per_hour, remarks, organizations, loading, showFromDateTimePicker, showToDateTimePicker} = this.state
        let from_formatted = moment(from).format('YYYY-MM-DD')
        let to_formatted = moment(to).format('YYYY-MM-DD')

        return (
            <ScrollView>

                <FromDateTimePicker
                    value={from}
                    mode='date'
                    isVisible={showFromDateTimePicker}
                    onConfirm={this.handleChangeFromDate}
                    onCancel={() => this.setState({showFromDateTimePicker:false})}
                />

                <ToDateTimePicker
                    value={to}
                    mode='date'
                    isVisible={showToDateTimePicker}
                    onConfirm={this.handleChangeToDate}
                    onCancel={() => this.setState({showToDateTimePicker:false})}
                />

                <Section>
                    <Text sm branding>Organization</Text>
                    {loading && <ActivityIndicator />}
                    {!loading &&
                    <Picker
                        prompt='Organization'
                        selectedValue={organization_id}
                        style={[AppStyles.input_simple,{flex:1}]}
                        onValueChange={organization_id => this.setState({organization_id})}
                        data={organizations}
                    />
                    }
                </Section>
                
                <Section>
                    <Text sm branding>Hiring For*</Text>
                    <TextInput
                        ref='hiring_for'
                        style={AppStyles.input_simple}
                        onChangeText={hiring_for => this.setState({hiring_for})}
                        value={hiring_for}
                        placeholder='Required'
                        returnKeyType='next'
                        keyboardType='default'
                        autoCorrect={false}
                        autoCapitalize='words'
                        underlineColorAndroid='transparent'
                    />
                </Section>

                <Section>
                    <Text sm branding>Address*</Text>
                    <TextInput
                        ref='address'
                        style={AppStyles.textarea}
                        onChangeText={address => this.setState({address})}
                        value={address}
                        placeholder='Required'
                        returnKeyType='next'
                        keyboardType='default'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        multiline={true}
                    />
                </Section>

                <Section>
                    <Text sm branding>From*</Text>
                    <Row>
                        <TouchableOpacity onPress={() => this.setState({showFromDateTimePicker:true})}>
                            <Text>{from_formatted}</Text>
                        </TouchableOpacity>
                        
                        <Spacer v />

                        <Icon name='md-arrow-dropdown' color={Colors.dark} size={Metrics.icons.regular} />
                    </Row>

                    <Spacer />

                    <Text sm branding>To*</Text>
                    <Row>
                        <TouchableOpacity onPress={() => this.setState({showToDateTimePicker:true})}>
                            <Text>{to_formatted}</Text>
                        </TouchableOpacity>
                        
                        <Spacer v />

                        <Icon name='md-arrow-dropdown' color={Colors.dark} size={Metrics.icons.regular} />
                    </Row>
                </Section>

                <Section>
                    <Text sm branding>Max Slot*</Text>
                    <TextInput
                        ref='max_slot'
                        style={AppStyles.input_simple}
                        onChangeText={max_slot => this.setState({max_slot})}
                        value={max_slot}
                        placeholder='Required'
                        returnKeyType='next'
                        keyboardType='numeric'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                    />
                </Section>

                <Section>
                    <Text sm branding>Per Hour*</Text>
                    <TextInput
                        ref='per_hour'
                        style={AppStyles.input_simple}
                        onChangeText={per_hour => this.setState({per_hour})}
                        value={per_hour}
                        placeholder='Required'
                        returnKeyType='next'
                        keyboardType='numeric'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                    />
                </Section>

                <Section>
                    <Text sm branding>Description*</Text>
                    <TextInput
                        ref='description'
                        style={AppStyles.textarea}
                        onChangeText={description => this.setState({description})}
                        value={description}
                        placeholder='Required'
                        returnKeyType='next'
                        keyboardType='default'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        multiline={true}
                    />
                </Section>

                <Section>
                    <Text sm branding>Instructions</Text>
                    <TextInput
                        ref='instructions'
                        style={AppStyles.textarea}
                        onChangeText={instructions => this.setState({instructions})}
                        value={instructions}
                        placeholder='Type here'
                        returnKeyType='next'
                        keyboardType='default'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        multiline={true}
                    />
                </Section>

                <Section>
                    <Text sm branding>Remarks</Text>
                    <TextInput
                        ref='remarks'
                        style={AppStyles.textarea}
                        onChangeText={remarks => this.setState({remarks})}
                        value={remarks}
                        placeholder='Type here'
                        returnKeyType='go'
                        keyboardType='default'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        multiline={true}
                    />
                </Section>

                <Button text='Save' onPress={this.handleSave} />
            </ScrollView>
        )
    }
}

mapStateToProps = state => {
    return {
        isConnected: state.network.isConnected
    }
}

mapDispatchToProps = dispatch => {
    return {
        updateJobs:isUpdate => dispatch(Actions.updateJobsScreen(isUpdate)),
        updateJob:isUpdate => dispatch(Actions.updateJobScreen(isUpdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditScreen)