// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   Dimensions,
//   Alert,
// } from "react-native";
// import { useRouter, usePathname } from "expo-router";
// import { FontAwesome } from "@expo/vector-icons";
// import useAuthStore from "@/store/useAuthStore";

// const { width } = Dimensions.get("window");

// const BurgerMenu = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();
//   const pathname = usePathname();
//   const animation = useState(new Animated.Value(0))[0];
//   const token = useAuthStore((state) => state.token);
//   const user = useAuthStore((state) => state.user);
//   const logout = useAuthStore((state) => state.logout);

//   // Cerrar el menú cuando cambia la ruta
//   useEffect(() => {
//     setIsOpen(false);
//   }, [pathname]);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//     Animated.timing(animation, {
//       toValue: isOpen ? 0 : 1,
//       duration: 100,
//       useNativeDriver: true,
//     }).start();
//   };

//   const handleNavigation = (route: string) => {
//     Animated.timing(animation, {
//       toValue: 0,
//       duration: 100,
//       useNativeDriver: true,
//     }).start(() => {
//       setIsOpen(false);
//       router.push(route);
//     });
//   };

//   const handleLogout = () => {
//     Alert.alert("Cerrar Sesión", "¿Estás seguro que deseas cerrar sesión?", [
//       {
//         text: "Cancelar",
//         style: "cancel",
//       },
//       {
//         text: "Cerrar Sesión",
//         onPress: () => {
//           logout();
//           router.replace("/(tabs)");
//         },
//       },
//     ]);
//   };

//   const menuItems = [
//     { label: "Inicio", route: "/(tabs)" },
//     { label: "Historia", route: "/(tabs)/history" },
//     { label: "Acerca de...", route: "/(tabs)/info" },
//     { label: "Medidas", route: "/(tabs)/medidas" },
//     { label: "Miembros", route: "/(tabs)/miembros" },
//     { label: "Voluntario", route: "/(tabs)/voluntario" },
//     { label: "Albergues", route: "/(tabs)/albergues" },
//     { label: "Videos", route: "/(tabs)/videos" },
//     { label: "Servicios", route: "/(tabs)/servicios" },
//   ];

//   const authenticatedMenuItems = [
//     { label: "Noticias", route: "/(tabs)/noticias" },
//     { label: "Reportar Situación", route: "/(tabs)/reportar" },
//     { label: "Mis Situación", route: "/(tabs)/situaciones" },
//     { label: "Mapa Situaciones", route: "/(tabs)/mapaSituaciones" },
//     { label: "Cambiar Contraseña", route: "/(tabs)/cambiarContrasena" },
//   ];

//   const unauthenticatedMenuItems = [
//     { label: "Iniciar Sesión", route: "/auth/login" },
//   ];

//   const menuTranslateX = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [-width * 0.7, 0],
//   });

//   const buttonTranslateX = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, width * 0.7],
//   });

//   const overlayOpacity = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 0.5],
//   });

//   return (
//     <>
//       <Animated.View
//         style={[
//           styles.burgerButtonContainer,
//           {
//             transform: [{ translateX: buttonTranslateX }],
//           },
//         ]}
//       >
//         <TouchableOpacity onPress={toggleMenu} style={styles.burgerButton}>
//           <FontAwesome
//             name={isOpen ? "times" : "bars"}
//             size={24}
//             color="black"
//           />
//         </TouchableOpacity>
//       </Animated.View>

//       {isOpen && (
//         <TouchableOpacity
//           style={styles.overlay}
//           onPress={toggleMenu}
//           activeOpacity={1}
//         >
//           <Animated.View
//             style={[
//               styles.overlay,
//               {
//                 opacity: overlayOpacity,
//               },
//             ]}
//           />
//         </TouchableOpacity>
//       )}

//       <Animated.View
//         style={[
//           styles.menuContainer,
//           {
//             transform: [{ translateX: menuTranslateX }],
//           },
//         ]}
//       >
//         <View style={styles.menuHeader}>
//           <Text style={styles.menuTitle}>Menú</Text>
//           {token && user && (
//             <Text style={styles.userName}>
//               {user.nombre} {user.apellido}
//             </Text>
//           )}
//         </View>

//         {menuItems.map((item) => (
//           <TouchableOpacity
//             key={item.label}
//             style={styles.menuItem}
//             onPress={() => handleNavigation(item.route)}
//           >
//             <Text style={styles.menuText}>{item.label}</Text>
//           </TouchableOpacity>
//         ))}

