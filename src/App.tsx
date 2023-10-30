import {View, Button, Text, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';

const LoginScreen = () => {
  return (
    <View style={styles.root}>
      <Button
        title="Login ou Cadastro"
        color="#710ce3"
        onPress={() => Navigation.setRoot(mainRoot)}
      />
    </View>
  );
};
LoginScreen.options = {
  topBar: {
    title: {
      text: 'Login',
    },
  },
  bottomTab: {
    text: 'Login',
  },
};
const HomeScreen = (props: any) => {
  return (
    <View style={styles.root}>
      <Text>Estoque</Text>
    </View>
  );
};
HomeScreen.options = {
  topBar: {
    title: {
      text: 'Home',
    },
  },
  bottomTab: {
    text: 'Home',
  },
};

const SettingsScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Favoritos</Text>
    </View>
  );
};
SettingsScreen.options = {
  topBar: {
    title: {
      text: 'Favoritos',
    },
  },
  bottomTab: {
    text: 'Favoritos',
  },
};

Navigation.registerComponent('Login', () => LoginScreen);
Navigation.registerComponent('Estoque', () => HomeScreen);
Navigation.registerComponent('Favoritos', () => SettingsScreen);

const mainRoot = {
  root: {
    bottomTabs: {
      children: [
        {
          stack: {
            children: [
              {
                component: {
                  name: 'Login',
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
