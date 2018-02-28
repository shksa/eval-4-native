import { connect } from 'react-redux';
import React from 'react';
import './App.css';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Header from './components/Header';
import Login from './components/Login';
import Questions from './components/Questions';
import LeaderBoard from './components/Lederboard';

const styles = {
  app: {
    display: flex,
    flexDirection: column,
    flex: 1,
  }
}

class App extends React.Component {

  render() {
    let page = null;
    if (this.props.view === 0) {
      page = <Login />;
    } else if (this.props.view === 1) {
      page = <Questions />;
    } else {
      page = <LeaderBoard />;
    }
    return (
      <div style={styles.app}>
        <Header />
        {page}
      </div>
    );
  }
}

function mapPropsToState(state) {
  return {
    view: state.updater.view,
  };
}

export default connect(mapPropsToState, null)(App);

