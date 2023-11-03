import { Text, TextInput, StyleSheet, ImageBackground, Image, Button, ScrollView, PermissionsAndroid, Modal, View} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {styles} from './App';
import {useState} from 'react';

export const CadastroScreen = () => {
  const [galleryPhoto, setGalleryPhoto] = useState('');
  const [form, setForm] = useState({
    nome: '',
    categoria: '',
    marca: '',
    quantidade: 1,
    data_compra: '',
    data_validade: '',
    foto: '',
  });

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibrary({
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if(!result.canceled) {
      setGalleryPhoto(result.assets[0].uri);
    }
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require('../Assets/img/cadastroBackground.png')}
        style={componentStyles.backgroundImage}
      >
        <View style={componentStyles.root}>
          <Text style={componentStyles.text} >Nome do produto:</Text>
          <TextInput style={componentStyles.input} />

          <Text style={componentStyles.text} >Categoria:</Text>
          <TextInput style={componentStyles.input} />

          <Text style={componentStyles.text} >Marca:</Text>
          <TextInput style={componentStyles.input} />

          <Text style={componentStyles.text} >Quantidade:</Text>
          <TextInput style={componentStyles.input} />

          <Text style={componentStyles.text} >Data de compra:</Text>
          <TextInput style={componentStyles.input} />

          <Text style={componentStyles.text} >Validade:</Text>
          <TextInput style={componentStyles.input} /> 

          <View style={componentStyles.container}>
            <Text style={componentStyles.text} >Adicionar foto:</Text>
            <Image style={componentStyles.image} source={{uri: galleryPhoto}}/>
          </View>
          <Button color='#6D3E84' title='Open Gallery' onPress={openGallery}/>
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
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  }
});
