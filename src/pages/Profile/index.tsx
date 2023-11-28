import React, { useState, useContext } from "react";

import { useNavigation } from "@react-navigation/native";
import { Div, Text} from "react-native-magnus";

export default function Profile() {
  const navigation = useNavigation();

  return (
    <Div flex={1} pt={50}>
        <Text>Profile Page</Text>
    </Div>
  );
}
