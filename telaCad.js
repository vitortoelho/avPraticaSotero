import React, { useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Text, Modal, Button } from 'react-native';
import { estilos as estilosCadastro } from './styles/cadastroStyles'; // Importa o estilo da tela que é outro arquivo, para economizar linhas

export default function TelaCadastro({ onClose, onSubmit }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState('');
  const [numero, setNumero] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);

  const formatarCEP = (cep) => {
    cep = cep.replace(/\D/g, '');
    if (cep.length > 5) {
      cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
    }
    return cep;
  }

  const realizarCadastro = () => {
    if (!nome || !email || !senha || !confirmarSenha || !cep || !endereco || !cidade || !numero) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    if (!validarEmail(email)) {
      alert('Por favor, insira um e-mail válido!');
      return;
    }
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    const dadosUsuario = {
      nome,
      email,
      senha,
      cep,
      endereco,
      cidade,
      bairro,
      estado,
      numero,
    };
    onSubmit(dadosUsuario);
  };

  const validarEmail = (email) => {
    const padraoEmail = /\S+@\S+\.\S+/;
    return padraoEmail.test(email);
  };

  const limparCampos = () => {
    setMostrarModal(true);
  };

  const limparTodosOsCampos = () => {
    setNome('');
    setEmail('');
    setSenha('');
    setConfirmarSenha('');
    setCep('');
    setEndereco('');
    setCidade('');
    setBairro('');
    setEstado('');
    setNumero('');
    setMostrarModal(false);
  };

  const consultarCEP = async () => {
    if (!cep) {
      alert('Por favor, insira um CEP válido!');
      return;
    }
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      console.log(data);
      setEndereco(data.logradouro);
      setCidade(data.localidade);
      setBairro(data.bairro);
      setEstado(data.uf);
    } catch (error) {
      console.error('Erro ao consultar o CEP:', error);
      alert('Erro ao consultar o CEP. Por favor, verifique o CEP digitado.');
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={estilosCadastro.container}>
        <TextInput
          style={estilosCadastro.input}
          placeholder="Nome"
          onChangeText={texto => setNome(texto)}
          value={nome}
        />
        <TextInput
          style={estilosCadastro.input}
          placeholder="Email"
          onChangeText={texto => setEmail(texto)}
          value={email}
        />
        <TextInput
          style={estilosCadastro.input}
          placeholder="Senha"
          onChangeText={texto => setSenha(texto)}
          value={senha}
          secureTextEntry
        />
        <TextInput
          style={estilosCadastro.input}
          placeholder="Confirmar Senha"
          onChangeText={texto => setConfirmarSenha(texto)}
          value={confirmarSenha}
          secureTextEntry
        />
        <View

        style={{
          flex: 1,
          flexGrow: 1,
          width: "100%",
          alignItems: 'center',
          flexDirection: "row",
        }}>
          <TextInput
            style={estilosCadastro.inputCEP}
            placeholder="CEP"
            onChangeText={texto => setCep(formatarCEP(texto))}
            value={cep}
            keyboardType="numeric"
          />
          <TouchableOpacity style={estilosCadastro.botaoCEP} onPress={consultarCEP}>
            <Text style={estilosCadastro.textoBotaoCEP}>Consultar</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={estilosCadastro.input}
          placeholder="Endereço"
          onChangeText={texto => setEndereco(texto)}
          value={endereco}
        />
        <TextInput
          style={estilosCadastro.input}
          placeholder="Cidade"
          onChangeText={texto => setCidade(texto)}
          value={cidade}
        />
        <TextInput
          style={estilosCadastro.input}
          placeholder="Bairro"
          onChangeText={texto => setBairro(texto)}
          value={bairro}
        />
        <TextInput
          style={estilosCadastro.input}
          placeholder="Estado"
          onChangeText={texto => setEstado(texto)}
          value={estado}
        />
        <TextInput
          style={estilosCadastro.input}
          placeholder="Número"
          onChangeText={texto => setNumero(texto)}
          value={numero}
        />
        <TouchableOpacity style={estilosCadastro.botao} onPress={realizarCadastro}>
          <Text style={estilosCadastro.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilosCadastro.botao} onPress={limparCampos}>
          <Text style={estilosCadastro.textoBotao}>Limpar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilosCadastro.botao} onPress={onClose}>
          <Text style={estilosCadastro.textoBotao}>Cancelar</Text>
        </TouchableOpacity>

        {/* Modal de Confirmação */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={mostrarModal}
          onRequestClose={() => setMostrarModal(false)}
        >
          <View style={estilosCadastro.modalContainer}>
            <View style={estilosCadastro.modal}>
              <Text style={estilosCadastro.modalTexto}>Tem certeza que quer limpar todo o cadastro inserido até agora?</Text>
              <View style={estilosCadastro.modalBotoes}>
                <Button title="Cancelar" onPress={() => setMostrarModal(false)} />
                <Button title="Limpar" onPress={limparTodosOsCampos} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}
