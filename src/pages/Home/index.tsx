import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Div, Text } from "react-native-magnus";
import Header from "../../components/Header";
import useAuthStore from "../../stores/useAuthStore";

export default function Home() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState<boolean>(false);

  const [getUser, accessToken] = useAuthStore(
    (state) => [
      state.getUser,
      state.accessToken
    ]
  );

  useEffect(() => {
    function loadUser() {
      setLoading(true)
      getUser(accessToken)
      setLoading(false)
    }
    loadUser()
  },[])

  if (loading) {
    return (
        <Div flex={1} pt={50} bg="darkblue" alignItems="center" justifyContent="center">
            <ActivityIndicator size={70} color={"#3883BB"} />
        </Div>
    )
}

  return (
    <Div flex={1} pt={50} bg="darkblue" alignItems="center">
      <Div w={'95%'}>
        <Header />
        <Text color="white" fontSize={20}>Home Page</Text>
      </Div>

    </Div>
  );
}
