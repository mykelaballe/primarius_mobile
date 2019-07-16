import React from 'react'
import {View, StyleSheet, Image, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import { ScrollView, FlatList, Button, ActivityIndicator } from '../Components'
import {Metrics} from '../Themes'
import {Globals} from '../Utils'
import {API} from '../Services'
import Carousel from 'react-native-snap-carousel'
import Toast from 'react-native-root-toast'

const {width, height} = Dimensions.get('window')

class BannerScreen extends React.Component {

    state = {
        images: [],
        loading: true
    }

    componentDidMount = () => this.getBanners()

    getBanners = async () => {
        let images = []

        if(this.props.isConnected) {
            try {
                let data = await API.getBanners()

                for(let d in data) images.push(`${Globals.s3}${data[d].path}`)
            }
            catch(err) {
                Toast.show(Globals.error.generic)
            }
        }

        this.setState({
            images,
            loading: false
        })
    }

    renderImages = ({item, index}) => {
        return (
            <Image
                source={{uri:item}}
                style={{
                    width,
                    height
                }}
                resizeMode='cover'
            />
        )
    }

    render() {

        const {images, loading} = this.state
        const {replace} = this.props.navigation

        if(loading) return <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><ActivityIndicator /></View>

        return (
            <ScrollView nopad>

                <Carousel
                    ref={c => this._carousel = c }
                    data={this.state.images}
                    renderItem={this.renderImages}
                    sliderWidth={width}
                    itemWidth={width}
                />

                <View style={{position:'absolute',bottom:30}}>
                    <View style={{width, paddingHorizontal:Metrics.pb}}>
                        <Button text='Login' onPress={() => replace('Login')} mb />
                        <Button text='Sign Up' type='secondary' onPress={() => replace('SignUp')} />
                    </View>
                </View>
            </ScrollView>    
        )
    }
}

mapStateToProps = state => {
    return {
        isConnected: state.network.isConnected
    }
}

export default connect(mapStateToProps)(BannerScreen)