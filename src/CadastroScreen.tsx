import {View, Text, StyleSheet} from 'react-native';
import {styles} from './App';

export const CadastroScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Formulário de cadastro componente</Text>
    </View>
  );
};

CadastroScreen.options = {
  topBar: {
    title: {
      text: 'Cadastro',
    },
  },
  bottomTab: {
    text: 'Cadastro',
  },
};
