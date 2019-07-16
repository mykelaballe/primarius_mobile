import React from 'react'
import {View, StyleSheet, FlatList as List} from 'react-native'
import {Metrics, Colors, Fonts} from '../Themes'
import {Placeholder, Button, ActivityIndicator} from './'
import {Consts} from '../Utils'

export default FlatList = props => {
  const {data, loading, placeholder, lazy, searchMatches, loading_more, onLoadMore} = props

    if(loading) {
      return <ActivityIndicator animating={true} />
    }

    if(!loading && data.length === 0) {
      
      if(placeholder) {
        if(placeholder.text) return <Placeholder text={placeholder.text} />
      }

      return <Placeholder />
    }

    if(!props.keyExtractor) {
      props = {
        ...props,
        keyExtractor:(item, index) => item.id ? item.id.toString() : index.toString()
      }
    }

    return (
      <View>
        <List {...props} />
        {(lazy && (!searchMatches || searchMatches.length === 0) && data.length >= Consts.per_page) &&
        <Button sm outline text='Load more' processing={loading_more} onPress={onLoadMore} />
        }
      </View>
    )
}