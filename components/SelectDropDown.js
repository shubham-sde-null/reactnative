import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
let width = Dimensions.get('window').width;
export default function SelectDropDown(props) {
  const [designation, setDesignation] = useState('Select Designation');
  const [selected, setSelected] = useState(false);
  // const selectedPressed = () => {
  //   setSelected(true);
  //   setDesignation('Select Designation');
  //   props.setDesignationProp(designation);

  // };
  // const Associate = () => {
  //   setSelected(false);
  //   setDesignation('Associate');
  //   props.setDesignationProp(designation);
  // };
  // const Partner = () => {
  //   setSelected(false);
  //   setDesignation('Partner');
  //   props.setDesignationProp(designation);
  // };
  return (
    <View style={styles.selectCont}>
      <TouchableHighlight
        style={styles.buttonCont}
        onPress={() => setSelected(!selected)}
        underlayColor="lightgrey">
        <View style={styles.selectTextCont}>
          <Text style={styles.registerTextPlaceholder}>{designation}</Text>
          <Icon name="caretright" />
          {/* <Text style={styles.registerTextPlaceholder}>&gt;</Text> */}
        </View>
      </TouchableHighlight>
      {selected ? (
        <View style={{paddingBottom: 15}}>
          <TouchableHighlight
            style={styles.buttonCont}
            onPress={() => {
              setSelected(false);
              setDesignation('Associate');
              props.setDesignationProp('Associate');
            }}
            underlayColor="lightgrey">
            <Text style={styles.registerText}>Associate</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonCont}
            onPress={() => {
              setSelected(false);
              setDesignation('Partner');
              props.setDesignationProp('Partner');
            }}
            underlayColor="lightgrey">
            <Text style={styles.registerText}>Partner</Text>
          </TouchableHighlight>
        </View>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  selectCont: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 30,
    // elevation: 3,
    backgroundColor: 'transparent',
  },
  selectTextCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.94,
    height: 45,
    alignItems: 'center',
    borderRadius: 20,

    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonCont: {
    width: width * 0.94,
    borderRadius: 20,
    // backgroundColor: '#352a1d',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderColor: 'lightgrey',
    borderWidth: 1,
  },
  selectOptionCont: {
    flex: 1,
    backgroundColor: 'yellow',
  },

  registerText: {
    fontWeight: '300',
    fontSize: 16,
    color: 'black',
  },
  registerTextPlaceholder: {
    color: 'grey',
    fontSize: 16,
  },
});
