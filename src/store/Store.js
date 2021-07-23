import React, { useContext, useReducer } from 'react';
import reducer from './reducer';
import initialState from './state';
import { resetUser, updateUser } from './actions';

const Store = React.createContext({});

export const useStore = () => useContext(Store);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    login: (payload) => updateUser(dispatch, payload),
    updateUser: (payload) => updateUser(dispatch, payload),
    logout: () => resetUser(dispatch),
  };

  const selectors = {
    user: state.user,
  };

  return (
    <Store.Provider
      value={{
        selectors,
        actions,
      }}
    >
      {children}
    </Store.Provider>
  );
}

export default Store;
