import React, {useState, createContext} from 'react';
import authFirebase from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext({
  auth: undefined,
  login: () => {},
  logout: () => {},
});

export function AuthProvider(props) {
  const {children} = props;
  const [auth, setAuth] = useState(undefined);

  const login = userData => {
    (async () => {
        try {
            const usersCollection = await firestore()
            .collection('users')
            .get()
            .then(collectionSnapshot => {
              collectionSnapshot.forEach(documentSnapshot => {
                console.log(
                  'User ID: ',
                  documentSnapshot.data(),
                );
                setAuth(documentSnapshot.data());
              });
            });
        } catch (error) {
          throw error;
        }
      })()

    console.log(auth);
  };

  const logout = () => {
    authFirebase().signOut();
    setAuth(undefined);
  };

  const valueContext = {
    auth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
