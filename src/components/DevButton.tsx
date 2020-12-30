import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

type DevButtonProps = {
  name: string;
  navigation: ReturnType<typeof useNavigation>
}

const DevButton: React.FC<DevButtonProps> = (props) => {
  const {name, navigation} = props;
  return (
    <TouchableOpacity key={name} onPress={() => navigation.navigate(name)}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 52,
    backgroundColor: "#52057b",
    borderBottomColor: "#892cdc",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
  },
  buttonText: {
    color: "#bc6ff1",
    fontSize: 20,
    fontWeight: "100",
  }
})

export default DevButton
