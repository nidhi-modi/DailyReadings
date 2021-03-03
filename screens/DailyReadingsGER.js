import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Image, ImageBackground, LayoutAnimation, Platform, UIManager, TextInput, BackHandler, Alert, LogBox } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Realm from 'realm';
import moment from 'moment'
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';


const DOWN_ARROW = require('../assets/down_arrow.png');
const UP_ARROW = require('../assets/up_arrow.png');
let realm;
var ID;


export default class DailyReadingsGER extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            //SAMPLE
            FlatListItems: [],
            //
            showRealApp: false,
            selected: '',
            visibility: false,
            expandedG1: false,
            expandedG2: false,
            expandedG3: false,
            expandedG4: false,
            expandedG5: false,
            onClickName: '',
            expand: false,
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
            g3Valve181DripMls: '',
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

            siteName: 'GER'

        }

        //INITIALIZE RAELM INSTANCE
        realm = new Realm({ path: 'DailyReadingsDB.realm' });


        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }

    }
    //TESTING ON CLICK (ONLY ONE OPEN AT A TIME CODE)

    g1ChangeLayout = () => {

        this.setState({ onClickName: 'g1' })

        this.manageOnClick();

    }

    g2ChangeLayout = () => {

        this.setState({ onClickName: 'g2' })

        this.manageOnClick();


    }

    g3ChangeLayout = () => {

        this.setState({ onClickName: 'g3' })

        this.manageOnClick();

    }

    g4ChangeLayout = () => {

        this.setState({ onClickName: 'g4' })

        this.manageOnClick();

    }

    g5ChangeLayout = () => {

        this.setState({ onClickName: 'g5' })

        this.manageOnClick();

    }

    manageOnClick = () => {

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        if (this.state.onClickName === 'g1') {
            this.setState({

                expandedG1: true,
                expandedG2: false,
                expandedG3: false,
                expandedG4: false,
                expandedG5: false,
            })



        } else if (this.state.onClickName === 'g2') {


            this.setState({
                expandedG1: false,
                expandedG2: true,
                expandedG3: false,
                expandedG4: false,
                expandedG5: false,
            })


        } else if (this.state.onClickName === 'g3') {

            this.setState({
                expandedG1: false,
                expandedG2: false,
                expandedG3: true,
                expandedG4: false,
                expandedG5: false,
            })

        } else if (this.state.onClickName === 'g4') {

            this.setState({
                expandedG1: false,
                expandedG2: false,
                expandedG3: false,
                expandedG4: true,
                expandedG5: false,
            })

        } else if (this.state.onClickName === 'g5') {

            this.setState({
                expandedG1: false,
                expandedG2: false,
                expandedG3: false,
                expandedG4: false,
                expandedG5: true,
            })

        }

    }


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



    }

    changeLayout2 = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);


        this.setState({
            expandedG1: this.state.expandedG1,
            expandedG2: !this.state.expandedG2,
            expandedG3: this.state.expandedG3,
            expandedG4: this.state.expandedG4,
            expandedG5: this.state.expandedG5,
        });


    }

    changeLayout3 = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
            expandedG1: this.state.expandedG1,
            expandedG2: this.state.expandedG2,
            expandedG3: !this.state.expandedG3,
            expandedG4: this.state.expandedG4,
            expandedG5: this.state.expandedG5,
        });
    }

    changeLayout4 = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
            expandedG1: this.state.expandedG1,
            expandedG2: this.state.expandedG2,
            expandedG3: this.state.expandedG3,
            expandedG4: !this.state.expandedG4,
            expandedG5: this.state.expandedG5,
        });
    }

    changeLayout5 = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
            expandedG1: this.state.expandedG1,
            expandedG2: this.state.expandedG2,
            expandedG3: this.state.expandedG3,
            expandedG4: this.state.expandedG4,
            expandedG5: !this.state.expandedG5,
        });
    }

    //


    onButtonPress = () => {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        // then navigate
        navigate('NewScreen');

    }
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
        this.setState({ visibility: false });
    };

    handleConfirm = (date) => {

        this.setState({ dateYesterday: moment(date).format('DD/MM/YYYY') })
        const dateFormat = moment(date).format('YYYY-MM-DD')
        this.hideDatePicker();
        const dayBasedOnDate = this.getDayOfWeek(dateFormat);
        this.setState({ dayYesterday: dayBasedOnDate })
        this.setItem('dateYesterday', moment(date).format('DD/MM/YYYY'))
        this.setItem('dayYesterday', dayBasedOnDate)
    }

    onPressCancel = () => {
        this.setState({ visibility: false })
    }

    onPressButton = () => {
        this.setState({ visibility: true })
    }


    clearText = () => {
        this.setState({ visibility: true, dateYesterday: '' })
    }
    //

    //GET DAY BASED ON DATE SELECTED
    getDayOfWeek(date) {
        const dayOfWeek = new Date(date).getDay();
        return isNaN(dayOfWeek) ? null :
            ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    }
    //

    //UPDATE TEXTINPUT
    updateTextInput = (text, field) => {
        this.setItem(field, text)
        const state = this.state
        state[field] = text;
        this.setState(state);

    }

    //

    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            },], {
            cancelable: false
        }
        )
        return true;
    }

    componentDidMount() {

        //CALLING GET ASYNC VALUES METHOD

        this.getAsyncValues();

        //

        realm = new Realm({ path: 'DailyReadingsDB.realm' });
        var daily_readings = realm.objects('daily_readings_offline_table');
        this.setState({ FlatListItems: daily_readings})
        console.log("DATA FROM REALM : " + this.state.FlatListItems);




        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);


    }

    //METHOD FOR GETTING ASYNC VALUES

    getAsyncValues = () => {

        console.log("CALLING ASYNC VALUES...");

        try {
            AsyncStorage.getItem('dateYesterday').then((data1) => {
                this.setState({ dateYesterday: JSON.parse(data1) });
                console.log("DATE : " + this.state.dateYesterday);
            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('dayYesterday').then((data2) => {
                this.setState({ dayYesterday: JSON.parse(data2) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('gas').then((data3) => {
                this.setState({ gas: JSON.parse(data3) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('liquidCO2').then((data4) => {
                this.setState({ liquidCO2: JSON.parse(data4) });

            }).done();
        } catch (error) {
        }
        try {
            AsyncStorage.getItem('drainDischarge').then((data5) => {
                this.setState({ drainDischarge: JSON.parse(data5) });

            }).done();
        } catch (error) {
        }

        //G1 ASYNC getItem
        try {
            AsyncStorage.getItem('g1SouthDripMls').then((data6) => {
                this.setState({ g1SouthDripMls: JSON.parse(data6) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1SouthDripEC').then((data7) => {
                this.setState({ g1SouthDripEC: JSON.parse(data7) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1SouthDripPh').then((data8) => {
                this.setState({ g1SouthDripPh: JSON.parse(data8) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1SouthDrainMls').then((data9) => {
                this.setState({ g1SouthDrainMls: JSON.parse(data9) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1SouthDrainEc').then((data10) => {
                this.setState({ g1SouthDrainEc: JSON.parse(data10) });

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g1SouthDrainPh').then((data11) => {
                this.setState({ g1SouthDrainPh: JSON.parse(data11) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1NorthDripMls').then((data12) => {
                this.setState({ g1NorthDripMls: JSON.parse(data12) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1NorthDripEC').then((data13) => {
                this.setState({ g1NorthDripEC: JSON.parse(data13) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1NorthDripPh').then((data14) => {
                this.setState({ g1NorthDripPh: JSON.parse(data14) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1NorthDrainMls').then((data15) => {
                this.setState({ g1NorthDrainMls: JSON.parse(data15) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1NorthDrainEC').then((data16) => {
                this.setState({ g1NorthDrainEC: JSON.parse(data16) });

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g1NorthDrainPh').then((data17) => {
                this.setState({ g1NorthDrainPh: JSON.parse(data17) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1Valve1DripMls').then((data18) => {
                this.setState({ g1Valve1DripMls: JSON.parse(data18) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1Valve2DripMls').then((data19) => {
                this.setState({ g1Valve2DripMls: JSON.parse(data19) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1Valve3DripMls').then((data20) => {
                this.setState({ g1Valve3DripMls: JSON.parse(data20) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1Valve4DripMls').then((data21) => {
                this.setState({ g1Valve4DripMls: JSON.parse(data21) });

            }).done();
        } catch (error) {
        }

        //END

        //G2 ASYNC getItem
        try {
            AsyncStorage.getItem('g2SouthDripMls').then((data22) => {
                this.setState({ g2SouthDripMls: JSON.parse(data22) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2SouthDripEC').then((data23) => {
                this.setState({ g2SouthDripEC: JSON.parse(data23) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2SouthDripPh').then((data24) => {
                this.setState({ g2SouthDripPh: JSON.parse(data24) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2SouthDrainMls').then((data25) => {
                this.setState({ g2SouthDrainMls: JSON.parse(data25) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2SouthDrainEc').then((data26) => {
                this.setState({ g2SouthDrainEc: JSON.parse(data26) });

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g2SouthDrainPh').then((data27) => {
                this.setState({ g2SouthDrainPh: JSON.parse(data27) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2NorthDripMls').then((data28) => {
                this.setState({ g2NorthDripMls: JSON.parse(data28) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2NorthDripEC').then((data29) => {
                this.setState({ g2NorthDripEC: JSON.parse(data29) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2NorthDripPh').then((data30) => {
                this.setState({ g2NorthDripPh: JSON.parse(data30) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2NorthDrainMls').then((data31) => {
                this.setState({ g2NorthDrainMls: JSON.parse(data31) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2NorthDrainEC').then((data32) => {
                this.setState({ g2NorthDrainEC: JSON.parse(data32) });

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g2NorthDrainPh').then((data33) => {
                this.setState({ g2NorthDrainPh: JSON.parse(data33) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2Valve5DripMls').then((data34) => {
                this.setState({ g2Valve5DripMls: JSON.parse(data34) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2Valve6DripMls').then((data35) => {
                this.setState({ g2Valve6DripMls: JSON.parse(data35) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2Valve7DripMls').then((data36) => {
                this.setState({ g2Valve7DripMls: JSON.parse(data36) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2Valve8DripMls').then((data37) => {
                this.setState({ g2Valve8DripMls: JSON.parse(data37) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2Valve9DripMls').then((data38) => {
                this.setState({ g2Valve9DripMls: JSON.parse(data38) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2Valve10DripMls').then((data39) => {
                this.setState({ g2Valve10DripMls: JSON.parse(data39) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2Valve11DripMls').then((data381) => {
                this.setState({ g2Valve11DripMls: JSON.parse(data381) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2Valve12DripMls').then((data391) => {
                this.setState({ g2Valve12DripMls: JSON.parse(data391) });

            }).done();
        } catch (error) {
        }
        //END

        //G3 ASYNC getItem
        try {
            AsyncStorage.getItem('g3SouthDripMls').then((data40) => {
                this.setState({ g3SouthDripMls: JSON.parse(data40) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3SouthDripEC').then((data41) => {
                this.setState({ g3SouthDripEC: JSON.parse(data41) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3SouthDripPh').then((data42) => {
                this.setState({ g3SouthDripPh: JSON.parse(data42) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3SouthDrainMls').then((data43) => {
                this.setState({ g3SouthDrainMls: JSON.parse(data43) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3SouthDrainEc').then((data44) => {
                this.setState({ g3SouthDrainEc: JSON.parse(data44) });

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g3SouthDrainPh').then((data45) => {
                this.setState({ g3SouthDrainPh: JSON.parse(data45) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3NorthDripMls').then((data46) => {
                this.setState({ g3NorthDripMls: JSON.parse(data46) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3NorthDripEC').then((data47) => {
                this.setState({ g3NorthDripEC: JSON.parse(data47) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3NorthDripPh').then((data48) => {
                this.setState({ g3NorthDripPh: JSON.parse(data48) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3NorthDrainMls').then((data49) => {
                this.setState({ g3NorthDrainMls: JSON.parse(data49) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3NorthDrainEC').then((data50) => {
                this.setState({ g3NorthDrainEC: JSON.parse(data50) });

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g3NorthDrainPh').then((data51) => {
                this.setState({ g3NorthDrainPh: JSON.parse(data51) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3Valve20DripMls').then((data52) => {
                this.setState({ g3Valve20DripMls: JSON.parse(data52) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3Valve13DripMls').then((data53) => {
                this.setState({ g3Valve13DripMls: JSON.parse(data53) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3Valve14DripMls').then((data54) => {
                this.setState({ g3Valve14DripMls: JSON.parse(data54) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3Valve15DripMls').then((data55) => {
                this.setState({ g3Valve15DripMls: JSON.parse(data55) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3Valve16DripMls').then((data56) => {
                this.setState({ g3Valve16DripMls: JSON.parse(data56) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3Valve17DripMls').then((data57) => {
                this.setState({ g3Valve17DripMls: JSON.parse(data57) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3Valve18DripMls').then((data58) => {
                this.setState({ g3Valve18DripMls: JSON.parse(data58) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3Valve19DripMls').then((data59) => {
                this.setState({ g3Valve19DripMls: JSON.parse(data59) });

            }).done();
        } catch (error) {
        }
        //END

        //G4 ASYNC getItem
        try {
            AsyncStorage.getItem('g4SouthDripMls').then((data60) => {
                this.setState({ g4SouthDripMls: JSON.parse(data60) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4SouthDripEC').then((data61) => {
                this.setState({ g4SouthDripEC: JSON.parse(data61) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4SouthDripPh').then((data62) => {
                this.setState({ g4SouthDripPh: JSON.parse(data62) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4SouthDrainMls').then((data63) => {
                this.setState({ g4SouthDrainMls: JSON.parse(data63) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4SouthDrainEc').then((data64) => {
                this.setState({ g4SouthDrainEc: JSON.parse(data64) });

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g4SouthDrainPh').then((data65) => {
                this.setState({ g4SouthDrainPh: JSON.parse(data65) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4NorthDripMls').then((data66) => {
                this.setState({ g4NorthDripMls: JSON.parse(data66) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4NorthDripEC').then((data67) => {
                this.setState({ g4NorthDripEC: JSON.parse(data67) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4NorthDripPh').then((data68) => {
                this.setState({ g4NorthDripPh: JSON.parse(data68) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4NorthDrainMls').then((data69) => {
                this.setState({ g4NorthDrainMls: JSON.parse(data69) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4NorthDrainEC').then((data70) => {
                this.setState({ g4NorthDrainEC: JSON.parse(data70) });

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g4NorthDrainPh').then((data71) => {
                this.setState({ g4NorthDrainPh: JSON.parse(data71) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4Valve21DripMls').then((data72) => {
                this.setState({ g4Valve21DripMls: JSON.parse(data72) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4Valve22DripMls').then((data73) => {
                this.setState({ g4Valve22DripMls: JSON.parse(data73) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4Valve23DripMls').then((data74) => {
                this.setState({ g4Valve23DripMls: JSON.parse(data74) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4Valve24DripMls').then((data75) => {
                this.setState({ g4Valve24DripMls: JSON.parse(data75) });

            }).done();
        } catch (error) {
        }

        //END

        //G5 ASYNC getItem
        try {
            AsyncStorage.getItem('g5FirstDripMls').then((data76) => {
                this.setState({ g5FirstDripMls: JSON.parse(data76) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5FirstDripEC').then((data77) => {
                this.setState({ g5FirstDripEC: JSON.parse(data77) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5FirstDripPh').then((data78) => {
                this.setState({ g5FirstDripPh: JSON.parse(data78) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5FirstDrainMls').then((data79) => {
                this.setState({ g5FirstDrainMls: JSON.parse(data79) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5FirstDrainEc').then((data80) => {
                this.setState({ g5FirstDrainEc: JSON.parse(data80) });

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g5FirstDrainPh').then((data81) => {
                this.setState({ g5FirstDrainPh: JSON.parse(data81) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5SecondDripMls').then((data82) => {
                this.setState({ g5SecondDripMls: JSON.parse(data82) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5SecondDripEC').then((data83) => {
                this.setState({ g5SecondDripEC: JSON.parse(data83) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5SecondDripPh').then((data84) => {
                this.setState({ g5SecondDripPh: JSON.parse(data84) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5SecondDrainMls').then((data85) => {
                this.setState({ g5SecondDrainMls: JSON.parse(data85) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5SecondDrainEC').then((data86) => {
                this.setState({ g5SecondDrainEC: JSON.parse(data86) });

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g5SecondDrainPh').then((data87) => {
                this.setState({ g5SecondDrainPh: JSON.parse(data87) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5Valve25DripMls').then((data88) => {
                this.setState({ g5Valve25DripMls: JSON.parse(data88) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5Valve26DripMls').then((data89) => {
                this.setState({ g5Valve26DripMls: JSON.parse(data89) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5Valve27DripMls').then((data90) => {
                this.setState({ g5Valve27DripMls: JSON.parse(data90) });

            }).done();
        } catch (error) {
        }


        //END

        //BORE READINGS

        try {
            AsyncStorage.getItem('bore1Hours').then((data91) => {
                this.setState({ bore1Hours: JSON.parse(data91) });
                console.log("BORE READINGS : " + this.state.bore1Hours);


            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('bore1m3').then((data92) => {
                this.setState({ bore1m3: JSON.parse(data92) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('electricity').then((data93) => {
                this.setState({ electricity: JSON.parse(data93) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('Septicm3').then((data94) => {
                this.setState({ Septicm3: JSON.parse(data94) });

            }).done();
        } catch (error) {
        }
        //END


    }

    //

    //SEND DATA BUTTON METHOD 
    sendData = () => {


        realm.write(() => {
            ID =
                realm.objects('daily_readings_offline_table').sorted('entry_id', true).length > 0
                    ? realm.objects('daily_readings_offline_table').sorted('entry_id', true)[0]
                        .entry_id + 1
                    : 1;
            realm.create('daily_readings_offline_table', {
                entry_id: ID,
                site_name: this.state.siteName,
                dateYesterday: this.state.dateYesterday,
                dayYesterday: this.state.dayYesterday,
                gas: this.state.gas,
                liquidCO2: this.state.liquidCO2,
                drainDischarge: this.state.drainDischarge,
                g1SouthDripMls: this.state.g1SouthDripMls,
                g1SouthDripEC: this.state.g1SouthDripEC,
                g1SouthDripPh: this.state.g1SouthDripPh,
                g1SouthDrainMls: this.state.g1SouthDrainMls,
                g1SouthDrainEc: this.state.g1SouthDrainEc,
                g1SouthDrainPh: this.state.g1SouthDrainPh,
                g1NorthDripMls: this.state.g1NorthDripMls,
                g1NorthDripEC: this.state.g1NorthDripEC,
                g1NorthDripPh: this.state.g1NorthDripPh,
                g1NorthDrainMls: this.state.g1NorthDrainMls,
                g1NorthDrainEC: this.state.g1NorthDrainEC,
                g1NorthDrainPh: this.state.g1NorthDrainPh,
                g1Valve1DripMls: this.state.g1Valve1DripMls,
                g1Valve2DripMls: this.state.g1Valve2DripMls,
                g1Valve3DripMls: this.state.g1Valve3DripMls,
                g1Valve4DripMls: this.state.g1Valve4DripMls,
                g2SouthDripMls: this.state.g2SouthDripMls,
                g2SouthDripEC: this.state.g2SouthDripEC,
                g2SouthDripPh: this.state.g2SouthDripPh,
                g2SouthDrainMls: this.state.g2SouthDrainMls,
                g2SouthDrainEc: this.state.g2SouthDrainEc,
                g2SouthDrainPh: this.state.g2SouthDrainPh,
                g2NorthDripMls: this.state.g2NorthDripMls,
                g2NorthDripEC: this.state.g2NorthDripEC,
                g2NorthDripPh: this.state.g2NorthDripPh,
                g2NorthDrainMls: this.state.g2NorthDrainMls,
                g2NorthDrainEC: this.state.g2NorthDrainEC,
                g2NorthDrainPh: this.state.g2NorthDrainPh,
                g2Valve5DripMls: this.state.g2Valve5DripMls,
                g2Valve6DripMls: this.state.g2Valve6DripMls,
                g2Valve7DripMls: this.state.g2Valve7DripMls,
                g2Valve8DripMls: this.state.g2Valve8DripMls,
                g2Valve9DripMls: this.state.g2Valve9DripMls,
                g2Valve10DripMls: this.state.g2Valve10DripMls,
                g2Valve11DripMls: this.state.g2Valve11DripMls,
                g2Valve12DripMls: this.state.g2Valve12DripMls,
                g3SouthDripMls: this.state.g3SouthDripMls,
                g3SouthDripEC: this.state.g3SouthDripEC,
                g3SouthDripPh: this.state.g3SouthDripPh,
                g3SouthDrainMls: this.state.g3SouthDrainMls,
                g3SouthDrainEc: this.state.g3SouthDrainEc,
                g3SouthDrainPh: this.state.g3SouthDrainPh,
                g3NorthDripMls: this.state.g3NorthDripMls,
                g3NorthDripEC: this.state.g3NorthDripEC,
                g3NorthDripPh: this.state.g3NorthDripPh,
                g3NorthDrainMls: this.state.g3NorthDrainMls,
                g3NorthDrainEC: this.state.g3NorthDrainEC,
                g3NorthDrainPh: this.state.g3NorthDrainPh,
                g3Valve13DripMls: this.state.g3Valve13DripMls,
                g3Valve14DripMls: this.state.g3Valve14DripMls,
                g3Valve15DripMls: this.state.g3Valve15DripMls,
                g3Valve16DripMls: this.state.g3Valve16DripMls,
                g3Valve17DripMls: this.state.g3Valve17DripMls,
                g3Valve18DripMls: this.state.g3Valve18DripMls,
                g3Valve19DripMls: this.state.g3Valve19DripMls,
                g3Valve20DripMls: this.state.g3Valve20DripMls,
                g4SouthDripMls: this.state.g4SouthDripMls,
                g4SouthDripEC: this.state.g4SouthDripEC,
                g4SouthDripPh: this.state.g4SouthDripPh,
                g4SouthDrainMls: this.state.g4SouthDrainMls,
                g4SouthDrainEc: this.state.g4SouthDrainEc,
                g4SouthDrainPh: this.state.g4SouthDrainPh,
                g4NorthDripMls: this.state.g4NorthDripMls,
                g4NorthDripEC: this.state.g4NorthDripEC,
                g4NorthDripPh: this.state.g4NorthDripPh,
                g4NorthDrainMls: this.state.g4NorthDrainMls,
                g4NorthDrainEC: this.state.g4NorthDrainEC,
                g4NorthDrainPh: this.state.g4NorthDrainPh,
                g4Valve21DripMls: this.state.g4Valve21DripMls,
                g4Valve22DripMls: this.state.g4Valve22DripMls,
                g4Valve23DripMls: this.state.g4Valve23DripMls,
                g4Valve24DripMls: this.state.g4Valve24DripMls,
                g5FirstDripMls: this.state.g5FirstDripMls,
                g5FirstDripEC: this.state.g5FirstDripEC,
                g5FirstDripPh: this.state.g5FirstDripPh,
                g5FirstDrainMls: this.state.g5FirstDrainMls,
                g5FirstDrainEc: this.state.g5FirstDrainEc,
                g5FirstDrainPh: this.state.g5FirstDrainPh,
                g5SecondDripMls: this.state.g5SecondDripMls,
                g5SecondDripEC: this.state.g5SecondDripEC,
                g5SecondDripPh: this.state.g5SecondDripPh,
                g5SecondDrainMls: this.state.g5SecondDrainMls,
                g5SecondDrainEC: this.state.g5SecondDrainEC,
                g5SecondDrainPh: this.state.g5SecondDrainPh,
                g5Valve25DripMls: this.state.g5Valve25DripMls,
                g5Valve26DripMls: this.state.g5Valve26DripMls,
                g5Valve27DripMls: this.state.g5Valve27DripMls,
                bore1Hours: this.state.bore1Hours,
                bore1m3: this.state.bore1m3,
                electricity: this.state.electricity,
                Septicm3: this.state.Septicm3,

            });


        });

        Toast.show('Form Submitted successfully');
        AsyncStorage.clear();


    }
    //

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


    render() {

        return (

            <View style={styles.container}>

                <ImageBackground source={require('../assets/background2.png')} style={styles.backgroundImage}>

                    <ScrollView style={styles.formContainer}
                        keyboardShouldPersistTaps='handled'>

                        <View style={styles.marginDimension}></View>


                        <View style={styles.marginDimension}></View>


                        <Text style={styles.titleHeadingText}>Yesterday's Date</Text>

                        <DateTimePickerModal
                            isVisible={this.state.visibility}
                            onConfirm={this.handleConfirm}
                            onCancel={this.onPressCancel}
                            mode="date"
                            is24Hour={false} />

                        <View style={styles.marginDimension}></View>

                        <View style={styles.borderEdit}>
                            <TextInput style={styles.textInputStyle}
                                autoCapitalize="none"
                                multiline={false}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={this.onPressButton}
                                onPress={this.onPressButton}
                                showSoftInputOnFocus={false}
                                value={this.state.dateYesterday}
                                onFocus={this.onPressButton}
                                onSubmitEditing={() => { this.refsamp.focus(); }}

                            />

                        </View>

                        <View style={styles.marginDimensionTop}></View>

                        <Text style={styles.titleHeadingText}>Yesterday's Day</Text>

                        <View style={styles.marginDimension}></View>

                        <View style={styles.borderEdit}>
                            <TextInput style={styles.textInputStyle}
                                autoCapitalize="none"
                                multiline={false}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                showSoftInputOnFocus={false}
                                onChangeText={this.onPressButton}
                                value={this.state.dayYesterday}
                                onSubmitEditing={() => { this.refsamp.focus(); }}
                                disabled={true}
                                selectTextOnFocus={false}

                            />

                        </View>

                        <View style={styles.marginDimensionTop}></View>

                        <Text style={styles.titleHeadingText}>Gas (m3)</Text>

                        <View style={styles.marginDimension}></View>

                        <View style={styles.borderEdit}>
                            <TextInput style={styles.textInputStyle}
                                autoCapitalize="none"
                                multiline={false}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={(text) => this.updateTextInput(text, 'gas')}
                                value={this.state.gas}
                                editable={true}
                                returnKeyType={"next"}
                                keyboardType={'numeric'}
                                ref={(input) => { this.gas = input; }}
                                onSubmitEditing={() => { this.liquidCO2.focus(); }}
                                blurOnSubmit={false}

                            />

                        </View>

                        <View style={styles.marginDimensionTop}></View>

                        <Text style={styles.titleHeadingText}>Liquid (CO2)</Text>

                        <View style={styles.marginDimension}></View>

                        <View style={styles.borderEdit}>
                            <TextInput style={styles.textInputStyle}
                                autoCapitalize="none"
                                multiline={false}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={(text) => this.updateTextInput(text, 'liquidCO2')}
                                value={this.state.liquidCO2}
                                editable={true}
                                returnKeyType={"next"}
                                keyboardType={'numeric'}
                                ref={(input) => { this.liquidCO2 = input; }}
                                onSubmitEditing={() => { this.drainDischarge.focus(); }}
                                blurOnSubmit={false}

                            />

                        </View>

                        <View style={styles.marginDimensionTop}></View>

                        <Text style={styles.titleHeadingText}>Drain Discharge</Text>

                        <View style={styles.marginDimension}></View>

                        <View style={styles.borderEdit}>
                            <TextInput style={styles.textInputStyle}
                                autoCapitalize="none"
                                multiline={false}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={(text) => this.updateTextInput(text, 'drainDischarge')}
                                value={this.state.drainDischarge}
                                editable={true}
                                returnKeyType={"next"}
                                keyboardType={'numeric'}
                                ref={(input) => { this.drainDischarge = input; }}
                                blurOnSubmit={false}

                            />

                        </View>

                        <View style={styles.marginDimensionTop}></View>

                        <Text style={styles.headerText}>Compartment Readings</Text>

                        <View style={styles.marginDimensionTop}></View>

                        <View>
                            <TouchableOpacity activeOpacity={0.8} onPress={this.g1ChangeLayout} style={styles.Btn}>
                                <View style={styles.alignTextView}>

                                    <Text style={styles.btnText}>GER 1</Text>

                                    <Image style={{
                                        resizeMode: "cover",
                                        marginRight: 5

                                    }} source={this.state.expandedG1 ? UP_ARROW : DOWN_ARROW} />


                                </View>
                            </TouchableOpacity>
                            <View style={{ height: this.state.expandedG1 ? null : 0, overflow: 'hidden' }}>
                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 1 South - Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g1SouthDripMls')}
                                        value={this.state.g1SouthDripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g1SouthDripMls = input; }}
                                        onSubmitEditing={() => { this.g1SouthDripEC.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 1 South - Drip Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g1SouthDripEC')}
                                        value={this.state.g1SouthDripEC}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g1SouthDripEC = input; }}
                                        onSubmitEditing={() => { this.g1SouthDripPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 1 South - Drip pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g1SouthDripPh')}
                                        value={this.state.g1SouthDripPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g1SouthDripPh = input; }}
                                        onSubmitEditing={() => { this.g1SouthDrainMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 1 South - Drain (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g1SouthDrainMls')}
                                        value={this.state.g1SouthDrainMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g1SouthDrainMls = input; }}
                                        onSubmitEditing={() => { this.g1SouthDrainEc.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 1 South - Drain Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g1SouthDrainEc')}
                                        value={this.state.g1SouthDrainEc}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g1SouthDrainEc = input; }}
                                        onSubmitEditing={() => { this.g1SouthDrainPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 1 South - Drain pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g1SouthDrainPh')}
                                        value={this.state.g1SouthDrainPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g1SouthDrainPh = input; }}
                                        onSubmitEditing={() => { this.g1NorthDripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 1 North - Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g1NorthDripMls')}
                                        value={this.state.g1NorthDripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g1NorthDripMls = input; }}
                                        onSubmitEditing={() => { this.g1NorthDripEC.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 1 North - Drip Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g1NorthDripEC')}
                                        value={this.state.g1NorthDripEC}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g1NorthDripEC = input; }}
                                        onSubmitEditing={() => { this.g1NorthDripPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 1 North - Drip pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g1NorthDripPh')}
                                        value={this.state.g1NorthDripPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g1NorthDripPh = input; }}
                                        onSubmitEditing={() => { this.g1NorthDrainMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 1 North - Drain (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g1NorthDrainMls')}
                                        value={this.state.g1NorthDrainMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g1NorthDrainMls = input; }}
                                        onSubmitEditing={() => { this.g1NorthDrainEC.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 1 North - Drain Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g1NorthDrainEC')}
                                        value={this.state.g1NorthDrainEC}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g1NorthDrainEC = input; }}
                                        onSubmitEditing={() => { this.g1NorthDrainPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 1 North - Drain pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g1NorthDrainPh')}
                                        value={this.state.g1NorthDrainPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g1NorthDrainPh = input; }}
                                        onSubmitEditing={() => { this.g1Valve1DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 1 Valve 1 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g1Valve1DripMls')}
                                        value={this.state.g1Valve1DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g1Valve1DripMls = input; }}
                                        onSubmitEditing={() => { this.g1Valve2DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 1 Valve 2 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g1Valve2DripMls')}
                                        value={this.state.g1Valve2DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g1Valve2DripMls = input; }}
                                        onSubmitEditing={() => { this.g1Valve3DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 1 Valve 3 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g1Valve3DripMls')}
                                        value={this.state.g1Valve3DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g1Valve3DripMls = input; }}
                                        onSubmitEditing={() => { this.g1Valve4DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 1 Valve 4 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g1Valve4DripMls')}
                                        value={this.state.g1Valve4DripMls}
                                        editable={true}
                                        returnKeyType={"done"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g1Valve4DripMls = input; }}
                                        blurOnSubmit={true}

                                    />

                                </View>



                            </View>
                        </View>

                        <View style={styles.marginDimensionTop}></View>

                        <View>
                            <TouchableOpacity activeOpacity={0.8} onPress={this.g2ChangeLayout} style={styles.Btn}>
                                <View style={styles.alignTextView}>

                                    <Text style={styles.btnText}>GER 2</Text>
                                    <Image style={{
                                        resizeMode: "cover",
                                        marginRight: 5

                                    }} source={this.state.expandedG2 ? UP_ARROW : DOWN_ARROW} />


                                </View>
                            </TouchableOpacity>
                            <View style={{ height: this.state.expandedG2 ? null : 0, overflow: 'hidden' }}>
                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 South - Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2SouthDripMls')}
                                        value={this.state.g2SouthDripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2SouthDripMls = input; }}
                                        onSubmitEditing={() => { this.g2SouthDripEC.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 South - Drip Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2SouthDripEC')}
                                        value={this.state.g2SouthDripEC}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2SouthDripEC = input; }}
                                        onSubmitEditing={() => { this.g2SouthDripPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 South - Drip pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2SouthDripPh')}
                                        value={this.state.g2SouthDripPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2SouthDripPh = input; }}
                                        onSubmitEditing={() => { this.g2SouthDrainMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 South - Drain (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2SouthDrainMls')}
                                        value={this.state.g2SouthDrainMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2SouthDrainMls = input; }}
                                        onSubmitEditing={() => { this.g2SouthDrainEc.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 South - Drain Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2SouthDrainEc')}
                                        value={this.state.g2SouthDrainEc}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2SouthDrainEc = input; }}
                                        onSubmitEditing={() => { this.g2SouthDrainPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 South - Drain pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2SouthDrainPh')}
                                        value={this.state.g2SouthDrainPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2SouthDrainPh = input; }}
                                        onSubmitEditing={() => { this.g2NorthDripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 North - Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2NorthDripMls')}
                                        value={this.state.g2NorthDripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2NorthDripMls = input; }}
                                        onSubmitEditing={() => { this.g2NorthDripEC.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 North - Drip Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2NorthDripEC')}
                                        value={this.state.g2NorthDripEC}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2NorthDripEC = input; }}
                                        onSubmitEditing={() => { this.g2NorthDripPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 North - Drip pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2NorthDripPh')}
                                        value={this.state.g2NorthDripPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2NorthDripPh = input; }}
                                        onSubmitEditing={() => { this.g2NorthDrainMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 North - Drain (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2NorthDrainMls')}
                                        value={this.state.g2NorthDrainMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2NorthDrainMls = input; }}
                                        onSubmitEditing={() => { this.g2NorthDrainEC.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 North - Drain Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2NorthDrainEC')}
                                        value={this.state.g2NorthDrainEC}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2NorthDrainEC = input; }}
                                        onSubmitEditing={() => { this.g2NorthDrainPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 North - Drain pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2NorthDrainPh')}
                                        value={this.state.g2NorthDrainPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2NorthDrainPh = input; }}
                                        onSubmitEditing={() => { this.g2Valve5DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 Valve 5 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2Valve5DripMls')}
                                        value={this.state.g2Valve5DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2Valve5DripMls = input; }}
                                        onSubmitEditing={() => { this.g2Valve6DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 Valve 6 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2Valve6DripMls')}
                                        value={this.state.g2Valve6DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2Valve6DripMls = input; }}
                                        onSubmitEditing={() => { this.g2Valve7DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 Valve 7 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2Valve7DripMls')}
                                        value={this.state.g2Valve7DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2Valve7DripMls = input; }}
                                        onSubmitEditing={() => { this.g2Valve8DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 Valve 8 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2Valve8DripMls')}
                                        value={this.state.g2Valve8DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2Valve8DripMls = input; }}
                                        onSubmitEditing={() => { this.g2Valve9DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 Valve 9 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2Valve9DripMls')}
                                        value={this.state.g2Valve9DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2Valve9DripMls = input; }}
                                        onSubmitEditing={() => { this.g2Valve10DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 Valve 10 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2Valve10DripMls')}
                                        value={this.state.g2Valve10DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2Valve10DripMls = input; }}
                                        onSubmitEditing={() => { this.g2Valve11DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 Valve 11 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2Valve11DripMls')}
                                        value={this.state.g2Valve11DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2Valve11DripMls = input; }}
                                        onSubmitEditing={() => { this.g2Valve12DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 2 Valve 12 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g2Valve12DripMls')}
                                        value={this.state.g2Valve12DripMls}
                                        editable={true}
                                        returnKeyType={"done"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g2Valve12DripMls = input; }}
                                        blurOnSubmit={true}

                                    />

                                </View>

                            </View>
                        </View>

                        <View style={styles.marginDimensionTop}></View>

                        <View>
                            <TouchableOpacity activeOpacity={0.8} onPress={this.g3ChangeLayout} style={styles.Btn}>
                                <View style={styles.alignTextView}>

                                    <Text style={styles.btnText}>GER 3</Text>
                                    <Image style={{
                                        resizeMode: "cover",
                                        marginRight: 5

                                    }} source={this.state.expandedG3 ? UP_ARROW : DOWN_ARROW} />


                                </View>
                            </TouchableOpacity>
                            <View style={{ height: this.state.expandedG3 ? null : 0, overflow: 'hidden' }}>
                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 South - Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3SouthDripMls')}
                                        value={this.state.g3SouthDripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3SouthDripMls = input; }}
                                        onSubmitEditing={() => { this.g3SouthDripEC.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 South - Drip Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3SouthDripEC')}
                                        value={this.state.g3SouthDripEC}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3SouthDripEC = input; }}
                                        onSubmitEditing={() => { this.g3SouthDripPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 South - Drip pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3SouthDripPh')}
                                        value={this.state.g3SouthDripPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3SouthDripPh = input; }}
                                        onSubmitEditing={() => { this.g3SouthDrainMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 South - Drain (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3SouthDrainMls')}
                                        value={this.state.g3SouthDrainMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3SouthDrainMls = input; }}
                                        onSubmitEditing={() => { this.g3SouthDrainEc.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 South - Drain Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3SouthDrainEc')}
                                        value={this.state.g3SouthDrainEc}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3SouthDrainEc = input; }}
                                        onSubmitEditing={() => { this.g3SouthDrainPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 South - Drain pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3SouthDrainPh')}
                                        value={this.state.g3SouthDrainPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3SouthDrainPh = input; }}
                                        onSubmitEditing={() => { this.g3NorthDripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 North - Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3NorthDripMls')}
                                        value={this.state.g3NorthDripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3NorthDripMls = input; }}
                                        onSubmitEditing={() => { this.g3NorthDripEC.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 North - Drip Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3NorthDripEC')}
                                        value={this.state.g3NorthDripEC}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3NorthDripEC = input; }}
                                        onSubmitEditing={() => { this.g3NorthDripPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 North - Drip pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3NorthDripPh')}
                                        value={this.state.g3NorthDripPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3NorthDripPh = input; }}
                                        onSubmitEditing={() => { this.g3NorthDrainMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 North - Drain (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3NorthDrainMls')}
                                        value={this.state.g3NorthDrainMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3NorthDrainMls = input; }}
                                        onSubmitEditing={() => { this.g3NorthDrainEC.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 North - Drain Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3NorthDrainEC')}
                                        value={this.state.g3NorthDrainEC}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3NorthDrainEC = input; }}
                                        onSubmitEditing={() => { this.g3NorthDrainPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 North - Drain pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3NorthDrainPh')}
                                        value={this.state.g3NorthDrainPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3NorthDrainPh = input; }}
                                        onSubmitEditing={() => { this.g3Valve13DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 Valve 13 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3Valve13DripMls')}
                                        value={this.state.g3Valve13DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3Valve13DripMls = input; }}
                                        onSubmitEditing={() => { this.g3Valve14DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 Valve 14 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3Valve14DripMls')}
                                        value={this.state.g3Valve14DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3Valve14DripMls = input; }}
                                        onSubmitEditing={() => { this.g3Valve15DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 Valve 15 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3Valve15DripMls')}
                                        value={this.state.g3Valve15DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3Valve15DripMls = input; }}
                                        onSubmitEditing={() => { this.g3Valve16DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 Valve 16 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3Valve16DripMls')}
                                        value={this.state.g3Valve16DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3Valve16DripMls = input; }}
                                        onSubmitEditing={() => { this.g3Valve17DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 Valve 17 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3Valve17DripMls')}
                                        value={this.state.g3Valve17DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3Valve17DripMls = input; }}
                                        onSubmitEditing={() => { this.g3Valve18DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 Valve 18 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3Valve18DripMls')}
                                        value={this.state.g3Valve18DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3Valve18DripMls = input; }}
                                        onSubmitEditing={() => { this.g3Valve19DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 Valve 19 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3Valve19DripMls')}
                                        value={this.state.g3Valve19DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3Valve19DripMls = input; }}
                                        onSubmitEditing={() => { this.g3Valve20DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 3 Valve 20 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g3Valve20DripMls')}
                                        value={this.state.g3Valve20DripMls}
                                        editable={true}
                                        returnKeyType={"done"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g3Valve20DripMls = input; }}
                                        blurOnSubmit={true}

                                    />

                                </View>

                            </View>
                        </View>

                        <View style={styles.marginDimensionTop}></View>

                        <View>
                            <TouchableOpacity activeOpacity={0.8} onPress={this.g4ChangeLayout} style={styles.Btn}>
                                <View style={styles.alignTextView}>

                                    <Text style={styles.btnText}>GER 4</Text>
                                    <Image style={{
                                        resizeMode: "cover",
                                        marginRight: 5

                                    }} source={this.state.expandedG4 ? UP_ARROW : DOWN_ARROW} />


                                </View>
                            </TouchableOpacity>
                            <View style={{ height: this.state.expandedG4 ? null : 0, overflow: 'hidden' }}>
                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 4 South - Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g4SouthDripMls')}
                                        value={this.state.g4SouthDripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g4SouthDripMls = input; }}
                                        onSubmitEditing={() => { this.g4SouthDripEC.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 4 South - Drip Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g4SouthDripEC')}
                                        value={this.state.g4SouthDripEC}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g4SouthDripEC = input; }}
                                        onSubmitEditing={() => { this.g4SouthDripPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 4 South - Drip pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g4SouthDripPh')}
                                        value={this.state.g4SouthDripPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g4SouthDripPh = input; }}
                                        onSubmitEditing={() => { this.g4SouthDrainMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 4 South - Drain (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g4SouthDrainMls')}
                                        value={this.state.g4SouthDrainMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g4SouthDrainMls = input; }}
                                        onSubmitEditing={() => { this.g4SouthDrainEc.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 4 South - Drain Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g4SouthDrainEc')}
                                        value={this.state.g4SouthDrainEc}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g4SouthDrainEc = input; }}
                                        onSubmitEditing={() => { this.g4SouthDrainPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 4 South - Drain pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g4SouthDrainPh')}
                                        value={this.state.g4SouthDrainPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g4SouthDrainPh = input; }}
                                        onSubmitEditing={() => { this.g4NorthDripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 4 North - Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g4NorthDripMls')}
                                        value={this.state.g4NorthDripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g4NorthDripMls = input; }}
                                        onSubmitEditing={() => { this.g4NorthDripEC.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 4 North - Drip Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g4NorthDripEC')}
                                        value={this.state.g4NorthDripEC}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g4NorthDripEC = input; }}
                                        onSubmitEditing={() => { this.g4NorthDripPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 4 North - Drip pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g4NorthDripPh')}
                                        value={this.state.g4NorthDripPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g4NorthDripPh = input; }}
                                        onSubmitEditing={() => { this.g4NorthDrainMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 4 North - Drain (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g4NorthDrainMls')}
                                        value={this.state.g4NorthDrainMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g4NorthDrainMls = input; }}
                                        onSubmitEditing={() => { this.g4NorthDrainEC.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 4 North - Drain Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g4NorthDrainEC')}
                                        value={this.state.g4NorthDrainEC}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g4NorthDrainEC = input; }}
                                        onSubmitEditing={() => { this.g4NorthDrainPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 4 North - Drain pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g4NorthDrainPh')}
                                        value={this.state.g4NorthDrainPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g4NorthDrainPh = input; }}
                                        onSubmitEditing={() => { this.g4Valve21DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 4 Valve 21 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g4Valve21DripMls')}
                                        value={this.state.g4Valve21DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g4Valve21DripMls = input; }}
                                        onSubmitEditing={() => { this.g4Valve22DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 4 Valve 22 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g4Valve22DripMls')}
                                        value={this.state.g4Valve22DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g4Valve22DripMls = input; }}
                                        onSubmitEditing={() => { this.g4Valve23DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 4 Valve 23 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g4Valve23DripMls')}
                                        value={this.state.g4Valve23DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g4Valve23DripMls = input; }}
                                        onSubmitEditing={() => { this.g4Valve24DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 4 Valve 24 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g4Valve24DripMls')}
                                        value={this.state.g4Valve24DripMls}
                                        editable={true}
                                        returnKeyType={"done"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g4Valve24DripMls = input; }}
                                        blurOnSubmit={true}

                                    />

                                </View>

                            </View>
                        </View>

                        <View style={styles.marginDimensionTop}></View>

                        <View>
                            <TouchableOpacity activeOpacity={0.8} onPress={this.g5ChangeLayout} style={styles.Btn}>
                                <View style={styles.alignTextView}>

                                    <Text style={styles.btnText}>GER 5</Text>
                                    <Image style={{
                                        resizeMode: "cover",
                                        marginRight: 5

                                    }} source={this.state.expandedG5 ? UP_ARROW : DOWN_ARROW} />


                                </View>
                            </TouchableOpacity>
                            <View style={{ height: this.state.expandedG5 ? null : 0, overflow: 'hidden' }}>
                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 5 First - Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g5FirstDripMls')}
                                        value={this.state.g5FirstDripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g5FirstDripMls = input; }}
                                        onSubmitEditing={() => { this.g5FirstDripEC.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 5 First - Drip Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g5FirstDripEC')}
                                        value={this.state.g5FirstDripEC}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g5FirstDripEC = input; }}
                                        onSubmitEditing={() => { this.g5FirstDripPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 5 First - Drip pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g5FirstDripPh')}
                                        value={this.state.g5FirstDripPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g5FirstDripPh = input; }}
                                        onSubmitEditing={() => { this.g5FirstDrainMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 5 First - Drain (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g5FirstDrainMls')}
                                        value={this.state.g5FirstDrainMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g5FirstDrainMls = input; }}
                                        onSubmitEditing={() => { this.g5FirstDrainEc.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 5 First - Drain Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g5FirstDrainEc')}
                                        value={this.state.g5FirstDrainEc}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g5FirstDrainEc = input; }}
                                        onSubmitEditing={() => { this.g5FirstDrainPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 5 First - Drain pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g5FirstDrainPh')}
                                        value={this.state.g5FirstDrainPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g5FirstDrainPh = input; }}
                                        onSubmitEditing={() => { this.g5SecondDripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 5 Second - Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g5SecondDripMls')}
                                        value={this.state.g5SecondDripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g5SecondDripMls = input; }}
                                        onSubmitEditing={() => { this.g5SecondDripEC.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 5 Second - Drip Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g5SecondDripEC')}
                                        value={this.state.g5SecondDripEC}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g5SecondDripEC = input; }}
                                        onSubmitEditing={() => { this.g5SecondDripPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 5 Second - Drip pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g5SecondDripPh')}
                                        value={this.state.g5SecondDripPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g5SecondDripPh = input; }}
                                        onSubmitEditing={() => { this.g5SecondDrainMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 5 Second - Drain (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g5SecondDrainMls')}
                                        value={this.state.g5SecondDrainMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g5SecondDrainMls = input; }}
                                        onSubmitEditing={() => { this.g5SecondDrainEC.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 5 Second - Drain Ec</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g5SecondDrainEC')}
                                        value={this.state.g5SecondDrainEC}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g5SecondDrainEC = input; }}
                                        onSubmitEditing={() => { this.g5SecondDrainPh.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 5 Second - Drain pH</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g5SecondDrainPh')}
                                        value={this.state.g5SecondDrainPh}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g5SecondDrainPh = input; }}
                                        onSubmitEditing={() => { this.g5Valve25DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 5 Valve 25 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g5Valve25DripMls')}
                                        value={this.state.g5Valve25DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g5Valve25DripMls = input; }}
                                        onSubmitEditing={() => { this.g5Valve26DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 5 Valve 26 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g5Valve26DripMls')}
                                        value={this.state.g5Valve26DripMls}
                                        editable={true}
                                        returnKeyType={"next"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g5Valve26DripMls = input; }}
                                        onSubmitEditing={() => { this.g5Valve27DripMls.focus(); }}
                                        blurOnSubmit={false}

                                    />

                                </View>

                                <View style={styles.marginDimensionTop}></View>

                                <Text style={styles.titleHeadingText}>GER 5 Valve 27 Drip (mls)</Text>

                                <View style={styles.marginDimension}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        onChangeText={(text) => this.updateTextInput(text, 'g5Valve27DripMls')}
                                        value={this.state.g5Valve27DripMls}
                                        editable={true}
                                        returnKeyType={"done"}
                                        keyboardType={'numeric'}
                                        ref={(input) => { this.g5Valve27DripMls = input; }}
                                        blurOnSubmit={true}

                                    />

                                </View>

                            </View>

                            <View style={styles.marginDimensionTop}></View>

                            <Text style={styles.headerText}>Bore Readings</Text>

                            <View style={styles.marginDimensionTop}></View>


                            <Text style={styles.titleHeadingText}>Bore 1 (Hours)</Text>

                            <View style={styles.marginDimension}></View>

                            <View style={styles.borderEdit}>
                                <TextInput style={styles.textInputStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                    onChangeText={(text) => this.updateTextInput(text, 'bore1Hours')}
                                    value={this.state.bore1Hours}
                                    editable={true}
                                    returnKeyType={"next"}
                                    keyboardType={'numeric'}
                                    ref={(input) => { this.bore1Hours = input; }}
                                    onSubmitEditing={() => { this.bore1m3.focus(); }}
                                    blurOnSubmit={false}

                                />

                            </View>

                            <View style={styles.marginDimensionTop}></View>


                            <Text style={styles.titleHeadingText}>Bore 1 (m3)</Text>

                            <View style={styles.marginDimension}></View>

                            <View style={styles.borderEdit}>
                                <TextInput style={styles.textInputStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                    onChangeText={(text) => this.updateTextInput(text, 'bore1m3')}
                                    value={this.state.bore1m3}
                                    editable={true}
                                    returnKeyType={"next"}
                                    keyboardType={'numeric'}
                                    ref={(input) => { this.bore1m3 = input; }}
                                    onSubmitEditing={() => { this.electricity.focus(); }}
                                    blurOnSubmit={false}

                                />

                            </View>

                            <View style={styles.marginDimensionTop}></View>


                            <Text style={styles.titleHeadingText}>Electricity</Text>

                            <View style={styles.marginDimension}></View>

                            <View style={styles.borderEdit}>
                                <TextInput style={styles.textInputStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                    onChangeText={(text) => this.updateTextInput(text, 'electricity')}
                                    value={this.state.electricity}
                                    editable={true}
                                    returnKeyType={"next"}
                                    keyboardType={'numeric'}
                                    ref={(input) => { this.electricity = input; }}
                                    onSubmitEditing={() => { this.Septicm3.focus(); }}
                                    blurOnSubmit={false}

                                />

                            </View>

                            <View style={styles.marginDimensionTop}></View>


                            <Text style={styles.titleHeadingText}>Septic (m3)</Text>

                            <View style={styles.marginDimension}></View>

                            <View style={styles.borderEdit}>
                                <TextInput style={styles.textInputStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                    onChangeText={(text) => this.updateTextInput(text, 'Septicm3')}
                                    value={this.state.Septicm3}
                                    editable={true}
                                    returnKeyType={"done"}
                                    keyboardType={'numeric'}
                                    ref={(input) => { this.Septicm3 = input; }}
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

            </View >
        )


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
        padding: 10
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
        width: '100%'


    },
    titleHeadingText: {

        color: '#2C903D',
        fontSize: 18,
        fontWeight: 'bold',

    },

    buttonContainer1: {
        //backgroundColor: 'rgba(0,0,0,0.65)',
        borderRadius: 5,
        padding: 10,
        margin: 20,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'

    },

    buttonContainer: {
        backgroundColor: '#2C903D',
        borderRadius: 5,
        padding: 10,
        margin: 20,
        height: 55,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center'

    },


    textStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 19,
        color: '#000000',
        fontWeight: 'bold'

    },

    buttonText: {
        fontSize: 23,
        color: '#ffffff',
        fontWeight: 'bold',
        fontStyle: 'italic'

    },
    textInputStyle: {
        fontSize: 15,
        marginLeft: 10,
        marginRight: 20,
        marginBottom: 1,
        height: 50,
        backgroundColor: '#ffffff',

    },

    backgroundImage: {

        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
})


