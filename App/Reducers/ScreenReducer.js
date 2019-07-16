import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  isUpdateUsersScreen: false,
  updatedUser: null,
  updatedUserProfile: null,
})

const updateUsersScreen = (state, action) => state.merge({ isUpdateUsersScreen:action.isUpdate })

const updateUserInUsersScreen = (state, action) => state.merge({ updatedUser:action.user })

const updateUserProfileScreen = (state, action) => state.merge({ updatedUserProfile:action.user })
  
const ACTION_HANDLERS = {
  [Types.UPDATE_USERS_SCREEN]: updateUsersScreen,
  [Types.UPDATE_USER_IN_USERS_SCREEN]: updateUserInUsersScreen,
  [Types.UPDATE_USER_PROFILE_SCREEN]: updateUserProfileScreen,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
