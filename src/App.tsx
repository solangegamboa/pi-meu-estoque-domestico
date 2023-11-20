import {View, Button, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {CadastroScreen} from './CadastroScreen';
import {ProdutoDetalheScreen} from './ProdutoDetalhesScreen';
import {FavoritosScreen} from './FavoritosScreen';
import EstoqueScreen from './EstoqueScreen';

const LoginScreen = (props: any) => {
  return (
    <View style={styles.root}>
      <Button
        title="Login"
        color="#710ce3"
        onPress={() => Navigation.setRoot(mainRoot)}
      />
    </View>
  );
};

Navigation.registerComponent('Login', () => LoginScreen);
Navigation.registerComponent('Estoque', () => EstoqueScreen);
Navigation.registerComponent('Favoritos', () => FavoritosScreen);
Navigation.registerComponent('DetalhesProduto', () => ProdutoDetalheScreen);
Navigation.registerComponent('Cadastro', () => CadastroScreen);

const mainRoot = {
  root: {
    bottomTabs: {
      children: [
        {
          stack: {
            children: [
              {
                component: {
                  name: 'Cadastro',
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
                  name: 'Estoque',
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
                  name: 'Favoritos',
                },
              },
            ],
          },
        },
      ],
    },
  },
};
const loginRoot = {
  root: {
    component: {
      name: 'Login',
    },
  },
};

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: '#4d089a',
  },
  topBar: {
    title: {
      color: 'white',
    },
    backButton: {
      color: 'white',
    },
    background: {
      color: '#4d089a',
    },
  },
  bottomTab: {
    fontSize: 14,
    selectedFontSize: 14,
  },
});
Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot(loginRoot);
});

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
});
