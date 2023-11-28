import React, { useState, useContext } from "react";

import { useNavigation } from "@react-navigation/native";
import { Button, Div, Icon, Text } from "react-native-magnus";
import useAuthStore from "../../stores/useAuthStore";

export default function Profile() {
  const navigation = useNavigation();

  const [logout] = useAuthStore(
    (state) => [
      state.logout,
    ]
  );

  const handleLogout = () => {
    logout()
  }

  return (
    <Div flex={1} pt={50}>
      <Text>Profile Page</Text>
      <Button bg="red" h={50} w={50} rounded="circle" onPress={handleLogout}>
        <Icon name="logout" color="white" fontSize={18}/>
      </Button>
    </Div>
  );
}
