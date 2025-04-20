export type RootStackParamList = {
  "(tabs)": undefined
  "/(tabs)/medidas": undefined
  "/(tabs)/medidas/[id]": { id: string }
  "+not-found": undefined
} 


export interface Datos {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  token: string;
}

// Este es el usuario autenticado que vas a guardar en el estado
export type User = Datos;

// Este es el tipo de la respuesta del API al hacer login
export interface LoginResponse {
  exito: boolean;
  datos: Datos | [];  // puede ser objeto o arreglo vacío
  mensaje: string;
}