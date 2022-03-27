import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'lodash'

export default function AddPokemon(props) {
  const { navigation, route: { params } } = props;
  const [ query, setQuery ] = useState('')
  const [ fullData, setFullData ] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <FontAwesomeIcon 
                          icon={faAngleLeft}
                          color="#5DADE2"
                          size={30}
                          style={{ marginLeft: 20, marginTop: 20 }} 
                          onPress={navigation.goBack}
                        />
    })
  }, [navigation, params]);

  // Get data API
  useEffect(() => {
    setIsLoading(true);
  
    fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(response => {
        setData(response.results);
  
        // ADD THIS
        setFullData(response.results);
  
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
  }, []);

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fullData, user => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };

  const contains = ({ name, email }, query) => {
    const { first, last } = name;
  
    if (first.includes(query) || last.includes(query) || email.includes(query)) {
      return true;
    }
  
    return false;
  };

  return (
    <View style={styles.container} >
      <Text style={styles.textTitle} >Where are you now?</Text>
      <TextInput placeholder='Select Location' style={styles.input} onChangeText={queryText => handleSearch(queryText)} value={query} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 180,
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    padding: 20,
  },
  input: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ABB2B9',
    width: "90%",
    fontSize: 16,
  }
})