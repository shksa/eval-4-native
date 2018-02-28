import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Questions.css';
import QuestionBox from '../QuestionBox';
import * as actions from '../../redux/actions';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsArray: [],
      userResponsesObj: {},
    };
  }

  componentDidMount = () => {
    fetch(
      '/getQuestionsFromDb',
      {
        method: 'GET',
      },
    )
      .then(res => res.json())
      .then((json) => {
        if (json.records.length === 0) {
          fetch(
            '/insertQuestionsToDbAndGet',
            {
              method: 'GET',
            },
          )
            .then(res => res.json())
            .then((jsonRecords) => {
              this.setState({
                questionsArray: jsonRecords.records,
              });
            });
        } else {
          this.setState({
            questionsArray: json.records,
          });
          const { userName } = this.props.userDetails;
          fetch(
            `/getUserResponses/${userName}`,
            {
              method: 'GET',
            },
          )
            .then(res => res.json())
            .then((jsonResp) => {
              if (jsonResp.responses === null) {
                console.log('no responses yet');
              } else {
                this.setState({
                  userResponsesObj: jsonResp.responses,
                });
              }
            });
        }
      });
  }

  updateUserResponses = (newUserResponses) => {
    console.log('inside updateUserResponses');
    console.log(newUserResponses);
    this.setState({
      userResponsesObj: { ...this.state.userResponsesObj, ...newUserResponses },
    });
  }

  handleSubmit = () => {
    const allOptions = Object.keys(this.state.userResponsesObj);
    const numQuestions = this.state.questionsArray.length;
    const { userName } = this.props.userDetails;
    if (allOptions.length === numQuestions) {
      fetch(`/calculateUserScoreAndGet/${userName}`)
        .then(resp => resp.json())
        .then((json) => {
          console.log(json);
          this.props.dispatchSetUserScore({ score: json.score, numQuestions });
        });
    }
  }

  render() {
    console.log('newglobal response');
    const { questionsArray } = this.state;
    const { userResponsesObj } = this.state;
    console.log(userResponsesObj);
    const questionBoxes = questionsArray.map(qObj => (
      <QuestionBox
        key={qObj.questionId}
        qObj={qObj}
        userResponses={userResponsesObj}
        updateUserResponses={this.updateUserResponses}
        userName={this.props.userDetails.userName}
      />
    ));
    return (
      <div className="questionsArea">
        {questionBoxes}
        <button onClick={this.handleSubmit}>submit</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userDetails: state.updater.userDetails,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchSetUserScore: scoreDetails => dispatch(actions.setUserScore(scoreDetails)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

