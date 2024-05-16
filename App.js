import React, { useState, useEffect } from 'react';
import {Text, TextInput, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; //biblioteca AsyncStorage para armazenar localmente

import TelaCadastro from './telaCad'; // importa a tela de cadastro que é outro arquivo
import { estilos as estilosLogin } from './styles/loginStyles'; // importa o estilo da tela que é outro arquivo, para economizar linhas 

export default function App() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [dadosUsuario, setDadosUsuario] = useState(null);

  const validarLogin = () => { // constante para validar o login, com logs no console para que possa ser acompanhado pelo terminal
    console.log('Valores de login:', nomeUsuario, senha);
    console.log('Dados do usuário:', dadosUsuario);
    if (!nomeUsuario || !senha) {
      console.log('Nome de usuário e senha são obrigatórios!');
      Alert.alert('Por favor, preencha todos os campos de login.');
      return;
    }
    if (dadosUsuario && dadosUsuario.nome === nomeUsuario && dadosUsuario.senha === senha) {
      console.log('Login bem-sucedido!');
      Alert.alert('Login bem-sucedido!');
    } else {
      console.log('Nome de usuário ou senha inválidos!');
      Alert.alert('Nome de usuário ou senha inválidos!');
    }
  };

  const cadastrarUsuario = async (dados) => { // constante para cadastrar, com logs no console para que possa ser acompanhado pelo terminal
    try {
      await AsyncStorage.setItem('dadosUsuario', JSON.stringify(dados));
      console.log('Dados do usuário armazenados com sucesso:', dados);
      setDadosUsuario(dados);
      setModalVisivel(false);
      Alert.alert('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
    }
  };

  return ( // tela principal
    <ScrollView contentContainerStyle={estilosLogin.container}>
      <TextInput
        style={estilosLogin.input}
        placeholder="Nome de usuário"
        onChangeText={texto => setNomeUsuario(texto)}
        value={nomeUsuario}
      />
      <TextInput
        style={estilosLogin.input}
        placeholder="Senha"
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
        <TelaCadastro onClose={() => setModalVisivel(false)} onSubmit={cadastrarUsuario} />
      </Modal>
    </ScrollView>
  );
}
