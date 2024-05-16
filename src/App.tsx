import { StyleSheet } from "react-native";
import { Navigation } from "react-native-navigation";
import { CadastroScreen } from "./CadastroScreen";
import { ProdutoDetalheScreen } from "./ProdutoDetalhesScreen";
import { FavoritosScreen } from "./FavoritosScreen";
import EstoqueScreen from "./EstoqueScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import { LoginScreen } from "./Login";
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";

Navigation.registerComponent(
  "Login",
  () => (props) =>
    (
      <Provider store={store}>
        <LoginScreen {...props} />
      </Provider>
    ),
  () => LoginScreen
);
Navigation.registerComponent(
  "Estoque",
  () => (props) =>
    (
      <Provider store={store}>
        <EstoqueScreen {...props} />
      </Provider>
    ),
  () => EstoqueScreen
);
Navigation.registerComponent(
  "Favoritos",
  () => (props) =>
    (
      <Provider store={store}>
        <FavoritosScreen {...props} />
      </Provider>
    ),
  () => FavoritosScreen
);
Navigation.registerComponent(
  "DetalhesProduto",
  () => (props) =>
    (
      <Provider store={store}>
        <ProdutoDetalheScreen {...props} />
      </Provider>
    ),
  () => ProdutoDetalheScreen
);
Navigation.registerComponent(
  "Cadastro",
  () => (props) =>
    (
      <Provider store={store}>
        <CadastroScreen {...props} />
      </Provider>
    ),
  () => CadastroScreen
);

const loginRoot = {
  root: {
    component: {
      name: "Login",
    },
  },
};

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: "#4d089a",
  },
  topBar: {
    title: {
      color: "white",
    },
    backButton: {
      color: "white",
    },
    background: {
      color: "#4d089a",
    },
  },
  bottomTab: {
    fontSize: 14,
    selectedFontSize: 14,
  },
});
Navigation.events().registerAppLaunchedListener(async () => {
  await Navigation.setRoot(loginRoot);
});

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
  },
});

export const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
});
