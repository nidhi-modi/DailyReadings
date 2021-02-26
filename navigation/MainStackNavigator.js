import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, Alert, Linking, View } from 'react-native'


import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SiteSelection from '../screens/SiteSelection'
import ScreenNavigator from '../screens/ScreenNavigator'
import DailyReadingsGER from '../screens/DailyReadingsGER'

const Stack = createStackNavigator();

function MainStackNavigator() {


    return (


        <NavigationContainer>



            <Stack.Navigator
                initialRouteName='SiteSelection'

                screenOptions={{
                    //gestureEnabled: true,
                    headerStyle: {
                        backgroundColor: '#2C903D',
                        height: 95
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    },
                    headerTintColor: 'white',
                    headerBackTitleVisible: false
                }

                }



                headerMode='float'>


                <Stack.Screen name='SiteSelection' component={SiteSelection} options={{ headerShown: false, title: 'T&G Global' }} />

                <Stack.Screen name='ScreenNavigator' component={ScreenNavigator} options={{ headerLeft: () => null, headerShown: false, title: 'T&G Global' }} />

                <Stack.Screen name='DailyReadingsGER' component={DailyReadingsGER} options={{
                    headerLeft: () =>
                        <View style={styles.alignTextView}>
                            <Text style={styles.headerLeftTopStyle}>Daily Readings</Text>

                            <Text style={styles.headerLeftStyle}>Add Entry</Text>
                        </View>,
                    headerRight: () =>
                        <View style={styles.alignTextView}>
                            <Text style={styles.headerLeftTopStyle}></Text>

                            <Text style={styles.headerRightStyle}>GER</Text>
                        </View>,
                    title: null
                }} />




            </Stack.Navigator>

        </NavigationContainer >



    )
}

const styles = StyleSheet.create({


    headerLeftStyle: {
        color: '#ffffff',
        fontSize: 28,
        fontWeight: 'bold',
        marginLeft: 8,
        
    },

    alignTextView: {

        flexDirection: 'column'
    },

    headerLeftTopStyle: {
        color: '#BBB3B3',
        fontSize: 18,
        marginLeft: 8,
        marginBottom: 8

    },

    headerRightStyle: {
        color: '#ffffff',
        fontSize: 28,
        fontWeight: 'bold',
        marginRight: 10
    },



})



export default MainStackNavigator