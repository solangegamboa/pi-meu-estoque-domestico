import {View, Text, Button} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {styles} from './App';
import {ProdutoCard} from './componentes/ProdutoCard';

export const EstoqueScreen = (props: any) => {
  return (
    <View style={styles.root}>
      <Text>Estoque componente</Text>

      <ProdutoCard componentId={props.componentId} productId="1"></ProdutoCard>
      <ProdutoCard componentId={props.componentId} productId="2"></ProdutoCard>
      <ProdutoCard componentId={props.componentId} productId="3"></ProdutoCard>
    </View>
  );
};
EstoqueScreen.options = {
  topBar: {
    title: {
      text: 'Home',
    },
  },
  bottomTab: {
    text: 'Home',
  },
};
