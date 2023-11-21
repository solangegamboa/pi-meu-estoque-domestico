import {View, StyleSheet, ImageBackground, FlatList, Text} from 'react-native';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ProdutoCard} from './componentes/ProdutoCard';
import {
  selectProductList,
  ProductType,
  incrementQty,
  decrementQty,
  selectFavoritosList,
  toogleFavorito,
} from './features/productSlice';

export const FavoritosScreen = (props: any) => {
  const listaProdutos = useSelector(selectFavoritosList);

  const dispatch = useDispatch();

  const [products, setProducts] = useState<ProductType[]>();

  const incrementQuantidade = (productId: number) => {
    dispatch(incrementQty(productId));
  };

  const decrementQuantidade = (productId: number) => {
    dispatch(decrementQty(productId));
  };

  const favorito = (productId: number) => {
    try {
      dispatch(toogleFavorito(productId));
    } catch (error) {
      setProducts([]);
    }
  };

  useEffect(() => {
    setProducts(listaProdutos);
    console.log('listaProdutos.products', listaProdutos);
  }, [listaProdutos]);

  const renderProduto = ({item}: {item: ProductType}) => (
    <ProdutoCard
      product={item}
      componentId={props.componentId}
      incrementQuantidade={() => incrementQuantidade(item.id)}
      decrementQuantidade={() => decrementQuantidade(item.id)}
      toogleFavorito={() => favorito(item.id)}
    />
  );

  return (
    <View key="estoque-screen-view">
      <ImageBackground
        source={require('../Assets/img/cadastroBackground.png')}
        style={componentStyles.backgroundImage}
        key="estoque-screen-bg">
        <View>
          {products !== undefined && products.length > 0 ? (
            <FlatList
              data={products}
              key={2}
              renderItem={renderProduto}
              numColumns={2}
              keyExtractor={item => item.id.toString()}
              extraData={products.length}
              initialNumToRender={2}
            />
          ) : (
            <Text>Sem produtos favoritos</Text>
          )}
        </View>
      </ImageBackground>
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

const componentStyles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 20,
  },
  backgroundImage: {
    resizeMode: 'cover',
    width: '100%',
  },
});
