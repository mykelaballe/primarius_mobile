import React from 'react'
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../../Actions/Creators'
import Toast from 'react-native-root-toast'
import {Images, Metrics, Fonts, Colors, AppStyles} from '../../Themes'
import {ScrollView, FlatList, Button, Text, Spacer, HR, Section, Row, ActivityIndicator, Picker, Cover} from '../../Components'
import {Globals, Storage, Func} from '../../Utils'
import {API} from '../../Services'
import Icon from 'react-native-vector-icons/Ionicons'
import FromDateTimePicker from 'react-native-modal-datetime-picker'
import ToDateTimePicker from 'react-native-modal-datetime-picker'

const moment = require('moment')
const ImagePicker = require('react-native-image-picker')

class CreateScreen extends React.Component {

    state = {
        organization_id: null,
        type: null,
        selectedTypes: {},
        hiring_for: '',
        description: '',
        instructions: '',
        address: '',
        max_slot: '',
        from: moment(),
        to: moment(),
        per_hour: '',
        remarks: '',
        cover: null,
        organizations: [],
        types: [],
        loading: true,
        showFromDateTimePicker: false,
        showToDateTimePicker: false
    }

    componentWillMount = () => this.getData()

    getData = async () => {
        let organization_id = null, type = null, organizations = [], types = []

        if(this.props.isConnected) {
            try {
                let data_organizations = await API.getOrganizations()

                for(let d in data_organizations) {
                    organizations.push({
                        label: data_organizations[d].name,
                        value: data_organizations[d].id
                    })
                }

                if(organizations.length > 0) organization_id = organizations[0].value

                let data_types = await API.getTypes()

                for(let d in data_types) {
                    types.push({
                        label: data_types[d].name,
                        value: data_types[d].id
                    })
                }

                if(types.length > 0) type = types[0].value
            }
            catch(err) {

            }
        }

        this.setState({
            organization_id,
            type,
            organizations,
            types,
            loading: false
        })
    }

    handleSave = async () => {
        let {organization_id, selectedTypes, hiring_for, description, instructions, address, max_slot, from, to, per_hour, remarks, cover} = this.state

        if(this.props.isConnected) {
            try {
                hiring_for = hiring_for.trim()
                description = description.trim()
                address = address.trim()
                remarks = remarks.trim()

                from = moment(from).format('YYYY-MM-DD')
                to = moment(to).format('YYYY-MM-DD')

                if(hiring_for === '' || description === '' || address === '' || max_slot === '' || per_hour === '') alert('Please complete all required fields')
                else if(Object.keys(selectedTypes).length === 0) alert('Please select at least 1 type')
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
                        remarks,
                        types: Object.keys(selectedTypes)
                    }

                    if(cover) payload.cover = cover

                    await API.postJob(payload)

                    this.props.updateJobs(true)
                    this.reset()
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

    reset = () => {
        this.setState({
            hiring_for: '',
            description: '',
            instructions: '',
            address: '',
            max_slot: '',
            per_hour: '',
            remarks: '',
            cover: null,
        })
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

    handleAddType = () => {
        let {type, types} = this.state
        let selectedTypes = {...this.state.selectedTypes}
        if(typeof selectedTypes[type] === 'undefined') {
            for(let t in types) {
                if(types[t].value === type) {
                    selectedTypes[type] = types[t]
                    this.setState({selectedTypes})
                }
            }
        }
        else {
            Toast.show('Type already added')
        }
    }

    handleRemoveType = item => {
        let selectedTypes = this.state.selectedTypes
        delete selectedTypes[item.value]
        this.setState({selectedTypes})
    }

    handleBrowseCover = () => {
        const options = {
            title: 'Browse Cover',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }

        ImagePicker.showImagePicker(options, (response) => {
        
            if(response.didCancel) {
                
            }
            else if(response.error) {
                
            }
            else {
                let cover = 'data:image/jpeg;base64,' + response.data
            
                this.setState({cover})
            }
        })
    }

    handleRemoveCover = () => this.setState({cover:null})

    renderTypes = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => this.handleRemoveType(item)} style={style.pill}>
                <Text sm light>{item.label}</Text>
            </TouchableOpacity>
        )
    }

    render() {

        const {organization_id, type, selectedTypes, hiring_for, description, instructions, address, max_slot, from, to, per_hour, remarks, cover, organizations, types, loading, showFromDateTimePicker, showToDateTimePicker} = this.state
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
                    <TouchableOpacity onPress={this.handleBrowseCover}>
                        <Cover source={cover} />
                        <Spacer sm />
                        <Text sm light center>Tap to change cover</Text>
                    </TouchableOpacity>

                    <Spacer />

                    {cover && <Button text='Remove Cover' type='danger' onPress={this.handleRemoveCover} />}
                </Section>

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
                    <Text sm branding>Type*</Text>
                    {loading && <ActivityIndicator />}
                    {!loading &&
                    <Row>
                        <Picker
                            prompt='Type'
                            selectedValue={type}
                            style={[AppStyles.input_simple,{flex:1}]}
                            onValueChange={type => this.setState({type})}
                            data={types}
                        />
                        <Button sm text='Add' onPress={this.handleAddType} />
                    </Row>
                    }

                    {Object.keys(selectedTypes).length > 0 &&
                    <FlatList
                        data={Object.values(selectedTypes)}
                        renderItem={this.renderTypes}
                        horizontal
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

                {organization_id && <Button text='Save' onPress={this.handleSave} />}
                {!organization_id && <Text center>No organization selected</Text>}
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
    }
})

mapStateToProps = state => {
    return {
        isConnected: state.network.isConnected
    }
}

mapDispatchToProps = dispatch => {
    return {
        updateJobs:isUpdate => dispatch(Actions.updateJobsScreen(isUpdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateScreen)