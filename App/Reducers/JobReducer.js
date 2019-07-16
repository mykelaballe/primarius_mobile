import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  isUpdateJobsScreen: false,
  isUpdateJobScreen: false,
})

const updateJobsScreen = (state, action) => state.merge({ isUpdateJobsScreen: action.isUpdate })

const updateJobScreen = (state, action) => state.merge({ isUpdateJobScreen: action.isUpdate })
  
const ACTION_HANDLERS = {
  [Types.UPDATE_JOBS_SCREEN]: updateJobsScreen,
  [Types.UPDATE_JOB_SCREEN]: updateJobScreen,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
