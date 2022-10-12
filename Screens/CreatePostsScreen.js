import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>CreatePostsScreen!</Text>
      </View>

      <View style={styles.footer}>
        <AntDesign name="delete" size={24} color="#BDBDBD" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",

    width: "100%",
    height: "100%",
  },
  footer: { height: 83, alignItems: "center", justifyContent: "center" },
});

export default CreatePostsScreen;
