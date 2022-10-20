import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistrationScreen";
import Home from "../Home";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../../redux/authOperations";

const AuthStack = createNativeStackNavigator();

export default function AuthScreen() {
  const { state } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [state]);

  // const [fontsLoaded] = useFonts({
  //   "Roboto-Bold": require("../../assets/fonts/Roboto/Roboto-Bold.ttf"),
  //   "Roboto-Medium": require("../../assets/fonts/Roboto/Roboto-Medium.ttf"),
  //   "Roboto-Regular": require("../../assets/fonts/Roboto/Roboto-Regular.ttf"),
  // });
  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }
  return (
    <AuthStack.Navigator>
      <>
        {!state ? (
          <>
            <AuthStack.Screen
              name="auth"
              component={RegistrationScreen}
              options={{
                headerShown: false,
              }}
            />
            <AuthStack.Screen
              name="login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <AuthStack.Screen
            name="home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
        )}
      </>
    </AuthStack.Navigator>
  );
}
