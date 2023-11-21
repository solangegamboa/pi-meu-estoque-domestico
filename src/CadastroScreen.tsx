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
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ProductType, addProduct, selectNextId} from './features/productSlice';
const iconCamera = require('../Assets/img/iconCamera.png');

export const CadastroScreen = () => {
  const [galleryPhoto, setGalleryPhoto] = useState('');
  const [form, setForm] = useState<ProductType>({
    id: 0,
    nome: '',
    categoria: '',
    marca: '',
    quantidade: 0,
    data_compra: '',
    data_validade: '',
    foto: '',
    favorito: false,
  });

  const nextId = useSelector(selectNextId);

  const dispatch = useDispatch();

  const addNewProduct = () => {
    if (form.nome !== undefined) {
      console.log('form', form);
      dispatch(addProduct(form));
    }
  };

  useEffect(() => {
    setForm({...form, id: nextId});
  }, [nextId]);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibrary({
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setGalleryPhoto(result.assets[0].uri);
    }
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require('../Assets/img/cadastroBackground.png')}
        style={componentStyles.backgroundImage}
        key="cadastro-screen">
        <View style={componentStyles.root} key="cadastro-screen-view">
          <TextInput>ID: {nextId}</TextInput>
          <Text style={componentStyles.text}>Nome do produto:</Text>
          <TextInput
            style={componentStyles.input}
            value={form.nome}
            onChangeText={text => setForm({...form, nome: text})}
          />

          <Text style={componentStyles.text}>Categoria:</Text>
          <TextInput
            style={componentStyles.input}
            value={form.categoria}
            onChangeText={text => setForm({...form, categoria: text})}
          />

          <Text style={componentStyles.text}>Marca:</Text>
          <TextInput
            style={componentStyles.input}
            value={form.marca}
            onChangeText={text => setForm({...form, marca: text})}
          />

          <Text style={componentStyles.text}>Quantidade:</Text>
          <TextInput
            style={componentStyles.input}
            value={form.quantidade.toString()}
            onChangeText={text =>
              setForm({...form, quantidade: parseInt(text)})
            }
          />

          <Text style={componentStyles.text}>Data de compra:</Text>
          <TextInput
            style={componentStyles.input}
            value={form.data_compra}
            onChangeText={text => setForm({...form, data_compra: text})}
          />

          <Text style={componentStyles.text}>Validade:</Text>
          <TextInput
            style={componentStyles.input}
            value={form.data_validade}
            onChangeText={text => setForm({...form, data_validade: text})}
          />

          <View style={componentStyles.container}>
            <Text style={componentStyles.text}>Adicionar foto:</Text>
            <TouchableWithoutFeedback
              style={componentStyles.button}
              onPress={openGallery}>
              {galleryPhoto ? (
                <Image
                  style={componentStyles.image}
                  source={{uri: galleryPhoto}}
                />
              ) : (
                <View style={componentStyles.cameraIconContainer}>
                  <Image
                    style={componentStyles.cameraIcon}
                    source={iconCamera}
                  />
                </View>
              )}
            </TouchableWithoutFeedback>
          </View>
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
      text: 'Cadastro do Produto',
    },
  },
  bottomTab: {
    text: 'Cadastro',
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
  text: {
    color: '#000',
    marginBottom: 12,
    marginTop: 12,
  },
  input: {
    height: 30,
    borderWidth: 1,
    borderColor: '#8A7395',
    borderRadius: 14,
    backgroundColor: '#fff',
    padding: 8,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    borderColor: '#8A7395',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#8A7395',
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    width: 25,
    height: 25,
  },
});
