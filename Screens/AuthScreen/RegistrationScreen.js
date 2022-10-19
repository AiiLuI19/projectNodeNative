import React, { useState, useEffect } from "react";
import { storage } from "../../firebase/config";
import { authSlice } from "../../redux/authReducer";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { authSignUpUser, updateAvatar } from "../../redux/authOperations";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

export default function RegistrationScreen({ navigation }) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const [focusLogin, setFocusLogin] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [isShownKeybord, setIsShownKeybord] = useState(false);

  const dispatch = useDispatch();

  const customStyleLogin = focusLogin ? styles.borderInputFocus : styles.input;
  const customStyleEmail = focusEmail ? styles.borderInputFocus : styles.input;
  const customStylePassword = focusPassword
    ? styles.borderInputFocus
    : styles.input;

  const uploadePhotoToServer = async (avatarId) => {
    try {
      const response = await fetch(avatar);
      const file = await response.blob();
      const storageRef = ref(storage, `avatars/${avatarId}`);
      await uploadBytes(storageRef, file);
      const path = await getDownloadURL(ref(storage, `avatars/${avatarId}`));
      setAvatar(path);
    } catch (error) {
      console.log(error);
    }
  };

  const onRegistr = async () => {
    try {
      const updatedUser = await authSignUpUser({
        email,
        password,
        login,
      });
      await uploadePhotoToServer(updatedUser.uid);
      dispatch(updateAvatar(avatar));
      dispatch(
        authSlice.actions.updateProfile({
          userId: updatedUser.uid,
          login: updatedUser.displayName,
          email: updatedUser.email,
        })
      );

      setEmail("");
      setPassword("");
      setLogin("");
    } catch (error) {
      console.log(error);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: "https://i.postimg.cc/VvT6BKMH/Photo-BG.jpg" }}
          style={{ width: "100%", height: "100%", justifyContent: "flex-end" }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" && "position"}
            keyboardVerticalOffset={-98}
          >
            <View
              style={{
                ...styles.formBackdrop,
                height: 400,
              }}
            >
              <View style={styles.avatar}>
                <Image
                  style={{ height: "100%", width: "100%", borderRadius: 16 }}
                  source={{ uri: avatar }}
                />
                <TouchableOpacity
                  style={styles.plus}
                  onPress={pickImage}
                  // onPress={() => Alert.alert("add avatar")}
                  disabled="false"
                >
                  <Text style={styles.plusText}>&#43;</Text>
                  <View
                    color="#FF6C00"
                    fontSize="25px"
                    style={styles.plusText}
                  ></View>
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Регистрaция</Text>
              <TextInput
                onFocus={() => setFocusLogin(true)}
                onBlur={() => setFocusLogin(false)}
                value={login}
                onChangeText={setLogin}
                // onFocus={() => setIsShownKeybord(true)}
                placeholder="Логин"
                style={customStyleLogin}
              />
              <TextInput
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
                value={email}
                // onChangeText={setEmail}
                // onFocus={() => setIsShownKeybord(true)}
                onChangeText={setEmail}
                placeholder="Адрес электронной почты"
                style={customStyleEmail}
              />
              <View style={styles.wrap}>
                <TextInput
                  onFocus={() => setFocusPassword(true)}
                  onBlur={() => setFocusPassword(false)}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Пароль"
                  secureTextEntry={show}
                  style={customStylePassword}
                />

                <Text
                  onPress={() => {
                    if (show) {
                      return setShow(false);
                    }
                    return setShow(true);
                  }}
                  style={styles.textShow}
                >
                  {show ? "Показать" : "Скрыть"}
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.wrapBottom}>
            <TouchableOpacity
              title="Go to Home"
              onPress={onRegistr}
              style={{
                ...styles.button,
              }}
            >
              <Text style={styles.textBtn}>Зарегестрироваться</Text>
            </TouchableOpacity>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate("login")}
            >
              Уже есть аккаунт? Войти
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // position: "absolute",
    // bottom: 65,
    // left: -108,
    // paddingLeft: 16,
    // paddingRight: 16,
    // alignItems: "center",
    // flex: 1,
    // width: "104%",
    // paddingBottom: 27,
    // backgroundColor: "#fff",

    // justifyContent: "center",

    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
  },
  formBackdrop: {
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 190,
  },
  wrapBottom: {
    position: "absolute",
    bottom: 0,

    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    width: "100 %",
    justifyContent: "center",
    paddingTop: 43,

    paddingBottom: 30,

    height: 195,
  },

  input: {
    width: "100%",
    height: 50,
    padding: 16,

    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },

  borderInputFocus: {
    width: "100%",
    height: 50,
    padding: 16,

    marginBottom: 16,
    background: "#fff",
    borderRadius: 8,

    borderWidth: 1,
    borderColor: "#FF6C00",
  },
  title: {
    marginTop: 92,
    marginBottom: 33,
    paddingVertical: 8,

    color: "#212121",
    textAlign: "center",
    fontSize: 30,
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 43,
    marginBottom: 16,

    width: "100%",
    height: 51,
    alignItems: "center",
    justifyContent: "center",
  },
  textBtn: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  textShow: {
    color: "#000",
    position: "absolute",
    top: 16,
    right: 16,

    fontSize: 16,
    color: "#1B4371",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: "#1B4371",
    paddingBottom: 66,
  },
  avatar: {
    position: "absolute",
    top: -60,
    left: 140,
    marginLeft: "auto",
    marginRight: "auto",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  plus: {
    position: "absolute",
    bottom: 14,
    right: -14,
    width: 25,
    height: 25,
    fontSize: 28,
    color: "#FF6C00",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: "50%",
  },
  plusText: {
    position: "absolute",
    color: "#FF6C00",
    fontSize: 28,
    textAlign: "center",
    bottom: -3,
    right: 2,
  },
  wrap: {
    width: "100%",
  },
});
