import {Dimensions, Platform} from 'react-native'
import DeviceInfo from 'react-native-device-info'

const os = Platform.OS

const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
    paddingHorizontal:10,px:10,
    paddingVertical:10,py:10,
    xsmallPadding:3,pxs:3,
    smallPadding:5,psm:5,
    basePadding:10,pb:10,
    mediumBasePadding:15,pmb:15,
    doubleBasePadding:20,pdb:20,
    tripleBasePadding:30,ptb:30,

    marginHorizontal:10,mx:10,
    marginVertical:10,my:10,
    xsmallMargin:3,mxs:3,
    smallMargin:5,msm:5,
    baseMargin:10,mb:10,
    mediumBaseMargin:15,mmb:15,
    doubleBaseMargin:20,mdb:20,
    tripleBaseMargin:30,mtb:30,

    section:25,

    baseBorder:10,
    smallBorder:5,
    xsmallBorder:3,

    horizontalLineHeight:1,
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
    navBarHeight: (os === 'ios') ? 64 : 54,
    navBarTab: (os === 'ios') ? 15 : 0,

    smallRadius:3,rs:3,
    baseRadius:5,rb:5,
    mediumRadius:10,rm:10,
    largeRadius:15,rl:15,
    hugeRadius:20,rh:20,
    buttonRadius:4,
    boxRadius:5,

    tab:{
        height:55,
        smheight:45,
        topPadding:5,	
    },
    icons: {
        tiny:15,
        small:20,
        regular:25,
        medium:30,
        lgmedium:40,
        large:45,
        huge:50,
        xl:60,
        xxl:80,
    },
    images: {
        xsmall:15,
        small:20,
        regular:30,
        medium:40,
        large:60,
        xlarge:80,
        xxlarge:100,
        xxxlarge:130,
        logo:300,
    }
}

export default metrics
