import react, {useEffect, useState} from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Weather from './Weather';



export default function Forecasts({data}) {

    useEffect(() => {
        traitement(data)
    }, [data])

    const [forecasts, setForecasts] = useState([])

    const traitement = async (data) => {
        const forecastsData = data.list.map(f => {
            const dt = new Date(f.dt *1000)  
            return ({
                date: dt,
                hour: dt.getHours(),
                temp: Math.round(f.main.temp),
                icon: f.weather[0].icon,
                name: format(dt, "EEEE", {locale: fr})
            })
        })

        // logique pour gouger les elements 
        await setForecasts(forecastsData)
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scroll}
        >
            {forecasts.map(f => (
                <View>
                    <Text style={styles.name}>{f.name}</Text>
                    <Weather forecast={f}></Weather>
                </View>
            ))}

        </ScrollView>
    );
}

const COLOR = '#54565B';

const styles = StyleSheet.create({
    scroll:{
        width: "100%",
        height: "35%"
    },
    name:{

        color : COLOR,
    }
});