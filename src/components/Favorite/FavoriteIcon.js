import { Pressable, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as heart } from '@fortawesome/free-solid-svg-icons'
import { addPokemonFavoriteApi, isPokemonFavoriteApi, removePokemonFavorite } from '../../api/favorite'
import { capitalize } from 'lodash'

export default function Favorite(props) {
  const { id, name } = props;
  const [ isFavorite, setIsFavorite ] = useState(undefined);
  const [reloadCheck, setReloadCheck ] = useState(false);
  const icon = isFavorite ? heart : faHeart

  useEffect(() => {
    (async () => {
      try {
        const response = await isPokemonFavoriteApi(id);
        setIsFavorite(response);
      } catch (error) {
        throw error;
      }
    })()
  }, [id, reloadCheck])

  const onReloadCheckFav = () => {
    setReloadCheck((prev) => !prev);
  }

  const addFavorite = async () => {
    try {
      await addPokemonFavoriteApi(id)
      onReloadCheckFav();
    } catch (error) {
      Alert.alert("Error favorite", `Pokemon id ${id} no add to favorite, error: ${error}`)
    }
  }

  const removeFav = async () => {
    try {
      await removePokemonFavorite(id);
      onReloadCheckFav();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Pressable onPress={isFavorite ? removeFav : addFavorite} style={styles.pressable}>
        <FontAwesomeIcon icon={icon} color='#fff' size={25} />
    </Pressable>
  )
}
 const styles = StyleSheet.create({
     pressable: {
         marginRight: 20,
     }
 })
