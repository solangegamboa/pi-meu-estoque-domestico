import {
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  Button,
  ScrollView,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductType,
  addProduct,
  selectFoto,
  selectNextId,
  setFoto,
} from "./features/productSlice";
import MaskInput, { Masks } from "react-native-mask-input";

// @ts-ignore
import { Navigation } from "react-native-navigation";
import { selectClient } from "./features/clientsSlice";
import { UploadFile } from "./componentes/UploadFile";
import { AppButton } from "./componentes/AppButton";

export const CadastroScreen = (props: any) => {
  const nextId = useSelector(selectNextId);
  const selectorClient = useSelector(selectClient);
  const selectorFoto = useSelector(selectFoto);

  const emptyForm = {
    id: nextId,
    nome: "",
    categoria: "",
    marca: "",
    quantidade: "0",
    data_compra: "",
    data_validade: "",
    foto: "",
    favorito: false,
    uid: selectorClient.uid,
  };

  const [form, setForm] = useState<ProductType>(emptyForm);

  const dispatch = useDispatch();

  const addNewProduct = () => {
    if (form.nome !== undefined) {
      dispatch(addProduct(form));
      dispatch(setFoto(""));
      Alert.alert(
        "Produto cadastrado com sucesso!",
        "Escolha a próxima ação",
        [
          {
            text: "Cadastrar novo produto",
            onPress: () => console.log("novo produto"),
          },
          {
            text: "Ir para o estoque",
            onPress: () =>
              Navigation.push(props.componentId, {
                component: {
                  name: "Estoque",
                },
              }),
          },
        ],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    setForm(emptyForm);
  }, [nextId]);

  useEffect(() => {
    setForm({ ...form, foto: selectorFoto });
  }, [selectorFoto]);

  return (
    <ScrollView>
      <ImageBackground
        source={require("../Assets/img/cadastroBackground.png")}
        style={componentStyles.backgroundImage}
        key="cadastro-screen"
      >
        <View style={componentStyles.root} key="cadastro-screen-view">
          {/* <TextInput>ID: {nextId}</TextInput> */}
          <Text style={componentStyles.text}>Nome</Text>
          <TextInput
            style={componentStyles.input}
            value={form.nome}
            onChangeText={(text) => setForm({ ...form, nome: text })}
          />

          <Text style={componentStyles.text}>Categoria</Text>
          <TextInput
            style={componentStyles.input}
            value={form.categoria}
            onChangeText={(text) => setForm({ ...form, categoria: text })}
          />

          <Text style={componentStyles.text}>Marca</Text>
          <TextInput
            style={componentStyles.input}
            value={form.marca}
            onChangeText={(text) => setForm({ ...form, marca: text })}
          />

          <Text style={componentStyles.text}>Quantidade</Text>
          <TextInput
            style={componentStyles.input}
            value={form.quantidade}
            onChangeText={(text) => setForm({ ...form, quantidade: text })}
          />

          <Text style={componentStyles.text}>Data de compra</Text>
          <MaskInput
            style={componentStyles.input}
            value={form.data_compra}
            mask={Masks.DATE_DDMMYYYY}
            onChangeText={(text) => setForm({ ...form, data_compra: text })}
          />

          <Text style={componentStyles.text}>Validade</Text>
          <MaskInput
            style={componentStyles.input}
            value={form.data_validade}
            mask={Masks.DATE_DDMMYYYY}
            onChangeText={(text) => setForm({ ...form, data_validade: text })}
          />
          <View style={componentStyles.image}>
            {form.foto && (
              <Image
                source={{ uri: form.foto }}
                style={{ width: 150, height: 150 }}
              />
            )}
          </View>
          <UploadFile />

          <AppButton
            color="#6D3E84"
            title="Cadastrar Item"
            onPress={() => addNewProduct()}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

CadastroScreen.options = {
  topBar: {
    title: {
      text: "Cadastro do Produto",
    },
  },
  bottomTab: {
    text: "Cadastro",
  },
};

const componentStyles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center'
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
    width: 350,
    borderWidth: 1,
    borderColor: "#8A7395",
    borderRadius: 14,
    backgroundColor: "#fff",
    padding: 8,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 10,
    borderRadius: 8,
    borderColor: "#8A7395",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  button: {
    width: 150,
    height: 150,
  },
});
