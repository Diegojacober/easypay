import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { AuthContext } from '../contexts/auth'

import AuthRoutes from './auth.routes';

function Routes(){

  return(
    <AuthRoutes/>
  )
}

export default Routes;