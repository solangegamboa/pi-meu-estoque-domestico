import {
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  Button,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, addProduct, selectNextId } from "./features/productSlice";
import MaskInput, { Masks } from "react-native-mask-input";

// @ts-ignore
import iconCamera from "../Assets/img/iconCamera.png";
import { Navigation } from "react-native-navigation";
import { selectClient } from "./features/clientsSlice";

export const CadastroScreen = (props: any) => {
  const [galleryPhoto, setGalleryPhoto] = useState("");
  const selectorClient = useSelector(selectClient);
  const [form, setForm] = useState<ProductType>({
    id: 0,
    nome: "",
    categoria: "",
    marca: "",
    quantidade: "0",
    data_compra: "",
    data_validade: "",
    foto: "",
    favorito: false,
    uid: "0123",
  });

  const nextId = useSelector(selectNextId);

  const dispatch = useDispatch();

  const addNewProduct = () => {
    if (form.nome !== undefined) {
      form.uid = selectorClient.clientsSlice.uid;
      dispatch(addProduct(form));
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
    setForm({ ...form, id: nextId });
  }, [nextId]);

  return (
    <ScrollView>
      <ImageBackground
        source={require("../Assets/img/cadastroBackground.png")}
        style={componentStyles.backgroundImage}
        key="cadastro-screen"
      >
        <View style={componentStyles.root} key="cadastro-screen-view">
          <TextInput>ID: {nextId}</TextInput>
          <Text style={componentStyles.text}>Nome do produto:</Text>
          <TextInput
            style={componentStyles.input}
            value={form.nome}
            onChangeText={(text) => setForm({ ...form, nome: text })}
          />

          <Text style={componentStyles.text}>Categoria:</Text>
          <TextInput
            style={componentStyles.input}
            value={form.categoria}
            onChangeText={(text) => setForm({ ...form, categoria: text })}
          />

          <Text style={componentStyles.text}>Marca:</Text>
          <TextInput
            style={componentStyles.input}
            value={form.marca}
            onChangeText={(text) => setForm({ ...form, marca: text })}
          />

          <Text style={componentStyles.text}>Quantidade:</Text>
          <TextInput
            style={componentStyles.input}
            value={form.quantidade}
            onChangeText={(text) => setForm({ ...form, quantidade: text })}
          />

          <Text style={componentStyles.text}>Data de compra:</Text>
          <MaskInput
            style={componentStyles.input}
            value={form.data_compra}
            mask={Masks.DATE_DDMMYYYY}
            onChangeText={(text) => setForm({ ...form, data_compra: text })}
          />

          <Text style={componentStyles.text}>Validade:</Text>
          <MaskInput
            style={componentStyles.input}
            value={form.data_validade}
            mask={Masks.DATE_DDMMYYYY}
            onChangeText={(text) => setForm({ ...form, data_validade: text })}
          />

          {/*<View style={componentStyles.container}>*/}
          {/*  <Text style={componentStyles.text}>Adicionar foto:</Text>*/}
          {/*  <TouchableWithoutFeedback*/}
          {/*    style={componentStyles.button}*/}
          {/*    onPress={openGallery}>*/}
          {/*    {galleryPhoto ? (*/}
          {/*      <Image*/}
          {/*        style={componentStyles.image}*/}
          {/*        source={{ uri: galleryPhoto }}*/}
          {/*      />*/}
          {/*    ) : (*/}
          {/*      <View style={componentStyles.cameraIconContainer}>*/}
          {/*        <Image*/}
          {/*          style={componentStyles.cameraIcon}*/}
          {/*          source={iconCamera}*/}
          {/*        />*/}
          {/*      </View>*/}
          {/*    )}*/}
          {/*  </TouchableWithoutFeedback>*/}
          {/*</View>*/}
          <Button
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
    borderWidth: 1,
    borderColor: "#8A7395",
    borderRadius: 14,
    backgroundColor: "#fff",
    padding: 8,
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
