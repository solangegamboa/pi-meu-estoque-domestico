import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { collection, deleteDoc, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getClient, selectClient } from "./clientsSlice";
import { useSelector } from "react-redux";
import { act } from "react-test-renderer";

const firebaseConfig = {
  apiKey: "AIzaSyAzgE4fqm5YZqnCPO7f9WXsJlun_bwB14Y",
  authDomain: "meuestoquedomestico.firebaseapp.com",
  projectId: "meuestoquedomestico",
  storageBucket: "meuestoquedomestico.appspot.com",
  messagingSenderId: "884530013813",
  appId: "1:884530013813:ios:574e6ccdc4008971a5fa3c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

type ProductState = {
  products: ProductType[];
};

const initialState: ProductState = {
  products: [],
};

export interface ProductType {
  id: number;
  nome: string;
  categoria: string;
  marca: string;
  quantidade: string;
  data_compra: string;
  data_validade: string;
  foto: string;
  favorito: boolean;
  uid: string;
}

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProductsOnline: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<ProductType>) => {
      state.products.push(action.payload);
      var produtoRef = doc(
        collection(db, "users", action.payload.uid),
        `produtos/${action.payload.id}`
      );
      setDoc(produtoRef, {
        nome: action.payload.nome,
        categoria: action.payload.categoria,
        marca: action.payload.marca,
        quantidade: action.payload.quantidade,
        data_compra: action.payload.data_compra,
        data_validade: action.payload.data_validade,
        foto: "",
        favorito: false,
      });
    },
    incrementQty: (state, action: PayloadAction<number>) => {
      state.products = state.products.map((prod) => {
        if (
          prod.id === action.payload &&
          (parseInt(prod.quantidade) > 0).toString()
        ) {
          updateDoc(doc(db, "user", "produtos"), {
            quantidade: parseInt(prod.quantidade) + 1,
          });
          return {
            ...prod,
            quantidade: (parseInt(prod.quantidade) + 1).toString(),
          };
        }

        return prod;
      });
    },
    decrementQty: (state, action: PayloadAction<number>) => {
      state.products = state.products.map((prod) => {
        if (
          prod.id === action.payload &&
          (parseInt(prod.quantidade) > 0).toString()
        ) {
          updateDoc(doc(db, "produto", action.payload.toString()), {
            quantidade: parseInt(prod.quantidade) - 1,
          });
          return {
            ...prod,
            quantidade: (parseInt(prod.quantidade) - 1).toString(),
          };
        }

        return prod;
      });
    },
    toogleFavorito: (state, action: PayloadAction<number>) => {
      state.products = state.products.map((prod) => {
        if (prod.id === action.payload) {
          updateDoc(doc(db, "produto", action.payload.toString()), {
            favorito: !prod.favorito,
          });
          return { ...prod, favorito: !prod.favorito };
        }
        return prod;
      });
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((prod) => {
        const cond = prod.id !== action.payload;
        if (cond) deleteDoc(doc(db, "produto", action.payload.toString()));
        return cond;
      });
    },
  },
});

export const {
  addProduct,
  incrementQty,
  decrementQty,
  toogleFavorito,
  removeProduct,
  setProductsOnline,
} = productSlice.actions;

export default productSlice.reducer;

export const selectProductList = (state: RootState) => state.productSlice;

export const selectNextId = (state: RootState) => {
  return state.productSlice.products.length > 1
    ? state.productSlice.products[state.productSlice.products.length - 1].id + 1
    : 1;
};
