import {View, Button, Text, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';

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

const CadastroScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Formulário de cadastro</Text>
    </View>
  );
};

CadastroScreen.options = {
  topBar: {
    title: {
      text: 'Cadastro',
    },
  },
  bottomTab: {
    text: 'Cadastro',
  },
};
const EstoqueScreen = (props: any) => {
  return (
    <View style={styles.root}>
      <Text>Estoque</Text>

      <Button
        title="Produto 1"
        color="#710ce3"
        onPress={() =>
          Navigation.push(props.componentId, {
            component: {
              name: 'DetalhesProduto',
            },
          })
        }
      />
      <Button
        title="Produto 2"
        color="#710ce3"
        onPress={() =>
          Navigation.push(props.componentId, {
            component: {
              name: 'DetalhesProduto',
            },
          })
        }
      />
    </View>
  );
};
EstoqueScreen.options = {
  topBar: {
    title: {
      text: 'Home',
    },
  },
  bottomTab: {
    text: 'Home',
  },
};

const FavoritosScreen = (props: any) => {
  return (
    <View style={styles.root}>
      <Text>Favoritos</Text>
      <Button
        title="Produto 1"
        color="#710ce3"
        onPress={() =>
          Navigation.push(props.componentId, {
            component: {
              name: 'DetalhesProduto',
            },
          })
        }
      />
      <Button
        title="Produto 2"
        color="#710ce3"
        onPress={() =>
          Navigation.push(props.componentId, {
            component: {
              name: 'DetalhesProduto',
            },
          })
        }
      />
    </View>
  );
};
FavoritosScreen.options = {
  topBar: {
    title: {
      text: 'Favoritos',
    },
  },
  bottomTab: {
    text: 'Favoritos',
  },
};

const ProdutoDetalheScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Detalhe do Produto</Text>
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
});
