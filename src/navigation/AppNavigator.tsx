import { FC } from "react";
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home, ImageEditor, NMdemo } from "../screens";

export type AppStackParamList = {
  Home: undefined;
  ImageEditor: { imageUri: string };
  NMdemo: undefined;

  //   Home: undefined;
  //   Profile: { userId: string };
  //   Feed: { sort: 'latest' | 'top' } | undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

interface Props {}

const CUSTOM_THEME: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

const AppNavigator: FC<Props> = (): JSX.Element => {
  return (
    <NavigationContainer theme={CUSTOM_THEME}>
      <Stack.Navigator
        initialRouteName="NMdemo"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ImageEditor" component={ImageEditor} />
        <Stack.Screen name="NMdemo" component={NMdemo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
