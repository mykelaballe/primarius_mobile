import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  last_visited_route: null,
})

const setLastVisitedRoute = (state, action) => state.merge({ last_visited_route: action.route })

const resetLastVisitedRoute = (state, action) => state.merge({ last_visited_route: null })
  
const ACTION_HANDLERS = {
  [Types.SET_LAST_VISITED_ROUTE]: setLastVisitedRoute,
  [Types.RESET_LAST_VISITED_ROUTE]: resetLastVisitedRoute,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
