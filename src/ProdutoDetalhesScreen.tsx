import {View, Text, Button, Pressable, StyleSheet} from 'react-native';
import {styles} from './App';
import {store} from './store';
import {Provider} from 'react-redux';

export const ProdutoDetalheScreen = (props: any) => {
  return (
    <View style={componentStyles.root} key="produto-detalhe-screen">
    {/* <Text>Detalhe do Produto {props.productId}</Text> */}

    <View style={componentStyles.containerPhoto}>
      <Text>Imagem do produto</Text>

      <View>
        <Text style={componentStyles.text}>Quantidade:</Text>
        <View style={componentStyles.containerQuantity}>
          <Pressable style={componentStyles.button}>
            <Text style={componentStyles.textButton}>-</Text>
          </Pressable>
          <Text style={componentStyles.textQuantity}>1</Text>
          <Pressable style={componentStyles.button}>
            <Text style={componentStyles.textButton}>+</Text>
          </Pressable>
        </View>
      </View>

    </View>

    <View style={componentStyles.containerDetails}>
      <View style={componentStyles.containerFlex}>
        <Text style={componentStyles.text}>Nome do Produto:</Text>
        <Text style={componentStyles.text}>Batata Pringles</Text>
      </View>

      <View style={componentStyles.containerFlex}>
        <Text style={componentStyles.text}>Categoria:</Text>
        <Text style={componentStyles.text}>Alimento</Text>
      </View>        
      
      <View style={componentStyles.containerFlex}>
        <Text style={componentStyles.text}>Marca:</Text>
        <Text style={componentStyles.text}>Pringles</Text>
      </View>
      
      <View style={componentStyles.containerFlex}>
        <Text style={componentStyles.text}>Data de Compra:</Text>
        <Text style={componentStyles.text}>21/09/2023</Text>
      </View>
    
      <View style={componentStyles.containerFlex}>
        <Text style={componentStyles.text}>Validade:</Text>
        <Text style={componentStyles.text}>04/2024</Text>
      </View>
    </View>
    </View>
  );
};
ProdutoDetalheScreen.options = {
  topBar: {
    title: {
      text: 'Detalhe do Produto',
    },
  },
  bottomTab: {
    text: 'Detalhe do Produto',
  },
};

const componentStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  containerPhoto: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 40,
  },
  containerQuantity: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerDetails: {
    flex: 1,
    padding: 40,
    backgroundColor: '#FFED8D',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  containerFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 12,
  },
  text: {
    color: '#000',
  },
  button: {
    backgroundColor: '#6D3E84',
    width: 30,
    borderRadius: 8,
  },
  textButton: {
    textAlign: 'center',
    color: '#fff'
  },
  textQuantity: {
    width: 40,
    color: '#000',
    borderRadius: 8,
    borderColor: '#8A7395',
    borderWidth: 1,
    textAlign: 'center',
    margin: 10,
  }
})