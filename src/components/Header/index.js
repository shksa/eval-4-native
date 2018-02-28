import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import './Header.css';

const styles = {
  header: {
    flex: 1,
    height: 80,
    backgroundColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
  },
  headerLeftText: {
    marginLeft: 40,
  },
  headerRightText: {
    marginRight: 40,
  },
};

function Header(props) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerLeftText}>Quizzy</Text>
    </View>
  );
}

export default Header;

