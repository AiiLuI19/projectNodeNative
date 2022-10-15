import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
const CommentsScreen = ({ route }) => {
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState("");
  // const { photo } = route.params;
  useEffect(() => {
    if (!route.params) {
      return;
    }
    setPost(route.params);
  }, [route.params]);
  const addComment = async () => {
    console.log("comment", comment);
  };
  console.log("post", post);
  // console.log("photo", route.params.photo);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View
          style={{
            marginTop: 32,
            flex: 1,
          }}
        >
          <Image
            source={{
              uri: post.photo,
            }}
            style={{ height: 240, borderRadius: 8, width: "100%" }}
          ></Image>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" && "position"}
          keyboardVerticalOffset={150}
        >
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Add comment..."
              placeholderTextColor="#BDBDBD"
              // onFocus={() => setIsShownKeybord(true)}
              onChangeText={setComment}
              value={comment}
            ></TextInput>
            <TouchableOpacity style={styles.button} onPress={addComment}>
              <AntDesign name="arrowup" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  inputWrapper: {
    width: "100%",
  },
  input: {
    width: "100%",
    height: 50,
    padding: 15,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 20,
    color: "#212121",
    textAlign: "start",
  },

  button: {
    position: "absolute",
    right: 10,
    top: 10,
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentsScreen;
