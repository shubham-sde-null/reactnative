import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import SelectDropDown from './SelectDropDown';
// import SelectBox from 'react-native-multi-selectbox';
// import SelectBox from 'react-native-multi-selectbox';
import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {valueChanged} from '../redux/action';
import {addData} from '../redux/action';
// import {v4 as uuidv4} from 'uuid';
import uuid from 'react-native-uuid';
import axios from 'axios';
//this is used to find the width of the screen
let width = Dimensions.get('window').width;
export default function AddResource(props) {
  const [designationProp, setDesignationProp] = useState('');
  const dispatch = useDispatch();
  const initialValues = {
    username: '',
    email: '',
    password: '',
    repassword: '',
  };
  // function onChange() {
  //   return val => setDesignationProp(val);
  // }
  //this useState hook will store the object which has the user register details
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  //these are the useEffects which will run when there is change in usename, email, password and repassword
  useEffect(() => {}, [setFormValues]);
  useEffect(() => {}, [setFormValues]);
  useEffect(() => {}, [setFormValues]);
  useEffect(() => {}, [setFormValues]);
  //this will work when the user click on the register
  const handleSubmit = () => {
    setFormErrors(validate(formValues));

    setIsSubmit(true);
    const dataToAdd = {
      id: uuid.v4(),
      ...formValues,
      today: '10hr',
      billable: '0hr',
      nonbillable: '0hr',
    };
    axios.post(
      'https://repulsive-leotard-fly.cyclic.app/addresource',
      dataToAdd,
    );
    dispatch(
      addData(
        dataToAdd.id,
        formValues.username,
        formValues.email,
        designationProp,
        formValues.password,
        dataToAdd.today,
        dataToAdd.billable,
        dataToAdd.nonbillable,
      ),
    );
    dispatch(valueChanged(1));
    props.navigation.navigate('Resource Detail');
    // console.log('resource added', formValues, designationProp);
  };
  useEffect(() => {
    console.log(formErrors);

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log('form values got printed', formValues);
      console.log('resource added successfully');
    }
    // this is used to diable the required values in the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);
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
    //I am using the designationProps because I am storting the it in the useState
    else if (!designationProp) {
      errors.designation = 'Please select the designation';
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
      <Text style={styles.addResource}>Add Resource</Text>
      <Text style={styles.addResourceSub}>
        Enter your new resource detail here
      </Text>
      <TextInput
        placeholder="Full Name"
        style={styles.inputText}
        onChangeText={text => {
          setFormValues({...formValues, username: text.toString()});
          // console.log('the register page', formValues);
        }}
      />
      <TextInput
        placeholder="Email"
        style={styles.inputText}
        onChangeText={text => {
          setFormValues({...formValues, email: text.toString()});
          // console.log('the register page', formValues);
        }}
      />
      {/* I am using the library for the select drop down custom select is giving duplcate results  */}
      <SelectDropDown setDesignationProp={setDesignationProp} />
      {/* <SelectBox
        label="Select single"
        options={options}
        value={designationProp}
        onChange={onChange()}
        hideInputFilter={true}
      /> */}

      <TextInput
        placeholder="Password"
        style={styles.inputText}
        secureTextEntry={true}
        onChangeText={text => {
          setFormValues({...formValues, password: text.toString()});
          // console.log('the register page', formValues);
        }}
      />
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
    </View>
  );
}
const styles = StyleSheet.create({
  registerCont: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    alignItems: 'center',
  },

  addResource: {
    fontSize: 25,
    fontWeight: '500',
    alignSelf: 'flex-start',
    color: '#352a1d',
    paddingLeft: 10,
    marginTop: 25,
  },
  addResourceSub: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    color: '#352a1d',
    marginBottom: 25,
  },
  inputText: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'lightgrey',
    width: width * 0.94,
    height: 45,
    marginBottom: 30,
    borderRadius: 15,
    backgroundColor: 'white',

    paddingLeft: 15,
    // elevation: 2,
  },
  buttonCont: {
    width: width * 0.94,
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
});
