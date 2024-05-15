import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, TextInput } from "react-native";
import { Navigation } from "react-native-navigation";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./App";
import { ProductType, setProductsOnline } from "./features/productSlice";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db, login, selectClient } from "./features/clientsSlice";

export const LoginScreen = (props: any) => {
  const dispatch = useDispatch();
  const selector = useSelector(selectClient);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const loadProducts = (uid: string) => {
    const lerProdutos = async () => {
      const produtosFormatados: ProductType[] = [];
      const querySnapshot = await getDocs(
        query(collection(db, uid, "produtos"))
      );
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        produtosFormatados.push({
          id: parseInt(doc.id),
          nome: doc.data().nome,
          categoria: doc.data().categoria,
          marca: doc.data().marca,
          quantidade: doc.data().quantidade,
          data_compra: doc.data().data_compra,
          data_validade: doc.data().data_validade,
          foto: doc.data().foto,
          favorito: doc.data().favorito,
        });
      });
      dispatch(setProductsOnline(produtosFormatados));
    };
    lerProdutos();
  };

  const logar = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(login({ email: user.email, uid: user.uid }));
        loadProducts(user.uid);
        Navigation.setRoot(mainRoot);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode", errorCode);
        console.log("errorMessage", errorMessage);
      });
  };

  const cadastrar = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(login({ email: user.email, uid: user.uid }));
        loadProducts(user.uid);
        Navigation.setRoot(mainRoot);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode", errorCode);
        console.log("errorMessage", errorMessage);
      });
  };
  return (
    <>
      <View style={styles.root}>
        <Text style={componentStyles.text}>Email:</Text>
        <TextInput
          style={componentStyles.input}
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
        />
        <Text style={componentStyles.text}>Senha:</Text>
        <TextInput
          style={componentStyles.input}
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
        />
        <Button title="Login" color="#710ce3" onPress={() => logar()} />
      </View>

      <View style={styles.root}>
        <Text style={componentStyles.text}>Email:</Text>
        <TextInput
          style={componentStyles.input}
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
        />
        <Text style={componentStyles.text}>Senha:</Text>
        <TextInput
          style={componentStyles.input}
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
        />
        <Button title="Cadastro" color="#710ce3" onPress={() => cadastrar()} />
      </View>
    </>
  );
};

LoginScreen.options = {
  topBar: {
    title: {
      text: "Login",
    },
  },
};
const mainRoot = {
  root: {
    bottomTabs: {
      children: [
        {
          stack: {
            children: [
              {
                component: {
                  name: "Cadastro",
                },
              },
            ],
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: "Estoque",
                },
              },
            ],
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: "Favoritos",
                },
              },
            ],
          },
        },
      ],
    },
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
  text: {
    color: "#000",
    marginBottom: 12,
    marginTop: 12,
  },
  input: {
    height: 30,
    width: 250,
    borderWidth: 1,
    borderColor: "#8A7395",
    borderRadius: 14,
    backgroundColor: "#fff",
    margin: 8,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    borderColor: "#8A7395",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 15,
  },
  button: {
    width: 150,
    height: 150,
  },
  cameraIconContainer: {
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#8A7395",
    borderWidth: 1,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    width: 25,
    height: 25,
  },
});