//         {token ? (
//           <>
//             <View style={styles.separator} />
//             {authenticatedMenuItems.map((item) => (
//               <TouchableOpacity
//                 key={item.label}
//                 style={styles.menuItem}
//                 onPress={() => handleNavigation(item.route)}
//               >
//                 <Text style={styles.menuText}>{item.label}</Text>
//               </TouchableOpacity>
//             ))}
//             <TouchableOpacity
//               style={[styles.menuItem, styles.logoutButton]}
//               onPress={handleLogout}
//             >
//               <Text style={styles.logoutText}>Cerrar Sesión</Text>
//             </TouchableOpacity>
//           </>
//         ) : (
//           <>
//             <View style={styles.separator} />
//             {unauthenticatedMenuItems.map((item) => (
//               <TouchableOpacity
//                 key={item.label}
//                 style={styles.menuItem}
//                 onPress={() => handleNavigation(item.route)}
//               >
//                 <Text style={styles.menuText}>{item.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </>
//         )}
//       </Animated.View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   burgerButtonContainer: {
//     position: "absolute",
//     top: 40,
//     left: 10,
//     zIndex: 1000,
//   },
//   burgerButton: {
//     padding: 10,
//     backgroundColor: "white",
//     borderRadius: 5,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   overlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "black",
//     zIndex: 1,
//   },
//   menuContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     bottom: 0,
//     width: "70%",
//     backgroundColor: "white",
//     zIndex: 2,
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   menuHeader: {
//     padding: 20,
//     paddingTop: 60,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   menuTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   userName: {
//     fontSize: 16,
//     color: "#666",
//     marginTop: 5,
//   },
//   menuItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   menuText: {
//     fontSize: 16,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: "#eee",
//     marginVertical: 10,
//   },
//   logoutButton: {
//     backgroundColor: "#f8f8f8",
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//     marginTop: 10,
//   },
//   logoutText: {
//     color: "#ff4444",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default BurgerMenu;



// components/BurgerMenu.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import useAuthStore from "@/store/useAuthStore";

const { width } = Dimensions.get("window");

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const animation = useState(new Animated.Value(0))[0];
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleNavigation = (route: string) => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setIsOpen(false);
      router.push(route);
    });
  };

  const handleLogout = () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro que deseas cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Cerrar Sesión",
        onPress: () => {
          logout();
          router.replace("/(tabs)");
        },
      },
    ]);
  };

  const menuItems = [
    { label: "Inicio", route: "/(tabs)" },
    { label: "Historia", route: "/(tabs)/history" },
    { label: "Medidas", route: "/(tabs)/medidas" },
    { label: "Miembros", route: "/(tabs)/miembros" },
    { label: "Voluntario", route: "/(tabs)/voluntario" },
    { label: "Albergues", route: "/(tabs)/albergues" },
    { label: "Videos", route: "/(tabs)/videos" },
    { label: "Servicios", route: "/(tabs)/servicios" },
    { label: "Acerca de...", route: "/(tabs)/info" },
  ];

  const authenticatedMenuItems = [
    { label: "Noticias", route: "/(tabs)/noticias" },
    { label: "Reportar Situación", route: "/(tabs)/reportar" },
    { label: "Mis Situación", route: "/(tabs)/situaciones" },
    { label: "Mapa Situaciones", route: "/(tabs)/mapaSituaciones" },
    { label: "Cambiar Contraseña", route: "/(tabs)/cambiarContrasena" },
  ];

  const unauthenticatedMenuItems = [
    { label: "Iniciar Sesión", route: "/auth/login" },
  ];

  const menuTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.7, 0],
  });

  const buttonTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.7],
  });

  const overlayOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  return (
    <>
      <Animated.View
        style={[
          styles.burgerButtonContainer,
          {
            transform: [{ translateX: buttonTranslateX }],
          },
        ]}
      >
        <TouchableOpacity onPress={toggleMenu} style={styles.burgerButton}>
          <FontAwesome
            name={isOpen ? "times" : "bars"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </Animated.View>

      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={toggleMenu}
          activeOpacity={1}
        >
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity: overlayOpacity,
              },
            ]}
          />
        </TouchableOpacity>
      )}

      <Animated.View
        style={[
          styles.menuContainer,
          {
            transform: [{ translateX: menuTranslateX }],
          },
        ]}
      >
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Menú</Text>
          {token && user && (
            <Text style={styles.userName}>
              {user.nombre} {user.apellido}
            </Text>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.menuItem}
              onPress={() => handleNavigation(item.route)}
            >
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          {token ? (
            <>
              <View style={styles.separator} />
              {authenticatedMenuItems.map((item) => (
                <TouchableOpacity
                  key={item.label}
                  style={styles.menuItem}
                  onPress={() => handleNavigation(item.route)}
                >
                  <Text style={styles.menuText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[styles.menuItem, styles.logoutButton]}
                onPress={handleLogout}
              >
                <Text style={styles.logoutText}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.separator} />
              {unauthenticatedMenuItems.map((item) => (
                <TouchableOpacity
                  key={item.label}
                  style={styles.menuItem}
                  onPress={() => handleNavigation(item.route)}
                >
                  <Text style={styles.menuText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  burgerButtonContainer: {
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 1000,
  },
  burgerButton: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    zIndex: 1,
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "70%",
    backgroundColor: "white",
    zIndex: 2,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuHeader: {
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  logoutButton: {
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 10,
  },
  logoutText: {
    color: "#ff4444",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BurgerMenu;
