import { create } from 'zustand';

export interface Datos {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  token: string;
}

export type User = Datos;

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;

  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (newUser: Partial<User>) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,

  login: (user, token) =>
    set({
      isLoggedIn: true,
      user,
      token,
    }),

  logout: () =>
    set({
      isLoggedIn: false,
      user: null,
      token: null,
    }),

  updateUser: (newUser) =>
    set((state) => ({
      user: {
        ...state.user!,
        ...newUser,
      },
    })),
}));

export default useAuthStore;
