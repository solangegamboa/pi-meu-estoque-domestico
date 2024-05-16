import React, { useEffect } from "react";
import { View, Button } from "react-native";

import { utils } from "@react-native-firebase/app";
import storage from "@react-native-firebase/storage";
import { getStorage } from "firebase/storage";
import { getApp} from "firebase/app";

export const UploadFile = () => {
  const firebaseApp = getApp();
  const storage = getStorage(firebaseApp, "gs://my-custom-bucket");

  return (
    <View>
      <Button
        title="Envie a imagem do produto"
        onPress={async () => {
          // path to existing file on filesystem
          const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
          // uploads file
          await reference.putFile(pathToFile);
        }}
      />
    </View>
  );
};
