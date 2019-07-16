import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  id: null,
  firstname: '',
  lastname: '',
  email: '',
  status: '',
  role: '',
  role_id: null,
  gender: '',
  position: '',
  token: '',
  username: '',
  password: '',
  domain: '',
  raw_domain: '',
  db_name: '',
  remember:false,

  isUpdateUsersScreen: false,
  isUpdateUserScreen: false,
})

const setUser = (state, action) => state.merge({ ...action.user })

const clearUser = (state, action) => {
  let new_user = {
    id: null,
    firstname: '',
    lastname: '',
    email: '',
    status: '',
    role: '',
    role_id: null,
    gender: '',
    position: '',
    token: '',
  }

  if(!state.remember) {
    new_user = {
      ...new_user,
      username: '',
      password: '',
      domain: '',
      raw_domain: ''
    }
  }

  return state.merge({
    ...new_user
  })
}

const setRememberUser = (state, action) => state.merge({ remember:action.remember })

const updateUsersScreen = (state, action) => state.merge({ isUpdateUsersScreen: action.isUpdate })

const updateUserScreen = (state, action) => state.merge({ isUpdateUserScreen: action.isUpdate })
  
const ACTION_HANDLERS = {
  [Types.SET_USER]: setUser,
  [Types.CLEAR_USER]: clearUser,
  [Types.SET_REMEMBER_USER]: setRememberUser,
  [Types.UPDATE_USERS_SCREEN]: updateUsersScreen,
  [Types.UPDATE_USER_SCREEN]: updateUserScreen,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
