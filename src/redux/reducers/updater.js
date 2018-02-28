const defaultState = {
  userDetails: {},
  scoreDetails: {},
  view: 0,
};

function updater(state = defaultState, action) {
  switch (action.type) {
    case 'CHANGE_VIEW': {
      console.log(action.payload);
      return {
        ...state,
        view: action.payload,
      };
    }

    case 'SET_USER_DETAILS': {
      console.log('inside recuder', action.payload);
      return {
        ...state,
        userDetails: action.payload,
        view: 1,
      };
    }

    case 'SET_USER_SCORE': {
      console.log('SETT SCORE REDUCER', action.payload);
      return {
        ...state,
        scoreDetails: action.payload,
        view: 2,
      };
    }

    case 'GO_TO_LOGIN': {
      return {
        ...state,
        view: 0,
      };
    }

    default:
      return state;
  }
}

export default updater;

