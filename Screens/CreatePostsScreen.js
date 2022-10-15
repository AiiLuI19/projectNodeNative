import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";

function CreatePostsScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoPath, setPhotoPath] = useState("");
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [text, onChangeText] = React.useState("");
  const [textMap, onChangeTextMap] = React.useState("");

  const [locationPhoto, setLocationPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      await Camera.getCameraPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const reset = () => {
    onChangeText("");
    onChangeTextMap("");
    setPhotoPath("");
  };

  const takePhoto = async () => {
    try {
      const photo = await cameraRef.takePictureAsync();
      setPhotoPath(photo.uri);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocationPhoto(coords);
      console.log("location>>>>>", location);
      console.log("locationPhoto", locationPhoto);
    } catch (err) {
      console.log(err.message);
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      reset();
      setLoading(false);
      navigation.navigate("posts", { text, textMap, locationPhoto, photoPath });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",

          borderSize: 1,
          borderRadius: 8,
          borderColor: "#BDBDBD",
        }}
      >
        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          <View style={styles.photoView}>
            <TouchableOpacity
              style={{
                ...styles.button,
                display: photoPath ? "none" : "flex",
              }}
              onPress={takePhoto}
            >
              <MaterialIcons
                name="photo-camera"
                size={20}
                style={styles.takePhotoOut}
              />
            </TouchableOpacity>
          </View>
          {photoPath && (
            <View style={styles.sampleImg}>
              <Image
                source={{ uri: photoPath }}
                style={styles.sampleImg}
              ></Image>
              <View
                style={{
                  zIndex: 5,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: 50,
                  height: 60,
                  width: 60,
                  position: "absolute",
                  left: "42%",
                  top: 110,
                }}
              >
                <MaterialIcons
                  name="photo-camera"
                  size={20}
                  style={{
                    fontSize: 20,
                    margin: 20,
                    color: "#fff",
                  }}
                />
              </View>
            </View>
          )}
        </Camera>
      </View>
      {photoPath ? (
        <Text style={styles.textInPhoto} onPress={() => console.log("ok")}>
          Редактировать фото
        </Text>
      ) : (
        <TouchableOpacity onPress={() => uploadPhoto()}>
          <Text style={styles.textInPhoto} onPress={() => console.log("ok")}>
            Загрузите фото
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.textMap}>
        <TextInput
          style={styles.text}
          onChangeText={onChangeText}
          placeholder="Название..."
          value={text}
        />
      </View>

      <View style={styles.textMap}>
        <FontAwesome5
          name="map-marker-alt"
          size={24}
          color="#BDBDBD"
          style={styles.mapIcon}
        />

        <TextInput
          style={styles.textInMap}
          onChangeText={onChangeTextMap}
          placeholder="Местность..."
          value={textMap}
        />
      </View>

      <View style={styles.wrapBottom}>
        <TouchableOpacity
          title="Go to Posts"
          disabled={!(photoPath && text && textMap)}
          onPress={onSubmit}
          style={{
            ...styles.buttonReg,
            backgroundColor: !(photoPath && text && textMap)
              ? "#F6F6F6"
              : "#FF6C00",
            color: !(photoPath && text && textMap) ? "#BDBDBD" : "#FFFFFF",
          }}
        >
          <Text
            style={{
              ...styles.textBtn,

              color: !(photoPath && text && textMap) ? "#BDBDBD" : "#FFFFFF",
            }}
          >
            Опубликовать
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.footer} onPress={reset}>
        <AntDesign name="delete" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",

    width: "100%",
    height: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
  },
  textMap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 32,

    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  mapIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  textInMap: {
    color: "#212121",

    paddingBottom: 15,
    fontSize: 16,
  },
  text: {
    color: "#212121",
    paddingBottom: 15,
    fontSize: 16,
  },
  textInPhoto: {
    color: "#BDBDBD",
    paddingBottom: 48,
    paddingTop: 8,
    fontSize: 16,
  },
  sampleImg: {
    position: "absolute",
    left: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    zIndex: 1,
  },

  camera: {
    position: "relative",
    flex: 1,
    width: "100%",
    marginTop: 32,
  },
  photoView: {
    position: "relative",
    backgroundColor: "transparent",
  },

  flipContainer: {
    height: 240,
    width: "100%",
    alignSelf: "center",
  },

  button: {
    position: "absolute",
    left: "42%",
    top: 110,
    height: 60,
    width: 60,
    zIndex: 1,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,

    backgroundColor: "white",
  },

  takePhotoOut: {
    backgroundColor: "white",
    fontSize: 18,
    margin: 20,
    color: "#BDBDBD",
  },

  wrapBottom: {
    marginTop: 0,
    marginBottom: 120,
    marginLeft: 16,
    marginRight: 16,
  },
  buttonReg: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,

    width: "100%",
    height: 51,
    alignItems: "center",
    justifyContent: "center",
  },
  textBtn: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  footer: { height: 83, alignItems: "center", justifyContent: "center" },
});

export default CreatePostsScreen;
