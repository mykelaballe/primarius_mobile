import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
import {Dimensions, AsyncStorage} from 'react-native'
import Toast from 'react-native-root-toast'
import Orientation from 'react-native-orientation'
import {Consts} from '../Utils'

const {height, width} = Dimensions.get('window')

export const INITIAL_STATE = Immutable({
  activeDrawerItem: Consts.initialRoute,
  deviceWidth: width,
  deviceHeight: height
})

const setActiveDrawerItem = (state, action) => state.merge({ activeDrawerItem:action.item})

const updateDeviceDimensions = (state, action) => {
  let deviceWidth = action.width
  let deviceHeight = action.height

  if(action.orientation === 'PORTRAIT') {
    if(action.width > action.height) {
      deviceWidth = action.height
      deviceHeight = action.width
    }
  }
  else {
    if(action.width < action.height) {
      deviceWidth = action.height
      deviceHeight = action.width
    }
  }
  return state.merge({ deviceWidth, deviceHeight })
}
  
const ACTION_HANDLERS = {
  [Types.SET_ACTIVE_DRAWER_ITEM]: setActiveDrawerItem,
  [Types.UPDATE_DEVICE_DIMENSIONS]: updateDeviceDimensions
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
