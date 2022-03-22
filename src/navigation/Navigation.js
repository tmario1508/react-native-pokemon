import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { Image } from "react-native"

import FavoriteNavigation from "../navigation/FavoriteNavigation";
import PokedexNavigation from "../navigation/PokedexNavigation";
import AccountNavigation from "../navigation/AccountNavigation";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Favorite" 
        component={FavoriteNavigation} 
        options= {{
            tabBarLabel: "Favoritos",
            tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon icon={faHeart} color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen 
        name="Pokedex"
        component={PokedexNavigation}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => renderPokeball(),
        }}
      />
      <Tab.Screen 
        name="Account"
        component={AccountNavigation}
        options= {{
            tabBarLabel: "Mi Cuenta",
            tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon icon={faUser} color={color} size={size} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

function renderPokeball(){
  return(
    <Image 
      source={require('../assets/img/pokeball.png')}
      style={{width: 65, height: 65, marginTop: -15}}
    />
  )
}