import { FC } from "react";
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RNBootSplash from "react-native-bootsplash";

import { Home, ImageEditor, ImageEditorBugFix, NMdemo } from "../screens";

export type AppStackParamList = {
  Home: undefined;
  ImageEditorBugFix: { imageUri: string };
  ImageEditor: { imageUri: string };
  NMdemo: undefined;

  //   Home: undefined;
  //   Profile: { userId: string };
  //   Feed: { sort: 'latest' | 'top' } | undefined;
};

// const Stack = createStackNavigator<AppStackParamList>();
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
  const handleHideSplash = () => {
    RNBootSplash.hide({ fade: true });
  };

  return (
    <NavigationContainer theme={CUSTOM_THEME} onReady={handleHideSplash}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ImageEditorBugFix" component={ImageEditorBugFix} />
        <Stack.Screen name="ImageEditor" component={ImageEditor} />
        <Stack.Screen name="NMdemo" component={NMdemo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
