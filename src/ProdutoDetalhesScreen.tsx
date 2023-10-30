import {View, Text} from 'react-native';
import {styles} from './App';

export const ProdutoDetalheScreen = (props: any) => {
  return (
    <View style={styles.root}>
      <Text>Detalhe do Produto {props.productId}</Text>
    </View>
  );
};
ProdutoDetalheScreen.options = {
  topBar: {
    title: {
      text: 'Detalhe do Produto',
    },
  },
  bottomTab: {
    text: 'Detalhe do Produto',
  },
};
