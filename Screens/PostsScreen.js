import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  getDocs,
  getDoc,
  arrayUnion,
  arrayRemove,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { pathSlice } from "../redux/pathReducer";
import { db } from "../firebase/config";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const PostsScreen = ({ navigation, route }) => {
  const [post, setPost] = useState([]);
  const { email, login, avatar, userId } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    let newPosts = [];
    querySnapshot.forEach((doc) => {
      newPosts.push({ ...doc.data(), id: doc.id });
    });
    setPosts(newPosts);
  };

  const addLike = async (id) => {
    const result = await getDoc(doc(db, "posts", `${id}`));
    if (result.data().likes.includes(`${userId}`)) {
      await updateDoc(doc(db, "posts", `${id}`), {
        likes: arrayRemove(`${userId}`),
      });
    } else {
      await updateDoc(doc(db, "posts", `${id}`), {
        likes: arrayUnion(`${userId}`),
      });
    }
  };

  // const bd = {
  //   email: "iuliia@mail.ua",
  //   login: "iuliia",
  //   avatar:
  //     "https://i.postimg.cc/0NS3hM9s/158715-milye-koshki-kot-kotenok-privlekatelnost-pes-3840x2160.jpg",
  //   userId: 1,
  // };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"),
      (snapshot) => {
        getAllPosts();
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"),
      (snapshot) => {
        getAllPosts();
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          marginHorizontal: 16,
          marginTop: 32,
          marginBottom: 70,
        }}
      >
        <TouchableOpacity
          style={styles.userBox}
          onPress={() => navigation.navigate("profile")}
        >
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              style={{
                height: 60,
                width: 60,
                borderRadius: 16,
              }}
            ></Image>
          ) : (
            <View
              style={{
                height: 60,
                width: 60,
                borderRadius: 16,
                backgroundColor: "#515151",
              }}
            ></View>
          )}
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.textName}>{login}</Text>
            <Text style={styles.textEmail}>{email}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.postBox}>
          <FlatList
            data={post}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <View>
                  <Image
                    source={{ uri: item.photoPath }}
                    style={{ height: 240, borderRadius: 16 }}
                  ></Image>
                  <View style={{ marginTop: 8 }}>
                    <Text style={styles.textPost}>{item.text}</Text>
                  </View>
                  <View style={styles.postInfoBox}>
                    <View style={styles.comentsInfo}>
                      <TouchableOpacity
                        onPress={async () => {
                          navigation.navigate("comments", {
                            photo: item.photoPath,
                          });
                        }}
                      >
                        <FontAwesome
                          name="comments-o"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                      <Text style={styles.textPost}> {0}</Text>
                    </View>

                    <TouchableOpacity
                      style={styles.locationInfo}
                      onPress={() => {
                        navigation.navigate("map", {
                          location: item.locationPhoto,
                        });
                      }}
                    >
                      <FontAwesome5
                        name="map-marker-alt"
                        size={24}
                        color="#212121"
                        style={styles.mapIcon}
                      />
                      <Text style={styles.textLocation}>{item.textMap}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    color: "#212121",
  },
  scrollView: {
    marginHorizontal: 0,
  },
  userBox: {
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  textName: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 20,
  },
  textEmail: {
    color: "#515151",

    fontSize: 11,
  },
  textPost: {
    fontSize: 16,
  },
  textLocation: {
    marginLeft: 8,

    fontSize: 16,
    textDecorationLine: "underline",
  },
  mapIcon: {
    fontSize: 18,
  },
  postBox: {
    marginBottom: 34,
  },
  postInfoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 11,
  },
  comentsInfo: {
    flexDirection: "row",
  },
  locationInfo: {
    flexDirection: "row",
  },
});

export default PostsScreen;
