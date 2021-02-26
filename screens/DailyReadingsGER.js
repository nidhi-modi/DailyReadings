import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Image, ImageBackground, LayoutAnimation, Platform, UIManager, TextInput, BackHandler, Alert, LogBox } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Realm from 'realm';
import moment from 'moment'
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';


var houseSelected;

export default class DailyReadingsGER extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showRealApp: false,
            selected: '',
            visibility: false,
            expandedG1: false,
            expandedG2: false,
            expandedG3: false,
            expandedG4: false,
            expandedG5: false,

            dateYesterday: '',
            dayYesterday: '',
            gas: '',
            liquidCO2: '',
            drainDischarge: '',

        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }

    }

    changeLayout1 = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        if (this.state.expandedG1) {
            this.setState({
                expandedG1: !this.state.expandedG1,
                expandedG2: this.state.expandedG2,
                expandedG3: this.state.expandedG3,
                expandedG4: this.state.expandedG4,
                expandedG5: this.state.expandedG5,
            });

        } else if (this.state.expandedG2) {

            this.setState({
                expandedG1: !this.state.expandedG1,
                expandedG2: !this.state.expandedG2,
                expandedG3: this.state.expandedG3,
                expandedG4: this.state.expandedG4,
                expandedG5: this.state.expandedG5,
            });

        }
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


        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);


    }

    //METHOD FOR GETTING ASYNC VALUES

    getAsyncValues = () => {

        console.log("CALLING ASYNC METHOD ......");

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
                console.log("DAY : " + this.state.dayYesterday);

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('gas').then((data3) => {
                this.setState({ gas: JSON.parse(data3) });
                console.log("GAS : " + this.state.gas);

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('liquidCO2').then((data4) => {
                this.setState({ liquidCO2: JSON.parse(data4) });
                console.log("LIQUID CO2 : " + this.state.liquidCO2);

            }).done();
        } catch (error) {
        }
        try {
            AsyncStorage.getItem('drainDischarge').then((data5) => {
                this.setState({ drainDischarge: JSON.parse(data5) });
                console.log("DRAIN DISCHARGE : " + this.state.drainDischarge);

            }).done();
        } catch (error) {
        }


    }

    //

    //SEND DATA BUTTON METHOD 
    sendData = () => {




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
                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout1} style={styles.Btn}>
                                <View style={styles.alignTextView}>

                                    <Text style={styles.btnText}>GER 1</Text>
                                    <Image style={{
                                        resizeMode: "cover",
                                        marginRight: 5

                                    }} source={require('../assets/down_arrow.png')} />


                                </View>
                            </TouchableOpacity>
                            <View style={{ height: this.state.expandedG1 ? null : 0, overflow: 'hidden' }}>
                                <Text style={styles.text}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    It has survived not only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                                    containing Lorem Ipsum passages, and more recently with desktop publishing software
                                    like Aldus PageMaker including versions of Lorem Ipsum.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.marginDimensionTop}></View>

                        <View>
                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout2} style={styles.Btn}>
                                <View style={styles.alignTextView}>

                                    <Text style={styles.btnText}>GER 2</Text>
                                    <Image style={{
                                        resizeMode: "cover",
                                        marginRight: 5

                                    }} source={require('../assets/down_arrow.png')} />


                                </View>
                            </TouchableOpacity>
                            <View style={{ height: this.state.expandedG2 ? null : 0, overflow: 'hidden' }}>
                                <Text style={styles.text}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    It has survived not only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                                    containing Lorem Ipsum passages, and more recently with desktop publishing software
                                    like Aldus PageMaker including versions of Lorem Ipsum.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.marginDimensionTop}></View>

                        <View>
                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout3} style={styles.Btn}>
                                <View style={styles.alignTextView}>

                                    <Text style={styles.btnText}>GER 3</Text>
                                    <Image style={{
                                        resizeMode: "cover",
                                        marginRight: 5

                                    }} source={require('../assets/down_arrow.png')} />


                                </View>
                            </TouchableOpacity>
                            <View style={{ height: this.state.expandedG3 ? null : 0, overflow: 'hidden' }}>
                                <Text style={styles.text}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    It has survived not only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                                    containing Lorem Ipsum passages, and more recently with desktop publishing software
                                    like Aldus PageMaker including versions of Lorem Ipsum.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.marginDimensionTop}></View>

                        <View>
                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout4} style={styles.Btn}>
                                <View style={styles.alignTextView}>

                                    <Text style={styles.btnText}>GER 4</Text>
                                    <Image style={{
                                        resizeMode: "cover",
                                        marginRight: 5

                                    }} source={require('../assets/down_arrow.png')} />


                                </View>
                            </TouchableOpacity>
                            <View style={{ height: this.state.expandedG4 ? null : 0, overflow: 'hidden' }}>
                                <Text style={styles.text}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    It has survived not only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                                    containing Lorem Ipsum passages, and more recently with desktop publishing software
                                    like Aldus PageMaker including versions of Lorem Ipsum.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.marginDimensionTop}></View>

                        <View>
                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout5} style={styles.Btn}>
                                <View style={styles.alignTextView}>

                                    <Text style={styles.btnText}>GER 5</Text>
                                    <Image style={{
                                        resizeMode: "cover",
                                        marginRight: 5

                                    }} source={require('../assets/down_arrow.png')} />


                                </View>
                            </TouchableOpacity>
                            <View style={{ height: this.state.expandedG5 ? null : 0, overflow: 'hidden' }}>
                                <Text style={styles.text}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    It has survived not only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                                    containing Lorem Ipsum passages, and more recently with desktop publishing software
                                    like Aldus PageMaker including versions of Lorem Ipsum.
                                </Text>
                            </View>
                        </View>
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


