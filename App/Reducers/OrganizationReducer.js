import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  isUpdateOrganizationsScreen: false,
  isUpdateOrganizationScreen: false,
})

const updateOrganizationsScreen = (state, action) => state.merge({ isUpdateOrganizationsScreen: action.isUpdate })

const updateOrganizationScreen = (state, action) => state.merge({ isUpdateOrganizationScreen: action.isUpdate })
  
const ACTION_HANDLERS = {
  [Types.UPDATE_ORGANIZATIONS_SCREEN]: updateOrganizationsScreen,
  [Types.UPDATE_ORGANIZATION_SCREEN]: updateOrganizationScreen,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
