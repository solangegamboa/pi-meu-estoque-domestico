import { collection, getDocs, query } from "firebase/firestore";
import { useState } from "react";
import { View, Button, Text, StyleSheet, TextInput } from "react-native";
import { Navigation } from "react-native-navigation";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./App";
import { ProductType, setProductsOnline } from "./features/productSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, login, selectClient } from "./features/clientsSlice";
import { db } from "./config";
import { AppButton } from "./componentes/AppButton";

export const LoginScreen = (props: any) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showCadastrar, setShowCadastrar] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const loadProducts = (uid: string) => {
    const lerProdutos = async () => {
      const produtosFormatados: ProductType[] = [];
      const querySnapshot = await getDocs(
        query(collection(db, "users", `${uid}/produto`))
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
          uid: uid,
        });
      });
      dispatch(setProductsOnline(produtosFormatados));
    };
    lerProdutos();
  };

  const trataError = (code: string) => {
    switch (code) {
      case "auth/too-many-requests":
        return "Muitas tentativas de login inválidas, conta bloqueada temporariamente. Tente novamente mais tarde";
      case "auth/missing-password":
        return "Preencha a senha";
      case "auth/invalid-credential":
        return "Email ou senha inválidos";
      case "auth/missing-email":
        return "Preencha o e-mail";
      case "auth/email-already-in-use":
        return "Usuário já cadastrado, Faça o Login";
      default:
        return code;
    }
  };

  const logar = () => {
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(login({ email: user.email, uid: user.uid }));
        loadProducts(user.uid);
        Navigation.setRoot(mainRoot);
      })
      .catch((error) => {
        setErrorMessage(trataError(error.code));
      });
  };

  const cadastrar = () => {
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(login({ email: user.email, uid: user.uid }));
        loadProducts(user.uid);
        setShowCadastrar(false);
        Navigation.setRoot(mainRoot);
      })
      .catch((error) => {
        setErrorMessage(trataError(error.code));
      });
  };
  return (
    <>
      {showCadastrar ? (
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
            secureTextEntry
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
          {errorMessage && <Text>{errorMessage}</Text>}
          <AppButton
            title="Cadastrar"
            color="#710ce3"
            onPress={() => cadastrar()}
          />
          <Button
            title="Ir para Login"
            color="#710ce3"
            onPress={() => setShowCadastrar(false)}
          />
        </View>
      ) : (
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
            secureTextEntry
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
          {errorMessage && <Text>{errorMessage}</Text>}
          <AppButton title="Login" color="#710ce3" onPress={() => logar()} />
          <Button
            title="Ir para Cadastro"
            color="#710ce3"
            onPress={() => setShowCadastrar(true)}
          />
        </View>
      )}
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
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 15,
  },
});
