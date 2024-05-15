import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { ProdutoCard } from "./componentes/ProdutoCard";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductType,
  decrementQty,
  incrementQty,
  selectProductList,
  toogleFavorito,
} from "./features/productSlice";
import { selectClient } from "./features/clientsSlice";

const EstoqueScreen = (props: any) => {
  const listaProdutos = useSelector(selectProductList);
  const selectorClient = useSelector(selectClient);

  const dispatch = useDispatch();

  const [products, setProducts] = useState<ProductType[]>();

  const incrementQuantidade = (productId: number) => {
    dispatch(
      incrementQty({ uid: selectorClient.clientsSlice.uid, id: productId })
    );
  };

  const decrementQuantidade = (productId: number) => {
    dispatch(
      decrementQty({ uid: selectorClient.clientsSlice.uid, id: productId })
    );
  };

  const favorito = (productId: number) => {
    dispatch(
      toogleFavorito({ uid: selectorClient.clientsSlice.uid, id: productId })
    );
  };

  useEffect(() => {
    console.log(listaProdutos);
    setProducts(listaProdutos.products);
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
    <View key="estoque-screen-view">
      <ImageBackground
        source={require("../Assets/img/cadastroBackground.png")}
        style={componentStyles.backgroundImage}
        key="estoque-screen-bg"
      >
        <View>
          {products !== undefined && products.length > 0 ? (
            <FlatList
              data={products}
              key={2}
              renderItem={renderProduto}
              numColumns={1}
              keyExtractor={(item) => `est-${item.id}`}
              extraData={products.length}
              initialNumToRender={4}
            />
          ) : (
            <Text>Sem produtos cadastrado</Text>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

EstoqueScreen.options = {
  topBar: {
    title: {
      text: "Meu Estoque",
    },
  },
  bottomTab: {
    text: "Meu Estoque",
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

export default EstoqueScreen;
