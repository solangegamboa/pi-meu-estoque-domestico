import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type ProductState = {
  products: ProductType[];
};

const initialState: ProductState = {
  products: []
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
}

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductType>) => {
      state.products.push(action.payload);
    },
    incrementQty: (state, action: PayloadAction<number>) => {
      state.products = state.products.map(prod =>
        prod.id === action.payload
          ? { ...prod, quantidade: (parseInt(prod.quantidade) + 1).toString() }
          : prod
      );
    },
    decrementQty: (state, action: PayloadAction<number>) => {
      state.products = state.products.map(prod =>
        prod.id === action.payload && (parseInt(prod.quantidade) > 0).toString()
          ? { ...prod, quantidade: (parseInt(prod.quantidade) - 1).toString() }
          : prod
      );
    },
    toogleFavorito: (state, action: PayloadAction<number>) => {
      state.products = state.products.map(prod =>
        prod.id === action.payload ? { ...prod, favorito: !prod.favorito } : prod
      );
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(prod => prod.id !== action.payload);
    }
  }
});

export const { addProduct, incrementQty, decrementQty, toogleFavorito, removeProduct } =
  productSlice.actions;

export default productSlice.reducer;

export const selectProductList = (state: RootState) => state.productSlice;

export const selectNextId = (state: RootState) =>
  state.productSlice.products.length + 1;
