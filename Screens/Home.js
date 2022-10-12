// Home.js

import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign, Feather } from "@expo/vector-icons";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import CreatePostsScreen from "./CreatePostsScreen";

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
        },
      }}
    >
      <Tabs.Screen
        name="posts"
        component={PostsScreen}
        options={{
          title: "Публикации",

          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          tabBarIcon: ({ focused, color, size, style }) => {
            return focused ? (
              <AntDesign name="appstore-o" size={size} color="#FF6C00" />
            ) : (
              <AntDesign name="appstore-o" size={size} color={color} />
            );
          },
          headerRight: () => (
            <Feather
              name="log-out"
              size={24}
              color="rgba(33, 33, 33, 0.8)
"
              style={{ marginRight: 20 }}
              onPress={() => alert("This is a button!")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: "CreatePostsScreen",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused, color, size, style }) => {
            return (
              <View style={styles.button}>
                <AntDesign name="plus" size={size} color="#fff" />
              </View>
            );
          },

          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              style={{ marginLeft: 20 }}
              onPress={() => navigation.navigate("posts")}
              color="rgba(33, 33, 33, 0.8)
"
            />
          ),
        })}
      />

      <Tabs.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: "ProfileScreen",
          tabBarIcon: ({ focused, color, size, style }) => {
            return focused ? (
              <AntDesign name="user" size={size} color="#FF6C00" />
            ) : (
              <AntDesign name="user" size={size} color={color} />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF6C00",

    borderRadius: 20,
    height: 40,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 40,
  },
});
export default Home;
