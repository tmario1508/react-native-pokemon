import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLockOpen, faEye, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

export default function LoginForm() {
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(true);
  const {login} = useAuth();
  const [errorText, setErrorText] = useState("");

  const navigation = useNavigation();

  const img = require('../../assets/img/google.png');

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: formValues => {
      setError('');
      const {userName, password} = formValues;
      auth()
        .signInWithEmailAndPassword(userName, password)
        .then((user) => {
          console.log(user.user.email);
          if (user) {
            login(user.user.email);
            navigation.navigate("Pokedex")
          }
        })
        .catch((er) => {
          if (er.code === "auth/invalid-email") {
            setErrorText(er.message)
          }
          else if (er.code === "auth/user-not-found") {
            setErrorText("No User Found");
          } else {
            setErrorText("Please check your email id or password");
          }
        });
    },
  });


  const reloadedVisible = () => {
    setVisible(prev => !prev);
  };

  return (
    <View>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={styles.inputField}
          autoCapitalize="none"
          value={formik.userName}
          onChangeText={text => formik.setFieldValue('userName', text)}
        />
        <View style={styles.icon}>
          <FontAwesomeIcon icon={faEnvelope} size={20} color="#5499C7" />
        </View>
      </View>
      <Text style={styles.errors}>{formik.errors.userName}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          style={styles.inputField}
          autoCapitalize="none"
          secureTextEntry={visible}
          value={formik.password}
          onChangeText={text => formik.setFieldValue('password', text)}
        />
        <Pressable onPress={reloadedVisible} style={styles.icon}>
          <FontAwesomeIcon icon={faEye} size={20} color="#5499C7" />
        </Pressable>
      </View>

      <Text style={styles.errors}>{formik.errors.password}</Text>
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <FontAwesomeIcon icon={faLockOpen} size={20} color="#fff" />
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Text style={styles.errors}>{error}</Text>
      <Text />
    </View>
  );
}

function initialValues() {
  return {
    userName: '',
    password: '',
  };
}

function validationSchema() {
  return {
    userName: Yup.string().required('Ingresar un usuario valido'),
    password: Yup.string().required('Ingresa una contraseña valida'),
  };
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 15,
  },
  inputField: {
    padding: 14,
    width: '100%',
    height: 40,
    padding: -2,
    color: '#5499C7',
    paddingStart: 8,
  },
  inputContainer: {
    borderRadius: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#5499C7',
    margin: 12,
  },
  icon: {
    marginStart: -30,
  },
  errors: {
    color: 'red',
    marginLeft: 15,
  },
  buttonContainer: {
    margin: 10,
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
});
