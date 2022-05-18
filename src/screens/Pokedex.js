import React, { useState, useEffect } from "react";
import { SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { getPokemonDetailByUrlApi, getPokemonsApi } from "../api/pokemon";
import PokemonList from "../components/Pokemon/PokemonList"
import useAuth from '../hooks/useAuth'
import NoLogged from '../components/Account/NoLogged'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from "@react-navigation/native";

export default function Account() {

  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const { auth } = useAuth();

  const navigation = useNavigation();

  useEffect( () => {
    (async () => {
      await loadPokemons();
    })()
  }, []);

  const loadPokemons = async () => {
    try {
      const response = await getPokemonsApi(nextUrl);
      setNextUrl(response.next);

      const pokemonsArray = [];

      for await (const item of response.results){
        const pokemonDetail = await getPokemonDetailByUrlApi(item.url)
        pokemonsArray.push({
          id: pokemonDetail.id,
          name: pokemonDetail.name,
          type: pokemonDetail.types[0].type.name,
          order: pokemonDetail.order,
          image: pokemonDetail.sprites.other['official-artwork'].front_default
        });
      }
      setPokemons([...pokemons, ...pokemonsArray]);
    } catch (error) {
      console.log("Error al traer los datos de la API: ", error);
    }
  }

  return (
    !auth ? <NoLogged /> :  
      <SafeAreaView>
        <PokemonList pokemons={pokemons} loadPokemons={loadPokemons} isNext={nextUrl} />
        <TouchableOpacity style={styles.touchableOpacityStyle} onPress={() => navigation.navigate("Cities")}>
          <FontAwesomeIcon icon={faPlusCircle} size={70} color='#8E44AD' />
        </TouchableOpacity>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
})