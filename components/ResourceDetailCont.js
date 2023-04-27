import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Currency from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuIcon from 'react-native-vector-icons/Feather';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {deleteData} from '../redux/action';
import {useDispatch, useSelector} from 'react-redux';
import UpdateDropDown from './UpdateDropDown';
import {updateData} from '../redux/action';
let width = Dimensions.get('window').width;
// import DrawerNavigation from './DrawerNavigation';
export default function ResourceDetailCont(props) {
  //this functionaliy is for the modal
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const userPresent = useSelector(state => state.addData);
  const [allResourceData, setAllResourceData] = useState([]);
  //this funtion will delete the resource from the resources
  const removeResource = async id => {
    await axios.delete(
      `https://repulsive-leotard-fly.cyclic.app/allresource/${id}`,
    );
    // const newResourceList = allResourceData.filter((resource) => {
    //   return resource.id !== id;
    // });
    // setAllResourceData(newResourceList);
    dispatch(deleteData(id));
  };
  useEffect(() => {
    //   const retriveData = async () => {
    //     const response = await axios.get(
    //       "https://repulsive-leotard-fly.cyclic.app/allresource"
    //     );
    //     setAllResourceData(response.data);
    //     console.log("the resource is", allResourceData);
    //   };
    //   // retriveData();
    setAllResourceData(userPresent);
  }, [userPresent]);
  //update the data in the modal
  const [updateUsername, setUpdateUsername] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updateDesignation, setUpdateDesignation] = useState('');
  const [currentId, setCurrentId] = useState('');
  const [updatePassword, setUpdatePassword] = useState('');
  const [updateToday, setUpdateToday] = useState('');
  const [updateBillable, setUpdateBillable] = useState('');
  const [updateNonBillable, setUpdateNonBillable] = useState('');
  // const dataSet = [
  //   {
  //     username: 'Bhushan Kumar',
  //     email: 'Bhushan@gmail.com',
  //     today: '10hr',
  //     billable: '0',
  //     nonbillable: '0',
  //     designation: 'Partner',
  //   },
  //   {
  //     username: 'Bhushan Kumar',
  //     email: 'Bhushan@gmail.com',
  //     today: '10hr',
  //     billable: '0',
  //     nonbillable: '0',
  //     designation: 'Partner',
  //   },
  // ];
  //here I am going to update the function
  const editHandler = item => {
    setShowModal(true);
    setUpdateUsername(item.username);
    setUpdateEmail(item.email);
    setUpdateDesignation(item.designation);
    setCurrentId(item.id);
    setUpdatePassword(item.password);
    setUpdateToday(item.today);
    setUpdateBillable(item.billable);
    setUpdateNonBillable(item.nonbillable);
  };
  const updateHandler = async () => {
    setShowModal(false);
    const updateValues = {
      username: updateUsername,
      email: updateEmail,
      designation: updateDesignation,
    };
    await axios.put(
      `https://repulsive-leotard-fly.cyclic.app/allresource/${currentId}`,
      updateValues,
    );
    dispatch(
      updateData(
        currentId,
        updateUsername,
        updateEmail,
        updateDesignation,
        updatePassword,
        updateToday,
        updateBillable,
        updateNonBillable,
      ),
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.navbar}>
        <MenuIcon
          name="menu"
          style={{fontSize: 20, color: 'black', fontWeight: '500'}}
          onPress={() => {
            props.navigation.openDrawer();
          }}
        />
        <Text style={styles.navbarLogo}>
          RESOLÜT &nbsp;<Text style={{fontWeight: '400'}}>MOBILE</Text>
        </Text>
      </View>

      <Text
        style={{
          fontSize: 22,
          color: '#836b4c',
          marginTop: 20,
          marginBottom: 20,
          fontWeight: '500',
          marginLeft: 5,
        }}>
        Resources
      </Text>
      <FlatList
        data={allResourceData}
        // data={dataSet}
        renderItem={({item}) => (
          <View style={styles.resourceCont}>
            <View style={styles.resTop}>
              <View style={styles.resLeft}>
                <Text style={styles.name}>
                  {item.username}&nbsp;-&nbsp;{item.designation}
                </Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
              <View style={styles.resRight}>
                <View style={styles.iconsTop}>
                  <Icon
                    name="pencil-alt"
                    style={{fontSize: 16, color: '#836b4c'}}
                    onPress={() => {
                      editHandler(item);
                      // console.warn('edit resource');
                    }}
                  />
                </View>
                <View style={styles.iconsTop}>
                  <Icon1
                    name="delete"
                    style={{fontSize: 16, color: '#836b4c'}}
                    onPress={() => removeResource(item.id)}
                  />
                </View>
                {/* <Text style={styles.iconsTop}>E</Text>
                <Text style={styles.iconsTop}>D</Text> */}
              </View>
            </View>
            <View style={styles.resBottom}>
              <View style={styles.resOne}>
                <View style={styles.iconsTop2}>
                  <Icon1
                    name="calendar"
                    style={{fontSize: 18, color: '#352a1d'}}
                  />
                </View>
                <View style={styles.resCommon}>
                  <Text style={{color: '#707478'}}>Today</Text>
                  <Text style={styles.icons}>10Hr</Text>
                </View>
              </View>
              <View style={styles.resTwo}>
                <View style={styles.iconsTop2}>
                  <Icon name="coins" style={{fontSize: 18, color: '#352a1d'}} />
                </View>

                <View style={styles.resCommon}>
                  <Text style={{color: '#707478'}}>Billable</Text>
                  <Text style={styles.icons}>0Hr</Text>
                </View>
              </View>
              <View style={styles.resThree}>
                <View style={styles.iconsTop2}>
                  <Currency
                    name="currency-usd-off"
                    style={{fontSize: 18}}
                    color="#352a1d"
                  />
                </View>

                <View style={styles.resCommon}>
                  <Text style={{color: '#707478'}}>Non-Billable</Text>
                  <Text style={styles.icons}>0Hr</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      {/* this is for the edit it will open the modal on when clicked on the edit button  */}
      <Modal transparent={true} visible={showModal} style={styles.modalCont}>
        <View style={styles.modalDataCont}>
          <View style={styles.modalData}>
            <Text style={styles.placeHolderText}>Username:</Text>
            <TextInput
              placeholder="username"
              style={styles.inputText}
              value={updateUsername}
              onChangeText={text => setUpdateUsername(text)}
            />
            <Text style={styles.placeHolderText}>Email:</Text>
            <TextInput
              placeholder="email"
              style={styles.inputText}
              value={updateEmail}
              onChangeText={text => setUpdateEmail(text)}
            />
            <Text style={styles.placeHolderText}>Designation:</Text>
            <UpdateDropDown
              designationReceived={updateDesignation}
              updateDesignation={setUpdateDesignation}
            />

            {/* <TextInput placeholder="designation" style={styles.inputText} /> */}
            <View style={styles.modalButton}>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                }}>
                <Text style={[styles.btn, {backgroundColor: '#ff6348'}]}>
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  updateHandler();
                }}>
                <Text style={[styles.btn, {backgroundColor: '#2ed573'}]}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  resourceCont: {
    // flex: 1,
    backgroundColor: '#f2f0ec',
    // backgroundColor: '#f8f0e6',
    // backgroundColor: '#f8ddbe',
    gap: 20,
    // borderWidth: 1,
    borderRadius: 15,
    margin: 5,
    borderColor: 'rgba(0,0,0,0.2)',
    padding: 8,
    marginBottom: 15,
    elevation: 1,
  },
  resTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  resBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  resLeft: {
    gap: 10,
  },
  resRight: {
    gap: 5,
  },
  resOne: {
    flexDirection: 'row',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    gap: 5,
    backgroundColor: '#e5e1da',
    minWidth: 110,
  },
  resTwo: {
    flexDirection: 'row',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    gap: 5,
    backgroundColor: '#e5e1da',
    minWidth: 110,
  },
  resThree: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    gap: 5,
    backgroundColor: '#e5e1da',
  },
  resCommon: {
    // borderWidth: 1,
    // borderColor: 'red',
  },
  name: {
    fontSize: 20,
    color: '#836b4c',
    fontWeight: '500',
  },
  email: {
    backgroundColor: 'white',
    color: '#836b4c',
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  icons: {
    color: '#836b4c',
    fontWeight: '500',
    // borderWidth: 1,
    // borderColor: 'black',
    textAlign: 'center',
  },
  iconsTop: {
    fontSize: 50,
    color: '#836b4c',
    fontWeight: '500',
    backgroundColor: '#cccaca',
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 5,
  },
  iconsTop2: {
    fontSize: 50,
    color: '#836b4c',
    fontWeight: '500',
    backgroundColor: '#cccaca',
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 5,
  },
  modalCont: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDataCont: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalData: {
    width: width * 0.9,
    // height: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    paddingTop: 25,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  inputText: {
    fontSize: 16,
    // borderWidth: 0.3,
    borderColor: 'black',
    width: width * 0.85,
    height: 40,
    marginBottom: 32,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
    paddingLeft: 15,
  },
  btn: {
    fontSize: 18,
    fontWeight: '500',
    // borderWidth: 1,
    borderRadius: 11,
    paddingLeft: 11,
    paddingRight: 11,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'white',
  },
  placeHolderText: {
    width: width * 0.85,
    marginLeft: 10,
    marginBottom: 5,
  },
  navbar: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  navbarLogo: {
    flex: 1,
    // borderColor: 'black',
    // borderWidth: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 1,
    color: '#836b4c',
  },
});
