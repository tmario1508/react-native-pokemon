import { View, Text, Button, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUnlock } from "@fortawesome/free-solid-svg-icons";

export default function NoLogged() {
  const navigation = useNavigation();

  return (
    <View style={styles.content}>
      <Text style={styles.text}>Para ver esta sección necesitas iniciar sesión</Text>
      <Pressable onPress={() => navigation.navigate("Account")} style={styles.button}>
          <FontAwesomeIcon icon={faUnlock} size={20} color='#fff' />
          <Text style={styles.buttonText}>Ir a login</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    content: 
    {
        marginVertical: 80,
        paddingHorizontal: 25,
    },
    text: {
        textAlign: 'center',
        marginBottom: 10,
        color: '#1F618D',
        fontSize: 18,
    },
    button: {
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#5499C7',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Barlow-SemiBold',
        paddingStart: 20,
    },
})