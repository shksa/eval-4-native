import React from 'react';
import { connect } from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import * as actions from '../../redux/actions';
import './LeaderBoard.css';

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topPlayersArray: [],
    };
  }
  componentDidMount = () => {
    fetch('/getTop5Users', {
      method: 'GET',
    })
      .then(res => res.json())
      .then((array) => {
        console.log(array);
        this.setState({
          topPlayersArray: array,
        });
      });
  }

  handlePlayAgain = () => {
    this.props.dispatchGoToLogin();
  }

  render() {
    const { score } = this.props.scoreDetails;
    const { numQuestions } = this.props.scoreDetails;
    console.log(score, numQuestions);
    const topPlayers = this.state.topPlayersArray;
    console.log(topPlayers);
    const topPlayerDivs = topPlayers.map((player, idx) => (
      <View className="playerBar">
        <Text>{`${idx + 1}. ${player.userName}`}</Text>
        <Text>{player.score}</Text>
      </View>
    ));
    return (
      <View className="leaderboard">
        <View className="score">
          <Text style={{ color: 'orange', fontSize: '25px' }}>Your score</Text>
          <View className="scoreDigits">
            <Text style={{ color: 'black', fontSize: '45px' }}>{score}</Text>
            <Text style={{ color: 'black', fontSize: '25px', fontStyle: 'bold' }} >{`/${numQuestions}`}</p>
          </View>
        </View>
        <View className="listing">
          <View className="leaderboardHeader">
            <Text>Leaderboard</Text>
          </View>
          {topPlayerDivs}
        </View>
        <View className="playButtonArea">
          <Button className="playAgainButton" onClick={this.handlePlayAgain}>
            <Text>playAgain</Text>
          </Button>
        </View>

      </View>
    );
  }
}

function mapDispatchToprops(dispatch) {
  return {
    dispatchGoToLogin: () => dispatch(actions.goToLogin()),
  };
}

function mapStateToProps(state) {
  return {
    scoreDetails: state.updater.scoreDetails,
  };
}

export default connect(mapStateToProps, mapDispatchToprops)(LeaderBoard);
