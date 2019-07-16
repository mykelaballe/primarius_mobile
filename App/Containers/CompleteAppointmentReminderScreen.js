import React from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {ScrollView, Section, Text} from '../Components'

class CompleteAppointmentReminderScreen extends React.Component {

    render() {

        return (
            <ScrollView>
                <Section>
                    <Text lg center bold>Please complete your registration by going to Primarius office</Text>
                </Section>
            </ScrollView>
        )
    }
}

mapStateToProps = state => {
    return {
        
    }
}

export default connect(mapStateToProps)(CompleteAppointmentReminderScreen)