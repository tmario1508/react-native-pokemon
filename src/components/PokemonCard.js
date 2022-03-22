import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import getColorByTypePokemon from '../utils/getColorByPokemonType'
import { capitalize } from 'lodash';
import { useNavigation } from "@react-navigation/native"

export default function PokemonCard(props) {
  const { pokemon } = props;
  const navigation = useNavigation();
  const pokemonColor = getColorByTypePokemon(pokemon.type)
  const bgStyles = { backgroundColor: pokemonColor, ...styles.bgStyles };

  const goToPokemon = () => {
      navigation.navigate("Pokemon", { id: pokemon.id })
  }

  return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
        <View style={styles.card}>
            <View style={styles.spacing}>
                <View style={bgStyles} >
                    <Text style={styles.number} >#{`${pokemon.order}`.padStart(3, 0)}</Text>
                    <Text style={styles.name} >{capitalize(pokemon.name)}</Text>
                    <Image source={{ uri: pokemon.image }} style={styles.image} />
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: 100,
    },
    spacing: {
        flex: 1,
        padding: 5,
    },
    bgStyles: {
        flex: 1,
        borderRadius: 15,
        padding: 10,
    },
    image: {
        position: 'absolute',
        bottom: -5,
        right: 2,
        width: 70,
        height: 70,
    },
    name: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        paddingTop: 10,
    },
    number: {
        color: '#fff',
        position: 'absolute',
        right: 10,
        top: 10,
        fontSize: 11,
    }
})