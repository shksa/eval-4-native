export const changeView = viewNum => ({
  type: 'CHANGE_VIEW',
  payload: viewNum,
});

export const setUserDetails = userDetails => ({
  type: 'SET_USER_DETAILS',
  payload: userDetails,
});

export const setUserScore = scoreDetails => ({
  type: 'SET_USER_SCORE',
  payload: scoreDetails,
});

export const goToLogin = () => ({
  type: 'GO_TO_LOGIN',
});
