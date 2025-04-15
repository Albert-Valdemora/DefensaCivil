import { createContext, useState, useEffect, useContext, type ReactNode } from "react"

export interface Miembro {
  id: string
  foto: string
  nombre: string
  cargo: string
}

interface MiembroContextType {
  miembros: Miembro[]
  loading: boolean
  error: string | null
  fetchMiembros: () => Promise<void>
  getMiembroById: (id: string) => Miembro | undefined
}

const MiembroContext = createContext<MiembroContextType | undefined>(undefined)

export const useMiembros = () => {
  const context = useContext(MiembroContext)
  if (!context) {
    throw new Error("useMiembros must be used within a MiembroProvider")
  }
  return context
}

interface MiembroProviderProps {
  children: ReactNode
}

export const MiembroProvider = ({ children }: MiembroProviderProps) => {
  const [miembros, setMiembros] = useState<Miembro[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMiembros = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("https://adamix.net/defensa_civil/def/miembros.php")
      const data = await response.json()

      if (data.exito) {
        setMiembros(data.datos)
      } else {
        setError("Error al cargar los datos")
      }
    } catch (err) {
      setError("Error de conexión")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getMiembroById = (id: string) => {
    return miembros.find((miembro) => miembro.id === id)
  }

  useEffect(() => {
    fetchMiembros()
  }, [])

  return (
    <MiembroContext.Provider value={{ miembros, loading, error, fetchMiembros, getMiembroById }}>
      {children}
    </MiembroContext.Provider>
  )
}
