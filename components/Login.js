import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Dimensions,
  Alert,
  StatusBar,
} from 'react-native';
import {valueChanged} from '../redux/action';
import {useSelector, useDispatch} from 'react-redux';
import React, {useEffect} from 'react';
import {useState} from 'react';
import axios from 'axios';
import {fetchProducts} from '../redux/action';
//this is used to find the width of the screen
let width = Dimensions.get('window').width;

export default function Login(props) {
  //these are used to handle the redux hooks for getting the data and dispatching the data
  const dataInRedux = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    // console.log(dataInRedux);
  }, []);
  //these are the state to store the email and the password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [info, setInfo] = useState([]);
  //this useEffect hook will run if there is change in email, password, or the data in the redux changes
  // useEffect(() => {
  //   const retriveData = async () => {
  //     const response = await fetch(
  //       'https://repulsive-leotard-fly.cyclic.app/users',
  //     );
  //     response = await response.json();
  //     setInfo(response.data);
  //     console.log(info);

  //     // console.log(info);
  //   };
  //   retriveData();
  // }, [email, password, dataInRedux]);
  useEffect(() => {
    const retriveData = async () => {
      const response = await axios.get(
        'https://repulsive-leotard-fly.cyclic.app/users',
      );
      setInfo(response.data);
      // console.log(info);

      // console.log(info);
    };
    retriveData();
  }, [email, dataInRedux]);
  //the use of these useEffect is to capture the all characters because last character was missing without the useEffect hook
  // useEffect(() => {
  //   // console.log('the useeffect email', email);
  // }, [email]);
  // useEffect(() => {
  //   // console.log('the useeffect password', password);
  // }, [password]);
  //once the user clicks on the login button then they will get the message like the user is valid or invalid
  const handleSubmit = () => {
    const userPresent = info.filter(data => {
      return data.email === email && data.password === password;
    });
    // console.log('the current user is', userPresent);
    if (userPresent.length >= 1) {
      // console.warn('login Successful');
      // props.navigation.navigate('Add Resource');
      props.navigation.navigate('Add Resource');
    } else {
      Alert.alert(
        'Invalid User',
        'Either email or password is not matching, please enter correct credentials.',
        [{text: 'Close', onPress: () => console.log('closed')}],
      );
      // console.warn("User doesn't exists");
    }
    dispatch(valueChanged(1));
  };
  return (
    <View style={styles.loginCont}>
      <Text style={styles.logo}>
        RESOLÜT <Text style={{fontWeight: '300'}}>MOBILE</Text>
      </Text>
      <Text style={styles.loginHere}>Login Here</Text>
      <TextInput
        placeholder="Email"
        style={styles.inputText}
        onChangeText={text => {
          setEmail(text.toString());
        }}
      />
      <TextInput
        placeholder="Password"
        style={styles.inputText}
        secureTextEntry={true}
        onChangeText={text => {
          setPassword(text.toString());
        }}
      />
      <TouchableHighlight style={styles.buttonCont}>
        <Text style={styles.loginText} onPress={handleSubmit}>
          Login
        </Text>
      </TouchableHighlight>
      <View style={styles.loginFooter}>
        <Text style={styles.loginFooterText}>
          Do Not Have Resource Account?
          <Text
            style={{color: 'orange'}}
            onPress={() => props.navigation.navigate('Create Account')}>
            Contact Your Administrator
          </Text>
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  loginCont: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 25,
    marginTop: 85,
    marginBottom: 85,
    fontWeight: '500',
    color: '#352a1d',
    letterSpacing: 1,
  },
  loginHere: {
    fontSize: 25,
    marginBottom: 35,
    fontWeight: '500',
    marginBottom: 55,
    color: '#484747',
  },
  inputText: {
    fontSize: 16,
    // borderWidth: 0.3,
    borderColor: 'black',
    width: width * 0.9,
    height: 40,
    marginBottom: 32,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
    paddingLeft: 15,
  },
  buttonCont: {
    width: 380,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    backgroundColor: '#352a1d',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
  loginText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 19,
  },
  loginFooter: {
    flex: 1,

    justifyContent: 'flex-end',
  },
  loginFooterText: {
    fontSize: 14,
    // margin: 5,
    paddingBottom: 15,
  },
});
