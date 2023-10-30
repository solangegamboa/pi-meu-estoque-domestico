import {View, Text, TextInput, StyleSheet} from 'react-native';
import {styles} from './App';
import {useState} from 'react';

export const CadastroScreen = () => {
  const [form, setForm] = useState({
    nome: '',
    categoria: '',
    marca: '',
    quantidade: 1,
    data_compra: '',
    data_validade: '',
    foto: '',
  });
  return (
    <View style={componentStyles.root}>
      <TextInput style={componentStyles.input} />
      <TextInput style={componentStyles.input} />
      <TextInput style={componentStyles.input} />
      <TextInput style={componentStyles.input} />
    </View>
  );
};

CadastroScreen.options = {
  topBar: {
    title: {
      text: 'Cadastro do Produto',
    },
  },
  bottomTab: {
    text: 'Cadastro do Produto',
  },
};

const componentStyles = StyleSheet.create({
  root: {
    margin: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
