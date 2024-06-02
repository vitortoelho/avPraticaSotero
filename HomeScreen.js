import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import App from './App';



export default function HomeScreen({ route }) {
  const { nomeUsuario } = route.params
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Tela Principal, {nomeUsuario}! </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
});
