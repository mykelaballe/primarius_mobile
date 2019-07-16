import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {Metrics, Colors} from '../../Themes'
import {ScrollView, Button, Text, Spacer, Section, Row} from '../../Components'
import Icon from 'react-native-vector-icons/Ionicons'

class IndexScreen extends React.Component {

    render() {

        const {navigate} = this.props.navigation

        return (
            <ScrollView>
                <TouchableOpacity onPress={() => navigate('ReportUserDemerits')}>
                    <Section>
                        <Row bw>
                            <Text>User Demerits</Text>
                            <Icon name='ios-arrow-forward' size={Metrics.icons.regular} color={Colors.branding} />
                        </Row>
                    </Section>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

export default IndexScreen