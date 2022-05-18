import {View, Text, StyleSheet, TextInput, FlatList, Image, ActivityIndicator } from 'react-native';
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {filter, capitalize} from 'lodash';
import {API_CITIES} from '../utils/constanst';
import ListPlaces from './ListPlaces'

export default function ListCities(props) {
  const {
    navigation,
    route: {params},
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesomeIcon
          icon={faAngleLeft}
          color="#5DADE2"
          size={30}
          style={{marginLeft: 20, marginTop: 20}}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation, params]);

  // Get data API
  useEffect(() => {
    setIsLoading(true);

    fetch(API_CITIES)
      .then(response => response.json())
      .then(response => {
        console.log("Response: ", response);
        setData(response);
        //console.log("Data: ", data);
        // ADD THIS
        
        //console.log("FullData: ", fullData);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
  }, []);

  const handleSearch = text => {
    
    setFullData(data)
    
    const formattedQuery = capitalize(text);
    console.log("Query: ", formattedQuery);
    const filteredData = filter(data, city => {
      const res = contains(city, formattedQuery);
      console.log("Res contain", res);
      return res;
    });
    setFullData(filteredData);
    setQuery(text);
  };

  const contains = ({country, cities}, query) => {
    const {name} = cities;
    console.log("Query: ", query, "Country: ", country, "Cities: ", cities);
    if (
      //cities.name.includes(query) ||
      country.includes(query)
    ) {
      return true;
    }

    return false;
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18}}>
          Error fetching data... Check your network connection!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.containerGral}>
      <Text style={styles.textTitle}>Users</Text>
      <TextInput
        autoCapitalize='words'
        autoCorrect={false}
        clearButtonMode="always"
        style={styles.input}
        value={query}
        onChangeText={queryText => handleSearch(queryText)}
        placeholder="Search"
      />
      <ListPlaces data={fullData} style={styles.listCities} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerGral: {
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 180,
  },
  textTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    padding: 20,
  },
  input: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ABB2B9',
    width: '90%',
    fontSize: 16,
  },
  listCities: {
    paddingBottom: 10,
  }
});