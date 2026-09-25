import { createContext, useContext } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const currentUser = useTracker(() => ({
      user: Meteor.user(),
      isLoggingIn: Meteor.loggingIn(),
    }));

  return (
    <UserContext.Provider value={currentUser}>
      {children}
    </UserContext.Provider>
  );
}

export const useCurrentUser = () => {
    return useContext(UserContext);
}