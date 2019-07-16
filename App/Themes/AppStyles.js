import {StyleSheet} from 'react-native'
import {TabBarTop} from 'react-navigation'
import Metrics from './Metrics'
import Colors from './Colors'
import Fonts from './Fonts'

const style = {
    screen: {
        backgroundColor:Colors.gray,
        padding:Metrics.pmb
    },
    screenlight: {
        backgroundColor:Colors.light,
        padding:Metrics.pmb
    },
    input: {
        borderRadius:Metrics.rb,
        padding:Metrics.pmb,
        backgroundColor:Colors.light,
        fontSize:Fonts.size.h5,
        elevation:2,
    },
    input_simple: {
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.branding
    },
    textarea: {
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.branding,
        minHeight:100
    },
    list: {
        backgroundColor:Colors.light,
        justifyContent:'center',
        padding:Metrics.pdb,
        borderRadius:Metrics.rs,
        marginBottom:Metrics.msm,
        elevation:2
    },
    listItem: {
        justifyContent:'center',
        padding:Metrics.pdb,
        marginBottom:Metrics.msm,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.branding
    },
    tabBarOptions: {
        activeTintColor: Colors.light,
        labelStyle: {
          fontSize:11
        },
        style: {
          backgroundColor:Colors.branding
        }
    },
    tabOptions: {
        tabBarComponent: TabBarTop,
        tabBarPosition: 'top',
        animationEnabled: true,
        swipeEnabled: true,
        showIcon: false
    }
}

export default style