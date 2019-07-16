import React from 'react'
import {View, StyleSheet, WebView, Dimensions, ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'

const {width, height} = Dimensions.get('window')

class WebViewScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:navigation.state.params.title
    })

    render() {

        return (
                <WebView
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{
                        uri:this.props.navigation.state.params.uri
                    }}
                    style={{height:this.props.deviceHeight}}
                    startInLoadingState={true}
                    renderLoading={() => <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator animating={true} /></View>}
                    onError={() => alert('error')}
                />
        )
    }
}

mapStateToProps = state => {
    return {
        user:state.user,
        deviceHeight:state.app.deviceHeight,
    }
}

export default connect(mapStateToProps)(WebViewScreen)