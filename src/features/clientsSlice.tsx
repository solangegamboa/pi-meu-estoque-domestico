import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { storage } from "../App";

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
export const produtoRef = collection(db, "produto");

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
