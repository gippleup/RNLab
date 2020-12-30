import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import * as Testers from '../dev/_index';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DevButton from '../components/DevButton';

const DEV = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      {Object.entries(Testers).map(([name]) => (
        <DevButton key={name} name={name} navigation={navigation} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
  }
})

export default DEV
