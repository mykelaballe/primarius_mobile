import React from 'react'
import {connect} from 'react-redux'
import MainStack from '../Containers/ScreenStacks/MainStack'
import FreeStack from '../Containers/ScreenStacks/FreeStack'
import AuthStack from '../Containers/ScreenStacks/AuthStack'
import UserStack from '../Containers/ScreenStacks/UserStack'
import UnconfirmedUserStack from '../Containers/ScreenStacks/UnconfirmedUserStack'
import {Consts} from '../Utils'

class NavigationRouter extends React.Component {
  render() {
    const {isLoggedIn} = this.props
    const {user} = Consts.roles

    if(isLoggedIn) {
      const {role_id, is_confirmed} = this.props.user
    
      if(role_id !== user) {
        return <MainStack />
      }
      else {
        if(is_confirmed) return <UserStack />
        return <UnconfirmedUserStack />
      }
    }

    return <FreeStack />
  }
}

mapStateToProps = state => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps)(NavigationRouter)