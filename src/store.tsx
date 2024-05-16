import { configureStore } from "@reduxjs/toolkit";
import productSliceReducer from "./features/productSlice";
import clientsSliceRecuder from "./features/clientsSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    productSlice: productSliceReducer,
    clientsSlice: clientsSliceRecuder,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
