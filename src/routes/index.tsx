import React, { useContext } from 'react';
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F4FF' }}>
                <ActivityIndicator size={'large'} color={"#131313"} />
            </View>
        )
    }

    return (
      isAuthenticated ? <AppRoutes/> : <AuthRoutes />
    )
}

export default Routes;