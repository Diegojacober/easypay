import React from 'react';
import { View, ActivityIndicator } from 'react-native';


import AuthRoutes from './auth.routes';
import useAuthStore from '../stores/useAuthStore';
import AppRoutes from './app.routes';

function Routes(){

  const [isAuthenticated, loading] = useAuthStore(
    (state) => [
      state.isAuthenticated,
      state.loading
    ]
  );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#101F36' }}>
                <ActivityIndicator size={'large'} color={"#3883BB"} />
            </View>
        )
    }

    return (
      isAuthenticated ? <AppRoutes/> : <AuthRoutes />
    )
}

export default Routes;