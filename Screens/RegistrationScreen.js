import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function RegistrationScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const [focusLogin, setFocusLogin] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

  const customStyleLogin = focusLogin ? styles.borderInputFocus : styles.input;
  const customStyleEmail = focusEmail ? styles.borderInputFocus : styles.input;
  const customStylePassword = focusPassword
    ? styles.borderInputFocus
    : styles.input;

  const nameHandler = (text) => setName(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const passwordShow = () => {
    if (show) {
      return setShow(false);
    }
    return setShow(true);
  };

  const onRegistr = () => {
    console.log(name, email, password);
    Alert.alert("Credentials", `${name} + ${password}`);
  };

  return (
    <>
      <ImageBackground
        source={{ uri: "https://i.postimg.cc/VvT6BKMH/Photo-BG.jpg" }}
        style={{ width: "100%", height: "100%" }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={styles.container}
      >
        <View style={styles.container}>
          <View style={styles.avatar}>
            <View style={styles.plus}>
              <Text style={styles.plusText}>&#43;</Text>
              <Button
                onPress={() => Alert.alert("add avatar")}
                title="&#43;"
                color="#FF6C00"
                fontSize="25px"
                disabled="false"
              />
            </View>
          </View>
          <Text style={styles.title}>Регистрaция</Text>
          <TextInput
            onFocus={() => setFocusLogin(true)}
            onBlur={() => setFocusLogin(false)}
            value={name}
            onChangeText={nameHandler}
            placeholder="Логин"
            style={customStyleLogin}
          />
          <TextInput
            onFocus={() => setFocusEmail(true)}
            onBlur={() => setFocusEmail(false)}
            value={email}
            onChangeText={emailHandler}
            placeholder="Адрес электронной почты"
            style={customStyleEmail}
          />
          <View style={styles.wrap}>
            <TextInput
              onFocus={() => setFocusPassword(true)}
              onBlur={() => setFocusPassword(false)}
              value={password}
              onChangeText={passwordHandler}
              placeholder="Пароль"
              secureTextEntry={show}
              style={customStylePassword}
            />

            <Text onPress={passwordShow} style={styles.textShow}>
              Показать
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.wrapBottom}>
        <TouchableOpacity
          title="Go to Home"
          onPress={() => navigation.navigate("home")}
          style={styles.button}
        >
          <Text style={styles.textBtn}>Зарегестрироваться</Text>
        </TouchableOpacity>
        <Text style={styles.text} onPress={() => navigation.navigate("login")}>
          Уже есть аккаунт? Войти
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 65,
    left: -108,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    flex: 1,
    width: "104%",
    paddingBottom: 27,
    backgroundColor: "#fff",

    justifyContent: "center",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
    paddingBottom: 66,
  },
  avatar: {
    position: "absolute",
    top: -60,

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

    fontSize: 25,
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
