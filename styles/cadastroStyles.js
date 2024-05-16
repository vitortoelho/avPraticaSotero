import { StyleSheet } from 'react-native';

export const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  botao: {
    width: '100%',
    height: 50,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
  },
  textoBotaoCEP: {
    color: 'white',
    fontSize: 16,
  },
  botaoCEP: {
    height: 50,
    width: "35%",
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginBottom: 10,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba',
  },
  inputCEP: {
    width: "65%",
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 10,
    padding: 10,
  }
});