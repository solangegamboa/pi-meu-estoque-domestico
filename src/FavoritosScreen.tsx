import {View, Text, Button} from 'react-native';
import {styles} from './App';
import {ProdutoCard} from './componentes/ProdutoCard';

export const FavoritosScreen = (props: any) => {
  return (
    <View style={styles.root}>
      <Text>Favoritos componente</Text>
      <ProdutoCard componentId={props.componentId} productId="1"></ProdutoCard>
      <ProdutoCard componentId={props.componentId} productId="2"></ProdutoCard>
      <ProdutoCard componentId={props.componentId} productId="3"></ProdutoCard>
    </View>
  );
};
FavoritosScreen.options = {
  topBar: {
    title: {
      text: 'Favoritos',
    },
  },
  bottomTab: {
    text: 'Favoritos',
  },
};
