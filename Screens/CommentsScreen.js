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
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

function CommentsScreen({ route }) {
  // const [post, setPost] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { photo, id } = route.params;
  const [isShownKeybord, setIsShownKeybord] = useState(false);
  const isFocused = useIsFocused();

  const { userId, login, avatar } = useSelector((state) => state.auth);

  const getAllComments = async () => {
    const querySnapshot = await getDocs(
      collection(db, "posts", `${id}`, "comments")
    );
    let allComments = [];
    querySnapshot.forEach((doc) => {
      allComments.push({ ...doc.data(), id: doc.id });
    });
    setComments(allComments);
  };

  useEffect(() => {
    if (!route.params) {
      return;
    }
    getAllComments();
    // setPost(route.params);
  }, [route.params]);

  const addComment = async () => {
    Keyboard.dismiss();
    if (comment.trim().length === 0) {
      onKeyboradHide();
      return;
    }
    try {
      const date = new Date().toLocaleString();
      await addDoc(collection(db, "posts", `${id}`, "comments"), {
        comment,
        login,
        userId,
        date,
        avatar,
      });
      await updateDoc(doc(db, "posts", `${id}`), {
        comments: increment(1),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setComment("");
  };

  // console.log("photo", route.params.photo);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View
          style={{
            marginTop: 32,
            flex: 1,
            marginBottom: 11,
            zIndex: 1,
          }}
        >
          <Image
            source={{ uri: photo }}
            style={{
              height: 240,
              borderRadius: 8,
              width: "100%",
            }}
          ></Image>
        </View>
        <View
          style={{
            height: 400,
          }}
        >
          <FlatList
            style={{ marginBottom: 10 }}
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  ...styles.commentBox,
                  flexDirection: item.userId === userId ? "row" : "row-reverse",
                }}
                onStartShouldSetResponder={() => true}
              >
                <View
                  style={{
                    ...styles.comment,
                    borderTopRightRadius: item.userId === userId ? 0 : 6,
                    borderTopLeftRadius: item.userId === userId ? 6 : 0,
                  }}
                >
                  <Text style={styles.text}>{item?.comment}</Text>
                  <Text style={styles.textDate}>{item?.date}</Text>
                </View>
                <Image
                  source={{ uri: item.avatar }}
                  style={{
                    ...styles.avatar,
                    marginLeft: item.userId === userId ? 16 : 0,
                    marginRight: item.userId === userId ? 0 : 16,
                  }}
                ></Image>
              </View>
            )}
          ></FlatList>
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
}
// export default CommentsScreen;

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
  commentBox: {
    flexDirection: "row",

    marginBottom: 10,
    minHeight: 30,
  },
  comment: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    width: "85%",
    // height: 400,
    // flex: 1,
    padding: 16,
  },
  avatar: {
    height: 28,
    width: 28,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 28,
  },
  text: {
    color: "#212121",

    padding: 6,
  },
  textDate: {
    textAlign: "right",
    color: "#BDBDBD",
    fontSize: 11,
    paddingRight: 6,
  },
});

export default CommentsScreen;
