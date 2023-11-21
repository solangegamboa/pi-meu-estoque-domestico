import {View, Text} from 'react-native';
import {styles} from './App';
import {store} from './store';
import {Provider} from 'react-redux';

export const ProdutoDetalheScreen = (props: any) => {
  return (
      <View style={styles.root} key="produto-detalhe-screen">
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
