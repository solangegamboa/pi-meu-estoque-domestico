import { View, Text, Button, Pressable, StyleSheet, Image } from "react-native";
import { styles } from "./App";
import { store } from "./store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { decrementQty, incrementQty } from "./features/productSlice";
import { useState } from "react";
import { selectClient } from "./features/clientsSlice";

export const ProdutoDetalheScreen = (props: any) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState<string>(props?.product?.quantidade);
  const selectorClient = useSelector(selectClient);

  const adicionarUnidade = () => {
    dispatch(incrementQty({ uid: selectorClient.uid, id: props.productId }));
    setQty((parseInt(qty) + 1).toString());
  };

  const removerUnidade = () => {
    dispatch(decrementQty({ uid: selectorClient.uid, id: props.productId }));
    if (parseInt(qty) > 0) setQty((parseInt(qty) - 1).toString());
  };

  return (
    <View style={componentStyles.root} key="produto-detalhe-screen">
      <View style={componentStyles.containerPhoto}>
        <Image
          source={require("../Assets/img/can.png")}
          style={{ width: 150, height: 150 }}
        />

        <View>
          <Text style={componentStyles.text}>Quantidade:</Text>
          <View style={componentStyles.containerQuantity}>
            <Pressable
              style={componentStyles.button}
              onPress={() => removerUnidade()}
            >
              <Text style={componentStyles.textButton}>-</Text>
            </Pressable>
            <Text style={componentStyles.textQuantity}>{qty}</Text>
            <Pressable
              style={componentStyles.button}
              onPress={() => adicionarUnidade()}
            >
              <Text style={componentStyles.textButton}>+</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={componentStyles.containerDetails}>
        <View style={componentStyles.containerFlex}>
          <Text style={componentStyles.text}>Nome do Produto:</Text>
          <Text style={componentStyles.text}>{props.product.nome}</Text>
        </View>

        <View style={componentStyles.containerFlex}>
          <Text style={componentStyles.text}>Categoria:</Text>
          <Text style={componentStyles.text}>{props.product.categoria}</Text>
        </View>

        <View style={componentStyles.containerFlex}>
          <Text style={componentStyles.text}>Marca:</Text>
          <Text style={componentStyles.text}>{props.product.marca}</Text>
        </View>

        <View style={componentStyles.containerFlex}>
          <Text style={componentStyles.text}>Data de Compra:</Text>
          <Text style={componentStyles.text}>{props.product.data_compra}</Text>
        </View>

        <View style={componentStyles.containerFlex}>
          <Text style={componentStyles.text}>Validade:</Text>
          <Text style={componentStyles.text}>
            {props.product.data_validade}
          </Text>
        </View>
      </View>
    </View>
  );
};
ProdutoDetalheScreen.options = {
  topBar: {
    title: {
      text: "Detalhe do Produto",
    },
  },
  bottomTab: {
    text: "Detalhe do Produto",
  },
};

const componentStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  containerPhoto: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 40,
  },
  containerQuantity: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerDetails: {
    flex: 1,
    padding: 40,
    backgroundColor: "#FFED8D",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  containerFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 12,
  },
  text: {
    color: "#000",
  },
  button: {
    backgroundColor: "#6D3E84",
    width: 30,
    borderRadius: 8,
  },
  textButton: {
    textAlign: "center",
    color: "#fff",
  },
  textQuantity: {
    width: 40,
    color: "#000",
    borderRadius: 8,
    borderColor: "#8A7395",
    borderWidth: 1,
    textAlign: "center",
    margin: 10,
  },
});
