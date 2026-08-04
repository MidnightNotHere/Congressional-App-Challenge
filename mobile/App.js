import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "./src/components/Icon";
import { colors } from "./src/theme";
import { LanguageProvider, useLanguage } from "./src/i18n/LanguageContext";
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

const TAB_LABELS = {
  Story: { en: "Colorado", es: "Colorado" },
  Assessment: { en: "Readiness", es: "Preparación" },
  Reps: { en: "Policy", es: "Política" },
  Youth: { en: "Youth", es: "Juventud" },
  About: { en: "About", es: "Acerca de" },
};

function AppNavigator() {
  const { t } = useLanguage();
  return (
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
          tabBarLabel: t(TAB_LABELS[route.name]),
          tabBarIcon: ({ color, size }) => (
            <Icon name={TAB_ICON[route.name]} color={color} size={size ?? 22} strokeWidth={2.2} />
          ),
        })}
      >
        <Tab.Screen name="Story" component={StoryScreen} />
        <Tab.Screen name="Assessment" component={AssessmentScreen} />
        <Tab.Screen name="Reps" component={RepsScreen} />
        <Tab.Screen name="Youth" component={YouthScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
