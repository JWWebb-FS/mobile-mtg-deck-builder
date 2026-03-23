import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import AddDeckScreen from "./screens/AddDeckScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#1a1a1a" },
          headerTintColor: "#d4af37", // Gold MTG accents
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "DECK VAULT" }}
        />
        <Stack.Screen
          name="AddDeck"
          component={AddDeckScreen}
          options={{ title: "NEW DECK" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
