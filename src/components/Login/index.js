import { connect } from 'react-redux';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import './Login.css';
import * as actions from '../../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }
  handleOnChange = (event) => {
    this.setState({ userName: event.target.value });
  }
  handleLoginClick = () => {
    fetch(
      '/login',
      {
        method: 'POST',
        body: JSON.stringify({
          userName: this.state.userName,
          dummy: 'xyz',
        }),
      },
    )
      .then(res => res.json())
      .then((json) => {
        this.props.dispatchSetUserDetails(json.userDetails);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View className="loginArea">
        <View className="loginBox">
          <View className="loginWelcomeBox">
            <Text>Welcome</Text>
            <Text>to</Text>
            <Text>Quizzy</Text>
          </View>
          <View className="loginInputBox">
            <Text>Login</Text>
            <Text>Username</Text>
            <TextInput
              className="userNameField"
              type="text"
              value={this.state.userName}
              onChange={this.handleOnChange}
            />
            <Button
              className="loginButton"
              onClick={this.handleLoginClick}
            >Login
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchSetUserDetails: userDetails => dispatch(actions.setUserDetails(userDetails)),
  };
}

export default connect(null, mapDispatchToProps)(Login);

