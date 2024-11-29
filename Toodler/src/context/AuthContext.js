import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return { ...state, userToken: action.token, isLoading: false };
    case 'SIGN_IN':
      return { ...state, isSignout: false, userToken: action.token };
    case 'SIGN_OUT':
      return { ...state, isSignout: true, userToken: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const authContext = React.useMemo(
    () => ({
      signIn: async (token) => {
        dispatch({ type: 'SIGN_IN', token });
      },
      signOut: () => {
        dispatch({ type: 'SIGN_OUT' });
      },
      restoreToken: async (token) => {
        dispatch({ type: 'RESTORE_TOKEN', token });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ state, authContext }}>
      {children}
    </AuthContext.Provider>
  );
}
