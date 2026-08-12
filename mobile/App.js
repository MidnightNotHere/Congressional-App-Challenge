import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import {
  Unbounded_800ExtraBold,
  Unbounded_900Black,
} from "@expo-google-fonts/unbounded";
import {
  Archivo_500Medium,
  Archivo_700Bold,
  Archivo_800ExtraBold,
} from "@expo-google-fonts/archivo";
import {
  MartianMono_500Medium,
  MartianMono_700Bold,
} from "@expo-google-fonts/martian-mono";

import Icon from "./src/components/Icon";
import { colors, fonts } from "./src/theme";
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
            borderTopWidth: 3,
            height: 62,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: fonts.monoBold,
            textTransform: "uppercase",
          },
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
  const [fontsLoaded, fontError] = useFonts({
    Unbounded_800ExtraBold,
    Unbounded_900Black,
    Archivo_500Medium,
    Archivo_700Bold,
    Archivo_800ExtraBold,
    MartianMono_500Medium,
    MartianMono_700Bold,
  });

  /* Fail open: if a font fails to load we still render (falling back to the
     system face) rather than leaving the user on a permanently blank screen. */
  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
