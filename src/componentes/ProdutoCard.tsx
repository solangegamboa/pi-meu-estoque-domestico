import {Pressable, StyleSheet, Switch, Text, View} from 'react-native';
import {ProductType} from '../features/productSlice';
import { Navigation } from 'react-native-navigation';

type ProductCardProps = {
  product: ProductType;
  incrementQuantidade: Function;
  decrementQuantidade: Function;
  toogleFavorito: Function;
  componentId: any
};

export const ProdutoCard = ({
  product,
  incrementQuantidade,
  componentId,
  decrementQuantidade,
  toogleFavorito,
}: ProductCardProps) => {
  console.log('product', product);
  return (
    <View style={styles.item}>
      <Pressable onPress={() => Navigation.push(componentId, {
          component: {
            name: 'DetalhesProduto',
            passProps: {
                product: product,
                productId: product.id
            }
          },
        })}>
        <Text style={styles.title}>{product.nome}</Text>
        <Text>{product.quantidade}</Text>
        <Text>{product.marca}</Text>
        <Text>{product.categoria}</Text>
        <Text>{product.data_compra}</Text>
        <Text>{product.data_validade}</Text>
        <Text>{product.favorito.toString()}</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={product.favorito ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => toogleFavorito()}
          value={product.favorito}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '50%',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 35,
    width: 'auto',
  },
});
