import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Image, ImageBackground, LayoutAnimation, Platform, UIManager, TextInput, BackHandler, Alert, LogBox, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Realm from 'realm';
import moment from 'moment'
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
var currentWeekNumber = require('current-week-number');


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

        //this.getAsyncValues();

        this.retriveAsyncData();

        //

        //VIEW ALL USERS
        /*var daily_readings = realm.objects('daily_readings_offline_table');
        this.setState({ FlatListItems: daily_readings })
        console.log("DATA FROM REALM : " + this.state.FlatListItems);*/

        var currentDate1 = moment().format("DD/MM/YYYY");

        this.setState({ currentDate: currentDate1 })

        console.log("CURRENT WEEK NUMBER : " + currentDate1);

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








        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);


    }

    retriveAsyncData = async () => {

        try {
            const data1 = await AsyncStorage.getItem('dateYesterday')

            if (data1 !== null) {
                this.setState({ dateYesterday: JSON.parse(data1) });
            }
        } catch (e) {
        }

        try {
            const data2 = await AsyncStorage.getItem('dayYesterday')

            if (data2 !== null) {
                this.setState({ dayYesterday: JSON.parse(data2) });
            }
        } catch (e) {
        }

        try {
            const data3 = await AsyncStorage.getItem('gas')

            if (data3 !== null) {
                this.setState({ gas: JSON.parse(data3) });
            }
        } catch (e) {
        }

        try {
            const data4 = await AsyncStorage.getItem('liquidCO2')

            if (data4 !== null) {
                this.setState({ liquidCO2: JSON.parse(data4) });
            }
        } catch (e) {
        }

        try {
            const data5 = await AsyncStorage.getItem('drainDischarge')

            if (data5 !== null) {
                this.setState({ drainDischarge: JSON.parse(data5) });
            }
        } catch (e) {
        }

        //G1 ASYNC getItem
        try {
            const data6 = await AsyncStorage.getItem('g1SouthDripMls')

            if (data6 !== null) {
                this.setState({ g1SouthDripMls: JSON.parse(data6) });
            }
        } catch (e) {

        }

        try {
            const data7 = await AsyncStorage.getItem('g1SouthDripEC')

            if (data7 !== null) {
                this.setState({ g1SouthDripEC: JSON.parse(data7) });
            }

        } catch (error) {
        }

        try {
            const data8 = await AsyncStorage.getItem('g1SouthDripPh')

            if (data8 !== null) {

                this.setState({ g1SouthDripPh: JSON.parse(data8) });
            }

        } catch (error) {
        }

        try {
            const data9 = await AsyncStorage.getItem('g1SouthDrainMls')

            if (data9 !== null) {

                this.setState({ g1SouthDrainMls: JSON.parse(data9) });
            }

        } catch (error) {
        }

        try {
            const data10 = await AsyncStorage.getItem('g1SouthDrainEc')

            if (data10 !== null) {

                this.setState({ g1SouthDrainEc: JSON.parse(data10) });

            }
        } catch (error) {
        }


        try {
            const data11 = await AsyncStorage.getItem('g1SouthDrainPh')
            if (data11 !== null) {

                this.setState({ g1SouthDrainPh: JSON.parse(data11) });

            }
        } catch (error) {
        }

        try {
            const data12 = await AsyncStorage.getItem('g1NorthDripMls')

            if (data12 !== null) {

                this.setState({ g1NorthDripMls: JSON.parse(data12) });

            }
        } catch (error) {
        }

        try {
            const data13 = await AsyncStorage.getItem('g1NorthDripEC')

            if (data13 !== null) {

                this.setState({ g1NorthDripEC: JSON.parse(data13) });

            }
        } catch (error) {
        }

        try {
            const data14 = await AsyncStorage.getItem('g1NorthDripPh')

            if (data14 !== null) {

                this.setState({ g1NorthDripPh: JSON.parse(data14) });

            }
        } catch (error) {
        }

        try {
            const data15 = await AsyncStorage.getItem('g1NorthDrainMls')

            if (data15 !== null) {

                this.setState({ g1NorthDrainMls: JSON.parse(data15) });

            }

        } catch (error) {
        }

        try {
            const data16 = await AsyncStorage.getItem('g1NorthDrainEC')
            if (data16 !== null) {
                this.setState({ g1NorthDrainEC: JSON.parse(data16) });

            }
        } catch (error) {
        }


        try {
            const data17 = await AsyncStorage.getItem('g1NorthDrainPh')
            if (data17 !== null) {
                this.setState({ g1NorthDrainPh: JSON.parse(data17) });

            }
        } catch (error) {
        }

        try {
            const data18 = await AsyncStorage.getItem('g1Valve1DripMls')
            if (data18 !== null) {
                this.setState({ g1Valve1DripMls: JSON.parse(data18) });

            }
        } catch (error) {
        }

        try {
            const data19 = await AsyncStorage.getItem('g1Valve2DripMls')
            if (data19 !== null) {
                this.setState({ g1Valve2DripMls: JSON.parse(data19) });

            }
        } catch (error) {
        }

        try {
            const data20 = await AsyncStorage.getItem('g1Valve3DripMls')
            if (data20 !== null) {
                this.setState({ g1Valve3DripMls: JSON.parse(data20) });

            }
        } catch (error) {
        }

        try {
            const data21 = await AsyncStorage.getItem('g1Valve4DripMls')
            if (data21 !== null) {

                this.setState({ g1Valve4DripMls: JSON.parse(data21) });

            }
        } catch (error) {
        }

        //END

        //G2 ASYNC getItem
        try {
            const data22 = await AsyncStorage.getItem('g2SouthDripMls')
            if (data22 !== null) {
                this.setState({ g2SouthDripMls: JSON.parse(data22) });

            }
        } catch (error) {
        }

        try {
            const data23 = await AsyncStorage.getItem('g2SouthDripEC')
            if (data23 !== null) {
                this.setState({ g2SouthDripEC: JSON.parse(data23) });

            }
        } catch (error) {
        }

        try {
            const data24 = await AsyncStorage.getItem('g2SouthDripPh')
            if (data24 !== null) {
                this.setState({ g2SouthDripPh: JSON.parse(data24) });

            }
        } catch (error) {
        }

        try {
            const data25 = await AsyncStorage.getItem('g2SouthDrainMls')
            if (data25 !== null) {
                this.setState({ g2SouthDrainMls: JSON.parse(data25) });

            }
        } catch (error) {
        }

        try {
            const data26 = await AsyncStorage.getItem('g2SouthDrainEc')
            if (data26 !== null) {
                this.setState({ g2SouthDrainEc: JSON.parse(data26) });

            }
        } catch (error) {
        }


        try {
            const data27 = await AsyncStorage.getItem('g2SouthDrainPh')
            if (data27 !== null) {
                this.setState({ g2SouthDrainPh: JSON.parse(data27) });

            }
        } catch (error) {
        }

        try {
            const data28 = await AsyncStorage.getItem('g2NorthDripMls')
            if (data28 !== null) {
                this.setState({ g2NorthDripMls: JSON.parse(data28) });

            }
        } catch (error) {
        }

        try {
            const data29 = await AsyncStorage.getItem('g2NorthDripEC')
            if (data29 !== null) {
                this.setState({ g2NorthDripEC: JSON.parse(data29) });

            }
        } catch (error) {
        }

        try {
            const data30 = await AsyncStorage.getItem('g2NorthDripPh')
            if (data30 !== null) {
                this.setState({ g2NorthDripPh: JSON.parse(data30) });

            }
        } catch (error) {
        }

        try {
            const data31 = await AsyncStorage.getItem('g2NorthDrainMls')
            if (data31 !== null) {
                this.setState({ g2NorthDrainMls: JSON.parse(data31) });

            }
        } catch (error) {
        }

        try {
            const data32 = await AsyncStorage.getItem('g2NorthDrainEC')
            if (data32 !== null) {
                this.setState({ g2NorthDrainEC: JSON.parse(data32) });

            }
        } catch (error) {
        }


        try {
            const data33 = await AsyncStorage.getItem('g2NorthDrainPh')
            if (data33 !== null) {
                this.setState({ g2NorthDrainPh: JSON.parse(data33) });

            }
        } catch (error) {
        }

        try {
            const data34 = await AsyncStorage.getItem('g2Valve5DripMls')
            if (data34 !== null) {
                this.setState({ g2Valve5DripMls: JSON.parse(data34) });

            }
        } catch (error) {
        }

        try {
            const data35 = await AsyncStorage.getItem('g2Valve6DripMls')
            if (data35 !== null) {
                this.setState({ g2Valve6DripMls: JSON.parse(data35) });

            }
        } catch (error) {
        }

        try {
            const data36 = await AsyncStorage.getItem('g2Valve7DripMls')
            if (data36 !== null) {
                this.setState({ g2Valve7DripMls: JSON.parse(data36) });

            }
        } catch (error) {
        }

        try {
            const data37 = await AsyncStorage.getItem('g2Valve8DripMls')
            if (data37 !== null) {
                this.setState({ g2Valve8DripMls: JSON.parse(data37) });

            }
        } catch (error) {
        }

        try {
            const data38 = await AsyncStorage.getItem('g2Valve9DripMls')
            if (data38 !== null) {
                this.setState({ g2Valve9DripMls: JSON.parse(data38) });

            }
        } catch (error) {
        }

        try {
            const data39 = await AsyncStorage.getItem('g2Valve10DripMls')
            if (data39 !== null) {
                this.setState({ g2Valve10DripMls: JSON.parse(data39) });
                9
            }
        } catch (error) {
        }

        try {
            const data381 = await AsyncStorage.getItem('g2Valve11DripMls')
            if (data381 !== null) {
                this.setState({ g2Valve11DripMls: JSON.parse(data381) });

            }
        } catch (error) {
        }

        try {
            const data391 = await AsyncStorage.getItem('g2Valve12DripMls')
            if (data391 !== null) {
                this.setState({ g2Valve12DripMls: JSON.parse(data391) });


            }
        } catch (error) {
        }
        //END

        //G3 ASYNC getItem
        try {
            const data40 = await AsyncStorage.getItem('g3SouthDripMls')
            if (data40 !== null) {
                this.setState({ g3SouthDripMls: JSON.parse(data40) });

            }
        } catch (error) {
        }

        try {
            const data41 = await AsyncStorage.getItem('g3SouthDripEC')
            if (data41 !== null) {
                this.setState({ g3SouthDripEC: JSON.parse(data41) });

            }
        } catch (error) {
        }

        try {
            const data42 = await AsyncStorage.getItem('g3SouthDripPh')
            if (data42 !== null) {
                this.setState({ g3SouthDripPh: JSON.parse(data42) });

            }
        } catch (error) {
        }

        try {
            const data43 = await AsyncStorage.getItem('g3SouthDrainMls')
            if (data43 !== null) {
                this.setState({ g3SouthDrainMls: JSON.parse(data43) });

            }
        } catch (error) {
        }

        try {
            const data44 = await AsyncStorage.getItem('g3SouthDrainEc')
            if (data44 !== null) {
                this.setState({ g3SouthDrainEc: JSON.parse(data44) });

            }
        } catch (error) {
        }


        try {
            const data45 = await AsyncStorage.getItem('g3SouthDrainPh')
            if (data45 !== null) {
                this.setState({ g3SouthDrainPh: JSON.parse(data45) });

            }
        } catch (error) {
        }

        try {
            const data46 = await AsyncStorage.getItem('g3NorthDripMls')
            if (data46 !== null) {
                this.setState({ g3NorthDripMls: JSON.parse(data46) });

            }
        } catch (error) {
        }

        try {
            const data47 = await AsyncStorage.getItem('g3NorthDripEC')
            if (data47 !== null) {
                this.setState({ g3NorthDripEC: JSON.parse(data47) });
            }
        } catch (error) {
        }

        try {
            const data48 = await AsyncStorage.getItem('g3NorthDripPh')
            if (data48 !== null) {
                this.setState({ g3NorthDripPh: JSON.parse(data48) });
            }
        } catch (error) {
        }

        try {
            const data49 = await AsyncStorage.getItem('g3NorthDrainMls')
            if (data49 !== null) {
                this.setState({ g3NorthDrainMls: JSON.parse(data49) });
            }
        } catch (error) {
        }

        try {
            const data50 = await AsyncStorage.getItem('g3NorthDrainEC')
            if (data50 !== null) {
                this.setState({ g3NorthDrainEC: JSON.parse(data50) });
            }
        } catch (error) {
        }


        try {
            const data51 = await AsyncStorage.getItem('g3NorthDrainPh')
            if (data51 !== null) {
                this.setState({ g3NorthDrainPh: JSON.parse(data51) });
            }
        } catch (error) {
        }

        try {
            const data52 = await AsyncStorage.getItem('g3Valve20DripMls')
            if (data52 !== null) {
                this.setState({ g3Valve20DripMls: JSON.parse(data52) });
            }
        } catch (error) {
        }

        try {
            const data53 = await AsyncStorage.getItem('g3Valve13DripMls')
            if (data53 !== null) {
                this.setState({ g3Valve13DripMls: JSON.parse(data53) });
            }
        } catch (error) {
        }

        try {
            const data54 = await AsyncStorage.getItem('g3Valve14DripMls')
            if (data54 !== null) {
                this.setState({ g3Valve14DripMls: JSON.parse(data54) });
            }
        } catch (error) {
        }

        try {
            const data55 = await AsyncStorage.getItem('g3Valve15DripMls')
            if (data55 !== null) {
                this.setState({ g3Valve15DripMls: JSON.parse(data55) });
            }
        } catch (error) {
        }

        try {
            const data56 = await AsyncStorage.getItem('g3Valve16DripMls')
            if (data56 !== null) {
                this.setState({ g3Valve16DripMls: JSON.parse(data56) });
            }
        } catch (error) {
        }

        try {
            const data57 = await AsyncStorage.getItem('g3Valve17DripMls')
            if (data57 !== null) {
                this.setState({ g3Valve17DripMls: JSON.parse(data57) });
            }
        } catch (error) {
        }

        try {
            const data58 = await AsyncStorage.getItem('g3Valve18DripMls')
            if (data58 !== null) {
                this.setState({ g3Valve18DripMls: JSON.parse(data58) });
            }
        } catch (error) {
        }

        try {
            const data59 = await AsyncStorage.getItem('g3Valve19DripMls')
            if (data59 !== null) {
                this.setState({ g3Valve19DripMls: JSON.parse(data59) });
            }
        } catch (error) {
        }
        //END

        //G4 ASYNC getItem
        try {
            const data60 = await AsyncStorage.getItem('g4SouthDripMls')
            if (data60 !== null) {
                this.setState({ g4SouthDripMls: JSON.parse(data60) });
            }
        } catch (error) {
        }

        try {
            const data61 = await AsyncStorage.getItem('g4SouthDripEC')
            if (data61 !== null) {
                this.setState({ g4SouthDripEC: JSON.parse(data61) });
            }
        } catch (error) {
        }

        try {
            const data62 = await AsyncStorage.getItem('g4SouthDripPh')
            if (data62 !== null) {
                this.setState({ g4SouthDripPh: JSON.parse(data62) });
            }
        } catch (error) {
        }

        try {
            const data63 = await AsyncStorage.getItem('g4SouthDrainMls')
            if (data63 !== null) {
                this.setState({ g4SouthDrainMls: JSON.parse(data63) });
            }
        } catch (error) {
        }

        try {
            const data64 = await AsyncStorage.getItem('g4SouthDrainEc')
            if (data64 !== null) {
                this.setState({ g4SouthDrainEc: JSON.parse(data64) });

            }
        } catch (error) {
        }


        try {
            const data65 = await AsyncStorage.getItem('g4SouthDrainPh')
            if (data65 !== null) {
                this.setState({ g4SouthDrainPh: JSON.parse(data65) });
            }
        } catch (error) {
        }

        try {
            const data66 = await AsyncStorage.getItem('g4NorthDripMls')
            if (data66 !== null) {
                this.setState({ g4NorthDripMls: JSON.parse(data66) });
            }
        } catch (error) {
        }

        try {
            const data67 = await AsyncStorage.getItem('g4NorthDripEC')
            if (data67 !== null) {
                this.setState({ g4NorthDripEC: JSON.parse(data67) });
            }
        } catch (error) {
        }

        try {
            const data68 = await AsyncStorage.getItem('g4NorthDripPh')
            if (data68 !== null) {
                this.setState({ g4NorthDripPh: JSON.parse(data68) });
            }
        } catch (error) {
        }

        try {
            const data69 = await AsyncStorage.getItem('g4NorthDrainMls')
            if (data69 !== null) {
                this.setState({ g4NorthDrainMls: JSON.parse(data69) });
            }
        } catch (error) {
        }

        try {
            const data70 = await AsyncStorage.getItem('g4NorthDrainEC')
            if (data70 !== null) {
                this.setState({ g4NorthDrainEC: JSON.parse(data70) });
            }
        } catch (error) {
        }


        try {
            const data71 = await AsyncStorage.getItem('g4NorthDrainPh')
            if (data71 !== null) {
                this.setState({ g4NorthDrainPh: JSON.parse(data71) });
            }
        } catch (error) {
        }

        try {
            const data72 = await AsyncStorage.getItem('g4Valve21DripMls')
            if (data72 !== null) {
                this.setState({ g4Valve21DripMls: JSON.parse(data72) });
            }
        } catch (error) {
        }

        try {
            const data73 = await AsyncStorage.getItem('g4Valve22DripMls')
            if (data73 !== null) {
                this.setState({ g4Valve22DripMls: JSON.parse(data73) });
            }
        } catch (error) {
        }

        try {
            const data74 = await AsyncStorage.getItem('g4Valve23DripMls')
            if (data74 !== null) {
                this.setState({ g4Valve23DripMls: JSON.parse(data74) });
            }
        } catch (error) {
        }

        try {
            const data75 = await AsyncStorage.getItem('g4Valve24DripMls')
            if (data75 !== null) {
                this.setState({ g4Valve24DripMls: JSON.parse(data75) });
            }
        } catch (error) {
        }

        //END

        //G5 ASYNC getItem
        try {
            const data76 = await AsyncStorage.getItem('g5FirstDripMls')
            if (data76 !== null) {
                this.setState({ g5FirstDripMls: JSON.parse(data76) });
            }
        } catch (error) {
        }

        try {
            const data77 = await AsyncStorage.getItem('g5FirstDripEC')
            if (data77 !== null) {
                this.setState({ g5FirstDripEC: JSON.parse(data77) });
            }
        } catch (error) {
        }

        try {
            const data78 = await AsyncStorage.getItem('g5FirstDripPh')
            if (data78 !== null) {
                this.setState({ g5FirstDripPh: JSON.parse(data78) });
            }
        } catch (error) {
        }

        try {
            const data79 = await AsyncStorage.getItem('g5FirstDrainMls')
            if (data79 !== null) {
                this.setState({ g5FirstDrainMls: JSON.parse(data79) });
            }
        } catch (error) {
        }

        try {
            const data80 = await AsyncStorage.getItem('g5FirstDrainEc')
            if (data80 !== null) {
                this.setState({ g5FirstDrainEc: JSON.parse(data80) });
            }
        } catch (error) {
        }


        try {
            const data81 = await AsyncStorage.getItem('g5FirstDrainPh')
            if (data81 !== null) {
                this.setState({ g5FirstDrainPh: JSON.parse(data81) });
            }
        } catch (error) {
        }

        try {
            const data82 = await AsyncStorage.getItem('g5SecondDripMls')
            if (data82 !== null) {
                this.setState({ g5SecondDripMls: JSON.parse(data82) });
            }
        } catch (error) {
        }

        try {
            const data83 = await AsyncStorage.getItem('g5SecondDripEC')
            if (data83 !== null) {
                this.setState({ g5SecondDripEC: JSON.parse(data83) });
            }
        } catch (error) {
        }

        try {
            const data84 = await AsyncStorage.getItem('g5SecondDripPh')
            if (data84 !== null) {
                this.setState({ g5SecondDripPh: JSON.parse(data84) });
            }
        } catch (error) {
        }

        try {
            const data85 = await AsyncStorage.getItem('g5SecondDrainMls')
            if (data85 !== null) {
                this.setState({ g5SecondDrainMls: JSON.parse(data85) });
            }
        } catch (error) {
        }

        try {
            const data86 = await AsyncStorage.getItem('g5SecondDrainEC')
            if (data86 !== null) {
                this.setState({ g5SecondDrainEC: JSON.parse(data86) });
            }
        } catch (error) {
        }


        try {
            const data87 = await AsyncStorage.getItem('g5SecondDrainPh')
            if (data87 !== null) {
                this.setState({ g5SecondDrainPh: JSON.parse(data87) });
            }
        } catch (error) {
        }

        try {
            const data88 = await AsyncStorage.getItem('g5Valve25DripMls')
            if (data88 !== null) {
                this.setState({ g5Valve25DripMls: JSON.parse(data88) });
            }
        } catch (error) {
        }

        try {
            const data89 = await AsyncStorage.getItem('g5Valve26DripMls')
            if (data89 !== null) {
                this.setState({ g5Valve26DripMls: JSON.parse(data89) });

            }
        } catch (error) {
        }

        try {
            const data90 = await AsyncStorage.getItem('g5Valve27DripMls')
            if (data90 !== null) {
                this.setState({ g5Valve27DripMls: JSON.parse(data90) });
            }
        } catch (error) {
        }


        //END

        //BORE READINGS

        try {
            const data91 = await AsyncStorage.getItem('bore1Hours')
            if (data91 !== null) {

                this.setState({ bore1Hours: JSON.parse(data91) });
            }
        } catch (error) {
        }

        try {
            const data92 = await AsyncStorage.getItem('bore1m3')

            if (data92 !== null) {

                this.setState({ bore1m3: JSON.parse(data92) });

            }
        } catch (error) {
        }

        try {
            const data93 = await AsyncStorage.getItem('electricity')

            if (data93 !== null) {
                this.setState({ electricity: JSON.parse(data93) });

            }
        } catch (error) {
        }

        try {
            const data94 = await AsyncStorage.getItem('Septicm3')

            if (data94 !== null) {
                this.setState({ Septicm3: JSON.parse(data94) });
            }
        } catch (error) {
        }

    }

    // INITIALIZING GET PROMISE OBJECT
    getPromiseObject = (type, url, params, useCredentials) => {
        return new Promise((resolve, reject) => {
            this.XmlHttpRequest(type, url, params, useCredentials, resolve, reject);
        });
    };

    XmlHttpRequest = (type, url, params, useCredentials, resolve, reject) => {
        var json = JSON.stringify(params);
        var xhr = new XMLHttpRequest();
        xhr.open(type, url);
        xhr.onload = function () {
            resolve(xhr.responseText);
        };
        xhr.onerror = function () {
            reject(xhr.statusText);
        };
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        if (useCredentials) xhr.withCredentials = true;
        xhr.send(json);
    };
    //END

    //METHOD FOR GETTING ASYNC VALUES

    getAsyncValues = () => {

        console.log("CALLING ASYNC VALUES...");


        try {
            AsyncStorage.getItem('dateYesterday').then((data1) => {


                if (data1 !== null) {

                    this.setState({ dateYesterday: JSON.parse(data1) });
                    console.log("DATE : " + this.state.dateYesterday);
                    this.setState({ isLoading: true })


                } else {

                    this.setState({ isLoading: false })
                }




            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('dayYesterday').then((data2) => {

                if (data2 !== null) {

                    this.setState({ dayYesterday: JSON.parse(data2) });
                    this.setState({ isLoading: true })



                } else {

                    this.setState({ isLoading: false })


                }



            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('gas').then((data3) => {

                if (data3 !== null) {

                    this.setState({ gas: JSON.parse(data3) });
                    this.setState({ isLoading: true })


                } else {

                    this.setState({ isLoading: false })


                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('liquidCO2').then((data4) => {

                if (data4 !== null) {

                    this.setState({ liquidCO2: JSON.parse(data4) });
                    this.setState({ isLoading: true })



                } else {

                    this.setState({ isLoading: false })


                }

            }).done();
        } catch (error) {
        }
        try {
            AsyncStorage.getItem('drainDischarge').then((data5) => {

                if (data5 !== null) {

                    this.setState({ drainDischarge: JSON.parse(data5) });
                    this.setState({ isLoading: true })



                } else {

                    this.setState({ isLoading: false })


                }

            }).done();
        } catch (error) {
        }

        //G1 ASYNC getItem
        try {
            AsyncStorage.getItem('g1SouthDripMls').then((data6) => {

                if (data6 !== null) {

                    this.setState({ g1SouthDripMls: JSON.parse(data6) });
                    this.setState({ isLoading: true })


                } else {

                    this.setState({ isLoading: false })


                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1SouthDripEC').then((data7) => {

                if (data7 !== null) {
                    this.setState({ g1SouthDripEC: JSON.parse(data7) });
                    this.setState({ isLoading: true })



                } else[


                ]

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1SouthDripPh').then((data8) => {

                if (data8 !== null) {

                    this.setState({ g1SouthDripPh: JSON.parse(data8) });
                    this.setState({ isLoading: true })



                } else {

                    this.setState({ isLoading: false })


                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1SouthDrainMls').then((data9) => {

                if (data9 !== null) {

                    this.setState({ g1SouthDrainMls: JSON.parse(data9) });
                    this.setState({ isLoading: true })



                } else {

                    this.setState({ isLoading: false })


                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1SouthDrainEc').then((data10) => {

                if (data10 !== null) {

                    this.setState({ g1SouthDrainEc: JSON.parse(data10) });
                    this.setState({ isLoading: true })



                } else {

                    this.setState({ isLoading: false })


                }

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g1SouthDrainPh').then((data11) => {
                if (data11 !== null) {

                    this.setState({ g1SouthDrainPh: JSON.parse(data11) });
                    this.setState({ isLoading: true })



                } else {

                    this.setState({ isLoading: false })


                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1NorthDripMls').then((data12) => {

                if (data12 !== null) {

                    this.setState({ g1NorthDripMls: JSON.parse(data12) });
                    this.setState({ isLoading: true })



                } else {

                    this.setState({ isLoading: false })


                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1NorthDripEC').then((data13) => {

                if (data13 !== null) {

                    this.setState({ g1NorthDripEC: JSON.parse(data13) });
                    this.setState({ isLoading: true })



                } else {

                    this.setState({ isLoading: false })


                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1NorthDripPh').then((data14) => {

                if (data14 !== null) {

                    this.setState({ g1NorthDripPh: JSON.parse(data14) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1NorthDrainMls').then((data15) => {

                if (data15 !== null) {

                    this.setState({ g1NorthDrainMls: JSON.parse(data15) });
                    this.setState({ isLoading: true })


                } else {

                    this.setState({ isLoading: false })


                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1NorthDrainEC').then((data16) => {
                if (data16 !== null) {
                    this.setState({ g1NorthDrainEC: JSON.parse(data16) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g1NorthDrainPh').then((data17) => {
                if (data17 !== null) {
                    this.setState({ g1NorthDrainPh: JSON.parse(data17) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1Valve1DripMls').then((data18) => {
                if (data18 !== null) {
                    this.setState({ g1Valve1DripMls: JSON.parse(data18) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1Valve2DripMls').then((data19) => {
                if (data19 !== null) {
                    this.setState({ g1Valve2DripMls: JSON.parse(data19) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1Valve3DripMls').then((data20) => {
                if (data20 !== null) {
                    this.setState({ g1Valve3DripMls: JSON.parse(data20) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g1Valve4DripMls').then((data21) => {
                if (data21 !== null) {

                    this.setState({ g1Valve4DripMls: JSON.parse(data21) });
                    this.setState({ isLoading: true })


                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        //END

        //G2 ASYNC getItem
        try {
            AsyncStorage.getItem('g2SouthDripMls').then((data22) => {
                if (data22 !== null) {
                    this.setState({ g2SouthDripMls: JSON.parse(data22) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2SouthDripEC').then((data23) => {
                if (data23 !== null) {
                    this.setState({ g2SouthDripEC: JSON.parse(data23) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2SouthDripPh').then((data24) => {
                if (data24 !== null) {
                    this.setState({ g2SouthDripPh: JSON.parse(data24) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2SouthDrainMls').then((data25) => {
                if (data25 !== null) {
                    this.setState({ g2SouthDrainMls: JSON.parse(data25) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2SouthDrainEc').then((data26) => {
                if (data26 !== null) {
                    this.setState({ g2SouthDrainEc: JSON.parse(data26) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g2SouthDrainPh').then((data27) => {
                if (data27 !== null) {
                    this.setState({ g2SouthDrainPh: JSON.parse(data27) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2NorthDripMls').then((data28) => {
                if (data28 !== null) {
                    this.setState({ g2NorthDripMls: JSON.parse(data28) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2NorthDripEC').then((data29) => {
                if (data29 !== null) {
                    this.setState({ g2NorthDripEC: JSON.parse(data29) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2NorthDripPh').then((data30) => {
                if (data30 !== null) {
                    this.setState({ g2NorthDripPh: JSON.parse(data30) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }


            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2NorthDrainMls').then((data31) => {
                if (data31 !== null) {
                    this.setState({ g2NorthDrainMls: JSON.parse(data31) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2NorthDrainEC').then((data32) => {
                if (data32 !== null) {
                    this.setState({ g2NorthDrainEC: JSON.parse(data32) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g2NorthDrainPh').then((data33) => {
                if (data33 !== null) {
                    this.setState({ g2NorthDrainPh: JSON.parse(data33) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2Valve5DripMls').then((data34) => {
                if (data34 !== null) {
                    this.setState({ g2Valve5DripMls: JSON.parse(data34) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2Valve6DripMls').then((data35) => {
                if (data35 !== null) {
                    this.setState({ g2Valve6DripMls: JSON.parse(data35) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2Valve7DripMls').then((data36) => {
                if (data36 !== null) {
                    this.setState({ g2Valve7DripMls: JSON.parse(data36) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2Valve8DripMls').then((data37) => {
                if (data37 !== null) {
                    this.setState({ g2Valve8DripMls: JSON.parse(data37) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2Valve9DripMls').then((data38) => {
                if (data38 !== null) {
                    this.setState({ g2Valve9DripMls: JSON.parse(data38) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2Valve10DripMls').then((data39) => {
                if (data39 !== null) {
                    this.setState({ g2Valve10DripMls: JSON.parse(data39) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2Valve11DripMls').then((data381) => {
                if (data381 !== null) {
                    this.setState({ g2Valve11DripMls: JSON.parse(data381) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g2Valve12DripMls').then((data391) => {
                if (data391 !== null) {
                    this.setState({ g2Valve12DripMls: JSON.parse(data391) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }
        //END

        //G3 ASYNC getItem
        try {
            AsyncStorage.getItem('g3SouthDripMls').then((data40) => {
                if (data40 !== null) {
                    this.setState({ g3SouthDripMls: JSON.parse(data40) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3SouthDripEC').then((data41) => {
                if (data41 !== null) {
                    this.setState({ g3SouthDripEC: JSON.parse(data41) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3SouthDripPh').then((data42) => {
                if (data42 !== null) {
                    this.setState({ g3SouthDripPh: JSON.parse(data42) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3SouthDrainMls').then((data43) => {
                if (data43 !== null) {
                    this.setState({ g3SouthDrainMls: JSON.parse(data43) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3SouthDrainEc').then((data44) => {
                if (data44 !== null) {
                    this.setState({ g3SouthDrainEc: JSON.parse(data44) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g3SouthDrainPh').then((data45) => {
                if (data45 !== null) {
                    this.setState({ g3SouthDrainPh: JSON.parse(data45) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3NorthDripMls').then((data46) => {
                if (data46 !== null) {
                    this.setState({ g3NorthDripMls: JSON.parse(data46) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3NorthDripEC').then((data47) => {
                if (data47 !== null) {
                    this.setState({ g3NorthDripEC: JSON.parse(data47) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3NorthDripPh').then((data48) => {
                if (data48 !== null) {
                    this.setState({ g3NorthDripPh: JSON.parse(data48) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3NorthDrainMls').then((data49) => {
                if (data49 !== null) {
                    this.setState({ g3NorthDrainMls: JSON.parse(data49) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3NorthDrainEC').then((data50) => {
                if (data50 !== null) {
                    this.setState({ g3NorthDrainEC: JSON.parse(data50) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g3NorthDrainPh').then((data51) => {
                if (data51 !== null) {
                    this.setState({ g3NorthDrainPh: JSON.parse(data51) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3Valve20DripMls').then((data52) => {
                if (data52 !== null) {
                    this.setState({ g3Valve20DripMls: JSON.parse(data52) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3Valve13DripMls').then((data53) => {
                if (data53 !== null) {
                    this.setState({ g3Valve13DripMls: JSON.parse(data53) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3Valve14DripMls').then((data54) => {
                if (data54 !== null) {
                    this.setState({ g3Valve14DripMls: JSON.parse(data54) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3Valve15DripMls').then((data55) => {
                if (data55 !== null) {
                    this.setState({ g3Valve15DripMls: JSON.parse(data55) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3Valve16DripMls').then((data56) => {
                if (data56 !== null) {
                    this.setState({ g3Valve16DripMls: JSON.parse(data56) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3Valve17DripMls').then((data57) => {
                if (data57 !== null) {
                    this.setState({ g3Valve17DripMls: JSON.parse(data57) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3Valve18DripMls').then((data58) => {
                if (data58 !== null) {
                    this.setState({ g3Valve18DripMls: JSON.parse(data58) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g3Valve19DripMls').then((data59) => {
                if (data59 !== null) {
                    this.setState({ g3Valve19DripMls: JSON.parse(data59) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }
        //END

        //G4 ASYNC getItem
        try {
            AsyncStorage.getItem('g4SouthDripMls').then((data60) => {
                if (data60 !== null) {
                    this.setState({ g4SouthDripMls: JSON.parse(data60) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4SouthDripEC').then((data61) => {
                if (data61 !== null) {
                    this.setState({ g4SouthDripEC: JSON.parse(data61) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4SouthDripPh').then((data62) => {
                if (data62 !== null) {
                    this.setState({ g4SouthDripPh: JSON.parse(data62) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4SouthDrainMls').then((data63) => {
                if (data63 !== null) {
                    this.setState({ g4SouthDrainMls: JSON.parse(data63) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4SouthDrainEc').then((data64) => {
                if (data64 !== null) {
                    this.setState({ g4SouthDrainEc: JSON.parse(data64) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g4SouthDrainPh').then((data65) => {
                if (data65 !== null) {
                    this.setState({ g4SouthDrainPh: JSON.parse(data65) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4NorthDripMls').then((data66) => {
                if (data66 !== null) {
                    this.setState({ g4NorthDripMls: JSON.parse(data66) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4NorthDripEC').then((data67) => {
                if (data67 !== null) {
                    this.setState({ g4NorthDripEC: JSON.parse(data67) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4NorthDripPh').then((data68) => {
                if (data68 !== null) {
                    this.setState({ g4NorthDripPh: JSON.parse(data68) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4NorthDrainMls').then((data69) => {
                if (data69 !== null) {
                    this.setState({ g4NorthDrainMls: JSON.parse(data69) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4NorthDrainEC').then((data70) => {
                if (data70 !== null) {
                    this.setState({ g4NorthDrainEC: JSON.parse(data70) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g4NorthDrainPh').then((data71) => {
                if (data71 !== null) {
                    this.setState({ g4NorthDrainPh: JSON.parse(data71) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4Valve21DripMls').then((data72) => {
                if (data72 !== null) {
                    this.setState({ g4Valve21DripMls: JSON.parse(data72) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4Valve22DripMls').then((data73) => {
                if (data73 !== null) {
                    this.setState({ g4Valve22DripMls: JSON.parse(data73) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4Valve23DripMls').then((data74) => {
                if (data74 !== null) {
                    this.setState({ g4Valve23DripMls: JSON.parse(data74) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g4Valve24DripMls').then((data75) => {
                if (data75 !== null) {
                    this.setState({ g4Valve24DripMls: JSON.parse(data75) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        //END

        //G5 ASYNC getItem
        try {
            AsyncStorage.getItem('g5FirstDripMls').then((data76) => {
                if (data76 !== null) {
                    this.setState({ g5FirstDripMls: JSON.parse(data76) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5FirstDripEC').then((data77) => {
                if (data77 !== null) {
                    this.setState({ g5FirstDripEC: JSON.parse(data77) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5FirstDripPh').then((data78) => {
                if (data78 !== null) {
                    this.setState({ g5FirstDripPh: JSON.parse(data78) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }


            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5FirstDrainMls').then((data79) => {
                if (data79 !== null) {
                    this.setState({ g5FirstDrainMls: JSON.parse(data79) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5FirstDrainEc').then((data80) => {
                if (data80 !== null) {
                    this.setState({ g5FirstDrainEc: JSON.parse(data80) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g5FirstDrainPh').then((data81) => {
                if (data81 !== null) {
                    this.setState({ g5FirstDrainPh: JSON.parse(data81) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5SecondDripMls').then((data82) => {
                if (data82 !== null) {
                    this.setState({ g5SecondDripMls: JSON.parse(data82) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5SecondDripEC').then((data83) => {
                if (data83 !== null) {
                    this.setState({ g5SecondDripEC: JSON.parse(data83) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5SecondDripPh').then((data84) => {
                if (data84 !== null) {
                    this.setState({ g5SecondDripPh: JSON.parse(data84) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5SecondDrainMls').then((data85) => {
                if (data85 !== null) {
                    this.setState({ g5SecondDrainMls: JSON.parse(data85) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5SecondDrainEC').then((data86) => {
                if (data86 !== null) {
                    this.setState({ g5SecondDrainEC: JSON.parse(data86) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }


        try {
            AsyncStorage.getItem('g5SecondDrainPh').then((data87) => {
                if (data87 !== null) {
                    this.setState({ g5SecondDrainPh: JSON.parse(data87) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5Valve25DripMls').then((data88) => {
                if (data88 !== null) {
                    this.setState({ g5Valve25DripMls: JSON.parse(data88) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5Valve26DripMls').then((data89) => {
                if (data89 !== null) {
                    this.setState({ g5Valve26DripMls: JSON.parse(data89) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('g5Valve27DripMls').then((data90) => {
                if (data90 !== null) {
                    this.setState({ g5Valve27DripMls: JSON.parse(data90) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }


        //END

        //BORE READINGS

        try {
            AsyncStorage.getItem('bore1Hours').then((data91) => {
                if (data91 !== null) {

                    this.setState({ bore1Hours: JSON.parse(data91) });
                    this.setState({ isLoading: true })
                    console.log("BORE READINGS : " + this.state.bore1Hours);



                } else {

                    this.setState({ isLoading: false })


                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('bore1m3').then((data92) => {

                if (data92 !== null) {

                    this.setState({ bore1m3: JSON.parse(data92) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })


                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('electricity').then((data93) => {

                if (data93 !== null) {
                    this.setState({ electricity: JSON.parse(data93) });
                    this.setState({ isLoading: true })

                } else {

                    this.setState({ isLoading: false })


                }

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('Septicm3').then((data94) => {

                if (data94 !== null) {
                    this.setState({ Septicm3: JSON.parse(data94) });
                    this.setState({ isLoading: true })
                } else {

                    this.setState({ isLoading: false })

                }

            }).done();
        } catch (error) {
        }
        //END




    }

    //

    //SEND DATA BUTTON METHOD 
    sendData = () => {

        this.setState({ isLoading: true })


        //SEND DATA TO AWS

        this.getPromiseObject(
            'POST',
            ' https://gfed26lq0c.execute-api.ap-southeast-2.amazonaws.com/dev/v1/saveData',
            {
                siteName: this.state.siteName.toString(),
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
            },
            false,
        ).then((result) => {
            try {
                const res = result;
                console.log(res);

                realm.write(() => {
                    ID =
                        realm.objects('daily_readings_offline_table').sorted('entry_id', true).length > 0
                            ? realm.objects('daily_readings_offline_table').sorted('entry_id', true)[0]
                                .entry_id + 1
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

                //CLEAR ASYNC
                AsyncStorage.clear();
                this.setState({currentDate: '',
                dateYesterday: ''})
                AsyncStorage.removeItem('currentDate')
                AsyncStorage.removeItem('dateYesterday')
                AsyncStorage.removeItem('dayYesterday')
                AsyncStorage.removeItem('gas')
                AsyncStorage.removeItem('liquidCO2')
                AsyncStorage.removeItem('drainDischarge')
                AsyncStorage.removeItem('g1SouthDripMls')
                AsyncStorage.removeItem('g1SouthDripEC')
                AsyncStorage.removeItem('g1SouthDripPh')
                AsyncStorage.removeItem('g1SouthDrainMls')
                AsyncStorage.removeItem('g1SouthDrainEc')
                AsyncStorage.removeItem('g1SouthDrainPh')
                AsyncStorage.removeItem('g1NorthDripMls')
                AsyncStorage.removeItem('g1NorthDripEC')
                AsyncStorage.removeItem('g1NorthDripPh')
                AsyncStorage.removeItem('g1NorthDrainMls')
                AsyncStorage.removeItem('g1NorthDrainEC')
                AsyncStorage.removeItem('g1NorthDrainPh')
                AsyncStorage.removeItem('g1Valve1DripMls')
                AsyncStorage.removeItem('g1Valve2DripMls')
                AsyncStorage.removeItem('g1Valve4DripMls')
                AsyncStorage.removeItem('g2SouthDripMls')
                AsyncStorage.removeItem('g2SouthDripPh')
                AsyncStorage.removeItem('g2SouthDrainMls')
                AsyncStorage.removeItem('g2SouthDrainEc')
                AsyncStorage.removeItem('g2SouthDrainPh')
                AsyncStorage.removeItem('g2NorthDripMls')
                AsyncStorage.removeItem('g2NorthDripEC')
                AsyncStorage.removeItem('g2NorthDripPh')
                AsyncStorage.removeItem('g2NorthDrainMls')
                AsyncStorage.removeItem('g2NorthDrainEC')
                AsyncStorage.removeItem('g2NorthDrainPh')
                AsyncStorage.removeItem('g2Valve5DripMls')
                AsyncStorage.removeItem('g2Valve6DripMls')
                AsyncStorage.removeItem('g2Valve7DripMls')
                AsyncStorage.removeItem('g2Valve8DripMls')
                AsyncStorage.removeItem('g2Valve9DripMls')
                AsyncStorage.removeItem('g2Valve10DripMls')
                AsyncStorage.removeItem('g2Valve11DripMls')
                AsyncStorage.removeItem('g2Valve12DripMls')
                AsyncStorage.removeItem('g3SouthDripMls')
                AsyncStorage.removeItem('g3SouthDripEC')
                AsyncStorage.removeItem('g3SouthDripPh')
                AsyncStorage.removeItem('g3SouthDrainMls')
                AsyncStorage.removeItem('g3SouthDrainEc')
                AsyncStorage.removeItem('g3SouthDrainPh')
                AsyncStorage.removeItem('g3NorthDripMls')
                AsyncStorage.removeItem('g3NorthDripEC')
                AsyncStorage.removeItem('g3NorthDripPh')
                AsyncStorage.removeItem('g3NorthDrainMls')
                AsyncStorage.removeItem('g3NorthDrainEC')
                AsyncStorage.removeItem('g3NorthDrainPh')
                AsyncStorage.removeItem('g3Valve13DripMls')
                AsyncStorage.removeItem('g3Valve14DripMls')
                AsyncStorage.removeItem('g3Valve15DripMls')
                AsyncStorage.removeItem('g3Valve16DripMls')
                AsyncStorage.removeItem('g3Valve17DripMls')
                AsyncStorage.removeItem('g3Valve18DripMls')
                AsyncStorage.removeItem('g3Valve19DripMls')
                AsyncStorage.removeItem('g3Valve20DripMls')
                AsyncStorage.removeItem('g4SouthDripMls')
                AsyncStorage.removeItem('g4SouthDripEC')
                AsyncStorage.removeItem('g4SouthDripPh')
                AsyncStorage.removeItem('g4SouthDrainMls')
                AsyncStorage.removeItem('g4SouthDrainEc')
                AsyncStorage.removeItem('g4SouthDrainPh')
                AsyncStorage.removeItem('g4NorthDripMls')
                AsyncStorage.removeItem('g4NorthDripEC')
                AsyncStorage.removeItem('g4NorthDripPh')
                AsyncStorage.removeItem('g4NorthDrainMls')
                AsyncStorage.removeItem('g4NorthDrainEC')
                AsyncStorage.removeItem('g4NorthDrainPh')
                AsyncStorage.removeItem('g4Valve21DripMls')
                AsyncStorage.removeItem('g4Valve22DripMls')
                AsyncStorage.removeItem('g4Valve23DripMls')
                AsyncStorage.removeItem('g4Valve24DripMls')
                AsyncStorage.removeItem('g5FirstDripMls')
                AsyncStorage.removeItem('g5FirstDripEC')
                AsyncStorage.removeItem('g5FirstDripPh')
                AsyncStorage.removeItem('g5FirstDrainMls')
                AsyncStorage.removeItem('g5FirstDrainEc')
                AsyncStorage.removeItem('g5FirstDrainPh')
                AsyncStorage.removeItem('g5SecondDripMls')
                AsyncStorage.removeItem('g5SecondDripEC')
                AsyncStorage.removeItem('g5SecondDripPh')
                AsyncStorage.removeItem('g5SecondDrainMls')
                AsyncStorage.removeItem('g5SecondDrainEC')
                AsyncStorage.removeItem('g5SecondDrainPh')
                AsyncStorage.removeItem('g5Valve25DripMls')
                AsyncStorage.removeItem('g5Valve26DripMls')
                AsyncStorage.removeItem('g5Valve27DripMls')
                AsyncStorage.removeItem('bore1Hours')
                AsyncStorage.removeItem('bore1m3')
                AsyncStorage.removeItem('electricity')
                AsyncStorage.removeItem('Septicm3')

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
                })

                //
                this.props.navigation.navigate('DailyReadingsGER')
                Toast.show('Form Submitted successfully');
                //window.scrollTo(0, 0)
                this.setState({ isLoading: false })


            } catch (error) {
                console.log(error);
            }
        },
            function error(err) {
                if (!err)
                    err = 'Connection Refused (cors issue or server address not found)';
            },
        );




        //END


    }
    //

    goToTop = () => {
        this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    }

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
            )
        }

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
                                returnKeyType={"done"}
                                keyboardType={'numeric'}
                                ref={(input) => { this.drainDischarge = input; }}
                                blurOnSubmit={true}

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
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
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


