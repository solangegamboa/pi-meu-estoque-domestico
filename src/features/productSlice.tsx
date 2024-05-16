import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { collection, deleteDoc, updateDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config";

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

type SingleQty = {
  uid: string;
  id: number;
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProductsOnline: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<ProductType>) => {
      state.products.push(action.payload);
      setDoc(
        doc(
          collection(db, "users"),
          `${action.payload.uid}/produto/${action.payload.id}`
        ),
        action.payload
      );
    },
    incrementQty: (state, action: PayloadAction<SingleQty>) => {
      state.products = state.products.map((prod) => {
        if (
          prod.id === action.payload.id &&
          (parseInt(prod.quantidade) > 0).toString()
        ) {
          updateDoc(
            doc(
              collection(db, "users"),
              `${action.payload.uid}/produto/${action.payload.id}`
            ),
            {
              quantidade: parseInt(prod.quantidade) + 1,
            }
          );
          return {
            ...prod,
            quantidade: (parseInt(prod.quantidade) + 1).toString(),
          };
        }

        return prod;
      });
    },
    decrementQty: (state, action: PayloadAction<SingleQty>) => {
      state.products = state.products.map((prod) => {
        if (
          prod.id === action.payload.id &&
          (parseInt(prod.quantidade) > 0).toString()
        ) {
          console.log(`${action.payload.uid}/produto/${action.payload.id}`);
          updateDoc(
            doc(
              collection(db, "users"),
              `${action.payload.uid}/produto/${action.payload.id}`
            ),
            {
              quantidade: parseInt(prod.quantidade) - 1,
            }
          );
          return {
            ...prod,
            quantidade: (parseInt(prod.quantidade) - 1).toString(),
          };
        }

        return prod;
      });
    },
    toogleFavorito: (state, action: PayloadAction<SingleQty>) => {
      state.products = state.products.map((prod) => {
        if (prod.id === action.payload.id) {
          updateDoc(
            doc(
              collection(db, "users"),
              `${action.payload.uid}/produto/${action.payload.id}`
            ),
            {
              favorito: !prod.favorito,
            }
          );
          return { ...prod, favorito: !prod.favorito };
        }
        return prod;
      });
    },
    removeProduct: (state, action: PayloadAction<SingleQty>) => {
      state.products = state.products.filter((prod) => {
        const cond = prod.id !== action.payload.id;
        if (cond)
          deleteDoc(
            doc(
              collection(db, "users"),
              `${action.payload.uid}/produto/${action.payload.id}`
            )
          );
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
  return state.productSlice.products.length >= 1
    ? state.productSlice.products[state.productSlice.products.length - 1].id + 1
    : 1;
};
