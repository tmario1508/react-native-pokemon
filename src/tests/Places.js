import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import React from 'react';

export default function ListCities(props) {
  const {data} = props;
  return (
    <FlatList
      data={data.cities}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={styles.listItem}>
          <Image source={{uri: data.img}} style={styles.coverImage} />
          <View style={styles.metaInfo}>
            <Text style={styles.title}>{`${item.name}`}, {`${data.country}`}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listItem: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  coverImage: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  metaInfo: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    width: '100%',
    padding: 5,
  },
});
