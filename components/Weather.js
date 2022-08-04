import react, {useEffect, useState} from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from './Icon';



export default function Weather({forecast}) {

    return (
        <View style={styles.container}>
            <Text style={styles.hour}>{forecast.hour}h</Text>
            <Image
                source={Icon[forecast.icon]}
                style={styles.icon}
            />
            <Text style={styles.temp}>{forecast.temp}°C</Text>
        </View>
    )
}


const COLOR = '#54565B';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 140,
        width: 75,
        paddingVertical: 6, 
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 50,
    },
    hour: {

    },
    icon: {
        width: 50,
        height: 50,
    },
    temp: {
        fontSize: 18,
        fontWeight: 'bold',
        color : COLOR,
    },
});