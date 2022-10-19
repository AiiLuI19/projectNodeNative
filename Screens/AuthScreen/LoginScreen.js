import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { authSignInUser } from "../../redux/authOperations";
import { useDispatch } from "react-redux";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();

  // const emailHandler = (text) => setEmail(text);
  // const passwordHandler = (text) => setPassword(text);

  const passwordShow = () => {
    if (show) {
      return setShow(false);
    }
    return setShow(true);
  };

  const onLogin = async () => {
    await dispatch(authSignInUser({ email, password }));
    setEmail("");
    setPassword("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View>
          <ImageBackground
            source={{ uri: "https://i.postimg.cc/VvT6BKMH/Photo-BG.jpg" }}
            style={{ width: "100%", height: "100%" }}
          ></ImageBackground>
        </View>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <Text style={styles.title}>Войти</Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Адрес электронной почты"
              style={styles.input}
            />
            <View style={styles.wrap}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Пароль"
                secureTextEntry={show}
                style={styles.input}
              />
              <Text onPress={passwordShow} style={styles.textShow}>
                {show ? "Показать" : "Скрыть"}
              </Text>
            </View>
            <TouchableOpacity
              title="Go to Home"
              onPress={onLogin}
              style={styles.button}
            >
              <Text style={styles.textBtn}>Войти</Text>
            </TouchableOpacity>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate("auth")}
            >
              Нет аккаунта? Зарегистрироваться
            </Text>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    paddingLeft: 16,
    paddingRight: 16,

    backgroundColor: "#fff",
    width: "100 %",
    justifyContent: "flex-end",
    paddingBottom: 30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  input: {
    width: "100%",
    height: 50,
    padding: 16,

    marginBottom: 16,
    background: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
  title: {
    marginTop: 32,
    marginBottom: 33,

    color: "#212121",
    textAlign: "center",
    fontSize: 30,

    fontFamily: "Roboto-Medium",
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
    paddingBottom: 144,
  },
});
