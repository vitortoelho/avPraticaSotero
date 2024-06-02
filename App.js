import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth, signInWithEmailAndPassword as loginEmailSenha, createUserWithEmailAndPassword as criarEmailSenha } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import HomeScreen from './HomeScreen';
import TelaCadastro from './telaCad';
import { estilos as estilosLogin } from './styles/loginStyles';

const firebaseConfig = {
  apiKey: "AIzaSyB7-dQ0ahBl2yDEcmNSkD3Jl31xgW-CowE",
  authDomain: "soteroreact.firebaseapp.com",
  projectId: "soteroreact",
  storageBucket: "soteroreact.appspot.com",
  messagingSenderId: "1045333084749",
  appId: "1:1045333084749:web:8be3f5e7ab1f0a0a9faa04",
  measurementId: "G-6Q4YB7D4F5"
};

const app = initializeApp(firebaseConfig);
const Stack = createStackNavigator();

function LoginScreen({ navigation }) {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);

  const validarLogin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await loginEmailSenha(auth, nomeUsuario, senha); 
      const user = userCredential.user;
      console.log('Usuário logado:', user);
      navigation.navigate('Home', { nomeUsuario: user.displayName });
      setNomeUsuario('');
      setSenha('');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Senha ou Email inválidos.');
    }
  };

  const handleCadastroUsuario = async (dadosUsuario) => {
    try {
      const auth = getAuth();
      const userCredential = await criarEmailSenha(auth, dadosUsuario.email, dadosUsuario.senha);
      const user = userCredential.user;
      console.log('Usuário cadastrado:', user);
      navigation.navigate('Home', { nomeUsuario: user.displayName });
      Alert.alert('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      Alert.alert('Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <ScrollView contentContainerStyle={estilosLogin.container}>
      <TextInput
        style={estilosLogin.input}
        placeholder="email"
        onChangeText={texto => setNomeUsuario(texto)}
        value={nomeUsuario}
      />
      <TextInput
        style={estilosLogin.input}
        placeholder="senha"
        onChangeText={texto => setSenha(texto)}
        value={senha}
        secureTextEntry
      />
      <TouchableOpacity style={estilosLogin.botao} onPress={validarLogin}>
        <Text style={estilosLogin.textoBotao}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={estilosLogin.botao} onPress={() => setModalVisivel(true)}>
        <Text style={estilosLogin.textoBotao}>Cadastre-se</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisivel}
        animationType="slide"
        onRequestClose={() => setModalVisivel(false)}
      >
        <TelaCadastro onClose={() => setModalVisivel(false)} onSubmit={handleCadastroUsuario} />
      </Modal>
    </ScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
