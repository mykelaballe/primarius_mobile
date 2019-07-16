import React from 'react'
import {DrawerNavigator} from 'react-navigation'
import {Drawer} from '../../Components'
import DrawerStack from './DrawerStack'

const HomeStack = DrawerNavigator({
    HomeScreen: { screen: DrawerStack },
  },{
    contentComponent:Drawer
  })

export default HomeStack