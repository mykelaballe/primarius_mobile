import React from 'react'
import { AppRegistry, View, Text } from 'react-native'
import App from './App'
import configureStore from './App/Store/Store'
import {Provider} from 'react-redux'
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])

const store = configureStore()

class Root extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <Provider store={store}><App {...this.props} /></Provider>
    }
}

AppRegistry.registerComponent('primariusstaffing', () => Root)
