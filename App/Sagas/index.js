import { fork } from 'redux-saga/effects'

import { watchStartup } from './StartupSaga'

/****************/

import DebugSettings from '../Config/DebugSettings'

/* Create our API at this level and feed it into
  the sagas that are expected to make API calls
  so there's only 1 copy app-wide!
*/


// start the daemons
export default function * root () {
  yield fork(watchStartup)
}
