import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import {ScrollView, FlatList, Section, Button, Spacer, FormLegend} from '../../Components'
import {Metrics, Images} from '../../Themes'
import {API} from '../../Services'
import {Globals} from '../../Utils'
import Toast from 'react-native-root-toast' 

const ImagePicker = require('react-native-image-picker')
const {width} = Dimensions.get('window')
const BANNER_WIDTH = (width / 2) - ((Metrics.pb + Metrics.pdb) * 2)

class BannerScreen extends React.Component {

    state = {
        banners: [
            {path:null},
            {path:null},
            {path:null},
            {path:null},
            {path:null}
        ]
    }

    componentDidMount = () => this.getData()

    getData = async () => {
        if(this.props.isConnected) {
            try {
                let banners = this.state.banners.slice()
                let data = await API.getBanners()

                for(let d in data) banners[d] = {
                    ...data[d],
                    path:`${Globals.s3}${data[d].path}`
                }

                this.setState({banners})
            }
            catch(err) {
                Toast.show(Globals.error.generic)
            }
        }
        else {
            Toast.show(Globals.error.network)
        }
    }

    handleSave = async () => {
        if(this.props.isConnected) {
            try {
                const {banners} = this.state

                let payload = {
                    banners: []
                }

                for(let b in banners) payload.banners.push(banners[b].path)

                await API.setBanners(payload)
                Toast.show('Done')
            }
            catch(err) {
                Toast.show(Globals.error.generic)
            }
        }
        else {
            Toast.show(Globals.error.network)
        }
    }

    handleBrowseLogo = index => {
        const options = {
            title: 'Browse Image',
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
                let banners = this.state.banners.slice()

                banners[index].path = 'data:image/jpeg;base64,' + response.data
            
                this.setState({banners})
            }
        })
    }

    handleRemove = index => {
        let banners = this.state.banners.slice()
        banners[index].path = null
        this.setState({banners})
    }

    renderBanners = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => this.handleBrowseLogo(index)}>
                <Image
                    source={item.path ? {uri:item.path} : Images.default.image}
                    style={{width: BANNER_WIDTH,height:100,margin:Metrics.msm}}
                    resizeMode='cover'
                />
                {item.path && <Button sm text='Remove' type='danger' onPress={() => this.handleRemove(index)} />}
            </TouchableOpacity>
        )
    }

    render() {

        const {banners} = this.state

        return (
            <ScrollView>
                <Section>

                    <FormLegend title='Banners' />

                    <FlatList
                        data={banners}
                        renderItem={this.renderBanners}
                        numColumns={2}
                    />

                    <Spacer />

                    <Button text='Save' onPress={() => this.handleSave()} />
                </Section>
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