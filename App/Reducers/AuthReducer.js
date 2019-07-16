import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  isLoggedIn: false,
})

const login = (state, action) =>
  state.merge({ isLoggedIn:true })

const logout = (state, action) =>
  state.merge({ isLoggedIn:false })
  
const ACTION_HANDLERS = {
  [Types.LOGIN]: login,
  [Types.LOGOUT]: logout,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
