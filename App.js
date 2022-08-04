import react, {useEffect, useState} from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { API_KEY } from '@env'
import axios from 'axios';

import CurrentWeather from './components/CurrentWeather';
import Forecasts from './components/Forecasts';

const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=fr&units=metric`;

export default function App() {

    useEffect(()=>{
        getCordinates();
    }, [])

    // 1 - récupérer la loc du tel

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    const getCordinates = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== "granted") {
            // ToDo : afficher un message pour lui demander d'afficher sa position
            return
        }

        const userLocation = await Location.getCurrentPositionAsync();
        getWeather(userLocation)
    }

    // 2 - requête api 
    const getWeather = async (location) => {
        try {
            const reponse = await axios.get(API_URL(location.coords.latitude, location.coords.longitude));

            setData(reponse.data)

            setLoading(false)
        } catch (error) {
            // ToDo : Afficher l'erreur au user
            console.log("Erreur request : ", error);
        }
    }
    

    if(loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator></ActivityIndicator>
            </View>
        )    
    }

    return (
        <View style={styles.container}>
            <CurrentWeather data={data}></CurrentWeather>
            <Forecasts data={data}></Forecasts>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E2E6E1',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
