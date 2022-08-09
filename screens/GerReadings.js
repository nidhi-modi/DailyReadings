import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
  LayoutAnimation,
  Platform,
  UIManager,
  TextInput,
  BackHandler,
  Alert,
  LogBox,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Realm from 'realm';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
var currentWeekNumber = require('current-week-number');
import {GET_DAILY_READINGS, INSERT_DAILY_READINGS} from '../graphql/queries';
import {useMutation, useLazyQuery} from '@apollo/client/react';

const DOWN_ARROW = require('../assets/down_arrow.png');
const UP_ARROW = require('../assets/up_arrow.png');
let realm;
var ID;

const GerReadings = (props) => {
  //INITIALIZE RAELM INSTANCE
  realm = new Realm({path: 'DailyReadingsDB.realm'});

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  //SAMPLE
  const [FlatListItems, setFlatListItems] = useState({});
  const [isItConnected, setIsItConnected] = useState('');
  const [sample, setSample] = useState({});
  const [filteredSampleData, setFilteredSampleData] = useState({});
  //

  const [showRealApp, setShowRealApp] = useState(false);
  const [selected, setSelected] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [expandedG1, setExpandedG1] = useState(false);
  const [expandedG2, setExpandedG2] = useState(false);
  const [expandedG3, setExpandedG3] = useState(false);
  const [expandedG4, setExpandedG4] = useState(false);
  const [expandedG5, setExpandedG5] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [onClickName, setOnClickName] = useState('');
  const [expand, setExpand] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  //GENERIC VARIABLES
  const [dateYesterday, setDateYesterday] = useState('');
  const [dayYesterday, setDayYesterday] = useState('');
  const [gas, setGas] = useState('');
  const [liquidCO2, setLiquidCO2] = useState('');
  const [drainDischarge, setDrainDischarge] = useState('');
  //END

  //G1 VARIABLES
  const [g1SouthDripMls, setG1SouthDripMls] = useState('');
  const [g1SouthDripEC, setG1SouthDripEC] = useState('');
  const [g1SouthDripPh, setG1SouthDripPh] = useState('');
  const [g1SouthDrainMls, setG1SouthDrainMls] = useState('');
  const [g1SouthDrainEc, setG1SouthDrainEc] = useState('');
  const [g1SouthDrainPh, setG1SouthDrainPh] = useState('');
  const [g1NorthDripMls, setG1NorthDripMls] = useState('');
  const [g1NorthDripEC, setG1NorthDripEC] = useState('');
  const [g1NorthDripPh, setG1NorthDripPh] = useState('');
  const [g1NorthDrainMls, setG1NorthDrainMls] = useState('');
  const [g1NorthDrainEC, setG1NorthDrainEC] = useState('');
  const [g1NorthDrainPh, setG1NorthDrainPh] = useState('');
  const [g1Valve1DripMls, setG1Valve1DripMls] = useState('');
  const [g1Valve2DripMls, setG1Valve2DripMls] = useState('');
  const [g1Valve3DripMls, setG1Valve3DripMls] = useState('');
  const [g1Valve4DripMls, setG1Valve4DripMls] = useState('');
  //

  //G2 VARIABLES

  const [g2SouthDripMls, setG2SouthDripMls] = useState('');
  const [g2SouthDripEC, setG2SouthDripEC] = useState('');
  const [g2SouthDripPh, setG2SouthDripPh] = useState('');
  const [g2SouthDrainMls, setG2SouthDrainMls] = useState('');
  const [g2SouthDrainEc, setG2SouthDrainEc] = useState('');
  const [g2SouthDrainPh, setG2SouthDrainPh] = useState('');
  const [g2NorthDripMls, setG2NorthDripMls] = useState('');
  const [g2NorthDripEC, setG2NorthDripEC] = useState('');
  const [g2NorthDripPh, setG2NorthDripPh] = useState('');
  const [g2NorthDrainMls, setG2NorthDrainMls] = useState('');
  const [g2NorthDrainEC, setG2NorthDrainEC] = useState('');
  const [g2NorthDrainPh, setG2NorthDrainPh] = useState('');
  const [g2Valve5DripMls, setG2Valve5DripMls] = useState('');
  const [g2Valve6DripMls, setG2Valve6DripMls] = useState('');
  const [g2Valve7DripMls, setG2Valve7DripMls] = useState('');
  const [g2Valve8DripMls, setG2Valve8DripMls] = useState('');
  const [g2Valve9DripMls, setG2Valve9DripMls] = useState('');
  const [g2Valve10DripMls, setG2Valve10DripMls] = useState('');
  const [g2Valve11DripMls, setG2Valve11DripMls] = useState('');
  const [g2Valve12DripMls, setG2Valve12DripMls] = useState('');

  //

  //G3 VARIABLES

  const [g3SouthDripMls, setG3SouthDripMls] = useState('');
  const [g3SouthDripEC, setG3SouthDripEC] = useState('');
  const [g3SouthDripPh, setG3SouthDripPh] = useState('');
  const [g3SouthDrainMls, setG3SouthDrainMls] = useState('');
  const [g3SouthDrainEc, setG3SouthDrainEc] = useState('');
  const [g3SouthDrainPh, setG3SouthDrainPh] = useState('');
  const [g3NorthDripMls, setG3NorthDripMls] = useState('');
  const [g3NorthDripEC, setG3NorthDripEC] = useState('');
  const [g3NorthDripPh, setG3NorthDripPh] = useState('');
  const [g3NorthDrainMls, setG3NorthDrainMls] = useState('');
  const [g3NorthDrainEC, setG3NorthDrainEC] = useState('');
  const [g3NorthDrainPh, setG3NorthDrainPh] = useState('');
  const [g3Valve13DripMls, setG3Valve13DripMls] = useState('');
  const [g3Valve14DripMls, setG3Valve14DripMls] = useState('');
  const [g3Valve15DripMls, setG3Valve15DripMls] = useState('');
  const [g3Valve16DripMls, setG3Valve16DripMls] = useState('');
  const [g3Valve17DripMls, setG3Valve17DripMls] = useState('');
  const [g3Valve18DripMls, setG3Valve18DripMls] = useState('');
  const [g3Valve19DripMls, setG3Valve19DripMls] = useState('');
  const [g3Valve20DripMls, setG3Valve20DripMls] = useState('');

  //

  //G4 VARIABLES

  const [g4SouthDripMls, setG4SouthDripMls] = useState('');
  const [g4SouthDripEC, setG4SouthDripEC] = useState('');
  const [g4SouthDripPh, setG4SouthDripPh] = useState('');
  const [g4SouthDrainMls, setG4SouthDrainMls] = useState('');
  const [g4SouthDrainEc, setG4SouthDrainEc] = useState('');
  const [g4SouthDrainPh, setG4SouthDrainPh] = useState('');
  const [g4NorthDripMls, setG4NorthDripMls] = useState('');
  const [g4NorthDripEC, setG4NorthDripEC] = useState('');
  const [g4NorthDripPh, setG4NorthDripPh] = useState('');
  const [g4NorthDrainMls, setG4NorthDrainMls] = useState('');
  const [g4NorthDrainEC, setG4NorthDrainEC] = useState('');
  const [g4NorthDrainPh, setG4NorthDrainPh] = useState('');
  const [g4Valve21DripMls, setG4Valve21DripMls] = useState('');
  const [g4Valve22DripMls, setG4Valve22DripMls] = useState('');
  const [g4Valve23DripMls, setG4Valve23DripMls] = useState('');
  const [g4Valve24DripMls, setG4Valve24DripMls] = useState('');

  //

  //G5 VARIABLES

  const [g5FirstDripMls, setG5FirstDripMls] = useState('');
  const [g5FirstDripEC, setG5FirstDripEC] = useState('');
  const [g5FirstDripPh, setG5FirstDripPh] = useState('');
  const [g5FirstDrainMls, setG5FirstDrainMls] = useState('');
  const [g5FirstDrainEc, setG5FirstDrainEc] = useState('');
  const [g5FirstDrainPh, setG5FirstDrainPh] = useState('');
  const [g5SecondDripMls, setG5SecondDripMls] = useState('');
  const [g5SecondDripEC, setG5SecondDripEC] = useState('');
  const [g5SecondDripPh, setG5SecondDripPh] = useState('');
  const [g5SecondDrainMls, setG5SecondDrainMls] = useState('');
  const [g5SecondDrainEC, setG5SecondDrainEC] = useState('');
  const [g5SecondDrainPh, setG5SecondDrainPh] = useState('');
  const [g5Valve25DripMls, setG5Valve25DripMls] = useState('');
  const [g5Valve26DripMls, setG5Valve26DripMls] = useState('');
  const [g5Valve27DripMls, setG5Valve27DripMls] = useState('');

  //

  //BORE READINGS

  const [bore1Hours, setBore1Hours] = useState('');
  const [bore1m3, setBore1m3] = useState('');
  const [electricity, setElectricity] = useState('');
  const [Septicm3, setSepticm3] = useState('');
  const [siteName, setSiteName] = useState('GER');

  //END

  useEffect(() => {
    retriveAsyncData();

    var currentDate1 = moment().format('DD/MM/YYYY');

    setCurrentDate(currentDate1);

    console.log('CURRENT WEEK NUMBER : ' + currentDate1);

    //GET DATA FROM AWS

    getDailyReadingsData();
  }, []);

  //CHECK INTERNET
  useEffect(() => {
    NetInfo.addEventListener(handleConnectivityChange());
    BackHandler.addEventListener('hardwareBackPress', handleBackButton());
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton());
    };
  }, []);

  //CHECKING CONNECTION

  const handleConnectivityChange = (connection) => {
    if (connection.isConnected) {
      setIsItConnected('Online');
    } else {
      setIsItConnected('Offline');
    }
  };

  //END

  const handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  //TESTING ON CLICK (ONLY ONE OPEN AT A TIME CODE)

  const g1ChangeLayout = () => {
    setOnClickName('g1');

    manageOnClick();
  };

  const g2ChangeLayout = () => {
    setOnClickName('g2');

    manageOnClick();
  };

  const g3ChangeLayout = () => {
    setOnClickName('g3');

    manageOnClick();
  };

  const g4ChangeLayout = () => {
    setOnClickName('g4');

    manageOnClick();
  };

  const g5ChangeLayout = () => {
    setOnClickName('g5');

    manageOnClick();
  };

  const manageOnClick = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (onClickName === 'g1') {
      setExpandedG1(true);
      setExpandedG2(false);
      setExpandedG3(false);
      setExpandedG4(false);
      setExpandedG5(false);
    } else if (onClickName === 'g2') {
      setExpandedG1(false);
      setExpandedG2(true);
      setExpandedG3(false);
      setExpandedG4(false);
      setExpandedG5(false);
    } else if (onClickName === 'g3') {
      setExpandedG1(false);
      setExpandedG2(false);
      setExpandedG3(true);
      setExpandedG4(false);
      setExpandedG5(false);
    } else if (onClickName === 'g4') {
      setExpandedG1(false);
      setExpandedG2(false);
      setExpandedG3(false);
      setExpandedG4(true);
      setExpandedG5(false);
    } else if (onClickName === 'g5') {
      setExpandedG1(false);
      setExpandedG2(false);
      setExpandedG3(false);
      setExpandedG4(false);
      setExpandedG5(true);
    }
  };

  //END

  //COLLAPSE VIEW ANIMATION CODE (CODE THAT COLLAPSES ALL THE VIEW)

  changeLayout1 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setExpandedG1(!expandedG1);
    setExpandedG2(expandedG2);
    setExpandedG3(expandedG3);
    setExpandedG4(expandedG4);
    setExpandedG5(expandedG5);
  };

  changeLayout2 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setExpandedG1(expandedG1);
    setExpandedG2(!expandedG2);
    setExpandedG3(expandedG3);
    setExpandedG4(expandedG4);
    setExpandedG5(expandedG5);
  };

  changeLayout3 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setExpandedG1(expandedG1);
    setExpandedG2(expandedG2);
    setExpandedG3(!expandedG3);
    setExpandedG4(expandedG4);
    setExpandedG5(expandedG5);
  };

  changeLayout4 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setExpandedG1(expandedG1);
    setExpandedG2(expandedG2);
    setExpandedG3(expandedG3);
    setExpandedG4(!expandedG4);
    setExpandedG5(expandedG5);
  };

  changeLayout5 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setExpandedG1(expandedG1);
    setExpandedG2(expandedG2);
    setExpandedG3(expandedG3);
    setExpandedG4(expandedG4);
    setExpandedG5(!expandedG5);
  };

  //

  //METHOD FOR GETTING ASYNC VALUES

  retriveAsyncData = async () => {
    try {
      const data1 = await AsyncStorage.getItem('dateYesterday');

      if (data1 !== null) {
        setDateYesterday(JSON.parse(data1));
      }
    } catch (e) {}

    try {
      const data2 = await AsyncStorage.getItem('dayYesterday');

      if (data2 !== null) {
        setDayYesterday(JSON.parse(data2));
      }
    } catch (e) {}

    try {
      const data3 = await AsyncStorage.getItem('gas');

      if (data3 !== null) {
        setGas(JSON.parse(data3));
      }
    } catch (e) {}

    try {
      const data4 = await AsyncStorage.getItem('liquidCO2');

      if (data4 !== null) {
        setLiquidCO2(JSON.parse(data4));
      }
    } catch (e) {}

    try {
      const data5 = await AsyncStorage.getItem('drainDischarge');

      if (data5 !== null) {
        setDrainDischarge(JSON.parse(data5));
      }
    } catch (e) {}

    //G1 ASYNC getItem
    try {
      const data6 = await AsyncStorage.getItem('g1SouthDripMls');

      if (data6 !== null) {
        setG1SouthDripMls(JSON.parse(data6));
      }
    } catch (e) {}

    try {
      const data7 = await AsyncStorage.getItem('g1SouthDripEC');

      if (data7 !== null) {
        setG1SouthDripEC(JSON.parse(data7));
      }
    } catch (error) {}

    try {
      const data8 = await AsyncStorage.getItem('g1SouthDripPh');

      if (data8 !== null) {
        setG1SouthDripPh(JSON.parse(data8));
      }
    } catch (error) {}

    try {
      const data9 = await AsyncStorage.getItem('g1SouthDrainMls');

      if (data9 !== null) {
        setG1SouthDrainMls(JSON.parse(data9));
      }
    } catch (error) {}

    try {
      const data10 = await AsyncStorage.getItem('g1SouthDrainEc');

      if (data10 !== null) {
        setG1SouthDrainEc(JSON.parse(data10));
      }
    } catch (error) {}

    try {
      const data11 = await AsyncStorage.getItem('g1SouthDrainPh');
      if (data11 !== null) {
        setG1SouthDrainPh(JSON.parse(data11));
      }
    } catch (error) {}

    try {
      const data12 = await AsyncStorage.getItem('g1NorthDripMls');

      if (data12 !== null) {
        setG1NorthDripMls(JSON.parse(data12));
      }
    } catch (error) {}

    try {
      const data13 = await AsyncStorage.getItem('g1NorthDripEC');

      if (data13 !== null) {
        setG1NorthDripEC(JSON.parse(data13));
      }
    } catch (error) {}

    try {
      const data14 = await AsyncStorage.getItem('g1NorthDripPh');

      if (data14 !== null) {
        setG1NorthDripPh(JSON.parse(data14));
      }
    } catch (error) {}

    try {
      const data15 = await AsyncStorage.getItem('g1NorthDrainMls');

      if (data15 !== null) {
        setG1NorthDrainMls(JSON.parse(data15));
      }
    } catch (error) {}

    try {
      const data16 = await AsyncStorage.getItem('g1NorthDrainEC');
      if (data16 !== null) {
        setG1NorthDrainEC(JSON.parse(data16));
      }
    } catch (error) {}

    try {
      const data17 = await AsyncStorage.getItem('g1NorthDrainPh');
      if (data17 !== null) {
        setG1NorthDrainPh(JSON.parse(data17));
      }
    } catch (error) {}

    try {
      const data18 = await AsyncStorage.getItem('g1Valve1DripMls');
      if (data18 !== null) {
        setG1Valve1DripMls(JSON.parse(data18));
      }
    } catch (error) {}

    try {
      const data19 = await AsyncStorage.getItem('g1Valve2DripMls');
      if (data19 !== null) {
        setG1Valve2DripMls(JSON.parse(data19));
      }
    } catch (error) {}

    try {
      const data20 = await AsyncStorage.getItem('g1Valve3DripMls');
      if (data20 !== null) {
        setG1Valve3DripMls(JSON.parse(data20));
      }
    } catch (error) {}

    try {
      const data21 = await AsyncStorage.getItem('g1Valve4DripMls');
      if (data21 !== null) {
        setG1Valve4DripMls(JSON.parse(data21));
      }
    } catch (error) {}

    //END

    //G2 ASYNC getItem
    try {
      const data22 = await AsyncStorage.getItem('g2SouthDripMls');
      if (data22 !== null) {
        setG2SouthDripMls(JSON.parse(data22));
      }
    } catch (error) {}

    try {
      const data23 = await AsyncStorage.getItem('g2SouthDripEC');
      if (data23 !== null) {
        setG2SouthDripEC(JSON.parse(data23));
      }
    } catch (error) {}

    try {
      const data24 = await AsyncStorage.getItem('g2SouthDripPh');
      if (data24 !== null) {
        setG2SouthDripPh(JSON.parse(data24));
      }
    } catch (error) {}

    try {
      const data25 = await AsyncStorage.getItem('g2SouthDrainMls');
      if (data25 !== null) {
        setG2SouthDrainMls(JSON.parse(data25));
      }
    } catch (error) {}

    try {
      const data26 = await AsyncStorage.getItem('g2SouthDrainEc');
      if (data26 !== null) {
        setG2SouthDrainEc(JSON.parse(data26));
      }
    } catch (error) {}

    try {
      const data27 = await AsyncStorage.getItem('g2SouthDrainPh');
      if (data27 !== null) {
        setG2SouthDrainPh(JSON.parse(data27));
      }
    } catch (error) {}

    try {
      const data28 = await AsyncStorage.getItem('g2NorthDripMls');
      if (data28 !== null) {
        setG2NorthDripMls(JSON.parse(data28));
      }
    } catch (error) {}

    try {
      const data29 = await AsyncStorage.getItem('g2NorthDripEC');
      if (data29 !== null) {
        setG2NorthDripEC(JSON.parse(data29));
      }
    } catch (error) {}

    try {
      const data30 = await AsyncStorage.getItem('g2NorthDripPh');
      if (data30 !== null) {
        setG2NorthDripPh(JSON.parse(data30));
      }
    } catch (error) {}

    try {
      const data31 = await AsyncStorage.getItem('g2NorthDrainMls');
      if (data31 !== null) {
        setG2NorthDrainMls(JSON.parse(data31));
      }
    } catch (error) {}

    try {
      const data32 = await AsyncStorage.getItem('g2NorthDrainEC');
      if (data32 !== null) {
        setG2NorthDrainEC(JSON.parse(data32));
      }
    } catch (error) {}

    try {
      const data33 = await AsyncStorage.getItem('g2NorthDrainPh');
      if (data33 !== null) {
        setG2NorthDrainPh(JSON.parse(data33));
      }
    } catch (error) {}

    try {
      const data34 = await AsyncStorage.getItem('g2Valve5DripMls');
      if (data34 !== null) {
        setG2Valve5DripMls(JSON.parse(data34));
      }
    } catch (error) {}

    try {
      const data35 = await AsyncStorage.getItem('g2Valve6DripMls');
      if (data35 !== null) {
        setG2Valve6DripMls(JSON.parse(data35));
      }
    } catch (error) {}

    try {
      const data36 = await AsyncStorage.getItem('g2Valve7DripMls');
      if (data36 !== null) {
        setG2Valve7DripMls(JSON.parse(data36));
      }
    } catch (error) {}

    try {
      const data37 = await AsyncStorage.getItem('g2Valve8DripMls');
      if (data37 !== null) {
        setG2Valve8DripMls(JSON.parse(data37));
      }
    } catch (error) {}

    try {
      const data38 = await AsyncStorage.getItem('g2Valve9DripMls');
      if (data38 !== null) {
        setG2Valve9DripMls(JSON.parse(data38));
      }
    } catch (error) {}

    try {
      const data39 = await AsyncStorage.getItem('g2Valve10DripMls');
      if (data39 !== null) {
        setG2Valve10DripMls(JSON.parse(data39));
        9;
      }
    } catch (error) {}

    try {
      const data381 = await AsyncStorage.getItem('g2Valve11DripMls');
      if (data381 !== null) {
        setG2Valve11DripMls(JSON.parse(data381));
      }
    } catch (error) {}

    try {
      const data391 = await AsyncStorage.getItem('g2Valve12DripMls');
      if (data391 !== null) {
        setG2Valve12DripMls(JSON.parse(data391));
      }
    } catch (error) {}
    //END

    //G3 ASYNC getItem
    try {
      const data40 = await AsyncStorage.getItem('g3SouthDripMls');
      if (data40 !== null) {
        setG3SouthDripMls(JSON.parse(data40));
      }
    } catch (error) {}

    try {
      const data41 = await AsyncStorage.getItem('g3SouthDripEC');
      if (data41 !== null) {
        setG3SouthDripEC(JSON.parse(data41));
      }
    } catch (error) {}

    try {
      const data42 = await AsyncStorage.getItem('g3SouthDripPh');
      if (data42 !== null) {
        setG3SouthDripPh(JSON.parse(data42));
      }
    } catch (error) {}

    try {
      const data43 = await AsyncStorage.getItem('g3SouthDrainMls');
      if (data43 !== null) {
        setG3SouthDrainMls(JSON.parse(data43));
      }
    } catch (error) {}

    try {
      const data44 = await AsyncStorage.getItem('g3SouthDrainEc');
      if (data44 !== null) {
        setG3SouthDrainEc(JSON.parse(data44));
      }
    } catch (error) {}

    try {
      const data45 = await AsyncStorage.getItem('g3SouthDrainPh');
      if (data45 !== null) {
        setG3SouthDrainPh(JSON.parse(data45));
      }
    } catch (error) {}

    try {
      const data46 = await AsyncStorage.getItem('g3NorthDripMls');
      if (data46 !== null) {
        setG3NorthDripMls(JSON.parse(data46));
      }
    } catch (error) {}

    try {
      const data47 = await AsyncStorage.getItem('g3NorthDripEC');
      if (data47 !== null) {
        setG3NorthDripEC(JSON.parse(data47));
      }
    } catch (error) {}

    try {
      const data48 = await AsyncStorage.getItem('g3NorthDripPh');
      if (data48 !== null) {
        setG3NorthDripPh(JSON.parse(data48));
      }
    } catch (error) {}

    try {
      const data49 = await AsyncStorage.getItem('g3NorthDrainMls');
      if (data49 !== null) {
        setG3NorthDrainMls(JSON.parse(data49));
      }
    } catch (error) {}

    try {
      const data50 = await AsyncStorage.getItem('g3NorthDrainEC');
      if (data50 !== null) {
        setG3NorthDrainEC(JSON.parse(data50));
      }
    } catch (error) {}

    try {
      const data51 = await AsyncStorage.getItem('g3NorthDrainPh');
      if (data51 !== null) {
        setG3NorthDrainPh(JSON.parse(data51));
      }
    } catch (error) {}

    try {
      const data52 = await AsyncStorage.getItem('g3Valve20DripMls');
      if (data52 !== null) {
        setG3Valve20DripMls(JSON.parse(data52));
      }
    } catch (error) {}

    try {
      const data53 = await AsyncStorage.getItem('g3Valve13DripMls');
      if (data53 !== null) {
        setG3Valve13DripMls(JSON.parse(data53));
      }
    } catch (error) {}

    try {
      const data54 = await AsyncStorage.getItem('g3Valve14DripMls');
      if (data54 !== null) {
        setG3Valve14DripMls(JSON.parse(data54));
      }
    } catch (error) {}

    try {
      const data55 = await AsyncStorage.getItem('g3Valve15DripMls');
      if (data55 !== null) {
        setG3Valve15DripMls(JSON.parse(data55));
      }
    } catch (error) {}

    try {
      const data56 = await AsyncStorage.getItem('g3Valve16DripMls');
      if (data56 !== null) {
        setG3Valve16DripMls(JSON.parse(data56));
      }
    } catch (error) {}

    try {
      const data57 = await AsyncStorage.getItem('g3Valve17DripMls');
      if (data57 !== null) {
        setG3Valve17DripMls(JSON.parse(data57));
      }
    } catch (error) {}

    try {
      const data58 = await AsyncStorage.getItem('g3Valve18DripMls');
      if (data58 !== null) {
        setG3Valve18DripMls(JSON.parse(data58));
      }
    } catch (error) {}

    try {
      const data59 = await AsyncStorage.getItem('g3Valve19DripMls');
      if (data59 !== null) {
        setG3Valve19DripMls(JSON.parse(data59));
      }
    } catch (error) {}
    //END

    //G4 ASYNC getItem
    try {
      const data60 = await AsyncStorage.getItem('g4SouthDripMls');
      if (data60 !== null) {
        setG4SouthDripMls(JSON.parse(data60));
      }
    } catch (error) {}

    try {
      const data61 = await AsyncStorage.getItem('g4SouthDripEC');
      if (data61 !== null) {
        setG4SouthDripEC(JSON.parse(data61));
      }
    } catch (error) {}

    try {
      const data62 = await AsyncStorage.getItem('g4SouthDripPh');
      if (data62 !== null) {
        setG4SouthDripPh(JSON.parse(data62));
      }
    } catch (error) {}

    try {
      const data63 = await AsyncStorage.getItem('g4SouthDrainMls');
      if (data63 !== null) {
        setG4SouthDrainMls(JSON.parse(data63));
      }
    } catch (error) {}

    try {
      const data64 = await AsyncStorage.getItem('g4SouthDrainEc');
      if (data64 !== null) {
        setG4SouthDrainEc(JSON.parse(data64));
      }
    } catch (error) {}

    try {
      const data65 = await AsyncStorage.getItem('g4SouthDrainPh');
      if (data65 !== null) {
        setG4SouthDrainPh(JSON.parse(data65));
      }
    } catch (error) {}

    try {
      const data66 = await AsyncStorage.getItem('g4NorthDripMls');
      if (data66 !== null) {
        setG4NorthDripMls(JSON.parse(data66));
      }
    } catch (error) {}

    try {
      const data67 = await AsyncStorage.getItem('g4NorthDripEC');
      if (data67 !== null) {
        setG4NorthDripEC(JSON.parse(data67));
      }
    } catch (error) {}

    try {
      const data68 = await AsyncStorage.getItem('g4NorthDripPh');
      if (data68 !== null) {
        setG4NorthDripPh(JSON.parse(data68));
      }
    } catch (error) {}

    try {
      const data69 = await AsyncStorage.getItem('g4NorthDrainMls');
      if (data69 !== null) {
        setG4NorthDrainMls(JSON.parse(data69));
      }
    } catch (error) {}

    try {
      const data70 = await AsyncStorage.getItem('g4NorthDrainEC');
      if (data70 !== null) {
        setG4NorthDrainEC(JSON.parse(data70));
      }
    } catch (error) {}

    try {
      const data71 = await AsyncStorage.getItem('g4NorthDrainPh');
      if (data71 !== null) {
        setG4NorthDrainPh(JSON.parse(data71));
      }
    } catch (error) {}

    try {
      const data72 = await AsyncStorage.getItem('g4Valve21DripMls');
      if (data72 !== null) {
        setG4Valve21DripMls(JSON.parse(data72));
      }
    } catch (error) {}

    try {
      const data73 = await AsyncStorage.getItem('g4Valve22DripMls');
      if (data73 !== null) {
        setG4Valve22DripMls(JSON.parse(data73));
      }
    } catch (error) {}

    try {
      const data74 = await AsyncStorage.getItem('g4Valve23DripMls');
      if (data74 !== null) {
        setG4Valve23DripMls(JSON.parse(data74));
      }
    } catch (error) {}

    try {
      const data75 = await AsyncStorage.getItem('g4Valve24DripMls');
      if (data75 !== null) {
        setG4Valve24DripMls(JSON.parse(data75));
      }
    } catch (error) {}

    //END

    //G5 ASYNC getItem
    try {
      const data76 = await AsyncStorage.getItem('g5FirstDripMls');
      if (data76 !== null) {
        setG5FirstDripMls(JSON.parse(data76));
      }
    } catch (error) {}

    try {
      const data77 = await AsyncStorage.getItem('g5FirstDripEC');
      if (data77 !== null) {
        setG5FirstDripEC(JSON.parse(data77));
      }
    } catch (error) {}

    try {
      const data78 = await AsyncStorage.getItem('g5FirstDripPh');
      if (data78 !== null) {
        setG5FirstDripPh(JSON.parse(data78));
      }
    } catch (error) {}

    try {
      const data79 = await AsyncStorage.getItem('g5FirstDrainMls');
      if (data79 !== null) {
        setG5FirstDrainMls(JSON.parse(data79));
      }
    } catch (error) {}

    try {
      const data80 = await AsyncStorage.getItem('g5FirstDrainEc');
      if (data80 !== null) {
        setG5FirstDrainEc(JSON.parse(data80));
      }
    } catch (error) {}

    try {
      const data81 = await AsyncStorage.getItem('g5FirstDrainPh');
      if (data81 !== null) {
        setG5FirstDrainPh(JSON.parse(data81));
      }
    } catch (error) {}

    try {
      const data82 = await AsyncStorage.getItem('g5SecondDripMls');
      if (data82 !== null) {
        setG5SecondDripMls(JSON.parse(data82));
      }
    } catch (error) {}

    try {
      const data83 = await AsyncStorage.getItem('g5SecondDripEC');
      if (data83 !== null) {
        setG5SecondDripEC(JSON.parse(data83));
      }
    } catch (error) {}

    try {
      const data84 = await AsyncStorage.getItem('g5SecondDripPh');
      if (data84 !== null) {
        setG5SecondDripPh(JSON.parse(data84));
      }
    } catch (error) {}

    try {
      const data85 = await AsyncStorage.getItem('g5SecondDrainMls');
      if (data85 !== null) {
        setG5SecondDrainMls(JSON.parse(data85));
      }
    } catch (error) {}

    try {
      const data86 = await AsyncStorage.getItem('g5SecondDrainEC');
      if (data86 !== null) {
        setG5SecondDrainEC(JSON.parse(data86));
      }
    } catch (error) {}

    try {
      const data87 = await AsyncStorage.getItem('g5SecondDrainPh');
      if (data87 !== null) {
        setG5SecondDrainPh(JSON.parse(data87));
      }
    } catch (error) {}

    try {
      const data88 = await AsyncStorage.getItem('g5Valve25DripMls');
      if (data88 !== null) {
        setG5Valve25DripMls(JSON.parse(data88));
      }
    } catch (error) {}

    try {
      const data89 = await AsyncStorage.getItem('g5Valve26DripMls');
      if (data89 !== null) {
        setG5Valve26DripMls(JSON.parse(data89));
      }
    } catch (error) {}

    try {
      const data90 = await AsyncStorage.getItem('g5Valve27DripMls');
      if (data90 !== null) {
        setG5Valve27DripMls(JSON.parse(data90));
      }
    } catch (error) {}

    //END

    //BORE READINGS

    try {
      const data91 = await AsyncStorage.getItem('bore1Hours');
      if (data91 !== null) {
        setBore1Hours(JSON.parse(data91));
      }
    } catch (error) {}

    try {
      const data92 = await AsyncStorage.getItem('bore1m3');

      if (data92 !== null) {
        setBore1m3(JSON.parse(data92));
      }
    } catch (error) {}

    try {
      const data93 = await AsyncStorage.getItem('electricity');

      if (data93 !== null) {
        setElectricity(JSON.parse(data93));
      }
    } catch (error) {}

    try {
      const data94 = await AsyncStorage.getItem('Septicm3');

      if (data94 !== null) {
        setSepticm3(JSON.parse(data94));
      }
    } catch (error) {}
  };

  //ASYNC METHOD

  const setItem = async (myKey, value) => {
    try {
      return await AsyncStorage.setItem(myKey, JSON.stringify(value));
    } catch (error) {
      // console.error('AsyncStorage#setItem error: ' + error.message);
    }
  };

  //

  //DATE PICKER

  const hideDatePicker = () => {
    setVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateYesterday(moment(date).format('DD/MM/YYYY'));
    const dateFormat = moment(date).format('YYYY-MM-DD');
    hideDatePicker();
    const dayBasedOnDate = getDayOfWeek(dateFormat);
    setDayYesterday(dayBasedOnDate);
    setItem('dateYesterday', moment(date).format('DD/MM/YYYY'));
    setItem('dayYesterday', dayBasedOnDate);

    //GET DATA FROM REALM

    /* console.log("DATE DEMO : "+state.dateYesterday - 1);
         var dateDemo = state.dateYesterday - 1
         var entry_details = realm
             .objects('daily_readings_offline_table')
             .filtered('dateYesterday =' + '03/03/2021');
         console.log(entry_details);
         if (entry_details.length > 0) {
 
             console.log(entry_details[0]);
 
         } else {
 
             alert('No entry found');
 
         }*/

    //END
  };

  const onPressCancel = () => {
    setVisibility(false);
  };

  const onPressButton = () => {
    setVisibility(true);
  };

  const clearText = () => {
    setVisibility(true);
    setDateYesterday('');
  };
  //

  //GET DAY BASED ON DATE SELECTED
  const getDayOfWeek = (date) => {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek)
      ? null
      : [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ][dayOfWeek];
  };
  //

  //UPDATE TEXTINPUT
  updateTextInputYesterdayDate = (text, field) => {
    setItem(field, text);
    setDateYesterday(text);
  };

  updateTextInputYesterdayDay = (text, field) => {
    setItem(field, text);
    setDayYesterday(text);
  };

  updateTextInputGas = (text, field) => {
    setItem(field, text);
    setGas(text);
  };

  updateTextInputLiquidCO2 = (text, field) => {
    setItem(field, text);
    setLiquidCO2(text);
  };

  updateTextInputDrainDischarge = (text, field) => {
    setItem(field, text);
    setDrainDischarge(text);
  };

  updateTextInputg1SouthDripMls = (text, field) => {
    setItem(field, text);
    setG1SouthDripMls(text);
  };

  updateTextInputg1SouthDripEC = (text, field) => {
    setItem(field, text);
    setG1SouthDripEC(text);
  };

  updateTextInputg1SouthDripPh = (text, field) => {
    setItem(field, text);
    setG1SouthDripPh(text);
  };

  updateTextInputg1SouthDrainMls = (text, field) => {
    setItem(field, text);
    setG1SouthDrainMls(text);
  };

  updateTextInputg1SouthDrainEc = (text, field) => {
    setItem(field, text);
    setG1SouthDrainEc(text);
  };

  updateTextInputg1SouthDrainPh = (text, field) => {
    setItem(field, text);
    setG1SouthDrainPh(text);
  };

  updateTextInputg1NorthDripMls = (text, field) => {
    setItem(field, text);
    setG1NorthDripMls(text);
  };

  updateTextInputg1NorthDripEC = (text, field) => {
    setItem(field, text);
    setG1NorthDripEC(text);
  };

  updateTextInputg1NorthDripPh = (text, field) => {
    setItem(field, text);
    setG1NorthDripPh(text);
  };

  updateTextInputg1NorthDrainMls = (text, field) => {
    setItem(field, text);
    setG1NorthDrainMls(text);
  };

  updateTextInputg1NorthDrainEC = (text, field) => {
    setItem(field, text);
    setG1NorthDrainEC(text);
  };

  updateTextInputg1NorthDrainPh = (text, field) => {
    setItem(field, text);
    setG1NorthDrainPh(text);
  };

  updateTextInputg1Valve1DripMls = (text, field) => {
    setItem(field, text);
    setG1Valve1DripMls(text);
  };

  updateTextInputg1Valve2DripMls = (text, field) => {
    setItem(field, text);
    setG1Valve2DripMls(text);
  };

  updateTextInputg1Valve3DripMls = (text, field) => {
    setItem(field, text);
    setG1Valve3DripMls(text);
  };

  updateTextInputg1Valve4DripMls = (text, field) => {
    setItem(field, text);
    setG1Valve4DripMls(text);
  };

  //GER 2

  updateTextInputg2SouthDripMls = (text, field) => {
    setItem(field, text);
    setG2SouthDripMls(text);
  };

  updateTextInputg2SouthDripEC = (text, field) => {
    setItem(field, text);
    setG2SouthDripEC(text);
  };

  updateTextInputg2SouthDripPh = (text, field) => {
    setItem(field, text);
    setG2SouthDripPh(text);
  };

  updateTextInputg2SouthDrainMls = (text, field) => {
    setItem(field, text);
    setG2SouthDrainMls(text);
  };

  updateTextInputg2SouthDrainEc = (text, field) => {
    setItem(field, text);
    setG2SouthDrainEc(text);
  };

  updateTextInputg2SouthDrainPh = (text, field) => {
    setItem(field, text);
    setG2SouthDrainPh(text);
  };

  updateTextInputg2NorthDripMls = (text, field) => {
    setItem(field, text);
    setG2NorthDripMls(text);
  };

  updateTextInputg2NorthDripEC = (text, field) => {
    setItem(field, text);
    setG2NorthDripEC(text);
  };

  updateTextInputg2NorthDripPh = (text, field) => {
    setItem(field, text);
    setG2NorthDripPh(text);
  };

  updateTextInputg2NorthDrainMls = (text, field) => {
    setItem(field, text);
    setG2NorthDrainMls(text);
  };

  updateTextInputg2NorthDrainEC = (text, field) => {
    setItem(field, text);
    setG2NorthDrainEC(text);
  };

  updateTextInputg2NorthDrainPh = (text, field) => {
    setItem(field, text);
    setG2NorthDrainPh(text);
  };

  updateTextInputg2Valve5DripMls = (text, field) => {
    setItem(field, text);
    setG2Valve5DripMls(text);
  };

  updateTextInputg2Valve6DripMls = (text, field) => {
    setItem(field, text);
    setG2Valve6DripMls(text);
  };

  updateTextInputg2Valve7DripMls = (text, field) => {
    setItem(field, text);
    setG2Valve7DripMls(text);
  };

  updateTextInputg2Valve8DripMls = (text, field) => {
    setItem(field, text);
    setG2Valve8DripMls(text);
  };

  updateTextInputg2Valve9DripMls = (text, field) => {
    setItem(field, text);
    setG2Valve9DripMls(text);
  };

  updateTextInputg2Valve10DripMls = (text, field) => {
    setItem(field, text);
    setG2Valve10DripMls(text);
  };

  updateTextInputg2Valve11DripMls = (text, field) => {
    setItem(field, text);
    setG2Valve11DripMls(text);
  };

  updateTextInputg2Valve12DripMls = (text, field) => {
    setItem(field, text);
    setG2Valve12DripMls(text);
  };

  updateTextInputg3SouthDripMls = (text, field) => {
    setItem(field, text);
    setG3SouthDripMls(text);
  };

  updateTextInputg3SouthDripEC = (text, field) => {
    setItem(field, text);
    setG3SouthDripEC(text);
  };

  updateTextInputg3SouthDripPh = (text, field) => {
    setItem(field, text);
    setG3SouthDripPh(text);
  };

  updateTextInputg3SouthDrainMls = (text, field) => {
    setItem(field, text);
    setG3SouthDrainMls(text);
  };

  updateTextInputg3SouthDrainEc = (text, field) => {
    setItem(field, text);
    setG3SouthDrainEc(text);
  };

  updateTextInputg3SouthDrainPh = (text, field) => {
    setItem(field, text);
    setG3SouthDrainPh(text);
  };

  updateTextInputg3NorthDripMls = (text, field) => {
    setItem(field, text);
    setG3NorthDripMls(text);
  };

  updateTextInputg3NorthDripEC = (text, field) => {
    setItem(field, text);
    setG3NorthDripEC(text);
  };

  updateTextInputg3NorthDripPh = (text, field) => {
    setItem(field, text);
    setG3NorthDripPh(text);
  };

  updateTextInputg3NorthDrainMls = (text, field) => {
    setItem(field, text);
    setG3NorthDrainMls(text);
  };

  updateTextInputg3NorthDrainEC = (text, field) => {
    setItem(field, text);
    setG3NorthDrainEC(text);
  };

  updateTextInputg3NorthDrainPh = (text, field) => {
    setItem(field, text);
    setG3NorthDrainPh(text);
  };

  updateTextInputg3Valve13DripMls = (text, field) => {
    setItem(field, text);
    setG3Valve13DripMls(text);
  };

  updateTextInputg3Valve14DripMls = (text, field) => {
    setItem(field, text);
    setG3Valve14DripMls(text);
  };

  updateTextInputg3Valve15DripMls = (text, field) => {
    setItem(field, text);
    setG3Valve15DripMls(text);
  };

  updateTextInputg3Valve16DripMls = (text, field) => {
    setItem(field, text);
    setG3Valve16DripMls(text);
  };

  updateTextInputg3Valve17DripMls = (text, field) => {
    setItem(field, text);
    setG3Valve17DripMls(text);
  };

  updateTextInputg3Valve18DripMls = (text, field) => {
    setItem(field, text);
    setG3Valve18DripMls(text);
  };

  updateTextInputg3Valve19DripMls = (text, field) => {
    setItem(field, text);
    setG3Valve19DripMls(text);
  };

  updateTextInputg3Valve20DripMls = (text, field) => {
    setItem(field, text);
    setG3Valve20DripMls(text);
  };

  updateTextInputg4SouthDripMls = (text, field) => {
    setItem(field, text);
    setG4SouthDripMls(text);
  };

  updateTextInputg4SouthDripEC = (text, field) => {
    setItem(field, text);
    setG4SouthDripEC(text);
  };

  updateTextInputg4SouthDripPh = (text, field) => {
    setItem(field, text);
    setG4SouthDripPh(text);
  };

  updateTextInputg4SouthDrainMls = (text, field) => {
    setItem(field, text);
    setG4SouthDrainMls(text);
  };

  updateTextInputg4SouthDrainEc = (text, field) => {
    setItem(field, text);
    setG4SouthDrainEc(text);
  };

  updateTextInputg4SouthDrainPh = (text, field) => {
    setItem(field, text);
    setG4SouthDrainPh(text);
  };

  updateTextInputg4NorthDripMls = (text, field) => {
    setItem(field, text);
    setG4NorthDripMls(text);
  };

  updateTextInputg4NorthDripEC = (text, field) => {
    setItem(field, text);
    setG4NorthDripEC(text);
  };

  updateTextInputg4NorthDripPh = (text, field) => {
    setItem(field, text);
    setG4NorthDripPh(text);
  };

  updateTextInputg4NorthDrainMls = (text, field) => {
    setItem(field, text);
    setG4NorthDrainMls(text);
  };

  updateTextInputg4NorthDrainEC = (text, field) => {
    setItem(field, text);
    setG4NorthDrainEC(text);
  };

  updateTextInputg4NorthDrainPh = (text, field) => {
    setItem(field, text);
    setG4NorthDrainPh(text);
  };

  updateTextInputg4Valve21DripMls = (text, field) => {
    setItem(field, text);
    setG4Valve21DripMls(text);
  };

  updateTextInputg4Valve22DripMls = (text, field) => {
    setItem(field, text);
    setG4Valve22DripMls(text);
  };

  updateTextInputg4Valve23DripMls = (text, field) => {
    setItem(field, text);
    setG4Valve23DripMls(text);
  };

  updateTextInputg4Valve24DripMls = (text, field) => {
    setItem(field, text);
    setG4Valve24DripMls(text);
  };

  updateTextInputg5FirstDripMls = (text, field) => {
    setItem(field, text);
    setG5FirstDripMls(text);
  };

  updateTextInputg5FirstDripEC = (text, field) => {
    setItem(field, text);
    setG5FirstDripEC(text);
  };

  updateTextInputg5FirstDripPh = (text, field) => {
    setItem(field, text);
    setG5FirstDripPh(text);
  };

  updateTextInputg5FirstDrainMls = (text, field) => {
    setItem(field, text);
    setG5FirstDrainMls(text);
  };

  updateTextInputg5FirstDrainEc = (text, field) => {
    setItem(field, text);
    setG5FirstDrainEc(text);
  };

  updateTextInputg5FirstDrainPh = (text, field) => {
    setItem(field, text);
    setG5FirstDrainPh(text);
  };

  updateTextInputg5SecondDripMls = (text, field) => {
    setItem(field, text);
    setG5SecondDripMls(text);
  };

  updateTextInputg5SecondDripEC = (text, field) => {
    setItem(field, text);
    setG5SecondDripEC(text);
  };

  updateTextInputg5SecondDripPh = (text, field) => {
    setItem(field, text);
    setG5SecondDripPh(text);
  };

  updateTextInputg5SecondDrainMls = (text, field) => {
    setItem(field, text);
    setG5SecondDrainMls(text);
  };

  updateTextInputg5SecondDrainEC = (text, field) => {
    setItem(field, text);
    setG5SecondDrainEC(text);
  };

  updateTextInputg5SecondDrainPh = (text, field) => {
    setItem(field, text);
    setG5SecondDrainPh(text);
  };

  updateTextInputg5Valve25DripMls = (text, field) => {
    setItem(field, text);
    setG5Valve25DripMls(text);
  };

  updateTextInputg5Valve26DripMls = (text, field) => {
    setItem(field, text);
    setG5Valve26DripMls(text);
  };

  updateTextInputg5Valve27DripMls = (text, field) => {
    setItem(field, text);
    setG5Valve27DripMls(text);
  };

  updateTextInputbore1Hours = (text, field) => {
    setItem(field, text);
    setBore1Hours(text);
  };

  updateTextInputbore1m3 = (text, field) => {
    setItem(field, text);
    setBore1m3(text);
  };

  updateTextInputelectricity = (text, field) => {
    setItem(field, text);
    setElectricity(text);
  };

  updateTextInputSepticm3 = (text, field) => {
    setItem(field, text);
    setSepticm3(text);
  };

  //

  //GET AWS

  const getDailyReadingsData = () => {
    /*useLazyQuery(GET_DAILY_READINGS, {
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {
        console.log('Data from AWS : ', data);

        try {
          setSample(data?.user_registration);

          if (data !== null) {
            renderEntryDate();
          }
        } catch (error) {
          console.log(error);
        }
      },
    });*/
  };

  //

  const renderEntryDate = () => {
    const currentDate2 = moment().subtract(1, 'days').format('DD/MM/YYYY');

    console.log("Yesterday's date : " + currentDate2);

    const entryData = sample;
    //const convertEntryData = JSON.stringify(entryData.body.rows[0])
    const yesterdaysDate = (d) => d.currentdate === currentDate2;

    const filteredData = entryData.body.rows.filter(yesterdaysDate);

    setFilteredSampleData(filteredData);

    //END
  };

  //SEND DATA BUTTON METHOD
  const sendData = () => {
    setIsLoading(true);

    //SEND DATA TO AWS

    if (isItConnected === 'Online') {
      if (gas === null) {
        setGas('0');
      }

      if (liquidCO2 === null) {
        setLiquidCO2('0');
      }

      if (drainDischarge === null) {
        setDrainDischarge('0');
      }

      if (g1SouthDripMls === null) {
        setG1SouthDripMls('0');
      }

      if (g1SouthDripEC === null) {
        setG1SouthDripEC('0');
      }

      if (g1SouthDripPh === null) {
        setG1SouthDripPh('0');
      }

      if (g1SouthDrainMls === null) {
        setG1SouthDrainMls('0');
      }

      if (g1SouthDrainEc === null) {
        setG1SouthDrainEc('0');
      }

      if (g1SouthDrainPh === null) {
        setG1SouthDrainPh('0');
      }

      if (g1NorthDripMls === null) {
        setG1NorthDripMls('0');
      }

      if (g1NorthDripEC === null) {
        setG1NorthDripEC('0');
      }

      if (g1NorthDripPh === null) {
        setG1NorthDripPh('0');
      }

      if (g1NorthDrainMls === null) {
        setG1NorthDrainMls('0');
      }

      if (g1NorthDrainEC === null) {
        setG1NorthDrainEC('0');
      }

      if (g1NorthDrainPh === null) {
        setG1NorthDrainPh('0');
      }

      if (g1Valve1DripMls === null) {
        setG1Valve1DripMls('0');
      }

      if (g1Valve2DripMls === null) {
        setG1Valve2DripMls('0');
      }

      if (g1Valve3DripMls === null) {
        setG1Valve3DripMls('0');
      }

      if (g1Valve4DripMls === null) {
        setG1Valve4DripMls('0');
      }

      if (g2SouthDripMls === null) {
        setG2SouthDripMls('0');
      }

      if (g2SouthDripEC === null) {
        setG2SouthDripEC('0');
      }

      if (g2SouthDripPh === null) {
        setG2SouthDripPh('0');
      }

      if (g2SouthDrainMls === null) {
        setG2SouthDrainMls('0');
      }

      if (g2SouthDrainEc === null) {
        setG2SouthDrainEc('0');
      }

      if (g2SouthDrainPh === null) {
        setG2SouthDrainPh('0');
      }

      if (g2NorthDripMls === null) {
        setG2NorthDripMls('0');
      }

      if (g2NorthDripEC === null) {
        setG2NorthDripEC('0');
      }

      if (g2NorthDripPh === null) {
        setG2NorthDripPh('0');
      }

      if (g2NorthDrainMls === null) {
        setG2NorthDrainMls('0');
      }

      if (g2NorthDrainEC === null) {
        setG2NorthDrainEC('0');
      }

      if (g2NorthDrainPh === null) {
        setG2NorthDrainPh('0');
      }

      if (g2Valve5DripMls === null) {
        setG2Valve5DripMls('0');
      }

      if (g2Valve6DripMls === null) {
        setG2Valve6DripMls('0');
      }

      if (g2Valve7DripMls === null) {
        setG2Valve7DripMls('0');
      }

      if (g2Valve8DripMls === null) {
        setG2Valve8DripMls('0');
      }

      if (g2Valve9DripMls === null) {
        setG2Valve9DripMls('0');
      }

      if (g2Valve10DripMls === null) {
        setG2Valve10DripMls('0');
      }

      if (g2Valve11DripMls === null) {
        setG2Valve11DripMls('0');
      }

      if (g2Valve12DripMls === null) {
        setG2Valve12DripMls('0');
      }

      if (g3SouthDripMls === null) {
        setG3SouthDripMls('0');
      }

      if (g3SouthDripEC === null) {
        setG3SouthDripEC('0');
      }

      if (g3SouthDripPh === null) {
        setG3SouthDripPh('0');
      }

      if (g3SouthDrainMls === null) {
        setG3SouthDrainMls('0');
      }

      if (g3SouthDrainEc === null) {
        setG3SouthDrainEc('0');
      }

      if (g3SouthDrainPh === null) {
        setG3SouthDrainPh('0');
      }

      if (g3NorthDrainMls === null) {
        setG3NorthDrainMls('0');
      }

      if (g3NorthDrainEC === null) {
        setG3NorthDrainEC('0');
      }

      if (g3NorthDrainPh === null) {
        setG3NorthDrainPh('0');
      }

      if (g3Valve13DripMls === null) {
        setG3Valve13DripMls('0');
      }

      if (g3Valve14DripMls === null) {
        setG3Valve14DripMls('0');
      }

      if (g3Valve15DripMls === null) {
        setG3Valve15DripMls('0');
      }

      if (g3Valve16DripMls === null) {
        setG3Valve16DripMls('0');
      }

      if (g3Valve17DripMls === null) {
        setG3Valve17DripMls('0');
      }

      if (g3Valve18DripMls === null) {
        setG3Valve18DripMls('0');
      }

      if (g3Valve19DripMls === null) {
        setG3Valve19DripMls('0');
      }

      if (g3Valve20DripMls === null) {
        setG3Valve20DripMls('0');
      }

      if (g4SouthDripMls === null) {
        setG4SouthDripMls('0');
      }

      if (g4SouthDripEC === null) {
        setG4SouthDripEC('0');
      }

      if (g4SouthDripPh === null) {
        setG4SouthDripPh('0');
      }

      if (g4SouthDrainMls === null) {
        setG4SouthDrainMls('0');
      }

      if (g4SouthDrainEc === null) {
        setG4SouthDrainEc('0');
      }

      if (g4SouthDrainPh === null) {
        setG4SouthDrainPh('0');
      }

      if (g4NorthDripMls === null) {
        setG4NorthDripMls('0');
      }

      if (g4NorthDripEC === null) {
        setG4NorthDripEC('0');
      }

      if (g4NorthDripPh === null) {
        setG4NorthDripPh('0');
      }

      if (g4NorthDrainMls === null) {
        setG4NorthDrainMls('0');
      }

      if (g4NorthDrainEC === null) {
        setG4NorthDrainEC('0');
      }

      if (g4NorthDrainPh === null) {
        setG4NorthDrainPh('0');
      }

      if (g4Valve21DripMls === null) {
        setG4Valve21DripMls('0');
      }

      if (g4Valve22DripMls === null) {
        setG4Valve22DripMls('0');
      }

      if (g4Valve23DripMls === null) {
        setG4Valve23DripMls('0');
      }

      if (g4Valve24DripMls === null) {
        setG4Valve24DripMls('0');
      }

      if (g5FirstDripMls === null) {
        setG5FirstDripMls('0');
      }

      if (g5FirstDripEC === null) {
        setG5FirstDripEC('0');
      }

      if (g5FirstDripPh === null) {
        setG5FirstDripPh('0');
      }

      if (g5FirstDrainMls === null) {
        setG5FirstDrainMls('0');
      }

      if (g5FirstDrainEc === null) {
        setG5FirstDrainEc('0');
      }

      if (g5FirstDrainPh === null) {
        setG5FirstDrainPh('0');
      }

      if (g5SecondDripMls === null) {
        setG5SecondDripMls('0');
      }

      if (g5SecondDripEC === null) {
        setG5SecondDripEC('0');
      }

      if (g5SecondDripPh === null) {
        setG5SecondDripPh('0');
      }

      if (g5SecondDrainMls === null) {
        setG5SecondDrainMls('0');
      }

      if (g5SecondDrainEC === null) {
        setG5SecondDrainEC('0');
      }

      if (g5SecondDrainPh === null) {
        setG5SecondDrainPh('0');
      }

      if (g5Valve25DripMls === null) {
        setG5Valve25DripMls('0');
      }

      if (g5Valve26DripMls === null) {
        setG5Valve26DripMls('0');
      }

      if (g5Valve27DripMls === null) {
        setG5Valve27DripMls('0');
      }

      if (bore1Hours === null) {
        setBore1Hours('0');
      }

      if (bore1m3 === null) {
        setBore1m3('0');
      }

      if (electricity === null) {
        setElectricity('0');
      }

      if (Septicm3 === null) {
        setSepticm3('0');
      }

      getPromiseObject(
        'POST',
        ' https://gfed26lq0c.execute-api.ap-southeast-2.amazonaws.com/dev/v1/saveData',
        {
          siteName: state.siteName.toString(),
          currentDate: state.currentDate.toString(),
          dateYesterday: state.dateYesterday.toString(),
          dayYesterday: state.dayYesterday.toString(),
          gas: parseInt(state.gas),
          liquidCO2: parseFloat(state.liquidCO2),
          drainDischarge: parseInt(state.drainDischarge),
          g1SouthDripMls: parseInt(state.g1SouthDripMls),
          g1SouthDripEC: parseFloat(state.g1SouthDripEC),
          g1SouthDripPh: parseFloat(state.g1SouthDripPh),
          g1SouthDrainMls: parseInt(state.g1SouthDrainMls),
          g1SouthDrainEc: parseFloat(state.g1SouthDrainEc),
          g1SouthDrainPh: parseFloat(state.g1SouthDrainPh),
          g1NorthDripMls: parseInt(state.g1NorthDripMls),
          g1NorthDripEC: parseFloat(state.g1NorthDripEC),
          g1NorthDripPh: parseFloat(state.g1NorthDripPh),
          g1NorthDrainMls: parseInt(state.g1NorthDrainMls),
          g1NorthDrainEC: parseFloat(state.g1NorthDrainEC),
          g1NorthDrainPh: parseFloat(state.g1NorthDrainPh),
          g1Valve1DripMls: parseInt(state.g1Valve1DripMls),
          g1Valve2DripMls: parseInt(state.g1Valve2DripMls),
          g1Valve3DripMls: parseInt(state.g1Valve3DripMls),
          g1Valve4DripMls: parseInt(state.g1Valve4DripMls),
          g2SouthDripMls: parseInt(state.g2SouthDripMls),
          g2SouthDripEC: parseFloat(state.g2SouthDripEC),
          g2SouthDripPh: parseFloat(state.g2SouthDripPh),
          g2SouthDrainMls: parseInt(state.g2SouthDrainMls),
          g2SouthDrainEc: parseFloat(state.g2SouthDrainEc),
          g2SouthDrainPh: parseFloat(state.g2SouthDrainPh),
          g2NorthDripMls: parseInt(state.g2NorthDripMls),
          g2NorthDripEC: parseFloat(state.g2NorthDripEC),
          g2NorthDripPh: parseFloat(state.g2NorthDripPh),
          g2NorthDrainMls: parseInt(state.g2NorthDrainMls),
          g2NorthDrainEC: parseFloat(state.g2NorthDrainEC),
          g2NorthDrainPh: parseFloat(state.g2NorthDrainPh),
          g2Valve5DripMls: parseInt(state.g2Valve5DripMls),
          g2Valve6DripMls: parseInt(state.g2Valve6DripMls),
          g2Valve7DripMls: parseInt(state.g2Valve7DripMls),
          g2Valve8DripMls: parseInt(state.g2Valve8DripMls),
          g2Valve9DripMls: parseInt(state.g2Valve9DripMls),
          g2Valve10DripMls: parseInt(state.g2Valve10DripMls),
          g2Valve11DripMls: parseInt(state.g2Valve11DripMls),
          g2Valve12DripMls: parseInt(state.g2Valve12DripMls),
          g3SouthDripMls: parseInt(state.g3SouthDripMls),
          g3SouthDripEC: parseFloat(state.g3SouthDripEC),
          g3SouthDripPh: parseFloat(state.g3SouthDripPh),
          g3SouthDrainMls: parseInt(state.g3SouthDrainMls),
          g3SouthDrainEc: parseFloat(state.g3SouthDrainEc),
          g3SouthDrainPh: parseFloat(state.g3SouthDrainPh),
          g3NorthDripMls: parseInt(state.g3NorthDripMls),
          g3NorthDripEC: parseFloat(state.g3NorthDripEC),
          g3NorthDripPh: parseFloat(state.g3NorthDripPh),
          g3NorthDrainMls: parseInt(state.g3NorthDrainMls),
          g3NorthDrainEC: parseFloat(state.g3NorthDrainEC),
          g3NorthDrainPh: parseFloat(state.g3NorthDrainPh),
          g3Valve13DripMls: parseInt(state.g3Valve13DripMls),
          g3Valve14DripMls: parseInt(state.g3Valve14DripMls),
          g3Valve15DripMls: parseInt(state.g3Valve15DripMls),
          g3Valve16DripMls: parseInt(state.g3Valve16DripMls),
          g3Valve17DripMls: parseInt(state.g3Valve17DripMls),
          g3Valve18DripMls: parseInt(state.g3Valve18DripMls),
          g3Valve19DripMls: parseInt(state.g3Valve19DripMls),
          g3Valve20DripMls: parseInt(state.g3Valve20DripMls),
          g4SouthDripMls: parseInt(state.g4SouthDripMls),
          g4SouthDripEC: parseFloat(state.g4SouthDripEC),
          g4SouthDripPh: parseFloat(state.g4SouthDripPh),
          g4SouthDrainMls: parseInt(state.g4SouthDrainMls),
          g4SouthDrainEc: parseFloat(state.g4SouthDrainEc),
          g4SouthDrainPh: parseFloat(state.g4SouthDrainPh),
          g4NorthDripMls: parseInt(state.g4NorthDripMls),
          g4NorthDripEC: parseFloat(state.g4NorthDripEC),
          g4NorthDripPh: parseFloat(state.g4NorthDripPh),
          g4NorthDrainMls: parseInt(state.g4NorthDrainMls),
          g4NorthDrainEC: parseFloat(state.g4NorthDrainEC),
          g4NorthDrainPh: parseFloat(state.g4NorthDrainPh),
          g4Valve21DripMls: parseInt(state.g4Valve21DripMls),
          g4Valve22DripMls: parseInt(state.g4Valve22DripMls),
          g4Valve23DripMls: parseInt(state.g4Valve23DripMls),
          g4Valve24DripMls: parseInt(state.g4Valve24DripMls),
          g5FirstDripMls: parseInt(state.g5FirstDripMls),
          g5FirstDripEC: parseFloat(state.g5FirstDripEC),
          g5FirstDripPh: parseFloat(state.g5FirstDripPh),
          g5FirstDrainMls: parseInt(state.g5FirstDrainMls),
          g5FirstDrainEc: parseFloat(state.g5FirstDrainEc),
          g5FirstDrainPh: parseFloat(state.g5FirstDrainPh),
          g5SecondDripMls: parseInt(state.g5SecondDripMls),
          g5SecondDripEC: parseFloat(state.g5SecondDripEC),
          g5SecondDripPh: parseFloat(state.g5SecondDripPh),
          g5SecondDrainMls: parseInt(state.g5SecondDrainMls),
          g5SecondDrainEC: parseFloat(state.g5SecondDrainEC),
          g5SecondDrainPh: parseFloat(state.g5SecondDrainPh),
          g5Valve25DripMls: parseInt(state.g5Valve25DripMls),
          g5Valve26DripMls: parseInt(state.g5Valve26DripMls),
          g5Valve27DripMls: parseInt(state.g5Valve27DripMls),
          bore1Hours: parseInt(state.bore1Hours),
          bore1m3: parseInt(state.bore1m3),
          electricity: parseFloat(state.electricity),
          Septicm3: parseInt(state.Septicm3),
        },
        false,
      ).then(
        (result) => {
          try {
            const res = result;
            console.log(res);

            realm.write(() => {
              ID =
                realm
                  .objects('daily_readings_offline_table')
                  .sorted('entry_id', true).length > 0
                  ? realm
                      .objects('daily_readings_offline_table')
                      .sorted('entry_id', true)[0].entry_id + 1
                  : 1;
              realm.create('daily_readings_offline_table', {
                entry_id: ID,
                site_name: siteName.toString(),
                currentDate: currentDate.toString(),
                dateYesterday: dateYesterday.toString(),
                dayYesterday: dayYesterday.toString(),
                gas: gas.toString(),
                liquidCO2: liquidCO2.toString(),
                drainDischarge: drainDischarge.toString(),
                g1SouthDripMls: g1SouthDripMls.toString(),
                g1SouthDripEC: g1SouthDripEC.toString(),
                g1SouthDripPh: g1SouthDripPh.toString(),
                g1SouthDrainMls: g1SouthDrainMls.toString(),
                g1SouthDrainEc: g1SouthDrainEc.toString(),
                g1SouthDrainPh: g1SouthDrainPh.toString(),
                g1NorthDripMls: g1NorthDripMls.toString(),
                g1NorthDripEC: g1NorthDripEC.toString(),
                g1NorthDripPh: g1NorthDripPh.toString(),
                g1NorthDrainMls: g1NorthDrainMls.toString(),
                g1NorthDrainEC: g1NorthDrainEC.toString(),
                g1NorthDrainPh: g1NorthDrainPh.toString(),
                g1Valve1DripMls: g1Valve1DripMls.toString(),
                g1Valve2DripMls: g1Valve2DripMls.toString(),
                g1Valve3DripMls: g1Valve3DripMls.toString(),
                g1Valve4DripMls: g1Valve4DripMls.toString(),
                g2SouthDripMls: g2SouthDripMls.toString(),
                g2SouthDripEC: g2SouthDripEC.toString(),
                g2SouthDripPh: g2SouthDripPh.toString(),
                g2SouthDrainMls: g2SouthDrainMls.toString(),
                g2SouthDrainEc: g2SouthDrainEc.toString(),
                g2SouthDrainPh: g2SouthDrainPh.toString(),
                g2NorthDripMls: g2NorthDripMls.toString(),
                g2NorthDripEC: g2NorthDripEC.toString(),
                g2NorthDripPh: g2NorthDripPh.toString(),
                g2NorthDrainMls: g2NorthDrainMls.toString(),
                g2NorthDrainEC: g2NorthDrainEC.toString(),
                g2NorthDrainPh: g2NorthDrainPh.toString(),
                g2Valve5DripMls: g2Valve5DripMls.toString(),
                g2Valve6DripMls: g2Valve6DripMls.toString(),
                g2Valve7DripMls: g2Valve7DripMls.toString(),
                g2Valve8DripMls: g2Valve8DripMls.toString(),
                g2Valve9DripMls: g2Valve9DripMls.toString(),
                g2Valve10DripMls: g2Valve10DripMls.toString(),
                g2Valve11DripMls: g2Valve11DripMls.toString(),
                g2Valve12DripMls: g2Valve12DripMls.toString(),
                g3SouthDripMls: g3SouthDripMls.toString(),
                g3SouthDripEC: g3SouthDripEC.toString(),
                g3SouthDripPh: g3SouthDripPh.toString(),
                g3SouthDrainMls: g3SouthDrainMls.toString(),
                g3SouthDrainEc: g3SouthDrainEc.toString(),
                g3SouthDrainPh: g3SouthDrainPh.toString(),
                g3NorthDripMls: g3NorthDripMls.toString(),
                g3NorthDripEC: g3NorthDripEC.toString(),
                g3NorthDripPh: g3NorthDripPh.toString(),
                g3NorthDrainMls: g3NorthDrainMls.toString(),
                g3NorthDrainEC: g3NorthDrainEC.toString(),
                g3NorthDrainPh: g3NorthDrainPh.toString(),
                g3Valve13DripMls: g3Valve13DripMls.toString(),
                g3Valve14DripMls: g3Valve14DripMls.toString(),
                g3Valve15DripMls: g3Valve15DripMls.toString(),
                g3Valve16DripMls: g3Valve16DripMls.toString(),
                g3Valve17DripMls: g3Valve17DripMls.toString(),
                g3Valve18DripMls: g3Valve18DripMls.toString(),
                g3Valve19DripMls: g3Valve19DripMls.toString(),
                g3Valve20DripMls: g3Valve20DripMls.toString(),
                g4SouthDripMls: g4SouthDripMls.toString(),
                g4SouthDripEC: g4SouthDripEC.toString(),
                g4SouthDripPh: g4SouthDripPh.toString(),
                g4SouthDrainMls: g4SouthDrainMls.toString(),
                g4SouthDrainEc: g4SouthDrainEc.toString(),
                g4SouthDrainPh: g4SouthDrainPh.toString(),
                g4NorthDripMls: g4NorthDripMls.toString(),
                g4NorthDripEC: g4NorthDripEC.toString(),
                g4NorthDripPh: g4NorthDripPh.toString(),
                g4NorthDrainMls: g4NorthDrainMls.toString(),
                g4NorthDrainEC: g4NorthDrainEC.toString(),
                g4NorthDrainPh: g4NorthDrainPh.toString(),
                g4Valve21DripMls: g4Valve21DripMls.toString(),
                g4Valve22DripMls: g4Valve22DripMls.toString(),
                g4Valve23DripMls: g4Valve23DripMls.toString(),
                g4Valve24DripMls: g4Valve24DripMls.toString(),
                g5FirstDripMls: g5FirstDripMls.toString(),
                g5FirstDripEC: g5FirstDripEC.toString(),
                g5FirstDripPh: g5FirstDripPh.toString(),
                g5FirstDrainMls: g5FirstDrainMls.toString(),
                g5FirstDrainEc: g5FirstDrainEc.toString(),
                g5FirstDrainPh: g5FirstDrainPh.toString(),
                g5SecondDripMls: g5SecondDripMls.toString(),
                g5SecondDripEC: g5SecondDripEC.toString(),
                g5SecondDripPh: g5SecondDripPh.toString(),
                g5SecondDrainMls: g5SecondDrainMls.toString(),
                g5SecondDrainEC: g5SecondDrainEC.toString(),
                g5SecondDrainPh: g5SecondDrainPh.toString(),
                g5Valve25DripMls: g5Valve25DripMls.toString(),
                g5Valve26DripMls: g5Valve26DripMls.toString(),
                g5Valve27DripMls: g5Valve27DripMls.toString(),
                bore1Hours: bore1Hours.toString(),
                bore1m3: bore1m3.toString(),
                electricity: electricity.toString(),
                Septicm3: Septicm3.toString(),
              });
            });

            //CLEAR ASYNC
            AsyncStorage.clear();
            AsyncStorage.removeItem('currentDate');
            AsyncStorage.removeItem('dateYesterday');
            AsyncStorage.removeItem('dayYesterday');
            AsyncStorage.removeItem('gas');
            AsyncStorage.removeItem('liquidCO2');
            AsyncStorage.removeItem('drainDischarge');
            AsyncStorage.removeItem('g1SouthDripMls');
            AsyncStorage.removeItem('g1SouthDripEC');
            AsyncStorage.removeItem('g1SouthDripPh');
            AsyncStorage.removeItem('g1SouthDrainMls');
            AsyncStorage.removeItem('g1SouthDrainEc');
            AsyncStorage.removeItem('g1SouthDrainPh');
            AsyncStorage.removeItem('g1NorthDripMls');
            AsyncStorage.removeItem('g1NorthDripEC');
            AsyncStorage.removeItem('g1NorthDripPh');
            AsyncStorage.removeItem('g1NorthDrainMls');
            AsyncStorage.removeItem('g1NorthDrainEC');
            AsyncStorage.removeItem('g1NorthDrainPh');
            AsyncStorage.removeItem('g1Valve1DripMls');
            AsyncStorage.removeItem('g1Valve2DripMls');
            AsyncStorage.removeItem('g1Valve4DripMls');
            AsyncStorage.removeItem('g2SouthDripMls');
            AsyncStorage.removeItem('g2SouthDripEc');
            AsyncStorage.removeItem('g2SouthDripPh');
            AsyncStorage.removeItem('g2SouthDrainMls');
            AsyncStorage.removeItem('g2SouthDrainEc');
            AsyncStorage.removeItem('g2SouthDrainPh');
            AsyncStorage.removeItem('g2NorthDripMls');
            AsyncStorage.removeItem('g2NorthDripEC');
            AsyncStorage.removeItem('g2NorthDripPh');
            AsyncStorage.removeItem('g2NorthDrainMls');
            AsyncStorage.removeItem('g2NorthDrainEC');
            AsyncStorage.removeItem('g2NorthDrainPh');
            AsyncStorage.removeItem('g2Valve5DripMls');
            AsyncStorage.removeItem('g2Valve6DripMls');
            AsyncStorage.removeItem('g2Valve7DripMls');
            AsyncStorage.removeItem('g2Valve8DripMls');
            AsyncStorage.removeItem('g2Valve9DripMls');
            AsyncStorage.removeItem('g2Valve10DripMls');
            AsyncStorage.removeItem('g2Valve11DripMls');
            AsyncStorage.removeItem('g2Valve12DripMls');
            AsyncStorage.removeItem('g3SouthDripMls');
            AsyncStorage.removeItem('g3SouthDripEC');
            AsyncStorage.removeItem('g3SouthDripPh');
            AsyncStorage.removeItem('g3SouthDrainMls');
            AsyncStorage.removeItem('g3SouthDrainEc');
            AsyncStorage.removeItem('g3SouthDrainPh');
            AsyncStorage.removeItem('g3NorthDripMls');
            AsyncStorage.removeItem('g3NorthDripEC');
            AsyncStorage.removeItem('g3NorthDripPh');
            AsyncStorage.removeItem('g3NorthDrainMls');
            AsyncStorage.removeItem('g3NorthDrainEC');
            AsyncStorage.removeItem('g3NorthDrainPh');
            AsyncStorage.removeItem('g3Valve13DripMls');
            AsyncStorage.removeItem('g3Valve14DripMls');
            AsyncStorage.removeItem('g3Valve15DripMls');
            AsyncStorage.removeItem('g3Valve16DripMls');
            AsyncStorage.removeItem('g3Valve17DripMls');
            AsyncStorage.removeItem('g3Valve18DripMls');
            AsyncStorage.removeItem('g3Valve19DripMls');
            AsyncStorage.removeItem('g3Valve20DripMls');
            AsyncStorage.removeItem('g4SouthDripMls');
            AsyncStorage.removeItem('g4SouthDripEC');
            AsyncStorage.removeItem('g4SouthDripPh');
            AsyncStorage.removeItem('g4SouthDrainMls');
            AsyncStorage.removeItem('g4SouthDrainEc');
            AsyncStorage.removeItem('g4SouthDrainPh');
            AsyncStorage.removeItem('g4NorthDripMls');
            AsyncStorage.removeItem('g4NorthDripEC');
            AsyncStorage.removeItem('g4NorthDripPh');
            AsyncStorage.removeItem('g4NorthDrainMls');
            AsyncStorage.removeItem('g4NorthDrainEC');
            AsyncStorage.removeItem('g4NorthDrainPh');
            AsyncStorage.removeItem('g4Valve21DripMls');
            AsyncStorage.removeItem('g4Valve22DripMls');
            AsyncStorage.removeItem('g4Valve23DripMls');
            AsyncStorage.removeItem('g4Valve24DripMls');
            AsyncStorage.removeItem('g5FirstDripMls');
            AsyncStorage.removeItem('g5FirstDripEC');
            AsyncStorage.removeItem('g5FirstDripPh');
            AsyncStorage.removeItem('g5FirstDrainMls');
            AsyncStorage.removeItem('g5FirstDrainEc');
            AsyncStorage.removeItem('g5FirstDrainPh');
            AsyncStorage.removeItem('g5SecondDripMls');
            AsyncStorage.removeItem('g5SecondDripEC');
            AsyncStorage.removeItem('g5SecondDripPh');
            AsyncStorage.removeItem('g5SecondDrainMls');
            AsyncStorage.removeItem('g5SecondDrainEC');
            AsyncStorage.removeItem('g5SecondDrainPh');
            AsyncStorage.removeItem('g5Valve25DripMls');
            AsyncStorage.removeItem('g5Valve26DripMls');
            AsyncStorage.removeItem('g5Valve27DripMls');
            AsyncStorage.removeItem('bore1Hours');
            AsyncStorage.removeItem('bore1m3');
            AsyncStorage.removeItem('electricity');
            AsyncStorage.removeItem('Septicm3');

            //END

            //CLEAR STATE

            setDateYesterday('');
            setDayYesterday(''),
              setDayYesterday(''),
              setGas(''),
              setLiquidCO2(''),
              setDrainDischarge(''),
              setG1SouthDripMls('');
            setG1SouthDripEC('');
            setG1SouthDripPh('');
            setG1SouthDrainMls('');
            setG1SouthDrainEc('');
            setG1SouthDrainPh('');
            setG1NorthDripMls('');
            setG1NorthDripEC('');
            setG1NorthDripPh('');
            setG1NorthDrainMls('');
            setG1NorthDrainEC('');
            setG1NorthDrainPh('');
            setG1Valve1DripMls('');
            setG1Valve2DripMls('');
            setG1Valve4DripMls('');
            setG2SouthDripMls('');
            setG2SouthDripPh('');
            setG2SouthDrainMls('');
            setG2SouthDrainEc('');
            setG2SouthDrainPh('');
            setG2NorthDripMls('');
            setG2NorthDripEC('');
            setG2NorthDripPh('');
            setG2NorthDrainMls('');
            setG2NorthDrainEC('');
            setG2NorthDrainPh('');
            setG2Valve5DripMls('');
            setG2Valve6DripMls('');
            setG2Valve7DripMls('');
            setG2Valve8DripMls('');
            setG2Valve9DripMls('');
            setG2Valve10DripMls('');
            setG2Valve11DripMls('');
            setG2Valve12DripMls('');
            setG3SouthDripMls('');
            setG3SouthDripEC('');
            setG3SouthDripPh('');
            setG3SouthDrainMls('');
            setG3SouthDrainEc('');
            setG3SouthDrainPh('');
            setG3NorthDripMls('');
            setG3NorthDripEC('');
            setG3NorthDripPh('');
            setG3NorthDrainMls('');
            setG3NorthDrainEC('');
            setG3NorthDrainPh('');
            setG3Valve13DripMls('');
            setG3Valve14DripMls('');
            setG3Valve15DripMls('');
            setG3Valve16DripMls('');
            setG3Valve17DripMls('');
            setG3Valve18DripMls('');
            setG3Valve19DripMls('');
            setG3Valve20DripMls('');
            setG4SouthDripMls('');
            setG4SouthDripEC('');
            setG4SouthDripPh('');
            setG4SouthDrainMls('');
            setG4SouthDrainEc('');
            setG4SouthDrainPh('');
            setG4NorthDripMls('');
            setG4NorthDripEC('');
            setG4NorthDripPh('');
            setG4NorthDrainMls('');
            setG4NorthDrainEC('');
            setG4NorthDrainPh('');
            setG4Valve21DripMls('');
            setG4Valve22DripMls('');
            setG4Valve23DripMls('');
            setG4Valve24DripMls('');
            setG5FirstDripMls('');
            setG5FirstDripEC('');
            setG5FirstDripPh('');
            setG5FirstDrainMls('');
            setG5FirstDrainEc('');
            setG5FirstDrainPh('');
            setG5SecondDripMls('');
            setG5SecondDripEC('');
            setG5SecondDripPh('');
            setG5SecondDrainMls('');
            setG5SecondDrainEC('');
            setG5SecondDrainPh('');
            setG5Valve25DripMls('');
            setG5Valve26DripMls('');
            setG5Valve27DripMls('');
            setBore1Hours('');
            setBore1m3('');
            setElectricity('');
            setSepticm3('');

            //
            props.navigation.navigate('DailyReadingsGER');
            Toast.show('Form Submitted successfully');
            //window.scrollTo(0, 0)
            setIsLoading(false);
          } catch (error) {
            console.log(error);
          }
        },
        function error(err) {
          if (!err)
            err = 'Connection Refused (cors issue or server address not found)';
        },
      );
    } else {
      setIsLoading(false);

      Alert.alert(
        //title
        'No Internet Connection',
        //body
        'Please connect to internet before sending data to the server',
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    }

    //END
  };
  //

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background2.png')}
        style={styles.backgroundImage}>
        <ScrollView
          style={styles.formContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.marginDimension}></View>

          <View style={styles.marginDimension}></View>

          <View style={styles.row}>
            <Text style={styles.titleHeadingText}>Yesterday's Date</Text>
            {filteredSampleData.length ? (
              <Text style={styles.titleHeadingTextRed}>
                {filteredSampleData[0].dateyesterday}
              </Text>
            ) : null}
          </View>

          <DateTimePickerModal
            isVisible={visibility}
            onConfirm={() => handleConfirm()}
            onCancel={() => onPressCancel()}
            mode="date"
            is24Hour={false}
          />

          <View style={styles.marginDimension}></View>

          <View style={styles.borderEdit}>
            <TextInput
              style={styles.textInputStyle}
              autoCapitalize="none"
              multiline={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={() => onPressButton()}
              onPress={() => onPressButton()}
              showSoftInputOnFocus={false}
              value={dateYesterday}
              onFocus={() => onPressButton()}
              onSubmitEditing={() => {
                refsamp.current.focus();
              }}
            />
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View style={styles.row}>
            <Text style={styles.titleHeadingText}>Yesterday's Day</Text>
            {filteredSampleData.length ? (
              <Text style={styles.titleHeadingTextRed}>
                {filteredSampleData[0].dayyesterday}
              </Text>
            ) : null}
          </View>

          <View style={styles.marginDimension}></View>

          <View style={styles.borderEdit}>
            <TextInput
              style={styles.textInputStyle}
              autoCapitalize="none"
              multiline={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              showSoftInputOnFocus={false}
              onChangeText={() => onPressButton()}
              value={dayYesterday}
              onSubmitEditing={() => {
                refsamp.current.focus();
              }}
              disabled={true}
              selectTextOnFocus={false}
            />
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View style={styles.row}>
            <Text style={styles.titleHeadingText}>Gas (m3)</Text>
            {filteredSampleData.length ? (
              <Text style={styles.titleHeadingTextRed}>
                {filteredSampleData[0].gas}
              </Text>
            ) : null}
          </View>

          <View style={styles.marginDimension}></View>

          <View style={styles.borderEdit}>
            <TextInput
              style={styles.textInputStyle}
              autoCapitalize="none"
              multiline={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={(text) => updateTextInputGas(text, 'gas')}
              value={gas}
              editable={true}
              returnKeyType={'next'}
              keyboardType={'numeric'}
              ref={gas}
              onSubmitEditing={() => {
                liquidCO2.current.focus();
              }}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View style={styles.row}>
            <Text style={styles.titleHeadingText}>Liquid (CO2)</Text>
            {filteredSampleData.length ? (
              <Text style={styles.titleHeadingTextRed}>
                {filteredSampleData[0].liquidco2}
              </Text>
            ) : null}
          </View>

          <View style={styles.marginDimension}></View>

          <View style={styles.borderEdit}>
            <TextInput
              style={styles.textInputStyle}
              autoCapitalize="none"
              multiline={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={(text) =>
                updateTextInputLiquidCO2(text, 'liquidCO2')
              }
              value={liquidCO2}
              editable={true}
              returnKeyType={'next'}
              keyboardType={'numeric'}
              ref={liquidCO2}
              onSubmitEditing={() => {
                drainDischarge.current.focus();
              }}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View style={styles.row}>
            <Text style={styles.titleHeadingText}>Drain Discharge</Text>
            {filteredSampleData.length ? (
              <Text style={styles.titleHeadingTextRed}>
                {filteredSampleData[0].draindischarge}
              </Text>
            ) : null}
          </View>

          <View style={styles.marginDimension}></View>

          <View style={styles.borderEdit}>
            <TextInput
              style={styles.textInputStyle}
              autoCapitalize="none"
              multiline={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={(text) =>
                updateTextInputDrainDischarge(text, 'drainDischarge')
              }
              value={drainDischarge}
              editable={true}
              returnKeyType={'done'}
              keyboardType={'numeric'}
              ref={drainDischarge}
              blurOnSubmit={true}
            />
          </View>

          <View style={styles.marginDimensionTop}></View>

          <Text style={styles.headerText}>Compartment Readings</Text>

          <View style={styles.marginDimensionTop}></View>

          <View>
            <TouchableOpacity
              onPress={() => g1ChangeLayout()}
              activeOpacity={0.6}
              style={styles.Btn}>
              <View style={styles.alignTextView}>
                <Text style={styles.btnText}>GER 1</Text>

                <Image
                  style={{
                    resizeMode: 'cover',
                    marginRight: 5,
                  }}
                  source={expandedG1 ? UP_ARROW : DOWN_ARROW}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: expandedG1 ? null : 0,
                overflow: 'hidden',
              }}>
              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 1 South - Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg1SouthDripMls(text, 'g1SouthDripMls')
                  }
                  value={g1SouthDripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g1SouthDripMls}
                  onSubmitEditing={() => {
                    g1SouthDripEC.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>GER 1 South - Drip Ec</Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg1SouthDripEC(text, 'g1SouthDripEC')
                  }
                  value={g1SouthDripEC}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g1SouthDripEC}
                  onSubmitEditing={() => {
                    g1SouthDripPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>GER 1 South - Drip pH</Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg1SouthDripPh(text, 'g1SouthDripPh')
                  }
                  value={g1SouthDripPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g1SouthDripPh}
                  onSubmitEditing={() => {
                    g1SouthDrainMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 1 South - Drain (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg1SouthDrainMls(text, 'g1SouthDrainMls')
                  }
                  value={g1SouthDrainMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g1SouthDrainMls}
                  onSubmitEditing={() => {
                    g1SouthDrainEc.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 1 South - Drain Ec
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg1SouthDrainEc(text, 'g1SouthDrainEc')
                  }
                  value={g1SouthDrainEc}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g1SouthDrainEc}
                  onSubmitEditing={() => {
                    g1SouthDrainPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 1 South - Drain pH
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg1SouthDrainPh(text, 'g1SouthDrainPh')
                  }
                  value={g1SouthDrainPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g1SouthDrainPh}
                  onSubmitEditing={() => {
                    g1NorthDripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 1 North - Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg1NorthDripMls(text, 'g1NorthDripMls')
                  }
                  value={g1NorthDripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g1NorthDripMls}
                  onSubmitEditing={() => {
                    g1NorthDripEC.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>GER 1 North - Drip Ec</Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg1NorthDripEC(text, 'g1NorthDripEC')
                  }
                  value={g1NorthDripEC}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g1NorthDripEC}
                  onSubmitEditing={() => {
                    g1NorthDripPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>GER 1 North - Drip pH</Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg1NorthDripPh(text, 'g1NorthDripPh')
                  }
                  value={g1NorthDripPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g1NorthDripPh}
                  onSubmitEditing={() => {
                    g1NorthDrainMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 1 North - Drain (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg1NorthDrainMls(text, 'g1NorthDrainMls')
                  }
                  value={g1NorthDrainMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g1NorthDrainMls}
                  onSubmitEditing={() => {
                    g1NorthDrainEC.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 1 North - Drain Ec
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg1NorthDrainEC(text, 'g1NorthDrainEC')
                  }
                  value={g1NorthDrainEC}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g1NorthDrainEC}
                  onSubmitEditing={() => {
                    g1NorthDrainPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 1 North - Drain pH
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg1NorthDrainPh(text, 'g1NorthDrainPh')
                  }
                  value={g1NorthDrainPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g1NorthDrainPh}
                  onSubmitEditing={() => {
                    g1Valve1DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 1 Valve 1 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg1Valve1DripMls(text, 'g1Valve1DripMls')
                  }
                  value={g1Valve1DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g1Valve1DripMls}
                  onSubmitEditing={() => {
                    g1Valve2DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 1 Valve 2 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg1Valve2DripMls(text, 'g1Valve2DripMls')
                  }
                  value={g1Valve2DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g1Valve2DripMls}
                  onSubmitEditing={() => {
                    g1Valve3DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 1 Valve 3 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg1Valve3DripMls(text, 'g1Valve3DripMls')
                  }
                  value={g1Valve3DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g1Valve3DripMls}
                  onSubmitEditing={() => {
                    g1Valve4DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 1 Valve 4 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg1Valve4DripMls(text, 'g1Valve4DripMls')
                  }
                  value={g1Valve4DripMls}
                  editable={true}
                  returnKeyType={'done'}
                  keyboardType={'numeric'}
                  ref={g1Valve4DripMls}
                  blurOnSubmit={true}
                />
              </View>
            </View>
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => g2ChangeLayout()}
              style={styles.Btn}>
              <View style={styles.alignTextView}>
                <Text style={styles.btnText}>GER 2</Text>
                <Image
                  style={{
                    resizeMode: 'cover',
                    marginRight: 5,
                  }}
                  source={expandedG2 ? UP_ARROW : DOWN_ARROW}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: expandedG2 ? null : 0,
                overflow: 'hidden',
              }}>
              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 2 South - Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2SouthDripMls(text, 'g2SouthDripMls')
                  }
                  value={g2SouthDripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2SouthDripMls}
                  onSubmitEditing={() => {
                    g2SouthDripEC.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>GER 2 South - Drip Ec</Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2SouthDripEC(text, 'g2SouthDripEC')
                  }
                  value={g2SouthDripEC}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2SouthDripEC}
                  onSubmitEditing={() => {
                    g2SouthDripPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>GER 2 South - Drip pH</Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2SouthDripPh(text, 'g2SouthDripPh')
                  }
                  value={g2SouthDripPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2SouthDripPh}
                  onSubmitEditing={() => {
                    g2SouthDrainMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 2 South - Drain (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2SouthDrainMls(text, 'g2SouthDrainMls')
                  }
                  value={g2SouthDrainMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2SouthDrainMls}
                  onSubmitEditing={() => {
                    g2SouthDrainEc.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 2 South - Drain Ec
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2SouthDrainEc(text, 'g2SouthDrainEc')
                  }
                  value={g2SouthDrainEc}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2SouthDrainEc}
                  onSubmitEditing={() => {
                    g2SouthDrainPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 2 South - Drain pH
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2SouthDrainPh(text, 'g2SouthDrainPh')
                  }
                  value={g2SouthDrainPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2SouthDrainPh}
                  onSubmitEditing={() => {
                    g2NorthDripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 2 North - Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2NorthDripMls(text, 'g2NorthDripMls')
                  }
                  value={g2NorthDripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2NorthDripMls}
                  onSubmitEditing={() => {
                    g2NorthDripEC.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>GER 2 North - Drip Ec</Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2NorthDripEC(text, 'g2NorthDripEC')
                  }
                  value={g2NorthDripEC}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2NorthDripEC}
                  onSubmitEditing={() => {
                    g2NorthDripPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>GER 2 North - Drip pH</Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2NorthDripPh(text, 'g2NorthDripPh')
                  }
                  value={g2NorthDripPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2NorthDripPh}
                  onSubmitEditing={() => {
                    g2NorthDrainMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 2 North - Drain (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2NorthDrainMls(text, 'g2NorthDrainMls')
                  }
                  value={g2NorthDrainMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2NorthDrainMls}
                  onSubmitEditing={() => {
                    g2NorthDrainEC.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 2 North - Drain Ec
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2NorthDrainEC(text, 'g2NorthDrainEC')
                  }
                  value={g2NorthDrainEC}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2NorthDrainEC}
                  onSubmitEditing={() => {
                    g2NorthDrainPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 2 North - Drain pH
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2NorthDrainPh(text, 'g2NorthDrainPh')
                  }
                  value={g2NorthDrainPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2NorthDrainPh}
                  onSubmitEditing={() => {
                    g2Valve5DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 2 Valve 5 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2Valve5DripMls(text, 'g2Valve5DripMls')
                  }
                  value={g2Valve5DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2Valve5DripMls}
                  onSubmitEditing={() => {
                    g2Valve6DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 2 Valve 6 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2Valve6DripMls(text, 'g2Valve6DripMls')
                  }
                  value={g2Valve6DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2Valve6DripMls}
                  onSubmitEditing={() => {
                    g2Valve7DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 2 Valve 7 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2Valve7DripMls(text, 'g2Valve7DripMls')
                  }
                  value={g2Valve7DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2Valve7DripMls}
                  onSubmitEditing={() => {
                    g2Valve8DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 2 Valve 8 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2Valve8DripMls(text, 'g2Valve8DripMls')
                  }
                  value={g2Valve8DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2Valve8DripMls}
                  onSubmitEditing={() => {
                    g2Valve9DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 2 Valve 9 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2Valve9DripMls(text, 'g2Valve9DripMls')
                  }
                  value={g2Valve9DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2Valve9DripMls}
                  onSubmitEditing={() => {
                    g2Valve10DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 2 Valve 10 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2Valve10DripMls(text, 'g2Valve10DripMls')
                  }
                  value={g2Valve10DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2Valve10DripMls}
                  onSubmitEditing={() => {
                    g2Valve11DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 2 Valve 11 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2Valve11DripMls(text, 'g2Valve11DripMls')
                  }
                  value={g2Valve11DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g2Valve11DripMls}
                  onSubmitEditing={() => {
                    g2Valve12DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 2 Valve 12 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg2Valve12DripMls(text, 'g2Valve12DripMls')
                  }
                  value={g2Valve12DripMls}
                  editable={true}
                  returnKeyType={'done'}
                  keyboardType={'numeric'}
                  ref={g2Valve12DripMls}
                  blurOnSubmit={true}
                />
              </View>
            </View>
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => g3ChangeLayout()}
              style={styles.Btn}>
              <View style={styles.alignTextView}>
                <Text style={styles.btnText}>GER 3</Text>
                <Image
                  style={{
                    resizeMode: 'cover',
                    marginRight: 5,
                  }}
                  source={expandedG3 ? UP_ARROW : DOWN_ARROW}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: expandedG3 ? null : 0,
                overflow: 'hidden',
              }}>
              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 3 South - Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3SouthDripMls(text, 'g3SouthDripMls')
                  }
                  value={g3SouthDripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3SouthDripMls}
                  onSubmitEditing={() => {
                    g3SouthDripEC.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>GER 3 South - Drip Ec</Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3SouthDripEC(text, 'g3SouthDripEC')
                  }
                  value={g3SouthDripEC}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3SouthDripEC}
                  onSubmitEditing={() => {
                    g3SouthDripPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>GER 3 South - Drip pH</Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3SouthDripPh(text, 'g3SouthDripPh')
                  }
                  value={g3SouthDripPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3SouthDripPh}
                  onSubmitEditing={() => {
                    g3SouthDrainMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 3 South - Drain (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3SouthDrainMls(text, 'g3SouthDrainMls')
                  }
                  value={g3SouthDrainMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3SouthDrainMls}
                  onSubmitEditing={() => {
                    g3SouthDrainEc.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 3 South - Drain Ec
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3SouthDrainEc(text, 'g3SouthDrainEc')
                  }
                  value={g3SouthDrainEc}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3SouthDrainEc}
                  onSubmitEditing={() => {
                    g3SouthDrainPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 3 South - Drain pH
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3SouthDrainPh(text, 'g3SouthDrainPh')
                  }
                  value={g3SouthDrainPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3SouthDrainPh}
                  onSubmitEditing={() => {
                    g3NorthDripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 3 North - Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3NorthDripMls(text, 'g3NorthDripMls')
                  }
                  value={g3NorthDripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3NorthDripMls}
                  onSubmitEditing={() => {
                    g3NorthDripEC.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>GER 3 North - Drip Ec</Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3NorthDripEC(text, 'g3NorthDripEC')
                  }
                  value={g3NorthDripEC}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3NorthDripEC}
                  onSubmitEditing={() => {
                    g3NorthDripPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>GER 3 North - Drip pH</Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3NorthDripPh(text, 'g3NorthDripPh')
                  }
                  value={g3NorthDripPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3NorthDripPh}
                  onSubmitEditing={() => {
                    g3NorthDrainMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 3 North - Drain (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3NorthDrainMls(text, 'g3NorthDrainMls')
                  }
                  value={g3NorthDrainMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3NorthDrainMls}
                  onSubmitEditing={() => {
                    g3NorthDrainEC.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 3 North - Drain Ec
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3NorthDrainEC(text, 'g3NorthDrainEC')
                  }
                  value={g3NorthDrainEC}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3NorthDrainEC}
                  onSubmitEditing={() => {
                    g3NorthDrainPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 3 North - Drain pH
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3NorthDrainPh(text, 'g3NorthDrainPh')
                  }
                  value={g3NorthDrainPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3NorthDrainPh}
                  onSubmitEditing={() => {
                    g3Valve13DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 3 Valve 13 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3Valve13DripMls(text, 'g3Valve13DripMls')
                  }
                  value={g3Valve13DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3Valve13DripMls}
                  onSubmitEditing={() => {
                    g3Valve14DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 3 Valve 14 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3Valve14DripMls(text, 'g3Valve14DripMls')
                  }
                  value={g3Valve14DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3Valve14DripMls}
                  onSubmitEditing={() => {
                    g3Valve15DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 3 Valve 15 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3Valve15DripMls(text, 'g3Valve15DripMls')
                  }
                  value={g3Valve15DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3Valve15DripMls}
                  onSubmitEditing={() => {
                    g3Valve16DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 3 Valve 16 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3Valve16DripMls(text, 'g3Valve16DripMls')
                  }
                  value={g3Valve16DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3Valve16DripMls}
                  onSubmitEditing={() => {
                    g3Valve17DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 3 Valve 17 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3Valve17DripMls(text, 'g3Valve17DripMls')
                  }
                  value={g3Valve17DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3Valve17DripMls}
                  onSubmitEditing={() => {
                    g3Valve18DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 3 Valve 18 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3Valve18DripMls(text, 'g3Valve18DripMls')
                  }
                  value={g3Valve18DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3Valve18DripMls}
                  onSubmitEditing={() => {
                    g3Valve19DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 3 Valve 19 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3Valve19DripMls(text, 'g3Valve19DripMls')
                  }
                  value={g3Valve19DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g3Valve19DripMls}
                  onSubmitEditing={() => {
                    g3Valve20DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 3 Valve 20 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg3Valve20DripMls(text, 'g3Valve20DripMls')
                  }
                  value={g3Valve20DripMls}
                  editable={true}
                  returnKeyType={'done'}
                  keyboardType={'numeric'}
                  ref={g3Valve20DripMls}
                  blurOnSubmit={true}
                />
              </View>
            </View>
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => g4ChangeLayout()}
              style={styles.Btn}>
              <View style={styles.alignTextView}>
                <Text style={styles.btnText}>GER 4</Text>
                <Image
                  style={{
                    resizeMode: 'cover',
                    marginRight: 5,
                  }}
                  source={expandedG4 ? UP_ARROW : DOWN_ARROW}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: expandedG4 ? null : 0,
                overflow: 'hidden',
              }}>
              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 4 South - Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg4SouthDripMls(text, 'g4SouthDripMls')
                  }
                  value={g4SouthDripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g4SouthDripMls}
                  onSubmitEditing={() => {
                    g4SouthDripEC.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>GER 4 South - Drip Ec</Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg4SouthDripEC(text, 'g4SouthDripEC')
                  }
                  value={g4SouthDripEC}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g4SouthDripEC}
                  onSubmitEditing={() => {
                    g4SouthDripPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>GER 4 South - Drip pH</Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg4SouthDripPh(text, 'g4SouthDripPh')
                  }
                  value={g4SouthDripPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g4SouthDripPh}
                  onSubmitEditing={() => {
                    g4SouthDrainMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 4 South - Drain (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg4SouthDrainMls(text, 'g4SouthDrainMls')
                  }
                  value={g4SouthDrainMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g4SouthDrainMls}
                  onSubmitEditing={() => {
                    g4SouthDrainEc.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 4 South - Drain Ec
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg4SouthDrainEc(text, 'g4SouthDrainEc')
                  }
                  value={g4SouthDrainEc}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g4SouthDrainEc}
                  onSubmitEditing={() => {
                    g4SouthDrainPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 4 South - Drain pH
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg4SouthDrainPh(text, 'g4SouthDrainPh')
                  }
                  value={g4SouthDrainPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g4SouthDrainPh}
                  onSubmitEditing={() => {
                    g4NorthDripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 4 North - Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg4NorthDripMls(text, 'g4NorthDripMls')
                  }
                  value={g4NorthDripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g4NorthDripMls}
                  onSubmitEditing={() => {
                    g4NorthDripEC.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>GER 4 North - Drip Ec</Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg4NorthDripEC(text, 'g4NorthDripEC')
                  }
                  value={g4NorthDripEC}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g4NorthDripEC}
                  onSubmitEditing={() => {
                    g4NorthDripPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>GER 4 North - Drip pH</Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg4NorthDripPh(text, 'g4NorthDripPh')
                  }
                  value={g4NorthDripPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g4NorthDripPh}
                  onSubmitEditing={() => {
                    g4NorthDrainMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 4 North - Drain (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg4NorthDrainMls(text, 'g4NorthDrainMls')
                  }
                  value={g4NorthDrainMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g4NorthDrainMls}
                  onSubmitEditing={() => {
                    g4NorthDrainEC.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 4 North - Drain Ec
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg4NorthDrainEC(text, 'g4NorthDrainEC')
                  }
                  value={g4NorthDrainEC}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g4NorthDrainEC}
                  onSubmitEditing={() => {
                    g4NorthDrainPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 4 North - Drain pH
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg4NorthDrainPh(text, 'g4NorthDrainPh')
                  }
                  value={g4NorthDrainPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g4NorthDrainPh}
                  onSubmitEditing={() => {
                    g4Valve21DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 4 Valve 21 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg4Valve21DripMls(text, 'g4Valve21DripMls')
                  }
                  value={g4Valve21DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g4Valve21DripMls}
                  onSubmitEditing={() => {
                    g4Valve22DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 4 Valve 22 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg4Valve22DripMls(text, 'g4Valve22DripMls')
                  }
                  value={g4Valve22DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g4Valve22DripMls}
                  onSubmitEditing={() => {
                    g4Valve23DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 4 Valve 23 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg4Valve23DripMls(text, 'g4Valve23DripMls')
                  }
                  value={g4Valve23DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g4Valve23DripMls}
                  onSubmitEditing={() => {
                    g4Valve24DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 4 Valve 24 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg4Valve24DripMls(text, 'g4Valve24DripMls')
                  }
                  value={g4Valve24DripMls}
                  editable={true}
                  returnKeyType={'done'}
                  keyboardType={'numeric'}
                  ref={g4Valve24DripMls}
                  blurOnSubmit={true}
                />
              </View>
            </View>
          </View>

          <View style={styles.marginDimensionTop}></View>

          <View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => g5ChangeLayout}
              style={styles.Btn}>
              <View style={styles.alignTextView}>
                <Text style={styles.btnText}>GER 5</Text>
                <Image
                  style={{
                    resizeMode: 'cover',
                    marginRight: 5,
                  }}
                  source={expandedG5 ? UP_ARROW : DOWN_ARROW}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: expandedG5 ? null : 0,
                overflow: 'hidden',
              }}>
              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 5 First - Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg5FirstDripMls(text, 'g5FirstDripMls')
                  }
                  value={g5FirstDripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g5FirstDripMls}
                  onSubmitEditing={() => {
                    g5FirstDripEC.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>GER 5 First - Drip Ec</Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg5FirstDripEC(text, 'g5FirstDripEC')
                  }
                  value={g5FirstDripEC}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g5FirstDripEC}
                  onSubmitEditing={() => {
                    g5FirstDripPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>GER 5 First - Drip pH</Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg5FirstDripPh(text, 'g5FirstDripPh')
                  }
                  value={g5FirstDripPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g5FirstDripPh}
                  onSubmitEditing={() => {
                    g5FirstDrainMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 5 First - Drain (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg5FirstDrainMls(text, 'g5FirstDrainMls')
                  }
                  value={g5FirstDrainMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g5FirstDrainMls}
                  onSubmitEditing={() => {
                    g5FirstDrainEc.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 5 First - Drain Ec
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg5FirstDrainEc(text, 'g5FirstDrainEc')
                  }
                  value={g5FirstDrainEc}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g5FirstDrainEc}
                  onSubmitEditing={() => {
                    g5FirstDrainPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 5 First - Drain pH
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg5FirstDrainPh(text, 'g5FirstDrainPh')
                  }
                  value={g5FirstDrainPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g5FirstDrainPh}
                  onSubmitEditing={() => {
                    g5SecondDripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 5 Second - Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg5SecondDripMls(text, 'g5SecondDripMls')
                  }
                  value={g5SecondDripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g5SecondDripMls}
                  onSubmitEditing={() => {
                    g5SecondDripEC.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 5 Second - Drip Ec
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg5SecondDripEC(text, 'g5SecondDripEC')
                  }
                  value={g5SecondDripEC}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g5SecondDripEC}
                  onSubmitEditing={() => {
                    g5SecondDripPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 5 Second - Drip pH
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg5SecondDripPh(text, 'g5SecondDripPh')
                  }
                  value={g5SecondDripPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g5SecondDripPh}
                  onSubmitEditing={() => {
                    g5SecondDrainMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 5 Second - Drain (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg5SecondDrainMls(text, 'g5SecondDrainMls')
                  }
                  value={g5SecondDrainMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g5SecondDrainMls}
                  onSubmitEditing={() => {
                    g5SecondDrainEC.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 5 Second - Drain Ec
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg5SecondDrainEC(text, 'g5SecondDrainEC')
                  }
                  value={g5SecondDrainEC}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g5SecondDrainEC}
                  onSubmitEditing={() => {
                    g5SecondDrainPh.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 5 Second - Drain pH
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg5SecondDrainPh(text, 'g5SecondDrainPh')
                  }
                  value={g5SecondDrainPh}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g5SecondDrainPh}
                  onSubmitEditing={() => {
                    g5Valve25DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 5 Valve 25 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg5Valve25DripMls(text, 'g5Valve25DripMls')
                  }
                  value={g5Valve25DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g5Valve25DripMls}
                  onSubmitEditing={() => {
                    g5Valve26DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 5 Valve 26 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg5Valve26DripMls(text, 'g5Valve26DripMls')
                  }
                  value={g5Valve26DripMls}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={g5Valve26DripMls}
                  onSubmitEditing={() => {
                    g5Valve27DripMls.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.titleHeadingText}>
                GER 5 Valve 27 Drip (mls)
              </Text>

              <View style={styles.marginDimension}></View>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={(text) =>
                    updateTextInputg5Valve27DripMls(text, 'g5Valve27DripMls')
                  }
                  value={g5Valve27DripMls}
                  editable={true}
                  returnKeyType={'done'}
                  keyboardType={'numeric'}
                  ref={g5Valve27DripMls}
                  blurOnSubmit={true}
                />
              </View>
            </View>

            <View style={styles.marginDimensionTop}></View>

            <Text style={styles.headerText}>Bore Readings</Text>

            <View style={styles.marginDimensionTop}></View>

            <View style={styles.row}>
              <Text style={styles.titleHeadingText}>Bore 1 (Hours)</Text>
              {filteredSampleData.length ? (
                <Text style={styles.titleHeadingTextRed}>
                  {filteredSampleData[0].bore1hours}
                </Text>
              ) : null}
            </View>

            <View style={styles.marginDimension}></View>

            <View style={styles.borderEdit}>
              <TextInput
                style={styles.textInputStyle}
                autoCapitalize="none"
                multiline={false}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onChangeText={(text) =>
                  updateTextInputbore1Hours(text, 'bore1Hours')
                }
                value={bore1Hours}
                editable={true}
                returnKeyType={'next'}
                keyboardType={'numeric'}
                ref={bore1Hours}
                onSubmitEditing={() => {
                  bore1m3.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.marginDimensionTop}></View>

            <View style={styles.row}>
              <Text style={styles.titleHeadingText}>Bore 1 (m3)</Text>
              {filteredSampleData.length ? (
                <Text style={styles.titleHeadingTextRed}>
                  {filteredSampleData[0].bore1m3}
                </Text>
              ) : null}
            </View>

            <View style={styles.marginDimension}></View>

            <View style={styles.borderEdit}>
              <TextInput
                style={styles.textInputStyle}
                autoCapitalize="none"
                multiline={false}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onChangeText={(text) => updateTextInputbore1m3(text, 'bore1m3')}
                value={bore1m3}
                editable={true}
                returnKeyType={'next'}
                keyboardType={'numeric'}
                ref={bore1m3}
                onSubmitEditing={() => {
                  electricity.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.marginDimensionTop}></View>

            <View style={styles.row}>
              <Text style={styles.titleHeadingText}>Electricity</Text>
              {filteredSampleData.length ? (
                <Text style={styles.titleHeadingTextRed}>
                  {filteredSampleData[0].electricity}
                </Text>
              ) : null}
            </View>

            <View style={styles.marginDimension}></View>

            <View style={styles.borderEdit}>
              <TextInput
                style={styles.textInputStyle}
                autoCapitalize="none"
                multiline={false}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onChangeText={(text) =>
                  updateTextInputelectricity(text, 'electricity')
                }
                value={electricity}
                editable={true}
                returnKeyType={'next'}
                keyboardType={'numeric'}
                ref={electricity}
                onSubmitEditing={() => {
                  Septicm3.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.marginDimensionTop}></View>

            <View style={styles.row}>
              <Text style={styles.titleHeadingText}>Septic (m3)</Text>
              {filteredSampleData.length ? (
                <Text style={styles.titleHeadingTextRed}>
                  {filteredSampleData[0].septicm3}
                </Text>
              ) : null}
            </View>

            <View style={styles.marginDimension}></View>

            <View style={styles.borderEdit}>
              <TextInput
                style={styles.textInputStyle}
                autoCapitalize="none"
                multiline={false}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onChangeText={(text) =>
                  updateTextInputSepticm3(text, 'Septicm3')
                }
                value={Septicm3}
                editable={true}
                returnKeyType={'done'}
                keyboardType={'numeric'}
                ref={Septicm3}
                blurOnSubmit={true}
              />
            </View>
          </View>

          <View style={styles.marginDimensionTop}></View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => sendData()}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  btnText: {
    color: '#000000',
    fontSize: 21,
  },
  btnText2: {
    color: '#000000',
    marginRight: 5,
  },

  alignTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 17,
    color: 'black',
    padding: 10,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#000000',
    fontSize: 23,
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
  },
  marginDimension: {
    marginTop: 5,
  },

  marginDimensionTop: {
    marginTop: 18,
  },
  Btn: {
    padding: 12,
    marginRight: 16,
    backgroundColor: '#F1EFEF',
    borderRadius: 5,
  },

  borderEdit: {
    marginTop: 8,
    marginRight: 16,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
  },
  formContainer: {
    //backgroundColor: 'rgba(192,192,192,0.55)',
    //borderRadius: 5,
    padding: 5,
    margin: 10,
    height: '100%',
    width: '100%',
  },

  titleHeadingText: {
    color: '#2C903D',
    fontSize: 18,
    fontWeight: 'bold',
  },

  titleHeadingTextRed: {
    color: '#ff0000',
    fontSize: 16,
  },

  buttonContainer1: {
    //backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    backgroundColor: '#2C903D',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    height: 55,
    marginRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 19,
    color: '#000000',
    fontWeight: 'bold',
  },

  buttonText: {
    fontSize: 23,
    color: '#ffffff',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  textInputStyle: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 20,
    marginBottom: 1,
    height: 50,
    backgroundColor: '#ffffff',
  },

  viewBack: {
    flex: 1,
    backgroundColor: '#9FA8DA', // Set your own custom Color
  },

  row: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 15,
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default GerReadings;
