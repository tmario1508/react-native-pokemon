import { View, Text, StyleSheet, Button, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faEnvelope, faCheck, faHeart, faPersonWalking } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../../utils/constanst'
import { useFocusEffect } from "@react-navigation/native"
import { size } from 'lodash';
import { getPokemonFavoriteApi } from '../../api/favorite';
import {userDetails} from '../../utils/userDB';

export default function UserData() {
  const { auth, logout} = useAuth();
  const [total, setTotal] = useState(0);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const arrayFav = await getPokemonFavoriteApi();
          setTotal(size(arrayFav))
        } catch (error) {
          throw error;
        }
      })()
    }, [])
  );

  return (
    <View styles={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.titleBi}>Bienvenido</Text>
        <Text style={styles.title}>{`${auth.first_name} ${auth.last_name}`}</Text>
      </View>
      <View style={styles.dataContent}>
        <ItemMenu title={"Name: "} text={`${auth.first_name} ${auth.last_name}`} icon={faUser} />
        <ItemMenu title={"User: "} text={`${auth.username}`} icon={faCheck} />
        <ItemMenu title={"Email: "} text={`${auth.email}`} icon={faEnvelope} />
        <ItemMenu title={"Favorites: "} text={`${total} pokemons`} icon={faHeart} />
      </View>
      <Pressable onPress={logout} style={styles.button}>
          <FontAwesomeIcon icon={faPersonWalking} size={25} color='#fff' />
          <Text style={styles.buttonText}>Cerrar sesión</Text>
      </Pressable>     
      
    </View>
  )
}

function ItemMenu(props) {
  const { title, text, icon } = props;

  return(
    <View style={styles.itemMenu}>
      <FontAwesomeIcon icon={icon} color={colors.water} size={25} style={styles.icon} />
      <Text style={styles.itemMenuTitle}>{title}</Text>
      <Text style={styles.itemText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleBlock: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: colors.mor,
  },
  titleBi: {
    fontWeight: 'bold',
    fontSize: 22,
    color: colors.water,
  },
  dataContent: {
    marginBottom: 20,
  },
  itemMenu: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: colors.water,
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    paddingRight: 10,
    width: 90,
    color: colors.water,
  },
  itemText: {
    color: colors.mor,
  },
  icon: {
    marginLeft: 20,
    marginRight: 20,
  },
  btnLogout: {
    padding: 30,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#5499C7',
    marginTop: 30,
    margin: 10,
},
buttonText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Barlow-SemiBold',
    paddingStart: 20,
},
})