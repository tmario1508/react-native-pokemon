import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import React from 'react'
import Places from './Places';

export default function ListUsers(props) {
  const { data } = props;
  console.log(data);
  return (
        <FlatList
          data={data}
          style={styles.list}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Places data={item} />
          )}
        />
  )
}

const styles = StyleSheet.create({
    list: {
        width: '90%',
    }
})