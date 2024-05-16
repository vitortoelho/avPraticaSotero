import axios from 'axios';

const api = axios.create({
  baseURL: 'https://viacep.com.br/ws'
});

export const consultarCEP = async (cep) => {
  try {
    const response = await api.get(`/${cep}/json`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao consultar o CEP. Por favor, verifique o CEP digitado.');
  }
};
