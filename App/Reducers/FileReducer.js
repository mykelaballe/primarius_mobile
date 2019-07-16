import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  attachedFiles: []
})

const setAttachedFiles = (state, action) =>
  state.merge({ attachedFiles:action.files })

const clearAttachedFiles = (state, action) =>
  state.merge({ attachedFiles: [] })
  
const ACTION_HANDLERS = {
  [Types.SET_ATTACHED_FILES]: setAttachedFiles,
  [Types.CLEAR_ATTACHED_FILES]: clearAttachedFiles,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
