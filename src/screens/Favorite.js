import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getPokemonFavoriteApi } from '../api/favorite'
import { getPokemonDetailsApi } from '../api/pokemon'
import useAuth from '../hooks/useAuth'
import NoLogged from '../components/Account/NoLogged'
import ListFavorites from "../components/Favorite/ListFavorites";


export default function Favorite() {
  const [pokemons, setPokemons ] = useState([])
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          const favorites = await getPokemonFavoriteApi();
          const pokemonsArray = [];
  
          for await (const id of favorites){
            const pokemonDetail = await getPokemonDetailsApi(id)
            pokemonsArray.push({
              id: pokemonDetail.id,
              name: pokemonDetail.name,
              type: pokemonDetail.types[0].type.name,
              order: pokemonDetail.order,
              image: pokemonDetail.sprites.other['official-artwork'].front_default,
              stats: pokemonDetail.stats,
              types: pokemonDetail.types,
            });
          }
          setPokemons(pokemonsArray);
        })();
      }
    })
  )

  return (
    !auth ? <NoLogged /> : <ListFavorites pokemons={pokemons} />
  );
}