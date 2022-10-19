import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { StyleSheet, View } from "react-native";
import AuthScreen from "./Screens/AuthScreen/AuthScreen";
import { store } from "./redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
          "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  return (
    // <View style={styles.container} onLayout={onLayoutRootView}>
    <>
      {isReady && (
        <Provider store={store}>
          <NavigationContainer>
            <AuthScreen />
          </NavigationContainer>
        </Provider>
      )}
    </>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    width: "100%",
    justifyContent: "center",
  },
});
