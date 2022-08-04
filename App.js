import react, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function App() {

    // 1 - récupérer la loc du tel

    const [location, setLocation] = useState(null)

    const getCordinates = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== "granted") {
            // ToDo : afficher un message pour lui demander d'afficher sa position
            return
        }

        const userLocation = await Location.getCurrentPositionAsync();
        setLocation(userLocation)
    }

    useEffect(()=>{
        getCordinates();
    }, [])


    // 2 - requête api 
    

    if(!location) {
        return (
            <View style={styles.container}>
                <Text>Location is null...</Text>
            </View>
        )    
    }

    return (
        <View style={styles.container}>
            <Text>{location.coords.latitude}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
