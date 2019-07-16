import React from 'react'
import {withNavigation} from 'react-navigation'
import {HeaderButton} from './'

class Hamburger extends React.Component {
  render = () => <HeaderButton icon='menu' onPress={() => this.props.navigation.navigate('DrawerOpen')} />
}

export default withNavigation(Hamburger)