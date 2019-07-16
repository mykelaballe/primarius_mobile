import { combineReducers } from 'redux'
import AppReducer from './AppReducer'
import AuthReducer from './AuthReducer'
import FileReducer from './FileReducer'
import NetworkReducer from './NetworkReducer'
import UserReducer from './UserReducer'
import NavigationReducer from './NavigationReducer'
import JobReducer from './JobReducer'
import OrganizationReducer from './OrganizationReducer'
import AppointmentReducer from './AppointmentReducer'

// glue all the reducers together into 1 root reducer
export default combineReducers({
    app: AppReducer,
    auth: AuthReducer,
    user: UserReducer,
    file: FileReducer,
    network: NetworkReducer,
    navigation: NavigationReducer,
    job: JobReducer,
    organization: OrganizationReducer,
    appointment: AppointmentReducer,
})

// Put reducer keys that you do NOT want stored to persistence here
export const persistentStoreBlacklist = []

// OR put reducer keys that you DO want stored to persistence here (overrides blacklist)
export const persistentStoreWhitelist = ['auth','user','navigation']
