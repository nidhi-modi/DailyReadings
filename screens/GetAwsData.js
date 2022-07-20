import React, {useEffect, useState} from 'react';
import {useMutation, useLazyQuery} from '@apollo/client/react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import {GET_DAILY_READINGS} from '../graphql/queries';
import AsyncStorage from '@react-native-community/async-storage';

var loading = true;

export const GetAwsData = (props) => {
  const [dailyReadings, setDailyReadings] = useState([]);

  const [getQuery] = useLazyQuery(GET_DAILY_READINGS, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      loading = false;
      setDailyReadings(data?.user_registration);
      console.log('Data loaded from AWS ');

      try {
        AsyncStorage.setItem('@MySuperStore:readingsKey', JSON.stringify(data));
        console.log('Data saved in async');
      } catch (error) {
        // Error saving data
        //Close this screen
        loading = false;
        console.log(error);
      }

      //Close this screen
      loading = false;
      props.navigation.navigate('DailyReadingsGER');
    },
  });

  useEffect(() => {
    getQuery();
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        transparent={loading}
        animationType={'fade'}
        visible={loading}
        onRequestClose={() => {
          console.log('Not allowed to close');
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={loading}
              size="large"
              color="#1A8917"
            />
          </View>
        </View>
      </Modal>
      <View style={styles.marginSmallDimensionTop}></View>

      <View style={styles.marginSmallDimensionTop}></View>

      <View style={styles.marginSmallDimensionTop}></View>
      <Text style={styles.textBottom}>
        Getting data from the server{'\n'} Please wait...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9FF',
  },

  alignView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    margin: 6,
    margin: 20,
    fontSize: 30,
    color: '#2C3E50',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  headerImage1: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  headerImage2: {
    resizeMode: 'contain',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },

  textBottom: {
    fontSize: 18,
    paddingBottom: 20,
    color: '#2C3E50',
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  textContainer: {
    flexShrink: 1,
  },

  marginDimensionTop: {
    marginTop: 44,
  },

  marginSmallDimensionTop: {
    marginTop: 18,
  },

  containerView: {
    marginLeft: 95,
    marginRight: 95,
  },

  buttonContainer: {
    backgroundColor: '#2C3E50',
    borderRadius: 8,
    padding: 10,
    margin: 20,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    //fontStyle: 'italic'
  },

  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default GetAwsData;
