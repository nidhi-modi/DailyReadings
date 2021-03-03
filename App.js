/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SplashScreen from 'react-native-splash-screen'
import MainStackNavigator from './navigation/MainStackNavigator'
import Realm from 'realm';


let realm;

export default class App extends Component {

  constructor(props) {
    super(props);

    realm = new Realm({
      path: 'DailyReadingsDB.realm',
      schema: [
        {
          name: 'daily_readings_offline_table',
          properties: {
            entry_id: { type: 'int', default: 0 },
            site_name: 'string',
            dateYesterday: 'string',
            dayYesterday: 'string',
            gas: 'string',
            liquidCO2: 'string',
            drainDischarge: 'string',
            g1SouthDripMls: 'string',
            g1SouthDripEC: 'string',
            g1SouthDripPh: 'string',
            g1SouthDrainMls: 'string',
            g1SouthDrainEc: 'string',
            g1SouthDrainPh: 'string',
            g1NorthDripMls: 'string',
            g1NorthDripEC: 'string',

            g1NorthDripPh: 'string',
            g1NorthDrainMls: 'string',
            g1NorthDrainEC: 'string',
            g1NorthDrainPh: 'string',
            g1Valve1DripMls: 'string',
            g1Valve2DripMls: 'string',
            g1Valve3DripMls: 'string',
            g1Valve4DripMls: 'string',
            g2SouthDripMls: 'string',
            g2SouthDripEC: 'string',
            g2SouthDripPh: 'string',
            g2SouthDrainMls: 'string',
            g2SouthDrainEc: 'string',
            g2SouthDrainPh: 'string',

            g2NorthDripMls: 'string',
            g2NorthDripEC: 'string',
            g2NorthDripPh: 'string',
            g2NorthDrainMls: 'string',
            g2NorthDrainEC: 'string',
            g2NorthDrainPh: 'string',
            g2Valve5DripMls: 'string',
            g2Valve6DripMls: 'string',
            g2Valve7DripMls: 'string',
            g2Valve8DripMls: 'string',
            g2Valve9DripMls: 'string',
            g2Valve10DripMls: 'string',
            g2Valve11DripMls: 'string',
            g2Valve12DripMls: 'string',

            g3SouthDripMls: 'string',
            g3SouthDripEC: 'string',
            g3SouthDripPh: 'string',
            g3SouthDrainMls: 'string',
            g3SouthDrainEc: 'string',
            g3SouthDrainPh: 'string',
            g3NorthDripMls: 'string',
            g3NorthDripEC: 'string',
            g3NorthDripPh: 'string',
            g3NorthDrainMls: 'string',
            g3NorthDrainEC: 'string',
            g3NorthDrainPh: 'string',
            g3Valve13DripMls: 'string',
            g3Valve14DripMls: 'string',

            g3Valve15DripMls: 'string',
            g3Valve16DripMls: 'string',
            g3Valve17DripMls: 'string',
            g3Valve18DripMls: 'string',
            g3Valve19DripMls: 'string',
            g3Valve20DripMls: 'string',
            g4SouthDripMls: 'string',
            g4SouthDripEC: 'string',
            g4SouthDripPh: 'string',
            g4SouthDrainMls: 'string',
            g4SouthDrainEc: 'string',
            g4SouthDrainPh: 'string',
            g4NorthDripMls: 'string',
            g4NorthDripEC: 'string',

            g4NorthDripPh: 'string',
            g4NorthDrainMls: 'string',
            g4NorthDrainEC: 'string',
            g4NorthDrainPh: 'string',
            g4Valve21DripMls: 'string',
            g4Valve22DripMls: 'string',
            g4Valve23DripMls: 'string',
            g4Valve24DripMls: 'string',
            g5FirstDripMls: 'string',
            g5FirstDripEC: 'string',
            g5FirstDripPh: 'string',
            g5FirstDrainMls: 'string',
            g5FirstDrainEc: 'string',
            g5FirstDrainPh: 'string',

            g5SecondDripMls: 'string',
            g5SecondDripEC: 'string',
            g5SecondDripPh: 'string',
            g5SecondDrainMls: 'string',
            g5SecondDrainEC: 'string',
            g5SecondDrainPh: 'string',
            g5Valve25DripMls: 'string',
            g5Valve26DripMls: 'string',
            g5Valve27DripMls: 'string',
            bore1Hours: 'string',
            bore1m3: 'string',
            electricity: 'string',
            Septicm3: 'string',

          },
        },
      ],
    });



  }

  componentDidMount() {

    SplashScreen.hide();

  }

  render() {
    return (


      <MainStackNavigator />

      /*<>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>See Your Changes</Text>
                <Text style={styles.sectionDescription}>
                  <ReloadInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Debug</Text>
                <Text style={styles.sectionDescription}>
                  <DebugInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Learn More</Text>
                <Text style={styles.sectionDescription}>
                  Read the docs to discover what to do next:
              </Text>
              </View>
              <LearnMoreLinks />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>*/
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

