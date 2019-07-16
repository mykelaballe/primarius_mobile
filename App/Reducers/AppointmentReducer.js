import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  isUpdateAppointmentsScreen: false,
  isUpdateAppointmentScreen: false,
})

const updateAppointmentsScreen = (state, action) => state.merge({ isUpdateAppointmentsScreen: action.isUpdate })

const updateAppointmentScreen = (state, action) => state.merge({ isUpdateAppointmentScreen: action.isUpdate })
  
const ACTION_HANDLERS = {
  [Types.UPDATE_APPOINTMENTS_SCREEN]: updateAppointmentsScreen,
  [Types.UPDATE_APPOINTMENT_SCREEN]: updateAppointmentScreen,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
