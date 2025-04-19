import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import useAuthStore from '@/store/useAuthStore';
 
 
 export default function ReportarScreen() {
   const [titulo, setTitulo] = useState('');
   const [descripcion, setDescripcion] = useState('');
   const [foto, setFoto] = useState<string | null>(null);
   const [ubicacion, setUbicacion] = useState<{ latitud: number; longitud: number } | null>(null);
   
   const token = useAuthStore(state => state.token);
   
   const seleccionarFoto = async () => {
     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
     if (status !== 'granted') {
       Alert.alert('Permiso denegado', 'Necesitamos acceso a tu galería para seleccionar una foto');
       return;
     }
 
     const result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.Images,
       allowsEditing: true,
       quality: 0.5,
       base64: true,
     });
 
     if (!result.canceled) {
       setFoto(result.assets[0].base64);
     }
   };
 
   const obtenerUbicacion = async () => {
     const { status } = await Location.requestForegroundPermissionsAsync();
     if (status !== 'granted') {
       Alert.alert('Permiso denegado', 'Necesitamos acceso a tu ubicación');
       return;
     }
 
     const location = await Location.getCurrentPositionAsync({});
     setUbicacion({
       latitud: location.coords.latitude,
       longitud: location.coords.longitude,
     });
   };
 
   const enviarReporte = async () => {
     if (!titulo || !descripcion || !foto || !ubicacion) {
       Alert.alert('Error', 'Por favor complete todos los campos');
       return;
     }
 
     try {
       const formData = new FormData();
 
       if (!token) {
         Alert.alert('Error', 'No se encontró el token de autenticación');
         return;
       }
       
       formData.append('token', token)
       formData.append('titulo', titulo);
       formData.append('descripcion', descripcion);
       formData.append('foto', foto);
       formData.append('latitud', ubicacion.latitud.toString());
       formData.append('longitud', ubicacion.longitud.toString());
 
       const response = await fetch('https://adamix.net/defensa_civil/def/nueva_situacion.php', {
         method: 'POST',
         body: formData,
       });
 
       const data = await response.json();
       if (data.exito) {
         Alert.alert('Éxito', 'Reporte enviado correctamente');
         // Limpiar formulario
         setTitulo('');
         setDescripcion('');
         setFoto(null);
         setUbicacion(null);
       } else {
         Alert.alert('Error: ', data.mensaje);
       }
     } catch (error) {
       Alert.alert('Error', 'Ocurrió un error al enviar el reporte');
     }
   };
 
   return (
     <View style={styles.container}>
       <TextInput
         style={styles.input}
         placeholder="Título"
         value={titulo}
         onChangeText={setTitulo}
         placeholderTextColor={'gray'}
       />
       
       <TextInput
         style={[styles.input, styles.textArea]}
         placeholder="Descripción"
         value={descripcion}
         onChangeText={setDescripcion}
         multiline
         numberOfLines={4}
         placeholderTextColor={'gray'}
       />
 
       <TouchableOpacity style={styles.button} onPress={seleccionarFoto}>
         <Text style={styles.buttonText}>Seleccionar Foto</Text>
       </TouchableOpacity>
 
       {foto && (
         <Image
           source={{ uri: `data:image/jpeg;base64,${foto}` }}
           style={styles.preview}
         />
       )}
 
       <TouchableOpacity style={styles.button} onPress={obtenerUbicacion}>
         <Text style={styles.buttonText}>Obtener Ubicación</Text>
       </TouchableOpacity>
 
       {ubicacion && (
         <Text style={styles.ubicacion}>
           Latitud: {ubicacion.latitud}, Longitud: {ubicacion.longitud}
         </Text>
       )}
 
       <TouchableOpacity style={styles.submitButton} onPress={enviarReporte}>
         <Text style={styles.submitButtonText}>Enviar Reporte</Text>
       </TouchableOpacity>
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 20,
     backgroundColor: '#fff',
     marginTop: 85
   },
   input: {
     height: 50,
     borderWidth: 1,
     borderColor: '#ddd',
     borderRadius: 8,
     paddingHorizontal: 15,
     marginBottom: 15,
     fontSize: 16,
     
   },
   textArea: {
     height: 100,
     textAlignVertical: 'top',
     paddingTop: 10,
   },
   button: {
     backgroundColor: '#0a7ea4',
     padding: 15,
     borderRadius: 8,
     alignItems: 'center',
     marginBottom: 15,
   },
   buttonText: {
     color: '#fff',
     fontSize: 16,
     fontWeight: 'bold',
   },
   preview: {
     width: '100%',
     height: 200,
     marginBottom: 15,
     borderRadius: 8,
   },
   ubicacion: {
     fontSize: 14,
     color: '#666',
     marginBottom: 15,
     textAlign: 'center',
   },
   submitButton: {
     backgroundColor: '#28a745',
     padding: 15,
     borderRadius: 8,
     alignItems: 'center',
     marginTop: 20,
   },
   submitButtonText: {
     color: '#fff',
     fontSize: 16,
     fontWeight: 'bold',
   },
 }); 