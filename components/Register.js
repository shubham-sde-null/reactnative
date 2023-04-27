import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Dimensions,
  Alert,
} from 'react-native';
import React from 'react';
import {valueChanged} from '../redux/action';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
//this is used to find the width of the screen
let width = Dimensions.get('window').width;

export default function Register(props) {
  const dispatch = useDispatch();
  //this function will check whether the user enterd values are correct or not, this function is used for the validation of the data
  const dataIsCorrect = values => {
    if (values.password !== values.repassword) {
      return false;
    }
    if (
      values.username !== '' &&
      values.email !== '' &&
      values.password !== ''
    ) {
      return true;
    }
    return false;
  };
  //here I am not using the setState to store the four values i.e username, email, password and the repassword instead I am using the object
  const initialValues = {
    username: '',
    email: '',
    password: '',
    repassword: '',
  };
  //this useState hook will store the object which has the user register details
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSumbit, setIsSubmit] = useState(false);
  //these are the useEffects which will run when there is change in usename, email, password and repassword
  useEffect(() => {}, [setFormValues]);
  useEffect(() => {}, [setFormValues]);
  useEffect(() => {}, [setFormValues]);
  useEffect(() => {}, [setFormValues]);
  //this will work when the user clicks on the register
  const handleSubmit = () => {
    // here all the user inputs will be validated and then only user can go to the next step i.e login screen
    // console.log('the form values I got is', formValues);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if (formValues.password !== formValues.repassword) {
      Alert.alert(
        'Passwords are not matching',
        'The Password confirmation does not match',
        [{text: 'Close', onPress: () => console.log('password error')}],
      );
      // console.warn('re entered password is not matching');
    }
    if (dataIsCorrect(formValues)) {
      const userInfoToAdd = {
        ...formValues,
      };
      axios.post(
        'https://repulsive-leotard-fly.cyclic.app/registeruser',
        userInfoToAdd,
      );
      // console.warn('registeration successful');
      setFormValues({
        username: '',
        email: '',
        password: '',
        repassword: '',
      });
      props.navigation.navigate('Login');
      dispatch(valueChanged(1));
    }
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSumbit) {
      console.log('form values got printed', formValues);
    }
  }, [formErrors]);
  //this function is used for the validation like the email is proper or not the password length is correct or not and some other validations
  const validate = values => {
    const errors = {};
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!values.username) {
      errors.username = 'Username is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    if (!values.repassword) {
      errors.repassword = 'Re-enter the password';
    } else if (values.password.length < 4) {
      errors.password = 'Password length must be more then 4 characters';
    } else if (values.password.length > 10) {
      errors.password = 'Password length must be less then 10 characters';
    }
    return errors;
  };
  return (
    <View style={styles.registerCont}>
      <Text style={styles.registerHere}>Create Admin Account</Text>
      <TextInput
        placeholder="Full Name"
        style={styles.inputText}
        onChangeText={text => {
          setFormValues({...formValues, username: text.toString()});
          // console.log('the register page', formValues);
        }}
      />
      {formErrors.username ? (
        <View style={styles.formErrorCont}>
          <Text style={styles.textError}>{formErrors.username}</Text>
        </View>
      ) : null}

      <TextInput
        placeholder="Email"
        style={styles.inputText}
        onChangeText={text => {
          setFormValues({...formValues, email: text.toString()});
          // console.log('the register page', formValues);
        }}
      />
      {formErrors.email ? (
        <View style={styles.formErrorCont}>
          <Text style={styles.textError}>{formErrors.email}</Text>
        </View>
      ) : null}
      <TextInput
        placeholder="Password"
        style={styles.inputText}
        secureTextEntry={true}
        onChangeText={text => {
          setFormValues({...formValues, password: text.toString()});
          // console.log('the register page', formValues);
        }}
      />
      {formErrors.password ? (
        <View style={styles.formErrorCont}>
          <Text style={styles.textError}>{formErrors.password}</Text>
        </View>
      ) : null}
      <TextInput
        placeholder="Re-enter Password"
        style={styles.inputText}
        secureTextEntry={true}
        onChangeText={text => {
          setFormValues({...formValues, repassword: text.toString()});
          // console.log('the register page', formValues);
        }}
      />
      <TouchableHighlight style={styles.buttonCont}>
        <Text style={styles.registerText} onPress={handleSubmit}>
          Register
        </Text>
      </TouchableHighlight>
      <View style={styles.registerFooter}>
        <Text style={styles.registerFooterText}>
          By Registering, you confirm that you accept
          <Text style={{color: 'orange'}}> Terms of Use</Text>
          <Text style={styles.registerFooterText}> And </Text>
          <Text style={{color: 'orange'}}>Privacy Policy</Text>
        </Text>
      </View>
      <Text style={styles.alreadyAccount}>
        Already have an account?{' '}
        <Text
          style={styles.alreadyAccount}
          onPress={() => props.navigation.navigate('Login')}>
          Login here
        </Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  registerCont: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    // justifyContent: 'center',
    alignItems: 'center',
  },

  registerHere: {
    fontSize: 25,
    marginTop: 65,
    fontWeight: '500',
    marginBottom: 65,
    color: '#484747',
  },
  inputText: {
    fontSize: 16,
    // borderWidth: 0.3,
    borderColor: 'black',
    width: width * 0.9,
    height: 45,
    marginBottom: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 3,
    paddingLeft: 15,
  },
  buttonCont: {
    width: 380,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    backgroundColor: '#352a1d',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
  registerText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 19,
  },
  registerFooter: {
    marginTop: 25,
    maerginBottom: 25,
  },
  registerFooterText: {
    fontSize: 14,
    // margin: 5,
    paddingBottom: 15,
  },
  alreadyAccount: {
    fontWeight: '500',
    fontSize: 15,
    marginTop: 25,
  },
  formErrorCont: {
    width: width * 0.9,
    marginTop: -20,
    marginBottom: 5,
    paddingLeft: 5,
  },
  textError: {
    color: 'red',
    // marginTop: -20,
    alignSelf: 'flex-start',
  },
});
