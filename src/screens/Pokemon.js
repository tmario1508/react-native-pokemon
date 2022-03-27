import { ScrollView } from 'react-native'
import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { getPokemonDetailsApi } from '../api/pokemon'
import PokemonHeader from "../components/Pokemon/Header"
import Type from "../components/Pokemon/Type"
import Stats from '../components/Pokemon/Stats';
import FavoriteIcon from '../components/Favorite/FavoriteIcon';
import useAuth from '../hooks/useAuth'

export default function Pokemon(props) {
  const { navigation, route: { params } } = props;

  const [poke, setPokemon] = useState(null)
  const { auth } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => auth ? <FavoriteIcon id={poke?.id} name={poke?.name}/> : undefined,
      headerLeft: () => <FontAwesomeIcon 
                          icon={faArrowLeft}
                          color="#fff"
                          size={20}
                          style={{ marginLeft: 20 }} 
                          onPress={navigation.goBack}
                        />
    })
  }, [navigation, params, poke])

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetailsApi(params.id);
        setPokemon(response)
        
      } catch (error) {
        navigation.goBack();
      }
    })()
  }, [params]);

  if (!poke) return null;

  return (
    <ScrollView>
      <PokemonHeader 
        name={poke.name}
        order={poke.order} 
        image={poke.sprites.other['official-artwork'].front_default}
        type={poke.types[0].type.name}
      />
      <Type types={poke.types} />
      <Stats stats={poke.stats} />
    </ScrollView>
  )
}

