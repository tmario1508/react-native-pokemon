import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { capitalize, map } from 'lodash'
import getColorsByTypePokemon from '../../utils/getColorByPokemonType'
import FavoriteStats from './FavoriteStats';
import FavoriteTypes from './FavoriteTypes';

export default function FavoriteCard(props) {
  const { pokemon } = props;
  const color = getColorsByTypePokemon(pokemon.type);
  const bgStyle = [{backgroundColor: color, ...styles.bg}]

  return (
      <View style={bgStyle}>
        <View style={styles.statsContent}>
          <View style={styles.header}>
            <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
            <Image source={{ uri: pokemon.image }} style={styles.image} />
            <FavoriteTypes types={pokemon.types} />
          </View>
          <FavoriteStats stats={pokemon.stats} />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  bg: {
    margin: 10,
    borderRadius: 5,
  },
  header: {
    padding: 5,
    alignItems: 'center',
  },
  statsContent: {
    flexDirection: 'row',
  },
  name: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    height: 80,
    width: 80,
  },
  pill: {
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 10,
},
})