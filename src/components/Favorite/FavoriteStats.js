import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { map, capitalize } from 'lodash';

export default function FavoriteStats(props) {
  const { stats } = props;
  //console.log(stats);

  const barStyle = (num) => {
    var color = "";
    //num > 49 ? '#3463ffff' : "#9acb94";
    if(num < 40 ){
      color = "#C0392B"
    }
    if(num > 39 && num < 60){
      color = "#F1C40F"
    } 
    if(num > 59){
      color = "#2471A3"
    }
    return {
      backgroundColor: color,
      width: `${num}%`
    }
  }

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Base Stats</Text>
      {map(stats, (item, index) => (
        <View key={index} style={styles.block} >
          <View style={styles.titleBlock}>
            <Text style={styles.statName}>{capitalize(item.stat.name)}</Text>
          </View>
          <View style={styles.blockInfo}>
            <View style={styles.bgBar}>
              <View style={[styles.bar, barStyle(item.base_stat)]}>

              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
    content: {
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 12,
      paddingBottom: 5,
      color: '#fff',
    },
    titleBlock: {
      width: '30%',
    },
    block: {
      flexDirection: 'row',
      paddingVertical: 5,
    },
    statName: {
      fontSize: 10,
      color: '#fff'
    },
    blockInfo: {
      width: '60%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    bgBar: {
      backgroundColor: '#dedede',
      width: '88%',
      height: 8,
      borderRadius: 20,
      overflow: 'hidden',
    },
    bar: {
      height: 7,
      borderRadius: 20,
    }
  });