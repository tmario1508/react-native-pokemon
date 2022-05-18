import { createStackNavigator } from "@react-navigation/stack"
import React from 'react'
import PokedexScreen from "../screens/Pokedex"
import PokemonScreen from "../screens/Pokemon"
import AddPokemonScreen from '../components/AddPokemon/AddPokemon'
import ListCitiesScreen from "../tests/CitiesScreen"

const Stack = createStackNavigator(); 

export default function PokedexNavigation() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Pokedex' component={PokedexScreen} options={{title: "Pokedex"}} />
        <Stack.Screen name='Pokemon' component={PokemonScreen} options={{title: "", headerTransparent: true}} />
        <Stack.Screen name='AddPoke' component={AddPokemonScreen} options={{title: "", headerTransparent: true}} />
        <Stack.Screen name='Cities' component={ListCitiesScreen} options={{title: "", headerTransparent: true}} />
    </Stack.Navigator>
  )
}