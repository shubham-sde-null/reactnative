import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
export default function Logout(props) {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Login');
    }, 0);
  }, []);

  // props.navigation.navigate('Login');
  return (
    <View style={styles.logoutCont}>
      <View style={styles.logoutInner}>
        <Text style={styles.logoutText}>Logout Successful</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  logoutCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutInner: {
    width: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    // borderWidth: 1,
    borderColor: 'rgba(128,128,128,0.3)',
    // elevation: 2,
  },
  logoutText: {
    backgroundColor: '#2ecc71',
    fontWeight: '500',
    fontSize: 18,
    padding: 10,
    color: 'white',
    borderRadius: 5,
    elevation: 5,
  },
});
