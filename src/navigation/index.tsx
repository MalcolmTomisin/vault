/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";

import InventoryScreen from "../screens/InventoryScreen";
import AddItemScreen from "../screens/AddItemScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "./types";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";
import { Title } from "../components/Title";

export default function Navigation() {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
const NotFound = () => <Text>Not found</Text>;
const FallbackScreen = ({ route }: RootTabScreenProps<"Inventory">) => {
  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <Title>{route?.name}</Title>
    </View>
  );
};

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFound}
        options={{ title: "Oops!" }}
      />
      <Stack.Group
        screenOptions={{ presentation: "modal", headerShown: false }}
      >
        <Stack.Screen name="AddItem" component={AddItemScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();
const tabBarLabelStyle = { fontFamily: fonts.regular, fontSize: 10 };
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Inventory"
      screenOptions={{
        tabBarActiveTintColor: colors.mainBlue,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={FallbackScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Insurance"
        component={FallbackScreen}
        options={({ navigation }: RootTabScreenProps<"Insurance">) => ({
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="umbrella" color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={({ navigation }: RootTabScreenProps<"Inventory">) => ({
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="albums" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("AddItem")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Ionicons
                name="add-circle"
                size={25}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Realty"
        component={FallbackScreen}
        options={({ navigation }: RootTabScreenProps<"Realty">) => ({
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Menu"
        component={FallbackScreen}
        options={({ navigation }: RootTabScreenProps<"Menu">) => ({
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="menu" color={color} />,
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
