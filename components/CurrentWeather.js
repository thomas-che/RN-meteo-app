import react, {useEffect, useState} from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { isSameDay, format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Icon from './Icon';



export default function CurrentWeather({data}) {

    useEffect(() => {
        traitement(data)
        setDateRefresh(new Date().getTime() + Math.abs(data.city.timezone * 1000))
    }, [data])

    const [currentWeather, setCurrentWeather] = useState(null)
    const [currentIcon, setCurrentIcon] = useState(Icon['00n'])
    const [dateRefresh, setDateRefresh] = useState(new Date().getTime() + Math.abs(data.city.timezone * 1000))

    const traitement = (data) => {
        const curentW = data.list.filter(forecast => {
            const today = new Date().getTime() + Math.abs(data.city.timezone * 1000)
            const forecastDate = new Date(forecast.dt *1000) 
            return isSameDay(today, forecastDate)
        })
        setCurrentWeather(curentW[0])
        setCurrentIcon(Icon[curentW[0].weather[0].icon]);
    }


    return (
        <View style={styles.container}>
            <Text style={styles.dateRefresh}>updated {format(dateRefresh, 'dd/MM/yyyy HH:mm:ss',  {locale: fr})}</Text>
            <Text style={styles.city}>{data?.city?.name}</Text>
            <Text style={styles.today}>Aujourd'hui</Text>

           <Image
                source={currentIcon}
                style={styles.icon}
            />

            <Text style={styles.temp}>{Math.round(currentWeather?.main.temp)}°C</Text>
            <Text style={styles.description}>{currentWeather?.weather[0].description}</Text>
        </View>
    );
}

const COLOR = '#54565B';

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        alignItems: 'center',
        height: "65%",
    },
    city: {
        marginTop: '15%',
        fontSize: 36,
        fontWeight: '500',
        color : COLOR,
    },
    today: {
        fontSize: 24,
        fontWeight: '300',
        color : COLOR,
    },
    icon: {
        width: 150,
        height: 150,
        marginVertical: 20,
    },
    temp: {
        fontSize: 80,
        fontWeight: 'bold',
        color : COLOR,
    },
    description: {
        fontSize: 24,
        fontWeight: 'bold',
        color : COLOR,
    },
    dateRefresh: {
        top: 0,
        fontSize: 8,
        color: COLOR
    }
});