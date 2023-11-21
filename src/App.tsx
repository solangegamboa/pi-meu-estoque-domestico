import {View, Button, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {CadastroScreen} from './CadastroScreen';
import {ProdutoDetalheScreen} from './ProdutoDetalhesScreen';
import {FavoritosScreen} from './FavoritosScreen';
import EstoqueScreen from './EstoqueScreen';
import {Provider} from 'react-redux';
import {store} from './store';

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

Navigation.registerComponent(
  'Login',
  () => props =>
    (
      <Provider store={store}>
        <LoginScreen {...props} />
      </Provider>
    ),
  () => LoginScreen,
);
Navigation.registerComponent(
  'Estoque',
  () => props =>
    (
      <Provider store={store}>
        <EstoqueScreen {...props} />
      </Provider>
    ),
  () => EstoqueScreen,
);
Navigation.registerComponent(
  'Favoritos',
  () => props =>
    (
      <Provider store={store}>
        <FavoritosScreen {...props} />
      </Provider>
    ),
  () => FavoritosScreen,
);
Navigation.registerComponent(
  'DetalhesProduto',
  () => props =>
    (
      <Provider store={store}>
        <ProdutoDetalheScreen {...props} />
      </Provider>
    ),
  () => ProdutoDetalheScreen,
);
Navigation.registerComponent(
  'Cadastro',
  () => props =>
    (
      <Provider store={store}>
        <CadastroScreen {...props} />
      </Provider>
    ),
  () => CadastroScreen,
);

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
