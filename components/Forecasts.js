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

        // 
        let newForecastsData = forecastsData.map(forecast => {
            return forecast.name
        }).filter((day, index, self) => {
            return self.indexOf(day) === index
        }).map((day) => {
            return {
                day: day,
                data: forecastsData.filter((forecast) => forecast.name === day)
            }
        })

        await setForecasts(newForecastsData)
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scroll}
        >
            {forecasts.map(f => (
                <View>
                    <Text style={styles.day}>{f.day.toUpperCase()}</Text>
                    <View style={styles.container}>
                        {f.data.map( w => <Weather forecast={w}></Weather>)}
                    </View>
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
    day:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 15,
        color : COLOR,
    },
    container: {
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
    }
});