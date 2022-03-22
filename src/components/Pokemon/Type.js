import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { map, capitalize } from 'lodash';
import getColorByPokemonType from "../../utils/getColorByPokemonType"

export default function Type(props) {
  const { types } = props;
  return (
    <View style={styles.content}>
      {map(types, (item, index) => (
          <View key={index} style={{...styles.pill, backgroundColor: getColorByPokemonType(item.type.name)}}>
              <Text>
                {capitalize(item.type.name)}
              </Text>
          </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
    content: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pill: {
        paddingHorizontal: 40,
        paddingVertical: 5,
        borderRadius: 20,
        marginHorizontal: 10,
    },
})