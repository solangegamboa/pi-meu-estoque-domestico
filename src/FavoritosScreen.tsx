import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  Text,
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProdutoCard } from "./componentes/ProdutoCard";
import {
  selectProductList,
  ProductType,
  incrementQty,
  decrementQty,
  toogleFavorito,
} from "./features/productSlice";
import { selectClient } from "./features/clientsSlice";

export const FavoritosScreen = (props: any) => {
  const listaProdutos = useSelector(selectProductList);
  const selectorClient = useSelector(selectClient);

  const dispatch = useDispatch();

  const [products, setProducts] = useState<ProductType[]>();

  const incrementQuantidade = (productId: number) => {
    dispatch(incrementQty({ uid: selectorClient.uid, id: productId }));
  };

  const decrementQuantidade = (productId: number) => {
    dispatch(decrementQty({ uid: selectorClient.uid, id: productId }));
  };

  const favorito = (productId: number) => {
    try {
      dispatch(toogleFavorito({ uid: selectorClient.uid, id: productId }));
    } catch (error) {
      setProducts([]);
    }
  };

  useEffect(() => {
    setProducts(listaProdutos.products.filter((p) => p.favorito));
  }, [listaProdutos]);

  const renderProduto = ({ item }: { item: ProductType }) => (
    <ProdutoCard
      product={item}
      componentId={props.componentId}
      incrementQuantidade={() => incrementQuantidade(item.id)}
      decrementQuantidade={() => decrementQuantidade(item.id)}
      toogleFavorito={() => favorito(item.id)}
    />
  );

  return (
    <View key="favorito-screen-view">
      <ImageBackground
        source={require("../Assets/img/cadastroBackground.png")}
        style={componentStyles.backgroundImage}
        key="favorito-screen-bg"
      >
        <View>
          {products !== undefined && products.length > 0 ? (
            <FlatList
              data={products}
              key={2}
              renderItem={renderProduto}
              numColumns={1}
              keyExtractor={(item) => `fav-${item.id}`}
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
      text: "Favoritos",
    },
  },
  bottomTab: {
    text: "Favoritos",
  },
};

const componentStyles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 20,
  },
  backgroundImage: {
    resizeMode: "cover",
    width: "100%",
  },
});
