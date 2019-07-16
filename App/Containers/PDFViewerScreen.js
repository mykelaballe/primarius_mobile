import React from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import PDF from 'react-native-pdf'

class PDFViewerScreen extends React.Component {

    render() {

        const source = this.props.navigation.state.params.source

        return (
            <View style={{flex:1}}>
                <PDF
                    source={{uri:source}}
                    style={[style.pdf,{width:this.props.deviceWidth}]}
                    cache={true}
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    pdf: {
        height:'100%'
    },
})

mapStateToProps = state => {
    return {
        deviceWidth: state.app.deviceWidth,
        deviceHeight: state.app.deviceHeight
    }
}

export default connect(mapStateToProps)(PDFViewerScreen)