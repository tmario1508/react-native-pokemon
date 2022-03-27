import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { map, capitalize } from 'lodash';

export default function Stats(props) {
  const { stats } = props;

  const barStyle = (num) => {
    let color = ""
    if(num < 45 ){
      color = "#C0392B"
    }
    if(num > 44 && num < 60){
      color = "#F1C40F"
    }
    if(num > 59 && num < 70){
      color = "#17A589"
    } 
    if(num > 69){
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
            <Text style={styles.number}>{item.base_stat}</Text>
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
    marginTop: 40,
    marginBottom: 80,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 5,
  },
  titleBlock: {
    width: '30%',
  },
  block: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  statName: {
    fontSize: 12,
    color: '#6b6b6b'
  },
  blockInfo: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    width: '12%',
    fontSize: 12,
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