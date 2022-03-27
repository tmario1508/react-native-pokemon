import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { map, capitalize } from 'lodash';
import getColorByPokemonType from "../../utils/getColorByPokemonType"

export default function FavoriteTypes(props) {
  const { types } = props;
  return (
    <View style={styles.content}>
      {map(types, (item, index) => (
          <View key={index} style={styles.pill}>
              <Text style={styles.name}>
                {capitalize(item.type.name)}
              </Text>
          </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
    content: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pill: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 10,
        marginHorizontal: 5,
        backgroundColor: '#283747',
        marginTop: 5,
        width: 50,
        alignItems: 'center',
    },
    name: {
        fontSize: 10,
        color: '#fff',
    }
})