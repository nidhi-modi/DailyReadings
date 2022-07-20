import React, {Component} from 'react';
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

const DOWN_ARROW = require('../assets/down_arrow.png');
const UP_ARROW = require('../assets/up_arrow.png');
let realm;
var ID;

export default class DailyReadingsGER extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //SAMPLE
      FlatListItems: {},
      isItConnected: '',

      sample: [],
      filteredSampleData: {},

      //
      showRealApp: false,
      selected: '',
      visibility: false,
      expandedG1: false,
      expandedG2: false,
      expandedG3: false,
      expandedG4: false,
      expandedG5: false,
      isLoading: false,

      onClickName: '',
      expand: false,
      currentDate: '',
      //GENERIC VARIABLES
      dateYesterday: '',
      dayYesterday: '',
      gas: '',
      liquidCO2: '',
      drainDischarge: '',
      //END

      //G1 VARIABLES
      g1SouthDripMls: '',
      g1SouthDripEC: '',
      g1SouthDripPh: '',
      g1SouthDrainMls: '',
      g1SouthDrainEc: '',
      g1SouthDrainPh: '',
      g1NorthDripMls: '',
      g1NorthDripEC: '',
      g1NorthDripPh: '',
      g1NorthDrainMls: '',
      g1NorthDrainEC: '',
      g1NorthDrainPh: '',
      g1Valve1DripMls: '',
      g1Valve2DripMls: '',
      g1Valve3DripMls: '',
      g1Valve4DripMls: '',
      //

      //G2 VARIABLES
      g2SouthDripMls: '',
      g2SouthDripEC: '',
      g2SouthDripPh: '',
      g2SouthDrainMls: '',
      g2SouthDrainEc: '',
      g2SouthDrainPh: '',
      g2NorthDripMls: '',
      g2NorthDripEC: '',
      g2NorthDripPh: '',
      g2NorthDrainMls: '',
      g2NorthDrainEC: '',
      g2NorthDrainPh: '',
      g2Valve5DripMls: '',
      g2Valve6DripMls: '',
      g2Valve7DripMls: '',
      g2Valve8DripMls: '',
      g2Valve9DripMls: '',
      g2Valve10DripMls: '',
      g2Valve11DripMls: '',
      g2Valve12DripMls: '',
      //

      //G3 VARIABLES
      g3SouthDripMls: '',
      g3SouthDripEC: '',
      g3SouthDripPh: '',
      g3SouthDrainMls: '',
      g3SouthDrainEc: '',
      g3SouthDrainPh: '',
      g3NorthDripMls: '',
      g3NorthDripEC: '',
      g3NorthDripPh: '',
      g3NorthDrainMls: '',
      g3NorthDrainEC: '',
      g3NorthDrainPh: '',
      g3Valve13DripMls: '',
      g3Valve14DripMls: '',
      g3Valve15DripMls: '',
      g3Valve16DripMls: '',
      g3Valve17DripMls: '',
      g3Valve18DripMls: '',
      g3Valve19DripMls: '',
      g3Valve20DripMls: '',
      //

      //G4 VARIABLES
      g4SouthDripMls: '',
      g4SouthDripEC: '',
      g4SouthDripPh: '',
      g4SouthDrainMls: '',
      g4SouthDrainEc: '',
      g4SouthDrainPh: '',
      g4NorthDripMls: '',
      g4NorthDripEC: '',
      g4NorthDripPh: '',
      g4NorthDrainMls: '',
      g4NorthDrainEC: '',
      g4NorthDrainPh: '',
      g4Valve21DripMls: '',
      g4Valve22DripMls: '',
      g4Valve23DripMls: '',
      g4Valve24DripMls: '',
      //

      //G5 VARIABLES
      g5FirstDripMls: '',
      g5FirstDripEC: '',
      g5FirstDripPh: '',
      g5FirstDrainMls: '',
      g5FirstDrainEc: '',
      g5FirstDrainPh: '',
      g5SecondDripMls: '',
      g5SecondDripEC: '',
      g5SecondDripPh: '',
      g5SecondDrainMls: '',
      g5SecondDrainEC: '',
      g5SecondDrainPh: '',
      g5Valve25DripMls: '',
      g5Valve26DripMls: '',
      g5Valve27DripMls: '',
      //

      //BORE READINGS
      bore1Hours: '',
      bore1m3: '',
      electricity: '',
      Septicm3: '',
      //END

      siteName: 'GER',
    };

    //INITIALIZE RAELM INSTANCE
    realm = new Realm({path: 'DailyReadingsDB.realm'});

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  //CHECKING CONNECTION

  handleConnectivityChange = (state) => {
    if (state.isConnected) {
      this.setState({isItConnected: 'Online'});
    } else {
      this.setState({isItConnected: 'Offline'});
    }
  };

  CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === 'android') {
      NetInfo.isConnected.fetch().then((isConnected) => {
        if (isConnected) {
          this.setState({isItConnected: 'Online'});
        } else {
          this.setState({isItConnected: 'Offline'});
        }
      });
    } else {
      // For iOS devices
      NetInfo.isConnected.addEventListener(
        'connectionChange',
        this.handleFirstConnectivityChange,
      );
    }
  };

  handleFirstConnectivityChange = (isConnected) => {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange,
    );

    if (isConnected === false) {
      this.setState({isItConnected: 'Offline'});
    } else {
      this.setState({isItConnected: 'Online'});
    }
  };

  //END
  //TESTING ON CLICK (ONLY ONE OPEN AT A TIME CODE)

  g1ChangeLayout = () => {
    this.setState({onClickName: 'g1'});

    this.manageOnClick();
  };

  g2ChangeLayout = () => {
    this.setState({onClickName: 'g2'});

    this.manageOnClick();
  };

  g3ChangeLayout = () => {
    this.setState({onClickName: 'g3'});

    this.manageOnClick();
  };

  g4ChangeLayout = () => {
    this.setState({onClickName: 'g4'});

    this.manageOnClick();
  };

  g5ChangeLayout = () => {
    this.setState({onClickName: 'g5'});

    this.manageOnClick();
  };

  manageOnClick = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (this.state.onClickName === 'g1') {
      this.setState({
        expandedG1: true,
        expandedG2: false,
        expandedG3: false,
        expandedG4: false,
        expandedG5: false,
      });
    } else if (this.state.onClickName === 'g2') {
      this.setState({
        expandedG1: false,
        expandedG2: true,
        expandedG3: false,
        expandedG4: false,
        expandedG5: false,
      });
    } else if (this.state.onClickName === 'g3') {
      this.setState({
        expandedG1: false,
        expandedG2: false,
        expandedG3: true,
        expandedG4: false,
        expandedG5: false,
      });
    } else if (this.state.onClickName === 'g4') {
      this.setState({
        expandedG1: false,
        expandedG2: false,
        expandedG3: false,
        expandedG4: true,
        expandedG5: false,
      });
    } else if (this.state.onClickName === 'g5') {
      this.setState({
        expandedG1: false,
        expandedG2: false,
        expandedG3: false,
        expandedG4: false,
        expandedG5: true,
      });
    }
  };

  //END

  //COLLAPSE VIEW ANIMATION CODE (CODE THAT COLLAPSES ALL THE VIEW)

  changeLayout1 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.setState({
      expandedG1: !this.state.expandedG1,
      expandedG2: this.state.expandedG2,
      expandedG3: this.state.expandedG3,
      expandedG4: this.state.expandedG4,
      expandedG5: this.state.expandedG5,
    });
  };

  changeLayout2 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.setState({
      expandedG1: this.state.expandedG1,
      expandedG2: !this.state.expandedG2,
      expandedG3: this.state.expandedG3,
      expandedG4: this.state.expandedG4,
      expandedG5: this.state.expandedG5,
    });
  };

  changeLayout3 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      expandedG1: this.state.expandedG1,
      expandedG2: this.state.expandedG2,
      expandedG3: !this.state.expandedG3,
      expandedG4: this.state.expandedG4,
      expandedG5: this.state.expandedG5,
    });
  };

  changeLayout4 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      expandedG1: this.state.expandedG1,
      expandedG2: this.state.expandedG2,
      expandedG3: this.state.expandedG3,
      expandedG4: !this.state.expandedG4,
      expandedG5: this.state.expandedG5,
    });
  };

  changeLayout5 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      expandedG1: this.state.expandedG1,
      expandedG2: this.state.expandedG2,
      expandedG3: this.state.expandedG3,
      expandedG4: this.state.expandedG4,
      expandedG5: !this.state.expandedG5,
    });
  };

  //

  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    navigate('NewScreen');
  };
  //ASYNC METHOD

  async setItem(myKey, value) {
    try {
      this.setState({
        isDataSend: false,
      });
      abc = '0';

      return await AsyncStorage.setItem(myKey, JSON.stringify(value));
    } catch (error) {
      // console.error('AsyncStorage#setItem error: ' + error.message);
    }
  }

  //

  //DATE PICKER

  hideDatePicker = () => {
    this.setState({visibility: false});
  };

  handleConfirm = (date) => {
    this.setState({dateYesterday: moment(date).format('DD/MM/YYYY')});
    const dateFormat = moment(date).format('YYYY-MM-DD');
    this.hideDatePicker();
    const dayBasedOnDate = this.getDayOfWeek(dateFormat);
    this.setState({dayYesterday: dayBasedOnDate});
    this.setItem('dateYesterday', moment(date).format('DD/MM/YYYY'));
    this.setItem('dayYesterday', dayBasedOnDate);

    //GET DATA FROM REALM

    /* console.log("DATE DEMO : "+this.state.dateYesterday - 1);
         var dateDemo = this.state.dateYesterday - 1
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

  onPressCancel = () => {
    this.setState({visibility: false});
  };

  onPressButton = () => {
    this.setState({visibility: true});
  };

  clearText = () => {
    this.setState({visibility: true, dateYesterday: ''});
  };
  //

  //GET DAY BASED ON DATE SELECTED
  getDayOfWeek(date) {
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
  }
  //

  //UPDATE TEXTINPUT
  updateTextInput = (text, field) => {
    this.setItem(field, text);
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

  //

  handleBackButton = () => {
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

  componentDidMount() {
    //CALLING GET ASYNC VALUES METHOD

    this.retriveAsyncData();

    //

    //VIEW ALL USERS
    /*var daily_readings = realm.objects('daily_readings_offline_table');
        this.setState({ FlatListItems: daily_readings })
        console.log("DATA FROM REALM : " + this.state.FlatListItems);*/

    var currentDate1 = moment().format('DD/MM/YYYY');

    this.setState({currentDate: currentDate1});

    console.log('CURRENT WEEK NUMBER : ' + currentDate1);

    //GET DATA FROM AWS

    this.getDailyReadingsData();

    //

    /*var daily_readings = realm
            .objects('daily_readings_offline_table')
            .filtered('dateYesterday =' + input_user_id);
        console.log(user_details);
        if (user_details.length > 0) {
            console.log(user_details[0]);
            this.setState({
                userData: user_details[0],
            });
        } else {
            alert('No user found');
            this.setState({
                userData: '',
            });

        }*/

    //CHECK INTERNET

    NetInfo.addEventListener(this.handleConnectivityChange);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  //GET AWS

  getDailyReadingsData = () => {
    try {
      AsyncStorage.getItem('@MySuperStore:readingsKey')
        .then((rawData) => {
          const allRawData = JSON.parse(rawData);

          this.setState({sample: allRawData});

          if (rawData !== null) {
            this.renderEntryDate();
          }
        })
        .done();
    } catch (error) {}

    /*this.getPromiseObject(
      'GET',
      ' https://gfed26lq0c.execute-api.ap-southeast-2.amazonaws.com/dev/v1/getData',
      false,
      false,
    ).then(
      (result) => {
        try {
          this.setState({
            sample: JSON.parse(result),
          });

          if (result !== null) {
            this.renderEntryDate();
          }
        } catch (error) {
          console.log(error);
        }
      },
      function error(err) {
        try {
          if (!err)
            err = 'Connection Refused (cors issue or server address not found)';
        } catch (error) {
          console.log(error);
        }
      },
    );*/
  };

  //

  renderEntryDate = () => {
    const currentDate2 = moment().subtract(1, 'days').format('DD/MM/YYYY');

    console.log("Yesterday's date : " + currentDate2);

    const entryData = this.state.sample;
    //const convertEntryData = JSON.stringify(entryData.body.rows[0])
    const yesterdaysDate = (d) => d.currentdate === currentDate2;

    const filteredData = entryData.user_registration.filter(yesterdaysDate);
    console.log(JSON.stringify(filteredData));

    this.setState({filteredSampleData: filteredData});

    //END
  };

  getTotal() {}

  //METHOD FOR GETTING ASYNC VALUES

  retriveAsyncData = async () => {
    try {
      const data1 = await AsyncStorage.getItem('dateYesterday');

      if (data1 !== null) {
        this.setState({dateYesterday: JSON.parse(data1)});
      }
    } catch (e) {}

    try {
      const data2 = await AsyncStorage.getItem('dayYesterday');

      if (data2 !== null) {
        this.setState({dayYesterday: JSON.parse(data2)});
      }
    } catch (e) {}

    try {
      const data3 = await AsyncStorage.getItem('gas');

      if (data3 !== null) {
        this.setState({gas: JSON.parse(data3)});
      }
    } catch (e) {}

    try {
      const data4 = await AsyncStorage.getItem('liquidCO2');

      if (data4 !== null) {
        this.setState({liquidCO2: JSON.parse(data4)});
      }
    } catch (e) {}

    try {
      const data5 = await AsyncStorage.getItem('drainDischarge');

      if (data5 !== null) {
        this.setState({drainDischarge: JSON.parse(data5)});
      }
    } catch (e) {}

    //G1 ASYNC getItem
    try {
      const data6 = await AsyncStorage.getItem('g1SouthDripMls');

      if (data6 !== null) {
        this.setState({g1SouthDripMls: JSON.parse(data6)});
      }
    } catch (e) {}

    try {
      const data7 = await AsyncStorage.getItem('g1SouthDripEC');

      if (data7 !== null) {
        this.setState({g1SouthDripEC: JSON.parse(data7)});
      }
    } catch (error) {}

    try {
      const data8 = await AsyncStorage.getItem('g1SouthDripPh');

      if (data8 !== null) {
        this.setState({g1SouthDripPh: JSON.parse(data8)});
      }
    } catch (error) {}

    try {
      const data9 = await AsyncStorage.getItem('g1SouthDrainMls');

      if (data9 !== null) {
        this.setState({g1SouthDrainMls: JSON.parse(data9)});
      }
    } catch (error) {}

    try {
      const data10 = await AsyncStorage.getItem('g1SouthDrainEc');

      if (data10 !== null) {
        this.setState({g1SouthDrainEc: JSON.parse(data10)});
      }
    } catch (error) {}

    try {
      const data11 = await AsyncStorage.getItem('g1SouthDrainPh');
      if (data11 !== null) {
        this.setState({g1SouthDrainPh: JSON.parse(data11)});
      }
    } catch (error) {}

    try {
      const data12 = await AsyncStorage.getItem('g1NorthDripMls');

      if (data12 !== null) {
        this.setState({g1NorthDripMls: JSON.parse(data12)});
      }
    } catch (error) {}

    try {
      const data13 = await AsyncStorage.getItem('g1NorthDripEC');

      if (data13 !== null) {
        this.setState({g1NorthDripEC: JSON.parse(data13)});
      }
    } catch (error) {}

    try {
      const data14 = await AsyncStorage.getItem('g1NorthDripPh');

      if (data14 !== null) {
        this.setState({g1NorthDripPh: JSON.parse(data14)});
      }
    } catch (error) {}

    try {
      const data15 = await AsyncStorage.getItem('g1NorthDrainMls');

      if (data15 !== null) {
        this.setState({g1NorthDrainMls: JSON.parse(data15)});
      }
    } catch (error) {}

    try {
      const data16 = await AsyncStorage.getItem('g1NorthDrainEC');
      if (data16 !== null) {
        this.setState({g1NorthDrainEC: JSON.parse(data16)});
      }
    } catch (error) {}

    try {
      const data17 = await AsyncStorage.getItem('g1NorthDrainPh');
      if (data17 !== null) {
        this.setState({g1NorthDrainPh: JSON.parse(data17)});
      }
    } catch (error) {}

    try {
      const data18 = await AsyncStorage.getItem('g1Valve1DripMls');
      if (data18 !== null) {
        this.setState({g1Valve1DripMls: JSON.parse(data18)});
      }
    } catch (error) {}

    try {
      const data19 = await AsyncStorage.getItem('g1Valve2DripMls');
      if (data19 !== null) {
        this.setState({g1Valve2DripMls: JSON.parse(data19)});
      }
    } catch (error) {}

    try {
      const data20 = await AsyncStorage.getItem('g1Valve3DripMls');
      if (data20 !== null) {
        this.setState({g1Valve3DripMls: JSON.parse(data20)});
      }
    } catch (error) {}

    try {
      const data21 = await AsyncStorage.getItem('g1Valve4DripMls');
      if (data21 !== null) {
        this.setState({g1Valve4DripMls: JSON.parse(data21)});
      }
    } catch (error) {}

    //END

    //G2 ASYNC getItem
    try {
      const data22 = await AsyncStorage.getItem('g2SouthDripMls');
      if (data22 !== null) {
        this.setState({g2SouthDripMls: JSON.parse(data22)});
      }
    } catch (error) {}

    try {
      const data23 = await AsyncStorage.getItem('g2SouthDripEC');
      if (data23 !== null) {
        this.setState({g2SouthDripEC: JSON.parse(data23)});
      }
    } catch (error) {}

    try {
      const data24 = await AsyncStorage.getItem('g2SouthDripPh');
      if (data24 !== null) {
        this.setState({g2SouthDripPh: JSON.parse(data24)});
      }
    } catch (error) {}

    try {
      const data25 = await AsyncStorage.getItem('g2SouthDrainMls');
      if (data25 !== null) {
        this.setState({g2SouthDrainMls: JSON.parse(data25)});
      }
    } catch (error) {}

    try {
      const data26 = await AsyncStorage.getItem('g2SouthDrainEc');
      if (data26 !== null) {
        this.setState({g2SouthDrainEc: JSON.parse(data26)});
      }
    } catch (error) {}

    try {
      const data27 = await AsyncStorage.getItem('g2SouthDrainPh');
      if (data27 !== null) {
        this.setState({g2SouthDrainPh: JSON.parse(data27)});
      }
    } catch (error) {}

    try {
      const data28 = await AsyncStorage.getItem('g2NorthDripMls');
      if (data28 !== null) {
        this.setState({g2NorthDripMls: JSON.parse(data28)});
      }
    } catch (error) {}

    try {
      const data29 = await AsyncStorage.getItem('g2NorthDripEC');
      if (data29 !== null) {
        this.setState({g2NorthDripEC: JSON.parse(data29)});
      }
    } catch (error) {}

    try {
      const data30 = await AsyncStorage.getItem('g2NorthDripPh');
      if (data30 !== null) {
        this.setState({g2NorthDripPh: JSON.parse(data30)});
      }
    } catch (error) {}

    try {
      const data31 = await AsyncStorage.getItem('g2NorthDrainMls');
      if (data31 !== null) {
        this.setState({g2NorthDrainMls: JSON.parse(data31)});
      }
    } catch (error) {}

    try {
      const data32 = await AsyncStorage.getItem('g2NorthDrainEC');
      if (data32 !== null) {
        this.setState({g2NorthDrainEC: JSON.parse(data32)});
      }
    } catch (error) {}

    try {
      const data33 = await AsyncStorage.getItem('g2NorthDrainPh');
      if (data33 !== null) {
        this.setState({g2NorthDrainPh: JSON.parse(data33)});
      }
    } catch (error) {}

    try {
      const data34 = await AsyncStorage.getItem('g2Valve5DripMls');
      if (data34 !== null) {
        this.setState({g2Valve5DripMls: JSON.parse(data34)});
      }
    } catch (error) {}

    try {
      const data35 = await AsyncStorage.getItem('g2Valve6DripMls');
      if (data35 !== null) {
        this.setState({g2Valve6DripMls: JSON.parse(data35)});
      }
    } catch (error) {}

    try {
      const data36 = await AsyncStorage.getItem('g2Valve7DripMls');
      if (data36 !== null) {
        this.setState({g2Valve7DripMls: JSON.parse(data36)});
      }
    } catch (error) {}

    try {
      const data37 = await AsyncStorage.getItem('g2Valve8DripMls');
      if (data37 !== null) {
        this.setState({g2Valve8DripMls: JSON.parse(data37)});
      }
    } catch (error) {}

    try {
      const data38 = await AsyncStorage.getItem('g2Valve9DripMls');
      if (data38 !== null) {
        this.setState({g2Valve9DripMls: JSON.parse(data38)});
      }
    } catch (error) {}

    try {
      const data39 = await AsyncStorage.getItem('g2Valve10DripMls');
      if (data39 !== null) {
        this.setState({g2Valve10DripMls: JSON.parse(data39)});
        9;
      }
    } catch (error) {}

    try {
      const data381 = await AsyncStorage.getItem('g2Valve11DripMls');
      if (data381 !== null) {
        this.setState({g2Valve11DripMls: JSON.parse(data381)});
      }
    } catch (error) {}

    try {
      const data391 = await AsyncStorage.getItem('g2Valve12DripMls');
      if (data391 !== null) {
        this.setState({g2Valve12DripMls: JSON.parse(data391)});
      }
    } catch (error) {}
    //END

    //G3 ASYNC getItem
    try {
      const data40 = await AsyncStorage.getItem('g3SouthDripMls');
      if (data40 !== null) {
        this.setState({g3SouthDripMls: JSON.parse(data40)});
      }
    } catch (error) {}

    try {
      const data41 = await AsyncStorage.getItem('g3SouthDripEC');
      if (data41 !== null) {
        this.setState({g3SouthDripEC: JSON.parse(data41)});
      }
    } catch (error) {}

    try {
      const data42 = await AsyncStorage.getItem('g3SouthDripPh');
      if (data42 !== null) {
        this.setState({g3SouthDripPh: JSON.parse(data42)});
      }
    } catch (error) {}

    try {
      const data43 = await AsyncStorage.getItem('g3SouthDrainMls');
      if (data43 !== null) {
        this.setState({g3SouthDrainMls: JSON.parse(data43)});
      }
    } catch (error) {}

    try {
      const data44 = await AsyncStorage.getItem('g3SouthDrainEc');
      if (data44 !== null) {
        this.setState({g3SouthDrainEc: JSON.parse(data44)});
      }
    } catch (error) {}

    try {
      const data45 = await AsyncStorage.getItem('g3SouthDrainPh');
      if (data45 !== null) {
        this.setState({g3SouthDrainPh: JSON.parse(data45)});
      }
    } catch (error) {}

    try {
      const data46 = await AsyncStorage.getItem('g3NorthDripMls');
      if (data46 !== null) {
        this.setState({g3NorthDripMls: JSON.parse(data46)});
      }
    } catch (error) {}

    try {
      const data47 = await AsyncStorage.getItem('g3NorthDripEC');
      if (data47 !== null) {
        this.setState({g3NorthDripEC: JSON.parse(data47)});
      }
    } catch (error) {}

    try {
      const data48 = await AsyncStorage.getItem('g3NorthDripPh');
      if (data48 !== null) {
        this.setState({g3NorthDripPh: JSON.parse(data48)});
      }
    } catch (error) {}

    try {
      const data49 = await AsyncStorage.getItem('g3NorthDrainMls');
      if (data49 !== null) {
        this.setState({g3NorthDrainMls: JSON.parse(data49)});
      }
    } catch (error) {}

    try {
      const data50 = await AsyncStorage.getItem('g3NorthDrainEC');
      if (data50 !== null) {
        this.setState({g3NorthDrainEC: JSON.parse(data50)});
      }
    } catch (error) {}

    try {
      const data51 = await AsyncStorage.getItem('g3NorthDrainPh');
      if (data51 !== null) {
        this.setState({g3NorthDrainPh: JSON.parse(data51)});
      }
    } catch (error) {}

    try {
      const data52 = await AsyncStorage.getItem('g3Valve20DripMls');
      if (data52 !== null) {
        this.setState({g3Valve20DripMls: JSON.parse(data52)});
      }
    } catch (error) {}

    try {
      const data53 = await AsyncStorage.getItem('g3Valve13DripMls');
      if (data53 !== null) {
        this.setState({g3Valve13DripMls: JSON.parse(data53)});
      }
    } catch (error) {}

    try {
      const data54 = await AsyncStorage.getItem('g3Valve14DripMls');
      if (data54 !== null) {
        this.setState({g3Valve14DripMls: JSON.parse(data54)});
      }
    } catch (error) {}

    try {
      const data55 = await AsyncStorage.getItem('g3Valve15DripMls');
      if (data55 !== null) {
        this.setState({g3Valve15DripMls: JSON.parse(data55)});
      }
    } catch (error) {}

    try {
      const data56 = await AsyncStorage.getItem('g3Valve16DripMls');
      if (data56 !== null) {
        this.setState({g3Valve16DripMls: JSON.parse(data56)});
      }
    } catch (error) {}

    try {
      const data57 = await AsyncStorage.getItem('g3Valve17DripMls');
      if (data57 !== null) {
        this.setState({g3Valve17DripMls: JSON.parse(data57)});
      }
    } catch (error) {}

    try {
      const data58 = await AsyncStorage.getItem('g3Valve18DripMls');
      if (data58 !== null) {
        this.setState({g3Valve18DripMls: JSON.parse(data58)});
      }
    } catch (error) {}

    try {
      const data59 = await AsyncStorage.getItem('g3Valve19DripMls');
      if (data59 !== null) {
        this.setState({g3Valve19DripMls: JSON.parse(data59)});
      }
    } catch (error) {}
    //END

    //G4 ASYNC getItem
    try {
      const data60 = await AsyncStorage.getItem('g4SouthDripMls');
      if (data60 !== null) {
        this.setState({g4SouthDripMls: JSON.parse(data60)});
      }
    } catch (error) {}

    try {
      const data61 = await AsyncStorage.getItem('g4SouthDripEC');
      if (data61 !== null) {
        this.setState({g4SouthDripEC: JSON.parse(data61)});
      }
    } catch (error) {}

    try {
      const data62 = await AsyncStorage.getItem('g4SouthDripPh');
      if (data62 !== null) {
        this.setState({g4SouthDripPh: JSON.parse(data62)});
      }
    } catch (error) {}

    try {
      const data63 = await AsyncStorage.getItem('g4SouthDrainMls');
      if (data63 !== null) {
        this.setState({g4SouthDrainMls: JSON.parse(data63)});
      }
    } catch (error) {}

    try {
      const data64 = await AsyncStorage.getItem('g4SouthDrainEc');
      if (data64 !== null) {
        this.setState({g4SouthDrainEc: JSON.parse(data64)});
      }
    } catch (error) {}

    try {
      const data65 = await AsyncStorage.getItem('g4SouthDrainPh');
      if (data65 !== null) {
        this.setState({g4SouthDrainPh: JSON.parse(data65)});
      }
    } catch (error) {}

    try {
      const data66 = await AsyncStorage.getItem('g4NorthDripMls');
      if (data66 !== null) {
        this.setState({g4NorthDripMls: JSON.parse(data66)});
      }
    } catch (error) {}

    try {
      const data67 = await AsyncStorage.getItem('g4NorthDripEC');
      if (data67 !== null) {
        this.setState({g4NorthDripEC: JSON.parse(data67)});
      }
    } catch (error) {}

    try {
      const data68 = await AsyncStorage.getItem('g4NorthDripPh');
      if (data68 !== null) {
        this.setState({g4NorthDripPh: JSON.parse(data68)});
      }
    } catch (error) {}

    try {
      const data69 = await AsyncStorage.getItem('g4NorthDrainMls');
      if (data69 !== null) {
        this.setState({g4NorthDrainMls: JSON.parse(data69)});
      }
    } catch (error) {}

    try {
      const data70 = await AsyncStorage.getItem('g4NorthDrainEC');
      if (data70 !== null) {
        this.setState({g4NorthDrainEC: JSON.parse(data70)});
      }
    } catch (error) {}

    try {
      const data71 = await AsyncStorage.getItem('g4NorthDrainPh');
      if (data71 !== null) {
        this.setState({g4NorthDrainPh: JSON.parse(data71)});
      }
    } catch (error) {}

    try {
      const data72 = await AsyncStorage.getItem('g4Valve21DripMls');
      if (data72 !== null) {
        this.setState({g4Valve21DripMls: JSON.parse(data72)});
      }
    } catch (error) {}

    try {
      const data73 = await AsyncStorage.getItem('g4Valve22DripMls');
      if (data73 !== null) {
        this.setState({g4Valve22DripMls: JSON.parse(data73)});
      }
    } catch (error) {}

    try {
      const data74 = await AsyncStorage.getItem('g4Valve23DripMls');
      if (data74 !== null) {
        this.setState({g4Valve23DripMls: JSON.parse(data74)});
      }
    } catch (error) {}

    try {
      const data75 = await AsyncStorage.getItem('g4Valve24DripMls');
      if (data75 !== null) {
        this.setState({g4Valve24DripMls: JSON.parse(data75)});
      }
    } catch (error) {}

    //END

    //G5 ASYNC getItem
    try {
      const data76 = await AsyncStorage.getItem('g5FirstDripMls');
      if (data76 !== null) {
        this.setState({g5FirstDripMls: JSON.parse(data76)});
      }
    } catch (error) {}

    try {
      const data77 = await AsyncStorage.getItem('g5FirstDripEC');
      if (data77 !== null) {
        this.setState({g5FirstDripEC: JSON.parse(data77)});
      }
    } catch (error) {}

    try {
      const data78 = await AsyncStorage.getItem('g5FirstDripPh');
      if (data78 !== null) {
        this.setState({g5FirstDripPh: JSON.parse(data78)});
      }
    } catch (error) {}

    try {
      const data79 = await AsyncStorage.getItem('g5FirstDrainMls');
      if (data79 !== null) {
        this.setState({g5FirstDrainMls: JSON.parse(data79)});
      }
    } catch (error) {}

    try {
      const data80 = await AsyncStorage.getItem('g5FirstDrainEc');
      if (data80 !== null) {
        this.setState({g5FirstDrainEc: JSON.parse(data80)});
      }
    } catch (error) {}

    try {
      const data81 = await AsyncStorage.getItem('g5FirstDrainPh');
      if (data81 !== null) {
        this.setState({g5FirstDrainPh: JSON.parse(data81)});
      }
    } catch (error) {}

    try {
      const data82 = await AsyncStorage.getItem('g5SecondDripMls');
      if (data82 !== null) {
        this.setState({g5SecondDripMls: JSON.parse(data82)});
      }
    } catch (error) {}

    try {
      const data83 = await AsyncStorage.getItem('g5SecondDripEC');
      if (data83 !== null) {
        this.setState({g5SecondDripEC: JSON.parse(data83)});
      }
    } catch (error) {}

    try {
      const data84 = await AsyncStorage.getItem('g5SecondDripPh');
      if (data84 !== null) {
        this.setState({g5SecondDripPh: JSON.parse(data84)});
      }
    } catch (error) {}

    try {
      const data85 = await AsyncStorage.getItem('g5SecondDrainMls');
      if (data85 !== null) {
        this.setState({g5SecondDrainMls: JSON.parse(data85)});
      }
    } catch (error) {}

    try {
      const data86 = await AsyncStorage.getItem('g5SecondDrainEC');
      if (data86 !== null) {
        this.setState({g5SecondDrainEC: JSON.parse(data86)});
      }
    } catch (error) {}

    try {
      const data87 = await AsyncStorage.getItem('g5SecondDrainPh');
      if (data87 !== null) {
        this.setState({g5SecondDrainPh: JSON.parse(data87)});
      }
    } catch (error) {}

    try {
      const data88 = await AsyncStorage.getItem('g5Valve25DripMls');
      if (data88 !== null) {
        this.setState({g5Valve25DripMls: JSON.parse(data88)});
      }
    } catch (error) {}

    try {
      const data89 = await AsyncStorage.getItem('g5Valve26DripMls');
      if (data89 !== null) {
        this.setState({g5Valve26DripMls: JSON.parse(data89)});
      }
    } catch (error) {}

    try {
      const data90 = await AsyncStorage.getItem('g5Valve27DripMls');
      if (data90 !== null) {
        this.setState({g5Valve27DripMls: JSON.parse(data90)});
      }
    } catch (error) {}

    //END

    //BORE READINGS

    try {
      const data91 = await AsyncStorage.getItem('bore1Hours');
      if (data91 !== null) {
        this.setState({bore1Hours: JSON.parse(data91)});
      }
    } catch (error) {}

    try {
      const data92 = await AsyncStorage.getItem('bore1m3');

      if (data92 !== null) {
        this.setState({bore1m3: JSON.parse(data92)});
      }
    } catch (error) {}

    try {
      const data93 = await AsyncStorage.getItem('electricity');

      if (data93 !== null) {
        this.setState({electricity: JSON.parse(data93)});
      }
    } catch (error) {}

    try {
      const data94 = await AsyncStorage.getItem('Septicm3');

      if (data94 !== null) {
        this.setState({Septicm3: JSON.parse(data94)});
      }
    } catch (error) {}
  };

  //END

  //SEND DATA BUTTON METHOD
  sendData = () => {
    //SEND DATA TO AWS
    this.scrollView.scrollTo({x: 0, y: 0, animated: true});

    if (this.state.isItConnected === 'Online') {
      if (this.state.gas === '') {
        this.setState({gas: '0'});
      }

      if (this.state.liquidCO2 === '') {
        this.setState({liquidCO2: '0'});
      }

      if (this.state.drainDischarge === '') {
        this.setState({drainDischarge: '0'});
      }

      if (this.state.g1SouthDripMls === '') {
        this.setState({g1SouthDripMls: '0'});
      }

      if (this.state.g1SouthDripEC === '') {
        this.setState({g1SouthDripEC: '0'});
      }

      if (this.state.g1SouthDripPh === '') {
        this.setState({g1SouthDripPh: '0'});
      }

      if (this.state.g1SouthDrainMls === '') {
        this.setState({g1SouthDrainMls: '0'});
      }

      if (this.state.g1SouthDrainEc === '') {
        this.setState({g1SouthDrainEc: '0'});
      }

      if (this.state.g1SouthDrainPh === '') {
        this.setState({g1SouthDrainPh: '0'});
      }

      if (this.state.g1NorthDripMls === '') {
        this.setState({g1NorthDripMls: '0'});
      }

      if (this.state.g1NorthDripEC === '') {
        this.setState({g1NorthDripEC: '0'});
      }

      if (this.state.g1NorthDripPh === '') {
        this.setState({g1NorthDripPh: '0'});
      }

      if (this.state.g1NorthDrainMls === '') {
        this.setState({g1NorthDrainMls: '0'});
      }

      if (this.state.g1NorthDrainEC === '') {
        this.setState({g1NorthDrainEC: '0'});
      }

      if (this.state.g1NorthDrainPh === '') {
        this.setState({g1NorthDrainPh: '0'});
      }

      if (this.state.g1Valve1DripMls === '') {
        this.setState({g1Valve1DripMls: '0'});
      }

      if (this.state.g1Valve2DripMls === '') {
        this.setState({g1Valve2DripMls: '0'});
      }

      if (this.state.g1Valve3DripMls === '') {
        this.setState({g1Valve3DripMls: '0'});
      }

      if (this.state.g1Valve4DripMls === '') {
        this.setState({g1Valve4DripMls: '0'});
      }

      if (this.state.g2SouthDripMls === '') {
        this.setState({g2SouthDripMls: '0'});
      }

      if (this.state.g2SouthDripEC === '') {
        this.setState({g2SouthDripEC: '0'});
      }

      if (this.state.g2SouthDripPh === '') {
        this.setState({g2SouthDripPh: '0'});
      }

      if (this.state.g2SouthDrainMls === '') {
        this.setState({g2SouthDrainMls: '0'});
      }

      if (this.state.g2SouthDrainEc === '') {
        this.setState({g2SouthDrainEc: '0'});
      }

      if (this.state.g2SouthDrainPh === '') {
        this.setState({g2SouthDrainPh: '0'});
      }

      if (this.state.g2NorthDripMls === '') {
        this.setState({g2NorthDripMls: '0'});
      }

      if (this.state.g2NorthDripEC === '') {
        this.setState({g2NorthDripEC: '0'});
      }

      if (this.state.g2NorthDripPh === '') {
        this.setState({g2NorthDripPh: '0'});
      }

      if (this.state.g2NorthDrainMls === '') {
        this.setState({g2NorthDrainMls: '0'});
      }

      if (this.state.g2NorthDrainEC === '') {
        this.setState({g2NorthDrainEC: '0'});
      }

      if (this.state.g2NorthDrainPh === '') {
        this.setState({g2NorthDrainPh: '0'});
      }

      if (this.state.g2Valve5DripMls === '') {
        this.setState({g2Valve5DripMls: '0'});
      }

      if (this.state.g2Valve6DripMls === '') {
        this.setState({g2Valve6DripMls: '0'});
      }

      if (this.state.g2Valve7DripMls === '') {
        this.setState({g2Valve7DripMls: '0'});
      }

      if (this.state.g2Valve8DripMls === '') {
        this.setState({g2Valve8DripMls: '0'});
      }

      if (this.state.g2Valve9DripMls === '') {
        this.setState({g2Valve9DripMls: '0'});
      }

      if (this.state.g2Valve10DripMls === '') {
        this.setState({g2Valve10DripMls: '0'});
      }

      if (this.state.g2Valve11DripMls === '') {
        this.setState({g2Valve11DripMls: '0'});
      }

      if (this.state.g2Valve12DripMls === '') {
        this.setState({g2Valve12DripMls: '0'});
      }

      if (this.state.g3SouthDripMls === '') {
        this.setState({g3SouthDripMls: '0'});
      }

      if (this.state.g3SouthDripEC === '') {
        this.setState({g3SouthDripEC: '0'});
      }

      if (this.state.g3SouthDripPh === '') {
        this.setState({g3SouthDripPh: '0'});
      }

      if (this.state.g3SouthDrainMls === '') {
        this.setState({g3SouthDrainMls: '0'});
      }

      if (this.state.g3SouthDrainEc === '') {
        this.setState({g3SouthDrainEc: '0'});
      }

      if (this.state.g3SouthDrainPh === '') {
        this.setState({g3SouthDrainPh: '0'});
      }

      if (this.state.g3NorthDrainMls === '') {
        this.setState({g3NorthDrainMls: '0'});
      }

      if (this.state.g3NorthDrainEC === '') {
        this.setState({g3NorthDrainEC: '0'});
      }

      if (this.state.g3NorthDrainPh === '') {
        this.setState({g3NorthDrainPh: '0'});
      }

      if (this.state.g3Valve13DripMls === '') {
        this.setState({g3Valve13DripMls: '0'});
      }

      if (this.state.g3Valve14DripMls === '') {
        this.setState({g3Valve14DripMls: '0'});
      }

      if (this.state.g3Valve15DripMls === '') {
        this.setState({g3Valve15DripMls: '0'});
      }

      if (this.state.g3Valve16DripMls === '') {
        this.setState({g3Valve16DripMls: '0'});
      }

      if (this.state.g3Valve17DripMls === '') {
        this.setState({g3Valve17DripMls: '0'});
      }

      if (this.state.g3Valve18DripMls === '') {
        this.setState({g3Valve18DripMls: '0'});
      }

      if (this.state.g3Valve19DripMls === '') {
        this.setState({g3Valve19DripMls: '0'});
      }

      if (this.state.g3Valve20DripMls === '') {
        this.setState({g3Valve20DripMls: '0'});
      }

      if (this.state.g4SouthDripMls === '') {
        this.setState({g4SouthDripMls: '0'});
      }

      if (this.state.g4SouthDripEC === '') {
        this.setState({g4SouthDripEC: '0'});
      }

      if (this.state.g4SouthDripPh === '') {
        this.setState({g4SouthDripPh: '0'});
      }

      if (this.state.g4SouthDrainMls === '') {
        this.setState({g4SouthDrainMls: '0'});
      }

      if (this.state.g4SouthDrainEc === '') {
        this.setState({g4SouthDrainEc: '0'});
      }

      if (this.state.g4SouthDrainPh === '') {
        this.setState({g4SouthDrainPh: '0'});
      }

      if (this.state.g4NorthDripMls === '') {
        this.setState({g4NorthDripMls: '0'});
      }

      if (this.state.g4NorthDripEC === '') {
        this.setState({g4NorthDripEC: '0'});
      }

      if (this.state.g4NorthDripPh === '') {
        this.setState({g4NorthDripPh: '0'});
      }

      if (this.state.g4NorthDrainMls === '') {
        this.setState({g4NorthDrainMls: '0'});
      }

      if (this.state.g4NorthDrainEC === '') {
        this.setState({g4NorthDrainEC: '0'});
      }

      if (this.state.g4NorthDrainPh === '') {
        this.setState({g4NorthDrainPh: '0'});
      }

      if (this.state.g4Valve21DripMls === '') {
        this.setState({g4Valve21DripMls: '0'});
      }

      if (this.state.g4Valve22DripMls === '') {
        this.setState({g4Valve22DripMls: '0'});
      }

      if (this.state.g4Valve23DripMls === '') {
        this.setState({g4Valve23DripMls: '0'});
      }

      if (this.state.g4Valve24DripMls === '') {
        this.setState({g4Valve24DripMls: '0'});
      }

      if (this.state.g5FirstDripMls === '') {
        this.setState({g5FirstDripMls: '0'});
      }

      if (this.state.g5FirstDripEC === '') {
        this.setState({g5FirstDripEC: '0'});
      }

      if (this.state.g5FirstDripPh === '') {
        this.setState({g5FirstDripPh: '0'});
      }

      if (this.state.g5FirstDrainMls === '') {
        this.setState({g5FirstDrainMls: '0'});
      }

      if (this.state.g5FirstDrainEc === '') {
        this.setState({g5FirstDrainEc: '0'});
      }

      if (this.state.g5FirstDrainPh === '') {
        this.setState({g5FirstDrainPh: '0'});
      }

      if (this.state.g5SecondDripMls === '') {
        this.setState({g5SecondDripMls: '0'});
      }

      if (this.state.g5SecondDripEC === '') {
        this.setState({g5SecondDripEC: '0'});
      }

      if (this.state.g5SecondDripPh === '') {
        this.setState({g5SecondDripPh: '0'});
      }

      if (this.state.g5SecondDrainMls === '') {
        this.setState({g5SecondDrainMls: '0'});
      }

      if (this.state.g5SecondDrainEC === '') {
        this.setState({g5SecondDrainEC: '0'});
      }

      if (this.state.g5SecondDrainPh === '') {
        this.setState({g5SecondDrainPh: '0'});
      }

      if (this.state.g5Valve25DripMls === '') {
        this.setState({g5Valve25DripMls: '0'});
      }

      if (this.state.g5Valve26DripMls === '') {
        this.setState({g5Valve26DripMls: '0'});
      }

      if (this.state.g5Valve27DripMls === '') {
        this.setState({g5Valve27DripMls: '0'});
      }

      if (this.state.bore1Hours === '') {
        this.setState({bore1Hours: '0'});
      }

      if (this.state.bore1m3 === '') {
        this.setState({bore1m3: '0'});
      }

      if (this.state.electricity === '') {
        this.setState({electricity: '0'});
      }

      if (this.state.Septicm3 === '') {
        this.setState({Septicm3: '0'});
      }

      realm.write(() => {
        ID =
          realm.objects('daily_readings_offline_table').sorted('entry_id', true)
            .length > 0
            ? realm
                .objects('daily_readings_offline_table')
                .sorted('entry_id', true)[0].entry_id + 1
            : 1;
        realm.create('daily_readings_offline_table', {
          entry_id: ID,
          site_name: this.state.siteName.toString(),
          currentDate: this.state.currentDate.toString(),
          dateYesterday: this.state.dateYesterday.toString(),
          dayYesterday: this.state.dayYesterday.toString(),
          gas: this.state.gas.toString(),
          liquidCO2: this.state.liquidCO2.toString(),
          drainDischarge: this.state.drainDischarge.toString(),
          g1SouthDripMls: this.state.g1SouthDripMls.toString(),
          g1SouthDripEC: this.state.g1SouthDripEC.toString(),
          g1SouthDripPh: this.state.g1SouthDripPh.toString(),
          g1SouthDrainMls: this.state.g1SouthDrainMls.toString(),
          g1SouthDrainEc: this.state.g1SouthDrainEc.toString(),
          g1SouthDrainPh: this.state.g1SouthDrainPh.toString(),
          g1NorthDripMls: this.state.g1NorthDripMls.toString(),
          g1NorthDripEC: this.state.g1NorthDripEC.toString(),
          g1NorthDripPh: this.state.g1NorthDripPh.toString(),
          g1NorthDrainMls: this.state.g1NorthDrainMls.toString(),
          g1NorthDrainEC: this.state.g1NorthDrainEC.toString(),
          g1NorthDrainPh: this.state.g1NorthDrainPh.toString(),
          g1Valve1DripMls: this.state.g1Valve1DripMls.toString(),
          g1Valve2DripMls: this.state.g1Valve2DripMls.toString(),
          g1Valve3DripMls: this.state.g1Valve3DripMls.toString(),
          g1Valve4DripMls: this.state.g1Valve4DripMls.toString(),
          g2SouthDripMls: this.state.g2SouthDripMls.toString(),
          g2SouthDripEC: this.state.g2SouthDripEC.toString(),
          g2SouthDripPh: this.state.g2SouthDripPh.toString(),
          g2SouthDrainMls: this.state.g2SouthDrainMls.toString(),
          g2SouthDrainEc: this.state.g2SouthDrainEc.toString(),
          g2SouthDrainPh: this.state.g2SouthDrainPh.toString(),
          g2NorthDripMls: this.state.g2NorthDripMls.toString(),
          g2NorthDripEC: this.state.g2NorthDripEC.toString(),
          g2NorthDripPh: this.state.g2NorthDripPh.toString(),
          g2NorthDrainMls: this.state.g2NorthDrainMls.toString(),
          g2NorthDrainEC: this.state.g2NorthDrainEC.toString(),
          g2NorthDrainPh: this.state.g2NorthDrainPh.toString(),
          g2Valve5DripMls: this.state.g2Valve5DripMls.toString(),
          g2Valve6DripMls: this.state.g2Valve6DripMls.toString(),
          g2Valve7DripMls: this.state.g2Valve7DripMls.toString(),
          g2Valve8DripMls: this.state.g2Valve8DripMls.toString(),
          g2Valve9DripMls: this.state.g2Valve9DripMls.toString(),
          g2Valve10DripMls: this.state.g2Valve10DripMls.toString(),
          g2Valve11DripMls: this.state.g2Valve11DripMls.toString(),
          g2Valve12DripMls: this.state.g2Valve12DripMls.toString(),
          g3SouthDripMls: this.state.g3SouthDripMls.toString(),
          g3SouthDripEC: this.state.g3SouthDripEC.toString(),
          g3SouthDripPh: this.state.g3SouthDripPh.toString(),
          g3SouthDrainMls: this.state.g3SouthDrainMls.toString(),
          g3SouthDrainEc: this.state.g3SouthDrainEc.toString(),
          g3SouthDrainPh: this.state.g3SouthDrainPh.toString(),
          g3NorthDripMls: this.state.g3NorthDripMls.toString(),
          g3NorthDripEC: this.state.g3NorthDripEC.toString(),
          g3NorthDripPh: this.state.g3NorthDripPh.toString(),
          g3NorthDrainMls: this.state.g3NorthDrainMls.toString(),
          g3NorthDrainEC: this.state.g3NorthDrainEC.toString(),
          g3NorthDrainPh: this.state.g3NorthDrainPh.toString(),
          g3Valve13DripMls: this.state.g3Valve13DripMls.toString(),
          g3Valve14DripMls: this.state.g3Valve14DripMls.toString(),
          g3Valve15DripMls: this.state.g3Valve15DripMls.toString(),
          g3Valve16DripMls: this.state.g3Valve16DripMls.toString(),
          g3Valve17DripMls: this.state.g3Valve17DripMls.toString(),
          g3Valve18DripMls: this.state.g3Valve18DripMls.toString(),
          g3Valve19DripMls: this.state.g3Valve19DripMls.toString(),
          g3Valve20DripMls: this.state.g3Valve20DripMls.toString(),
          g4SouthDripMls: this.state.g4SouthDripMls.toString(),
          g4SouthDripEC: this.state.g4SouthDripEC.toString(),
          g4SouthDripPh: this.state.g4SouthDripPh.toString(),
          g4SouthDrainMls: this.state.g4SouthDrainMls.toString(),
          g4SouthDrainEc: this.state.g4SouthDrainEc.toString(),
          g4SouthDrainPh: this.state.g4SouthDrainPh.toString(),
          g4NorthDripMls: this.state.g4NorthDripMls.toString(),
          g4NorthDripEC: this.state.g4NorthDripEC.toString(),
          g4NorthDripPh: this.state.g4NorthDripPh.toString(),
          g4NorthDrainMls: this.state.g4NorthDrainMls.toString(),
          g4NorthDrainEC: this.state.g4NorthDrainEC.toString(),
          g4NorthDrainPh: this.state.g4NorthDrainPh.toString(),
          g4Valve21DripMls: this.state.g4Valve21DripMls.toString(),
          g4Valve22DripMls: this.state.g4Valve22DripMls.toString(),
          g4Valve23DripMls: this.state.g4Valve23DripMls.toString(),
          g4Valve24DripMls: this.state.g4Valve24DripMls.toString(),
          g5FirstDripMls: this.state.g5FirstDripMls.toString(),
          g5FirstDripEC: this.state.g5FirstDripEC.toString(),
          g5FirstDripPh: this.state.g5FirstDripPh.toString(),
          g5FirstDrainMls: this.state.g5FirstDrainMls.toString(),
          g5FirstDrainEc: this.state.g5FirstDrainEc.toString(),
          g5FirstDrainPh: this.state.g5FirstDrainPh.toString(),
          g5SecondDripMls: this.state.g5SecondDripMls.toString(),
          g5SecondDripEC: this.state.g5SecondDripEC.toString(),
          g5SecondDripPh: this.state.g5SecondDripPh.toString(),
          g5SecondDrainMls: this.state.g5SecondDrainMls.toString(),
          g5SecondDrainEC: this.state.g5SecondDrainEC.toString(),
          g5SecondDrainPh: this.state.g5SecondDrainPh.toString(),
          g5Valve25DripMls: this.state.g5Valve25DripMls.toString(),
          g5Valve26DripMls: this.state.g5Valve26DripMls.toString(),
          g5Valve27DripMls: this.state.g5Valve27DripMls.toString(),
          bore1Hours: this.state.bore1Hours.toString(),
          bore1m3: this.state.bore1m3.toString(),
          electricity: this.state.electricity.toString(),
          Septicm3: this.state.Septicm3.toString(),
        });
      });

      const sendData = {
        site_name: this.state.siteName.toString(),
        currentdate: this.state.currentDate.toString(),
        dateyesterday: this.state.dateYesterday.toString(),
        dayyesterday: this.state.dayYesterday.toString(),
        gas: this.state.gas.length === 0 ? '0' : parseInt(this.state.gas),
        liquidco2:
          this.state.liquidCO2.length === 0
            ? '0'
            : parseFloat(this.state.liquidCO2),
        draindischarge:
          this.state.drainDischarge.length === 0
            ? '0'
            : parseInt(this.state.drainDischarge),
        g1southdrainmls:
          this.state.g1SouthDripMls.length === 0
            ? '0'
            : parseInt(this.state.g1SouthDripMls),
        g1southdrainec:
          this.state.g1SouthDripEC.length === 0
            ? '0'
            : parseFloat(this.state.g1SouthDripEC),
        g1southdripph:
          this.state.g1SouthDripPh.length === 0
            ? '0'
            : parseFloat(this.state.g1SouthDripPh),
        g1southdrainmls:
          this.state.g1SouthDrainMls.length === 0
            ? '0'
            : parseInt(this.state.g1SouthDrainMls),
        g1southdrainec:
          this.state.g1SouthDrainEc.length === 0
            ? '0'
            : parseFloat(this.state.g1SouthDrainEc),
        g1southdrainph:
          this.state.g1SouthDrainPh.length === 0
            ? '0'
            : parseFloat(this.state.g1SouthDrainPh),
        g1northdripmls:
          this.state.g1NorthDripMls.length === 0
            ? '0'
            : parseInt(this.state.g1NorthDripMls),
        g1northdripec:
          this.state.g1NorthDripEC.length === 0
            ? '0'
            : parseFloat(this.state.g1NorthDripEC),
        g1northdripph:
          this.state.g1NorthDripPh.length === 0
            ? '0'
            : parseFloat(this.state.g1NorthDripPh),
        g1northdrainmls:
          this.state.g1NorthDrainMls.length === 0
            ? '0'
            : parseInt(this.state.g1NorthDrainMls),
        g1northdrainec:
          this.state.g1NorthDrainEC.length === 0
            ? '0'
            : parseFloat(this.state.g1NorthDrainEC),
        g1northdrainph:
          this.state.g1NorthDrainPh.length === 0
            ? '0'
            : parseFloat(this.state.g1NorthDrainPh),
        g1valve1dripmls:
          this.state.g1Valve1DripMls.length === 0
            ? '0'
            : parseInt(this.state.g1Valve1DripMls),
        g1valve2dripmls:
          this.state.g1Valve2DripMls.length === 0
            ? '0'
            : parseInt(this.state.g1Valve2DripMls),
        g1valve3dripmls:
          this.state.g1Valve3DripMls.length === 0
            ? '0'
            : parseInt(this.state.g1Valve3DripMls),
        g1valve4dripmls:
          this.state.g1Valve4DripMls.length === 0
            ? '0'
            : parseInt(this.state.g1Valve4DripMls),
        g2southdripmls:
          this.state.g2SouthDripMls.length === 0
            ? '0'
            : parseInt(this.state.g2SouthDripMls),
        g2southdripec:
          this.state.g2SouthDripEC.length === 0
            ? '0'
            : parseFloat(this.state.g2SouthDripEC),
        g2southdripph:
          this.state.g2SouthDripPh.length === 0
            ? '0'
            : parseFloat(this.state.g2SouthDripPh),
        g2southdrainmls:
          this.state.g2SouthDrainMls.length === 0
            ? '0'
            : parseInt(this.state.g2SouthDrainMls),
        g2southdrainec:
          this.state.g2SouthDrainEc.length === 0
            ? '0'
            : parseFloat(this.state.g2SouthDrainEc),
        g2southdrainph:
          this.state.g2SouthDrainPh.length === 0
            ? '0'
            : parseFloat(this.state.g2SouthDrainPh),
        g2northdripmls:
          this.state.g2NorthDripMls.length === 0
            ? '0'
            : parseInt(this.state.g2NorthDripMls),
        g2northdripec:
          this.state.g2NorthDripEC.length === 0
            ? '0'
            : parseFloat(this.state.g2NorthDripEC),
        g2northdripph:
          this.state.g2NorthDripPh.length === 0
            ? '0'
            : parseFloat(this.state.g2NorthDripPh),
        g2northdrainmls:
          this.state.g2NorthDrainMls.length === 0
            ? '0'
            : parseInt(this.state.g2NorthDrainMls),
        g2northdrainec:
          this.state.g2NorthDrainEC.length === 0
            ? '0'
            : parseFloat(this.state.g2NorthDrainEC),
        g2northdrainph:
          this.state.g2NorthDrainPh.length === 0
            ? '0'
            : parseFloat(this.state.g2NorthDrainPh),
        g2valve5dripmls:
          this.state.g2Valve5DripMls.length === 0
            ? '0'
            : parseInt(this.state.g2Valve5DripMls),
        g2valve6dripmls:
          this.state.g2Valve6DripMls.length === 0
            ? '0'
            : parseInt(this.state.g2Valve6DripMls),
        g2valve7dripmls:
          this.state.g2Valve7DripMls.length === 0
            ? '0'
            : parseInt(this.state.g2Valve7DripMls),
        g2valve8dripmls:
          this.state.g2Valve8DripMls.length === 0
            ? '0'
            : parseInt(this.state.g2Valve8DripMls),
        g2valve9dripmls:
          this.state.g2Valve9DripMls.length === 0
            ? '0'
            : parseInt(this.state.g2Valve9DripMls),
        g2valve10dripmls:
          this.state.g2Valve10DripMls.length === 0
            ? '0'
            : parseInt(this.state.g2Valve10DripMls),
        g2valve11dripmls:
          this.state.g2Valve11DripMls.length === 0
            ? '0'
            : parseInt(this.state.g2Valve11DripMls),
        g2valve12dripmls:
          this.state.g2Valve12DripMls.length === 0
            ? '0'
            : parseInt(this.state.g2Valve12DripMls),
        g3southdripmls:
          this.state.g3SouthDripMls.length === 0
            ? '0'
            : parseInt(this.state.g3SouthDripMls),
        g3southdripec:
          this.state.g3SouthDripEC.length === 0
            ? '0'
            : parseFloat(this.state.g3SouthDripEC),
        g3southdripph:
          this.state.g3SouthDripPh.length === 0
            ? '0'
            : parseFloat(this.state.g3SouthDripPh),
        g3southdrainmls:
          this.state.g3SouthDrainMls.length === 0
            ? '0'
            : parseInt(this.state.g3SouthDrainMls),
        g3southdrainec:
          this.state.g3SouthDrainEc.length === 0
            ? '0'
            : parseFloat(this.state.g3SouthDrainEc),
        g3southdrainph:
          this.state.g3SouthDrainPh.length === 0
            ? '0'
            : parseFloat(this.state.g3SouthDrainPh),
        g3northdripmls:
          this.state.g3NorthDripMls.length === 0
            ? '0'
            : parseInt(this.state.g3NorthDripMls),
        g3northdripec:
          this.state.g3NorthDripEC.length === 0
            ? '0'
            : parseFloat(this.state.g3NorthDripEC),
        g3northdripph:
          this.state.g3NorthDripPh.length === 0
            ? '0'
            : parseFloat(this.state.g3NorthDripPh),
        g3northdrainmls:
          this.state.g3NorthDrainMls.length === 0
            ? '0'
            : parseInt(this.state.g3NorthDrainMls),
        g3northdrainec:
          this.state.g3NorthDrainEC.length === 0
            ? '0'
            : parseFloat(this.state.g3NorthDrainEC),
        g3northdrainph:
          this.state.g3NorthDrainPh.length === 0
            ? '0'
            : parseFloat(this.state.g3NorthDrainPh),
        g3valve13dripmls:
          this.state.g3Valve13DripMls.length === 0
            ? '0'
            : parseInt(this.state.g3Valve13DripMls),
        g3valve14dripmls:
          this.state.g3Valve14DripMls.length === 0
            ? '0'
            : parseInt(this.state.g3Valve14DripMls),
        g3valve15dripmls:
          this.state.g3Valve15DripMls.length === 0
            ? '0'
            : parseInt(this.state.g3Valve15DripMls),
        g3valve16dripmls:
          this.state.g3Valve16DripMls.length === 0
            ? '0'
            : parseInt(this.state.g3Valve16DripMls),
        g3valve17dripmls:
          this.state.g3Valve17DripMls.length === 0
            ? '0'
            : parseInt(this.state.g3Valve17DripMls),
        g3valve18dripmls:
          this.state.g3Valve18DripMls.length === 0
            ? '0'
            : parseInt(this.state.g3Valve18DripMls),
        g3valve19dripmls:
          this.state.g3Valve19DripMls.length === 0
            ? '0'
            : parseInt(this.state.g3Valve19DripMls),
        g3valve20dripmls:
          this.state.g3Valve20DripMls.length === 0
            ? '0'
            : parseInt(this.state.g3Valve20DripMls),
        g4southdripmls:
          this.state.g4SouthDripMls.length === 0
            ? '0'
            : parseInt(this.state.g4SouthDripMls),
        g4southdripec:
          this.state.g4SouthDripEC.length === 0
            ? '0'
            : parseFloat(this.state.g4SouthDripEC),
        g4southdripph:
          this.state.g4SouthDripPh.length === 0
            ? '0'
            : parseFloat(this.state.g4SouthDripPh),
        g4southdrainmls:
          this.state.g4SouthDrainMls.length === 0
            ? '0'
            : parseInt(this.state.g4SouthDrainMls),
        g4southdrainec:
          this.state.g4SouthDrainEc.length === 0
            ? '0'
            : parseFloat(this.state.g4SouthDrainEc),
        g4southdrainph:
          this.state.g4SouthDrainPh.length === 0
            ? '0'
            : parseFloat(this.state.g4SouthDrainPh),
        g4northdripmls:
          this.state.g4NorthDripMls.length === 0
            ? '0'
            : parseInt(this.state.g4NorthDripMls),
        g4northdripec:
          this.state.g4NorthDripEC.length === 0
            ? '0'
            : parseFloat(this.state.g4NorthDripEC),
        g4northdripph:
          this.state.g4NorthDripPh.length === 0
            ? '0'
            : parseFloat(this.state.g4NorthDripPh),
        g4northdrainmls:
          this.state.g4NorthDrainMls.length === 0
            ? '0'
            : parseInt(this.state.g4NorthDrainMls),
        g4northdrainec:
          this.state.g4NorthDrainEC.length === 0
            ? '0'
            : parseFloat(this.state.g4NorthDrainEC),
        g4northdrainph:
          this.state.g4NorthDrainPh.length === 0
            ? '0'
            : parseFloat(this.state.g4NorthDrainPh),
        g4valve21dripmls:
          this.state.g4Valve21DripMls.length === 0
            ? '0'
            : parseInt(this.state.g4Valve21DripMls),
        g4valve22dripmls:
          this.state.g4Valve22DripMls.length === 0
            ? '0'
            : parseInt(this.state.g4Valve22DripMls),
        g4valve23dripmls:
          this.state.g4Valve23DripMls.length === 0
            ? '0'
            : parseInt(this.state.g4Valve23DripMls),
        g4valve24dripmls:
          this.state.g4Valve24DripMls.length === 0
            ? '0'
            : parseInt(this.state.g4Valve24DripMls),
        g5firstdripmls:
          this.state.g5FirstDripMls.length === 0
            ? '0'
            : parseInt(this.state.g5FirstDripMls),
        g5firstdripec:
          this.state.g5FirstDripEC.length === 0
            ? '0'
            : parseFloat(this.state.g5FirstDripEC),
        g5firstdripph:
          this.state.g5FirstDripPh.length === 0
            ? '0'
            : parseFloat(this.state.g5FirstDripPh),
        g5firstdrainmls:
          this.state.g5FirstDrainMls.length === 0
            ? '0'
            : parseInt(this.state.g5FirstDrainMls),
        g5firstdrainec:
          this.state.g5FirstDrainEc.length === 0
            ? '0'
            : parseFloat(this.state.g5FirstDrainEc),
        g5firstdrainph:
          this.state.g5FirstDrainPh.length === 0
            ? '0'
            : parseFloat(this.state.g5FirstDrainPh),
        g5seconddripmls:
          this.state.g5SecondDripMls.length === 0
            ? '0'
            : parseInt(this.state.g5SecondDripMls),
        g5seconddripec:
          this.state.g5SecondDripEC.length === 0
            ? '0'
            : parseFloat(this.state.g5SecondDripEC),
        g5seconddripph:
          this.state.g5SecondDripPh.length === 0
            ? '0'
            : parseFloat(this.state.g5SecondDripPh),
        g5seconddrainmls:
          this.state.g5SecondDrainMls.length === 0
            ? '0'
            : parseInt(this.state.g5SecondDrainMls),
        g5seconddrainec:
          this.state.g5SecondDrainEC.length === 0
            ? '0'
            : parseFloat(this.state.g5SecondDrainEC),
        g5seconddrainph:
          this.state.g5SecondDrainPh.length === 0
            ? '0'
            : parseFloat(this.state.g5SecondDrainPh),
        g5valve25dripmls:
          this.state.g5Valve25DripMls.length === 0
            ? '0'
            : parseInt(this.state.g5Valve25DripMls),
        g5valve26dripmls:
          this.state.g5Valve26DripMls.length === 0
            ? '0'
            : parseInt(this.state.g5Valve26DripMls),
        g5valve27dripmls:
          this.state.g5Valve27DripMls.length === 0
            ? '0'
            : parseInt(this.state.g5Valve27DripMls),
        bore1hours:
          this.state.bore1Hours.length === 0
            ? '0'
            : parseInt(this.state.bore1Hours),
        bore1m3:
          this.state.bore1m3.length === 0 ? '0' : parseInt(this.state.bore1m3),
        electricity:
          this.state.electricity.length === 0
            ? '0'
            : parseFloat(this.state.electricity),
        septicm3:
          this.state.Septicm3.length === 0
            ? '0'
            : parseInt(this.state.Septicm3),
      };

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
      this.setState({
        dateYesterday: '',
        dayYesterday: '',
        dayYesterday: '',
        gas: '',
        liquidCO2: '',
        drainDischarge: '',
        g1SouthDripMls: '',
        g1SouthDripEC: '',
        g1SouthDripPh: '',
        g1SouthDrainMls: '',
        g1SouthDrainEc: '',
        g1SouthDrainPh: '',
        g1NorthDripMls: '',
        g1NorthDripEC: '',
        g1NorthDripPh: '',
        g1NorthDrainMls: '',
        g1NorthDrainEC: '',
        g1NorthDrainPh: '',
        g1Valve1DripMls: '',
        g1Valve2DripMls: '',
        g1Valve4DripMls: '',
        g2SouthDripMls: '',
        g2SouthDripPh: '',
        g2SouthDrainMls: '',
        g2SouthDrainEc: '',
        g2SouthDrainPh: '',
        g2NorthDripMls: '',
        g2NorthDripEC: '',
        g2NorthDripPh: '',
        g2NorthDrainMls: '',
        g2NorthDrainEC: '',
        g2NorthDrainPh: '',
        g2Valve5DripMls: '',
        g2Valve6DripMls: '',
        g2Valve7DripMls: '',
        g2Valve8DripMls: '',
        g2Valve9DripMls: '',
        g2Valve10DripMls: '',
        g2Valve11DripMls: '',
        g2Valve12DripMls: '',
        g3SouthDripMls: '',
        g3SouthDripEC: '',
        g3SouthDripPh: '',
        g3SouthDrainMls: '',
        g3SouthDrainEc: '',
        g3SouthDrainPh: '',
        g3NorthDripMls: '',
        g3NorthDripEC: '',
        g3NorthDripPh: '',
        g3NorthDrainMls: '',
        g3NorthDrainEC: '',
        g3NorthDrainPh: '',
        g3Valve13DripMls: '',
        g3Valve14DripMls: '',
        g3Valve15DripMls: '',
        g3Valve16DripMls: '',
        g3Valve17DripMls: '',
        g3Valve18DripMls: '',
        g3Valve19DripMls: '',
        g3Valve20DripMls: '',
        g4SouthDripMls: '',
        g4SouthDripEC: '',
        g4SouthDripPh: '',
        g4SouthDrainMls: '',
        g4SouthDrainEc: '',
        g4SouthDrainPh: '',
        g4NorthDripMls: '',
        g4NorthDripEC: '',
        g4NorthDripPh: '',
        g4NorthDrainMls: '',
        g4NorthDrainEC: '',
        g4NorthDrainPh: '',
        g4Valve21DripMls: '',
        g4Valve22DripMls: '',
        g4Valve23DripMls: '',
        g4Valve24DripMls: '',
        g5FirstDripMls: '',
        g5FirstDripEC: '',
        g5FirstDripPh: '',
        g5FirstDrainMls: '',
        g5FirstDrainEc: '',
        g5FirstDrainPh: '',
        g5SecondDripMls: '',
        g5SecondDripEC: '',
        g5SecondDripPh: '',
        g5SecondDrainMls: '',
        g5SecondDrainEC: '',
        g5SecondDrainPh: '',
        g5Valve25DripMls: '',
        g5Valve26DripMls: '',
        g5Valve27DripMls: '',
        bore1Hours: '',
        bore1m3: '',
        electricity: '',
        Septicm3: '',
      });

      //

      this.props.navigation.navigate('SendDataToAws', {
        data: sendData,
      });
    } else {
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

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <Text style={styles.btnText}>Loading Please Wait...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/background2.png')}
          style={styles.backgroundImage}>
          <ScrollView
            style={styles.formContainer}
            ref={(ref) => {
              this.scrollView = ref;
            }}
            keyboardShouldPersistTaps="handled">
            <View style={styles.marginDimension}></View>

            <View style={styles.marginDimension}></View>

            <View style={styles.row}>
              <Text style={styles.titleHeadingText}>Yesterday's Date</Text>
              {this.state.filteredSampleData.length ? (
                <Text style={styles.titleHeadingTextRed}>
                  {this.state.filteredSampleData[0].dateyesterday}
                </Text>
              ) : null}
            </View>

            <DateTimePickerModal
              isVisible={this.state.visibility}
              onConfirm={this.handleConfirm}
              onCancel={this.onPressCancel}
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
                onChangeText={this.onPressButton}
                onPress={this.onPressButton}
                showSoftInputOnFocus={false}
                value={this.state.dateYesterday}
                onFocus={this.onPressButton}
                onSubmitEditing={() => {
                  this.refsamp.focus();
                }}
              />
            </View>

            <View style={styles.marginDimensionTop}></View>

            <View style={styles.row}>
              <Text style={styles.titleHeadingText}>Yesterday's Day</Text>
              {this.state.filteredSampleData.length ? (
                <Text style={styles.titleHeadingTextRed}>
                  {this.state.filteredSampleData[0].dayyesterday}
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
                onChangeText={this.onPressButton}
                value={this.state.dayYesterday}
                onSubmitEditing={() => {
                  this.refsamp.focus();
                }}
                disabled={true}
                selectTextOnFocus={false}
              />
            </View>

            <View style={styles.marginDimensionTop}></View>

            <View style={styles.row}>
              <Text style={styles.titleHeadingText}>Gas (m3)</Text>
              {this.state.filteredSampleData.length ? (
                <Text style={styles.titleHeadingTextRed}>
                  {this.state.filteredSampleData[0].gas}
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
                onChangeText={(text) => this.updateTextInput(text, 'gas')}
                value={this.state.gas}
                editable={true}
                returnKeyType={'next'}
                keyboardType={'numeric'}
                ref={(input) => {
                  this.gas = input;
                }}
                onSubmitEditing={() => {
                  this.liquidCO2.focus();
                }}
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.marginDimensionTop}></View>

            <View style={styles.row}>
              <Text style={styles.titleHeadingText}>Liquid (CO2)</Text>
              {this.state.filteredSampleData.length ? (
                <Text style={styles.titleHeadingTextRed}>
                  {this.state.filteredSampleData[0].liquidco2}
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
                onChangeText={(text) => this.updateTextInput(text, 'liquidCO2')}
                value={this.state.liquidCO2}
                editable={true}
                returnKeyType={'next'}
                keyboardType={'numeric'}
                ref={(input) => {
                  this.liquidCO2 = input;
                }}
                onSubmitEditing={() => {
                  this.drainDischarge.focus();
                }}
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.marginDimensionTop}></View>

            <View style={styles.row}>
              <Text style={styles.titleHeadingText}>Drain Discharge</Text>
              {this.state.filteredSampleData.length ? (
                <Text style={styles.titleHeadingTextRed}>
                  {this.state.filteredSampleData[0].draindischarge}
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
                  this.updateTextInput(text, 'drainDischarge')
                }
                value={this.state.drainDischarge}
                editable={true}
                returnKeyType={'done'}
                keyboardType={'numeric'}
                ref={(input) => {
                  this.drainDischarge = input;
                }}
                blurOnSubmit={true}
              />
            </View>

            <View style={styles.marginDimensionTop}></View>

            <Text style={styles.headerText}>Compartment Readings</Text>

            <View style={styles.marginDimensionTop}></View>

            <View>
              <TouchableOpacity
                onPress={this.g1ChangeLayout}
                activeOpacity={0.6}
                style={styles.Btn}>
                <View style={styles.alignTextView}>
                  <Text style={styles.btnText}>GER 1</Text>

                  <Image
                    style={{
                      resizeMode: 'cover',
                      marginRight: 5,
                    }}
                    source={this.state.expandedG1 ? UP_ARROW : DOWN_ARROW}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: this.state.expandedG1 ? null : 0,
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
                      this.updateTextInput(text, 'g1SouthDripMls')
                    }
                    value={this.state.g1SouthDripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g1SouthDripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g1SouthDripEC.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.marginDimensionTop}></View>

                <Text style={styles.titleHeadingText}>
                  GER 1 South - Drip Ec
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
                      this.updateTextInput(text, 'g1SouthDripEC')
                    }
                    value={this.state.g1SouthDripEC}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g1SouthDripEC = input;
                    }}
                    onSubmitEditing={() => {
                      this.g1SouthDripPh.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.marginDimensionTop}></View>

                <Text style={styles.titleHeadingText}>
                  GER 1 South - Drip pH
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
                      this.updateTextInput(text, 'g1SouthDripPh')
                    }
                    value={this.state.g1SouthDripPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g1SouthDripPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g1SouthDrainMls.focus();
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
                      this.updateTextInput(text, 'g1SouthDrainMls')
                    }
                    value={this.state.g1SouthDrainMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g1SouthDrainMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g1SouthDrainEc.focus();
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
                      this.updateTextInput(text, 'g1SouthDrainEc')
                    }
                    value={this.state.g1SouthDrainEc}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g1SouthDrainEc = input;
                    }}
                    onSubmitEditing={() => {
                      this.g1SouthDrainPh.focus();
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
                      this.updateTextInput(text, 'g1SouthDrainPh')
                    }
                    value={this.state.g1SouthDrainPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g1SouthDrainPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g1NorthDripMls.focus();
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
                      this.updateTextInput(text, 'g1NorthDripMls')
                    }
                    value={this.state.g1NorthDripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g1NorthDripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g1NorthDripEC.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.marginDimensionTop}></View>

                <Text style={styles.titleHeadingText}>
                  GER 1 North - Drip Ec
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
                      this.updateTextInput(text, 'g1NorthDripEC')
                    }
                    value={this.state.g1NorthDripEC}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g1NorthDripEC = input;
                    }}
                    onSubmitEditing={() => {
                      this.g1NorthDripPh.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.marginDimensionTop}></View>

                <Text style={styles.titleHeadingText}>
                  GER 1 North - Drip pH
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
                      this.updateTextInput(text, 'g1NorthDripPh')
                    }
                    value={this.state.g1NorthDripPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g1NorthDripPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g1NorthDrainMls.focus();
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
                      this.updateTextInput(text, 'g1NorthDrainMls')
                    }
                    value={this.state.g1NorthDrainMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g1NorthDrainMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g1NorthDrainEC.focus();
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
                      this.updateTextInput(text, 'g1NorthDrainEC')
                    }
                    value={this.state.g1NorthDrainEC}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g1NorthDrainEC = input;
                    }}
                    onSubmitEditing={() => {
                      this.g1NorthDrainPh.focus();
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
                      this.updateTextInput(text, 'g1NorthDrainPh')
                    }
                    value={this.state.g1NorthDrainPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g1NorthDrainPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g1Valve1DripMls.focus();
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
                      this.updateTextInput(text, 'g1Valve1DripMls')
                    }
                    value={this.state.g1Valve1DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g1Valve1DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g1Valve2DripMls.focus();
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
                      this.updateTextInput(text, 'g1Valve2DripMls')
                    }
                    value={this.state.g1Valve2DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g1Valve2DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g1Valve3DripMls.focus();
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
                      this.updateTextInput(text, 'g1Valve3DripMls')
                    }
                    value={this.state.g1Valve3DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g1Valve3DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g1Valve4DripMls.focus();
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
                      this.updateTextInput(text, 'g1Valve4DripMls')
                    }
                    value={this.state.g1Valve4DripMls}
                    editable={true}
                    returnKeyType={'done'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g1Valve4DripMls = input;
                    }}
                    blurOnSubmit={true}
                  />
                </View>
              </View>
            </View>

            <View style={styles.marginDimensionTop}></View>

            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={this.g2ChangeLayout}
                style={styles.Btn}>
                <View style={styles.alignTextView}>
                  <Text style={styles.btnText}>GER 2</Text>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      marginRight: 5,
                    }}
                    source={this.state.expandedG2 ? UP_ARROW : DOWN_ARROW}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: this.state.expandedG2 ? null : 0,
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
                      this.updateTextInput(text, 'g2SouthDripMls')
                    }
                    value={this.state.g2SouthDripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2SouthDripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2SouthDripEC.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.marginDimensionTop}></View>

                <Text style={styles.titleHeadingText}>
                  GER 2 South - Drip Ec
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
                      this.updateTextInput(text, 'g2SouthDripEC')
                    }
                    value={this.state.g2SouthDripEC}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2SouthDripEC = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2SouthDripPh.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.marginDimensionTop}></View>

                <Text style={styles.titleHeadingText}>
                  GER 2 South - Drip pH
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
                      this.updateTextInput(text, 'g2SouthDripPh')
                    }
                    value={this.state.g2SouthDripPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2SouthDripPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2SouthDrainMls.focus();
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
                      this.updateTextInput(text, 'g2SouthDrainMls')
                    }
                    value={this.state.g2SouthDrainMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2SouthDrainMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2SouthDrainEc.focus();
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
                      this.updateTextInput(text, 'g2SouthDrainEc')
                    }
                    value={this.state.g2SouthDrainEc}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2SouthDrainEc = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2SouthDrainPh.focus();
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
                      this.updateTextInput(text, 'g2SouthDrainPh')
                    }
                    value={this.state.g2SouthDrainPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2SouthDrainPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2NorthDripMls.focus();
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
                      this.updateTextInput(text, 'g2NorthDripMls')
                    }
                    value={this.state.g2NorthDripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2NorthDripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2NorthDripEC.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.marginDimensionTop}></View>

                <Text style={styles.titleHeadingText}>
                  GER 2 North - Drip Ec
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
                      this.updateTextInput(text, 'g2NorthDripEC')
                    }
                    value={this.state.g2NorthDripEC}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2NorthDripEC = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2NorthDripPh.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.marginDimensionTop}></View>

                <Text style={styles.titleHeadingText}>
                  GER 2 North - Drip pH
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
                      this.updateTextInput(text, 'g2NorthDripPh')
                    }
                    value={this.state.g2NorthDripPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2NorthDripPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2NorthDrainMls.focus();
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
                      this.updateTextInput(text, 'g2NorthDrainMls')
                    }
                    value={this.state.g2NorthDrainMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2NorthDrainMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2NorthDrainEC.focus();
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
                      this.updateTextInput(text, 'g2NorthDrainEC')
                    }
                    value={this.state.g2NorthDrainEC}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2NorthDrainEC = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2NorthDrainPh.focus();
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
                      this.updateTextInput(text, 'g2NorthDrainPh')
                    }
                    value={this.state.g2NorthDrainPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2NorthDrainPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2Valve5DripMls.focus();
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
                      this.updateTextInput(text, 'g2Valve5DripMls')
                    }
                    value={this.state.g2Valve5DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2Valve5DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2Valve6DripMls.focus();
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
                      this.updateTextInput(text, 'g2Valve6DripMls')
                    }
                    value={this.state.g2Valve6DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2Valve6DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2Valve7DripMls.focus();
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
                      this.updateTextInput(text, 'g2Valve7DripMls')
                    }
                    value={this.state.g2Valve7DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2Valve7DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2Valve8DripMls.focus();
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
                      this.updateTextInput(text, 'g2Valve8DripMls')
                    }
                    value={this.state.g2Valve8DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2Valve8DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2Valve9DripMls.focus();
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
                      this.updateTextInput(text, 'g2Valve9DripMls')
                    }
                    value={this.state.g2Valve9DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2Valve9DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2Valve10DripMls.focus();
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
                      this.updateTextInput(text, 'g2Valve10DripMls')
                    }
                    value={this.state.g2Valve10DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2Valve10DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2Valve11DripMls.focus();
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
                      this.updateTextInput(text, 'g2Valve11DripMls')
                    }
                    value={this.state.g2Valve11DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2Valve11DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g2Valve12DripMls.focus();
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
                      this.updateTextInput(text, 'g2Valve12DripMls')
                    }
                    value={this.state.g2Valve12DripMls}
                    editable={true}
                    returnKeyType={'done'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g2Valve12DripMls = input;
                    }}
                    blurOnSubmit={true}
                  />
                </View>
              </View>
            </View>

            <View style={styles.marginDimensionTop}></View>

            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={this.g3ChangeLayout}
                style={styles.Btn}>
                <View style={styles.alignTextView}>
                  <Text style={styles.btnText}>GER 3</Text>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      marginRight: 5,
                    }}
                    source={this.state.expandedG3 ? UP_ARROW : DOWN_ARROW}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: this.state.expandedG3 ? null : 0,
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
                      this.updateTextInput(text, 'g3SouthDripMls')
                    }
                    value={this.state.g3SouthDripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3SouthDripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3SouthDripEC.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.marginDimensionTop}></View>

                <Text style={styles.titleHeadingText}>
                  GER 3 South - Drip Ec
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
                      this.updateTextInput(text, 'g3SouthDripEC')
                    }
                    value={this.state.g3SouthDripEC}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3SouthDripEC = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3SouthDripPh.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.marginDimensionTop}></View>

                <Text style={styles.titleHeadingText}>
                  GER 3 South - Drip pH
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
                      this.updateTextInput(text, 'g3SouthDripPh')
                    }
                    value={this.state.g3SouthDripPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3SouthDripPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3SouthDrainMls.focus();
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
                      this.updateTextInput(text, 'g3SouthDrainMls')
                    }
                    value={this.state.g3SouthDrainMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3SouthDrainMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3SouthDrainEc.focus();
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
                      this.updateTextInput(text, 'g3SouthDrainEc')
                    }
                    value={this.state.g3SouthDrainEc}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3SouthDrainEc = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3SouthDrainPh.focus();
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
                      this.updateTextInput(text, 'g3SouthDrainPh')
                    }
                    value={this.state.g3SouthDrainPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3SouthDrainPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3NorthDripMls.focus();
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
                      this.updateTextInput(text, 'g3NorthDripMls')
                    }
                    value={this.state.g3NorthDripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3NorthDripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3NorthDripEC.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.marginDimensionTop}></View>

                <Text style={styles.titleHeadingText}>
                  GER 3 North - Drip Ec
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
                      this.updateTextInput(text, 'g3NorthDripEC')
                    }
                    value={this.state.g3NorthDripEC}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3NorthDripEC = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3NorthDripPh.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.marginDimensionTop}></View>

                <Text style={styles.titleHeadingText}>
                  GER 3 North - Drip pH
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
                      this.updateTextInput(text, 'g3NorthDripPh')
                    }
                    value={this.state.g3NorthDripPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3NorthDripPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3NorthDrainMls.focus();
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
                      this.updateTextInput(text, 'g3NorthDrainMls')
                    }
                    value={this.state.g3NorthDrainMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3NorthDrainMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3NorthDrainEC.focus();
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
                      this.updateTextInput(text, 'g3NorthDrainEC')
                    }
                    value={this.state.g3NorthDrainEC}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3NorthDrainEC = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3NorthDrainPh.focus();
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
                      this.updateTextInput(text, 'g3NorthDrainPh')
                    }
                    value={this.state.g3NorthDrainPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3NorthDrainPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3Valve13DripMls.focus();
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
                      this.updateTextInput(text, 'g3Valve13DripMls')
                    }
                    value={this.state.g3Valve13DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3Valve13DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3Valve14DripMls.focus();
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
                      this.updateTextInput(text, 'g3Valve14DripMls')
                    }
                    value={this.state.g3Valve14DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3Valve14DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3Valve15DripMls.focus();
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
                      this.updateTextInput(text, 'g3Valve15DripMls')
                    }
                    value={this.state.g3Valve15DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3Valve15DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3Valve16DripMls.focus();
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
                      this.updateTextInput(text, 'g3Valve16DripMls')
                    }
                    value={this.state.g3Valve16DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3Valve16DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3Valve17DripMls.focus();
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
                      this.updateTextInput(text, 'g3Valve17DripMls')
                    }
                    value={this.state.g3Valve17DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3Valve17DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3Valve18DripMls.focus();
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
                      this.updateTextInput(text, 'g3Valve18DripMls')
                    }
                    value={this.state.g3Valve18DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3Valve18DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3Valve19DripMls.focus();
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
                      this.updateTextInput(text, 'g3Valve19DripMls')
                    }
                    value={this.state.g3Valve19DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3Valve19DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g3Valve20DripMls.focus();
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
                      this.updateTextInput(text, 'g3Valve20DripMls')
                    }
                    value={this.state.g3Valve20DripMls}
                    editable={true}
                    returnKeyType={'done'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g3Valve20DripMls = input;
                    }}
                    blurOnSubmit={true}
                  />
                </View>
              </View>
            </View>

            <View style={styles.marginDimensionTop}></View>

            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={this.g4ChangeLayout}
                style={styles.Btn}>
                <View style={styles.alignTextView}>
                  <Text style={styles.btnText}>GER 4</Text>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      marginRight: 5,
                    }}
                    source={this.state.expandedG4 ? UP_ARROW : DOWN_ARROW}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: this.state.expandedG4 ? null : 0,
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
                      this.updateTextInput(text, 'g4SouthDripMls')
                    }
                    value={this.state.g4SouthDripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g4SouthDripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g4SouthDripEC.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.marginDimensionTop}></View>

                <Text style={styles.titleHeadingText}>
                  GER 4 South - Drip Ec
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
                      this.updateTextInput(text, 'g4SouthDripEC')
                    }
                    value={this.state.g4SouthDripEC}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g4SouthDripEC = input;
                    }}
                    onSubmitEditing={() => {
                      this.g4SouthDripPh.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.marginDimensionTop}></View>

                <Text style={styles.titleHeadingText}>
                  GER 4 South - Drip pH
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
                      this.updateTextInput(text, 'g4SouthDripPh')
                    }
                    value={this.state.g4SouthDripPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g4SouthDripPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g4SouthDrainMls.focus();
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
                      this.updateTextInput(text, 'g4SouthDrainMls')
                    }
                    value={this.state.g4SouthDrainMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g4SouthDrainMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g4SouthDrainEc.focus();
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
                      this.updateTextInput(text, 'g4SouthDrainEc')
                    }
                    value={this.state.g4SouthDrainEc}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g4SouthDrainEc = input;
                    }}
                    onSubmitEditing={() => {
                      this.g4SouthDrainPh.focus();
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
                      this.updateTextInput(text, 'g4SouthDrainPh')
                    }
                    value={this.state.g4SouthDrainPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g4SouthDrainPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g4NorthDripMls.focus();
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
                      this.updateTextInput(text, 'g4NorthDripMls')
                    }
                    value={this.state.g4NorthDripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g4NorthDripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g4NorthDripEC.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.marginDimensionTop}></View>

                <Text style={styles.titleHeadingText}>
                  GER 4 North - Drip Ec
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
                      this.updateTextInput(text, 'g4NorthDripEC')
                    }
                    value={this.state.g4NorthDripEC}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g4NorthDripEC = input;
                    }}
                    onSubmitEditing={() => {
                      this.g4NorthDripPh.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.marginDimensionTop}></View>

                <Text style={styles.titleHeadingText}>
                  GER 4 North - Drip pH
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
                      this.updateTextInput(text, 'g4NorthDripPh')
                    }
                    value={this.state.g4NorthDripPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g4NorthDripPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g4NorthDrainMls.focus();
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
                      this.updateTextInput(text, 'g4NorthDrainMls')
                    }
                    value={this.state.g4NorthDrainMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g4NorthDrainMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g4NorthDrainEC.focus();
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
                      this.updateTextInput(text, 'g4NorthDrainEC')
                    }
                    value={this.state.g4NorthDrainEC}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g4NorthDrainEC = input;
                    }}
                    onSubmitEditing={() => {
                      this.g4NorthDrainPh.focus();
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
                      this.updateTextInput(text, 'g4NorthDrainPh')
                    }
                    value={this.state.g4NorthDrainPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g4NorthDrainPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g4Valve21DripMls.focus();
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
                      this.updateTextInput(text, 'g4Valve21DripMls')
                    }
                    value={this.state.g4Valve21DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g4Valve21DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g4Valve22DripMls.focus();
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
                      this.updateTextInput(text, 'g4Valve22DripMls')
                    }
                    value={this.state.g4Valve22DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g4Valve22DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g4Valve23DripMls.focus();
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
                      this.updateTextInput(text, 'g4Valve23DripMls')
                    }
                    value={this.state.g4Valve23DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g4Valve23DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g4Valve24DripMls.focus();
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
                      this.updateTextInput(text, 'g4Valve24DripMls')
                    }
                    value={this.state.g4Valve24DripMls}
                    editable={true}
                    returnKeyType={'done'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g4Valve24DripMls = input;
                    }}
                    blurOnSubmit={true}
                  />
                </View>
              </View>
            </View>

            <View style={styles.marginDimensionTop}></View>

            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={this.g5ChangeLayout}
                style={styles.Btn}>
                <View style={styles.alignTextView}>
                  <Text style={styles.btnText}>GER 5</Text>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      marginRight: 5,
                    }}
                    source={this.state.expandedG5 ? UP_ARROW : DOWN_ARROW}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: this.state.expandedG5 ? null : 0,
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
                      this.updateTextInput(text, 'g5FirstDripMls')
                    }
                    value={this.state.g5FirstDripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g5FirstDripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g5FirstDripEC.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.marginDimensionTop}></View>

                <Text style={styles.titleHeadingText}>
                  GER 5 First - Drip Ec
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
                      this.updateTextInput(text, 'g5FirstDripEC')
                    }
                    value={this.state.g5FirstDripEC}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g5FirstDripEC = input;
                    }}
                    onSubmitEditing={() => {
                      this.g5FirstDripPh.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.marginDimensionTop}></View>

                <Text style={styles.titleHeadingText}>
                  GER 5 First - Drip pH
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
                      this.updateTextInput(text, 'g5FirstDripPh')
                    }
                    value={this.state.g5FirstDripPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g5FirstDripPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g5FirstDrainMls.focus();
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
                      this.updateTextInput(text, 'g5FirstDrainMls')
                    }
                    value={this.state.g5FirstDrainMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g5FirstDrainMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g5FirstDrainEc.focus();
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
                      this.updateTextInput(text, 'g5FirstDrainEc')
                    }
                    value={this.state.g5FirstDrainEc}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g5FirstDrainEc = input;
                    }}
                    onSubmitEditing={() => {
                      this.g5FirstDrainPh.focus();
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
                      this.updateTextInput(text, 'g5FirstDrainPh')
                    }
                    value={this.state.g5FirstDrainPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g5FirstDrainPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g5SecondDripMls.focus();
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
                      this.updateTextInput(text, 'g5SecondDripMls')
                    }
                    value={this.state.g5SecondDripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g5SecondDripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g5SecondDripEC.focus();
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
                      this.updateTextInput(text, 'g5SecondDripEC')
                    }
                    value={this.state.g5SecondDripEC}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g5SecondDripEC = input;
                    }}
                    onSubmitEditing={() => {
                      this.g5SecondDripPh.focus();
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
                      this.updateTextInput(text, 'g5SecondDripPh')
                    }
                    value={this.state.g5SecondDripPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g5SecondDripPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g5SecondDrainMls.focus();
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
                      this.updateTextInput(text, 'g5SecondDrainMls')
                    }
                    value={this.state.g5SecondDrainMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g5SecondDrainMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g5SecondDrainEC.focus();
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
                      this.updateTextInput(text, 'g5SecondDrainEC')
                    }
                    value={this.state.g5SecondDrainEC}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g5SecondDrainEC = input;
                    }}
                    onSubmitEditing={() => {
                      this.g5SecondDrainPh.focus();
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
                      this.updateTextInput(text, 'g5SecondDrainPh')
                    }
                    value={this.state.g5SecondDrainPh}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g5SecondDrainPh = input;
                    }}
                    onSubmitEditing={() => {
                      this.g5Valve25DripMls.focus();
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
                      this.updateTextInput(text, 'g5Valve25DripMls')
                    }
                    value={this.state.g5Valve25DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g5Valve25DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g5Valve26DripMls.focus();
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
                      this.updateTextInput(text, 'g5Valve26DripMls')
                    }
                    value={this.state.g5Valve26DripMls}
                    editable={true}
                    returnKeyType={'next'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g5Valve26DripMls = input;
                    }}
                    onSubmitEditing={() => {
                      this.g5Valve27DripMls.focus();
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
                      this.updateTextInput(text, 'g5Valve27DripMls')
                    }
                    value={this.state.g5Valve27DripMls}
                    editable={true}
                    returnKeyType={'done'}
                    keyboardType={'numeric'}
                    ref={(input) => {
                      this.g5Valve27DripMls = input;
                    }}
                    blurOnSubmit={true}
                  />
                </View>
              </View>

              <View style={styles.marginDimensionTop}></View>

              <Text style={styles.headerText}>Bore Readings</Text>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>Bore 1 (Hours)</Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].bore1hours}
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
                    this.updateTextInput(text, 'bore1Hours')
                  }
                  value={this.state.bore1Hours}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={(input) => {
                    this.bore1Hours = input;
                  }}
                  onSubmitEditing={() => {
                    this.bore1m3.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>Bore 1 (m3)</Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].bore1m3}
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
                  onChangeText={(text) => this.updateTextInput(text, 'bore1m3')}
                  value={this.state.bore1m3}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={(input) => {
                    this.bore1m3 = input;
                  }}
                  onSubmitEditing={() => {
                    this.electricity.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>Electricity</Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].electricity}
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
                    this.updateTextInput(text, 'electricity')
                  }
                  value={this.state.electricity}
                  editable={true}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  ref={(input) => {
                    this.electricity = input;
                  }}
                  onSubmitEditing={() => {
                    this.Septicm3.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.marginDimensionTop}></View>

              <View style={styles.row}>
                <Text style={styles.titleHeadingText}>Septic (m3)</Text>
                {this.state.filteredSampleData.length ? (
                  <Text style={styles.titleHeadingTextRed}>
                    {this.state.filteredSampleData[0].septicm3}
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
                    this.updateTextInput(text, 'Septicm3')
                  }
                  value={this.state.Septicm3}
                  editable={true}
                  returnKeyType={'done'}
                  keyboardType={'numeric'}
                  ref={(input) => {
                    this.Septicm3 = input;
                  }}
                  blurOnSubmit={true}
                />
              </View>
            </View>

            <View style={styles.marginDimensionTop}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.sendData()}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

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
