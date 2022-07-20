import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  useEffect,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

var houseSelected;

export default class SiteSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showRealApp: false,
      selected: '',
    };
  }

  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    navigate('NewScreen');
  };

  handleBackButton = () => {
    BackHandler.exitApp();
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    try {
      AsyncStorage.getItem('house')
        .then((text1Value) => {
          houseSelected = JSON.parse(text1Value);
          this.setState({selected: text1Value});

          if (houseSelected === 'HAR') {
            //CHANGE THE SCREEN NAME
            this.props.navigation.navigate('DailyReadingsGER');
          } else if (houseSelected === 'GER') {
            this.props.navigation.navigate('DailyReadingsGER');
          } else if (houseSelected === 'OHA') {
            //CHANGE THE SCREEN NAME
            this.props.navigation.navigate('DailyReadingsGER');
          } else if (houseSelected === 'FAV') {
            //CHANGE THE SCREEN NAME
            this.props.navigation.navigate('DailyReadingsGER');
          } else {
          }
        })
        .done();
    } catch (error) {}
  }

  harAlertButton = () => {
    Alert.alert(
      'Are you sure ?',
      'It cannot be changed',
      [
        {
          text: 'Yes',
          onPress: () =>
            this.props.navigation.navigate('ScreenNavigator', {site1: 'HAR'}),
        },
        {
          text: 'No',
          onPress: () => console.log('No button clicked'),
          style: 'cancel',
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  gerAlertButton = () => {
    Alert.alert(
      'Are you sure ?',
      'It cannot be changed',
      [
        {
          text: 'Yes',
          onPress: () =>
            this.props.navigation.navigate('ScreenNavigator', {site1: 'GER'}),
        },
        {
          text: 'No',
          onPress: () => console.log('No button clicked'),
          style: 'cancel',
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  favAlertButton = () => {
    Alert.alert(
      'Are you sure ?',
      'It cannot be changed',
      [
        {
          text: 'Yes',
          onPress: () =>
            this.props.navigation.navigate('ScreenNavigator', {site1: 'FAV'}),
        },
        {
          text: 'No',
          onPress: () => console.log('No button clicked'),
          style: 'cancel',
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  ohaAlertButton = () => {
    Alert.alert(
      'Are you sure ?',
      'It cannot be changed',
      [
        {
          text: 'Yes',
          onPress: () =>
            this.props.navigation.navigate('ScreenNavigator', {site1: 'OHA'}),
        },
        {
          text: 'No',
          onPress: () => console.log('No button clicked'),
          style: 'cancel',
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/background2.png')}
          style={styles.backgroundImage}>
          <View style={styles.alignView}>
            <ScrollView>
              <Text style={styles.text}>What site are you from ? </Text>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.harAlertButton}>
                <Text style={styles.buttonText}>HAR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.gerAlertButton}>
                <Text style={styles.buttonText}>GER</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.favAlertButton}>
                <Text style={styles.buttonText}>FAV</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.ohaAlertButton}>
                <Text style={styles.buttonText}>OHA</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#54B948',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 20,
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#ebebeb',
  },

  alignView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 19,
    color: '#000000',
    fontWeight: 'bold',
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 70,
    height: 70,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  TouchableOpacityStyle2: {
    alignItems: 'center',
    justifyContent: 'center',
    right: 5,
  },

  FloatingButtonStyle2: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
  },

  textInputStyle: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'transparent',
  },
  text2: {
    color: '#0B5345',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 18,
    marginRight: 15,
  },

  text: {
    margin: 6,
    margin: 20,
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
});
//export default SiteSelection
