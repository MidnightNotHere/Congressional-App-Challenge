import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "./src/components/Icon";
import { colors } from "./src/theme";
import { LanguageProvider } from "./src/i18n/LanguageContext";
import StoryScreen from "./src/screens/StoryScreen";
import AssessmentScreen from "./src/screens/AssessmentScreen";
import RepsScreen from "./src/screens/RepsScreen";
import YouthScreen from "./src/screens/YouthScreen";
import AboutScreen from "./src/screens/AboutScreen";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Story: "Compass",
  Assessment: "ShieldCheck",
  Reps: "Landmark",
  Youth: "GraduationCap",
  About: "Info",
};

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarStyle: {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
              height: 62,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarLabelStyle: { fontSize: 11, fontWeight: "700" },
            tabBarIcon: ({ color, size }) => (
              <Icon name={TAB_ICON[route.name]} color={color} size={size ?? 22} strokeWidth={2.2} />
            ),
          })}
        >
          <Tab.Screen name="Story" component={StoryScreen} options={{ tabBarLabel: "Colorado" }} />
          <Tab.Screen
            name="Assessment"
            component={AssessmentScreen}
            options={{ tabBarLabel: "Readiness" }}
          />
          <Tab.Screen name="Reps" component={RepsScreen} options={{ tabBarLabel: "Policy" }} />
          <Tab.Screen name="Youth" component={YouthScreen} options={{ tabBarLabel: "Youth" }} />
          <Tab.Screen name="About" component={AboutScreen} options={{ tabBarLabel: "About" }} />
        </Tab.Navigator>
      </NavigationContainer>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
