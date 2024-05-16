import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { storage } from "../App";
import { initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import * as firebaseAuth from 'firebase/auth';
import { app } from "../config";

const getReactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

type ClientState = {
  email: string | null;
  uid: string;
};

const initialState: ClientState = {
  email: "",
  uid: "",
};

const clientSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ClientState>) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      storage.save({ key: "loginState", data: action.payload });
    },
    getClient: (state) => {
      storage
        .load({
          key: "loginState",

          // autoSync (default: true) means if data is not found or has expired,
          // then invoke the corresponding sync method
          autoSync: true,

          // syncInBackground (default: true) means if data expired,
          // return the outdated data first while invoking the sync method.
          // If syncInBackground is set to false, and there is expired data,
          // it will wait for the new data and return only after the sync completed.
          // (This, of course, is slower)
          syncInBackground: true,

          // you can pass extra params to the sync method
          // see sync example below
          syncParams: {
            extraFetchOptions: {
              // blahblah
            },
            someFlag: true,
          },
        })
        .then((ret) => {
          // found data go to then()
          state = ret;
        })
        .catch((err) => {
          // any exception including data not found
          // goes to catch()
          console.warn(err.message);
          switch (err.name) {
            case "NotFoundError":
              // TODO
              break;
            case "ExpiredError":
              // TODO
              break;
          }
        });
    },
  },
});

export const { login, getClient } = clientSlice.actions;

export default clientSlice.reducer;

export const selectClient = (state: RootState) => state.clientsSlice;
