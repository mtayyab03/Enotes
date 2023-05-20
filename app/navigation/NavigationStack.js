import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

//screens
import Home from "../screens/Home";
import AddNote from "../screens/AddNote";
import EditNote from "../screens/EditNote";

const Stack = createStackNavigator();

export default function NavigationStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerMode: "false" }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddNote" component={AddNote} />
      <Stack.Screen name="EditNote" component={EditNote} />
    </Stack.Navigator>
  );
}
