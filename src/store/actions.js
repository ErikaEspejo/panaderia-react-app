export function updateUser(dispatch, payload) {
  dispatch({
    type: 'SET_USER',
    payload,
  });
}

export function resetUser(dispatch) {
  dispatch({
    type: 'UNSET_USER',
  });
}
