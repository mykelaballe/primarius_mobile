import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  isConnected: false,
})

const networkSuccess = (state, action) =>
  state.merge({ isConnected:true })
  
const networkFailure = (state, action) =>
  state.merge({ isConnected:false })
  
const ACTION_HANDLERS = {
  [Types.NETWORK_SUCCESS]: networkSuccess,
  [Types.NETWORK_FAILURE]: networkFailure,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
