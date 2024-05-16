import { configureStore } from "@reduxjs/toolkit";
import productSliceReducer from "./features/productSlice";
import clientsSliceRecuder from "./features/clientsSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import clientsSlice from "./features/clientsSlice";
import { initializeApp } from "firebase/app";

export const store = configureStore({
  reducer: {
    productSlice: productSliceReducer,
    clientsSlice: clientsSliceRecuder,
  },
});

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
app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
