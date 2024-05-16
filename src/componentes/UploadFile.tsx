import React, { useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { getApp } from "firebase/app";
import { launchImageLibrary } from "react-native-image-picker";

import { decode } from "base-64";
import { useDispatch } from "react-redux";
import { setFoto } from "../features/productSlice";

if (typeof atob === "undefined") {
  global.atob = decode;
}

export const UploadFile = () => {
  const firebaseApp = getApp();
  const dispatch = useDispatch();
  const storage = getStorage(
    firebaseApp,
    "gs://meuestoquedomestico.appspot.com"
  );

  const [message, setMessage] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const pickFromFile = async () => {
    try {
      console.log("enter");
      const { assets, didCancel, errorMessage } = await launchImageLibrary({
        mediaType: "photo",
        includeBase64: true,
      });

      if (didCancel) return;

      if (!assets || !assets[0]) {
        throw new Error(errorMessage);
      }

      const asset = assets[0];
      const formattedFile = formatFileImagePicker(asset);

      if (formattedFile?.uri) {
        const response = await fetch(formattedFile.uri);
        const blobFile = await response.blob();
        const reference = ref(storage, "produtos/" + formattedFile.name);
        const uploadTask = uploadBytesResumable(reference, blobFile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setMessage("Upload is " + progress.toFixed(2) + "% done");
            setProgress(progress);
          },
          (error) => {
            setMessage("Error: " + error.message);
            dispatch(setFoto(""));
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              dispatch(setFoto(downloadURL));
            });
          }
        );
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <View>
      {progress > 0 && progress < 100 && (
        <View>
          <Text style={styles.text}>{message}</Text>
        </View>
      )}
      {progress <= 0 && (
        <Button
          title="Escolha uma imagem"
          onPress={() => pickFromFile()}
        />
      )}

      {progress == 100 && (
        <View>
          <Text style={styles.text}>Envio Concluído</Text>
          <Button
            title="Apagar foto"
            onPress={() => {
              dispatch(setFoto(""));
              setProgress(0);
            }}
          />
        </View>
      )}

      {/* <Button
        title="Capture a imagem com a camera"
        onPress={() => submitData}
      /> */}
    </View>
  );
};

export interface Asset {
  base64?: string;
  uri?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  type?: string;
  fileName?: string;
  duration?: number;
  bitrate?: number;
  timestamp?: string;
  id?: string;
}
export interface FilePickerValue {
  id?: string;
  name: string;
  type: string;
  size: number | null;
  base64: string;
  uri: string;
}

export const formatFileImagePicker = (file: Asset): FilePickerValue | null => {
  if (!file.fileName || !file.fileSize || !file.base64 || !file.uri) {
    return null;
  }

  return {
    name: file.fileName,
    type: file.fileName
      .substring(file.fileName.lastIndexOf(".") + 1)
      .toLowerCase(),
    size: file.fileSize,
    base64: file.base64,
    uri: file.uri,
  };
};

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    color: "#444444",
    textAlign: "center",
  },
});
