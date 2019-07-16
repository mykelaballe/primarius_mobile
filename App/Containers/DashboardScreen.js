import React from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {ScrollView, Section, Text} from '../Components'


class DashboardScreen extends React.Component {

    state = {

    }

    render() {

        return (
            <ScrollView>
                <Section>
                    <Text xl center bold>Statistics and Charts</Text>
                </Section>
            </ScrollView>    
        )
    }
}

mapStateToProps = state => {
    return {
        
    }
}

export default connect(mapStateToProps)(DashboardScreen)