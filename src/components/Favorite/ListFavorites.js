import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import FavoriteCard from './FavoriteCard';

export default function ListFavorites(props) {
  const { pokemons } = props;
  return (
    <FlatList 
      data={pokemons}
      numColumns={1}
      showsVerticalScrollIndicator={false}
      keyExtractor={(pokemon) => String(pokemon.id)}
      renderItem={({item}) => <FavoriteCard pokemon={item} />}
      contentContainerStyle={styles.flatListContainer}
      onEndReachedThreshold={0.1}
    />
  )
}

const styles = StyleSheet.create({

})