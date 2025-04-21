import * as React from 'react';
import { useEffect, useState}from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { StyleSheet,FlatList, View, Text, Image} from 'react-native';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

interface datosEntrada{
  id: string,
  nombre:string,
  descripcion:string,
  foto:string,
}
export default  function  servicios() {
  const [valores, setvalores] = useState<datosEntrada[]>([])

  useEffect(()=>{
    async function getServicios(){
      try {
    
        const response = await fetch('https://adamix.net/defensa_civil/def/servicios.php');
        const datos = await response.json();
        setvalores(datos.datos);
        
      } catch (error) {
        console.log(error)
      }
    };
    getServicios();

  },[])



  return (
    <View style={styles.container}>
    <FlatList
      data={valores}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Title
            title={item.nombre}
            titleStyle={styles.cardTitle}
          />
          <Card.Content style={styles.cardContent}>
            <Image
              style={styles.logo}
              source={{ uri: item.foto }}
            />
            <Text style={styles.descripcion}>{item.descripcion}</Text>
          </Card.Content>
        </Card>
      )}
      keyExtractor={item => item.id}
    />
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4, // sombra en Android
    backgroundColor: '#fff',
    shadowColor: '#000', // sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardContent: {
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: '#eaf4f4',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  descripcion: {
    textAlign: 'center',
    fontSize: 14,
    color: '#444',
    paddingHorizontal: 10,
  },
});