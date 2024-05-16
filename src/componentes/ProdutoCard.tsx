import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ProductType, removeProduct } from "../features/productSlice";
import { Navigation } from "react-native-navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectClient } from "../features/clientsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons/faStar";
import {
  faMinus,
  faPlus,
  faStar as faStarSolid,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

type ProductCardProps = {
  product: ProductType;
  incrementQuantidade: Function;
  decrementQuantidade: Function;
  toogleFavorito: Function;
  componentId: any;
};

export const ProdutoCard = ({
  product,
  incrementQuantidade,
  componentId,
  decrementQuantidade,
  toogleFavorito,
}: ProductCardProps) => {
  const dispatch = useDispatch();
  const selectorClient = useSelector(selectClient);
  const deleta = () => {
    dispatch(removeProduct({ uid: selectorClient.uid, id: product.id }));
  };

  return (
    <View style={styles.item}>
      <Pressable
        onPress={() =>
          Navigation.push(componentId, {
            component: {
              name: "DetalhesProduto",
              passProps: {
                product: product,
                productId: product.id,
              },
            },
          })
        }
      >
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            {product.favorito && (
              <Pressable onPress={() => toogleFavorito()} style={styles.star}>
                <FontAwesomeIcon icon={faStarSolid} color="purple" size={20} />
              </Pressable>
            )}

            {!product.favorito && (
              <Pressable
                onPress={() => toogleFavorito(product.id)}
                style={styles.star}
              >
                <FontAwesomeIcon icon={faStar} size={20} color="purple" />
              </Pressable>
            )}
            <Text style={styles.title}>{product.nome}</Text>
            <Text style={styles.subtitle}>
              {product.foto ? (
                <Image
                  source={{ uri: product.foto }}
                  style={{ width: 100, height: 100 }}
                />
              ) : (
                <Image
                  source={require("../../Assets/img/can.png")}
                  style={{ width: 100, height: 100 }}
                />
              )}
            </Text>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.text}>
              <Pressable
                onPress={() => decrementQuantidade(product.id)}
                style={styles.qty}
              >
                <FontAwesomeIcon icon={faMinus} color="purple" />
              </Pressable>
              {product.quantidade}
              <Pressable
                onPress={() => incrementQuantidade(product.id)}
                style={styles.qty}
              >
                <FontAwesomeIcon icon={faPlus} color="purple" />
              </Pressable>
            </Text>
            <Text style={styles.text}>
              Val.{product.data_validade}
              <Pressable onPress={() => deleta()} style={styles.trash}>
                <FontAwesomeIcon icon={faTrashCan} color="purple" />
              </Pressable>
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
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    width: "auto",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#488CFF",
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 25,
    color: "#333",
    marginTop: 5,
  },
  content: {
    alignItems: "center",
  },
  text: {
    fontSize: 17,
    color: "#444444",
    textAlign: "center",
  },
  star: {
    alignSelf: "flex-end",
    marginRight: -20,
  },
  trash: {
    alignSelf: "flex-end",
    paddingTop: 5,
    paddingLeft: 5,
  },
  qty: {
    paddingHorizontal: 10,
  },
});
