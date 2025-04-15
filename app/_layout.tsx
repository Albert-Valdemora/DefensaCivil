import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import "react-native-reanimated"

import { useColorScheme } from "@/hooks/useColorScheme"
import { MedidaProvider } from "@/context/medida-context"
import { MiembroProvider } from "@/context/miembro-context"


SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <MedidaProvider>
      <MiembroProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="medida/[id]" options={{ title: "Detalle" }} />
            <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </MiembroProvider>
    </MedidaProvider>
  )
}
