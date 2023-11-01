import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login';
import Register from '../pages/Register';

const AuthStack = createNativeStackNavigator();

function AuthRoutes(){
  return(
    <AuthStack.Navigator>
      <AuthStack.Screen 
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{
            headerShown: false,
            animation: 'fade'
          }}
      />
    </AuthStack.Navigator>
  )
}

export default AuthRoutes;