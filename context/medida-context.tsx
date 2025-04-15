import { createContext, useState, useEffect, useContext, type ReactNode } from "react"

export interface Medida {
  id: string
  titulo: string
  descripcion: string
  foto: string
}

interface MedidaContextType {
  medidas: Medida[]
  loading: boolean
  error: string | null
  fetchMedidas: () => Promise<void>
  getMedidaById: (id: string) => Medida | undefined
}

const MedidaContext = createContext<MedidaContextType | undefined>(undefined)

export const useMedidas = () => {
  const context = useContext(MedidaContext)
  if (!context) {
    throw new Error("useMedidas must be used within a MedidaProvider")
  }
  return context
}

interface MedidaProviderProps {
  children: ReactNode
}

export const MedidaProvider = ({ children }: MedidaProviderProps) => {
  const [medidas, setMedidas] = useState<Medida[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMedidas = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("https://adamix.net/defensa_civil/def/medidas_preventivas.php")
      const data = await response.json()

      if (data.exito) {
        setMedidas(data.datos)
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

  const getMedidaById = (id: string) => {
    return medidas.find((medida) => medida.id === id)
  }

  useEffect(() => {
    fetchMedidas()
  }, [])

  return (
    <MedidaContext.Provider value={{ medidas, loading, error, fetchMedidas, getMedidaById }}>
      {children}
    </MedidaContext.Provider>
  )
}
