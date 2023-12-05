import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Div, Text} from "react-native-magnus";
import Header from "../../components/Header";
import Currency from "../../components/Currency";
import useAuthStore from "../../stores/useAuthStore";

export default function NewTransfer() {
  const navigation = useNavigation();

  const [ account ] = useAuthStore((state) => [
    state.account,
  ]);

    return (
        <Div flex={1} pt={50} bg="darkblue" alignItems="center">
            <Div w={"95%"}>
                <Header />
                <Text color="white">{account?.saldo}</Text>
            </Div>
        </Div>
    )
}
