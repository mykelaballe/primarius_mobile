import Types from './Types'

/*----------------------------------------------------------------------
 STARTUP
 ----------------------------------------------------------------------*/

 const startup = () => ({ type: Types.STARTUP })
 

 /*----------------------------------------------------------------------
 APP
 ----------------------------------------------------------------------*/

 const setActiveDrawerItem = item => ({ type: Types.SET_ACTIVE_DRAWER_ITEM, item })
 const updateDeviceDimensions = (orientation, width, height) => ({ type: Types.UPDATE_DEVICE_DIMENSIONS, orientation, width, height })

 /*----------------------------------------------------------------------
 NAVIGATION
 ----------------------------------------------------------------------*/

 const setLastVisitedRoute = route => ({ type: Types.SET_LAST_VISITED_ROUTE, route })

 const clearLastVisitedRoute = () => ({ type: Types.RESET_LAST_VISITED_ROUTE })

 /*----------------------------------------------------------------------
 AUTHENTICATION
 ----------------------------------------------------------------------*/

 const login = () => ({ type: Types.LOGIN })

 const logout = () => ({ type: Types.LOGOUT })

 /*----------------------------------------------------------------------
 USER
 ----------------------------------------------------------------------*/

 const setUser = user => ({ type: Types.SET_USER, user })

 const clearUser = () => ({ type: Types.CLEAR_USER })

 const setRememberUser = remember => ({ type: Types.SET_REMEMBER_USER, remember })

 /*----------------------------------------------------------------------
 FILES
 ----------------------------------------------------------------------*/

 const setAttachedFiles = files => ({ type: Types.SET_ATTACHED_FILES, files })

 const clearAttachedFiles = () => ({ type: Types.CLEAR_ATTACHED_FILES })

 /*----------------------------------------------------------------------
 NETWORK
 ----------------------------------------------------------------------*/

 const networkSuccess = () => ({ type: Types.NETWORK_SUCCESS })

 const networkFailure = () => ({ type: Types.NETWORK_FAILURE })

 /*----------------------------------------------------------------------
 USER
 ----------------------------------------------------------------------*/

 const updateUsersScreen = isUpdate => ({ type: Types.UPDATE_USERS_SCREEN, isUpdate })

 const updateUserScreen = isUpdate => ({ type: Types.UPDATE_USER_SCREEN, isUpdate })

 /*----------------------------------------------------------------------
 JOB
 ----------------------------------------------------------------------*/

 const updateJobsScreen = isUpdate => ({ type: Types.UPDATE_JOBS_SCREEN, isUpdate })

 const updateJobScreen = isUpdate => ({ type: Types.UPDATE_JOB_SCREEN, isUpdate })

 /*----------------------------------------------------------------------
 ORGANIZATION
 ----------------------------------------------------------------------*/

 const updateOrganizationsScreen = isUpdate => ({ type: Types.UPDATE_ORGANIZATIONS_SCREEN, isUpdate })

 const updateOrganizationScreen = isUpdate => ({ type: Types.UPDATE_ORGANIZATION_SCREEN, isUpdate })

 /*----------------------------------------------------------------------
 APPOINTMENT
 ----------------------------------------------------------------------*/

 const updateAppointmentsScreen = isUpdate => ({ type: Types.UPDATE_APPOINTMENTS_SCREEN, isUpdate })

 const updateAppointmentScreen = isUpdate => ({ type: Types.UPDATE_APPOINTMENT_SCREEN, isUpdate })

export default {
  startup,

  setActiveDrawerItem,

  setLastVisitedRoute,
  clearLastVisitedRoute,

  login,
  logout,

  setUser,
  clearUser,
  setRememberUser,

  networkSuccess,
  networkFailure,

  setAttachedFiles,
  clearAttachedFiles,
  updateDeviceDimensions,

  updateUsersScreen,
  updateUserScreen,

  updateJobsScreen,
  updateJobScreen,

  updateOrganizationsScreen,
  updateOrganizationScreen,

  updateAppointmentsScreen,
  updateAppointmentScreen,
}