import { blankState } from './state';

function reducer(state, action) {
  let draftState;
  switch (action.type) {
    case 'SET_USER':
      draftState = {
        ...state,
        user: action.payload,
      };
      break;
    case 'UNSET_USER':
      draftState = {
        ...state,
        user: blankState.user,
      };
      break;
    default:
      throw new Error();
  }
  localStorage.setItem('state', JSON.stringify(draftState));
  return draftState;
}

export default reducer;
