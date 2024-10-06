import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import NameForm from "./name-form";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [userLoaded, setUserLoaded] = useState(false);
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  // useEffect(() => {
  //   async function loadUser() {
  //     if (await AsyncStorage.getItem("user_token")) {
  //       console.log("User is logged in");
  //     } else {
  //       const data = axios
  //         .post("http://10.1.185.75:5050/user", {})
  //         .then((response) => {
  //           console.log(response.data);
  //           AsyncStorage.setItem("user_token", response.data.user_id);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     }
  //   }
  //   loadUser();
  // });

  if (!loaded) {
    return null;
  }
  const handleSubmit = async (name: string) => {
    const data = axios
      .post("http://10.1.185.75:5050/user", {
        name: name,
      })
      .then((response) => {
        console.log(response.data);
        AsyncStorage.setItem("user_token", response.data.user_id);
        setUserLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {userLoaded ? (
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name='name-form' />
        )}
        <Stack.Screen name='+not-found' />
      </Stack>
    </ThemeProvider>
  );
}
