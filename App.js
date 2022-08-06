import react, {useEffect, useState} from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Meteo from './screens/Meteo';
import Reglage from './screens/Reglage';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faFontAwesome, faSun } from '@fortawesome/free-solid-svg-icons';


export default function App() {

    // 4 Navigation - drawer
    const Drawer = createDrawerNavigator();


    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                  drawerActiveBackgroundColor: "#54565B",
                  drawerActiveTintColor: '#fff',
                  drawerInactiveTintColor: '#54565B',
                  drawerInactiveBackgroundColor: "#fff",
                }}
            >
                <Drawer.Screen name="Meteo" component={Meteo} 
                                options={{
                                    headerShown: false,
                                    drawerIcon: ({focused, size}) => (
                                        <FontAwesomeIcon icon={faSun} style={focused? styles.iconFocused : styles.icon}/>
                                     ),
                                }}
                />
                <Drawer.Screen name="Reglage" component={Reglage} options={{
                                    headerShown: false,
                                    drawerIcon: ({focused, size}) => (
                                        <FontAwesomeIcon icon={faCog} style={focused? styles.iconFocused : styles.icon}/>
                                     ),
                                }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
                
    );
}

const styles = StyleSheet.create({
    icon: {
        color: "#54565B"
    },
    iconFocused: {
        color: "#fff"
    }
});
