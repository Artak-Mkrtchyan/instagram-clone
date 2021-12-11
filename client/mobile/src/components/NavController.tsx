import React from 'react';
import { AuthNavigation } from 'src/navigation/AuthNavigation';
import { MainNavigation } from 'src/navigation/MainNavigation';

import { useIsLoggedIn, useLogUserIn, useLogUserOut } from '../AuthContext';

export const NavController = () => {
  const isLoggedIn = useIsLoggedIn();
  const logUserIn = useLogUserIn();
  const logUserOut = useLogUserOut();

  return isLoggedIn ? <MainNavigation /> : <AuthNavigation />;
};
