import { Button, Image, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { ProductType, removeProduct } from "../features/productSlice";
import { Navigation } from "react-native-navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectClient } from "../features/clientsSlice";

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
                              toogleFavorito
                            }: ProductCardProps) => {
  const dispatch = useDispatch();
  const selectorClient = useSelector(selectClient);
  const deleta = () => {
    dispatch(removeProduct({ uid: selectorClient.uid, id: product.id }));
  };

  return (
    <View style={styles.item}>
      <Pressable onPress={() => Navigation.push(componentId, {
        component: {
          name: "DetalhesProduto",
          passProps: {
            product: product,
            productId: product.id
          }
        }
      })}>
        <View style={styles.card}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {product.nome}
            </Text>
            <Text style={styles.subtitle}>
              <Image source={require("../../Assets/img/can.png")} style={{ width: 100, height: 100 }} />
            </Text>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.text}>
              Quantidade: {product.quantidade}
            </Text>
            <Text style={styles.text}>
              Validade: {product.data_validade}
            </Text>
            <Text style={styles.text}>
              <Text>Selecionar Favorito:</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={product.favorito ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => toogleFavorito()}
                value={product.favorito}
              />
            </Text>
            <Text>
              <Button title={"Remover"} onPress={() => deleta()} />
            </Text>
          </View>
        </View>
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "50%",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 16,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    width: 350,
    height: 350,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    marginBottom: 16,
    alignItems: "center"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "green"
  },
  subtitle: {
    fontSize: 24,
    color: "#333",
    marginTop: 10
  },
  content: {
    alignItems: "center"
  },
  text: {
    fontSize: 17,
    color: "#444444",
    textAlign: "center"
  }
});

