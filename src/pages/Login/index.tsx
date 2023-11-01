import React, { useState, useContext } from "react";

import { useNavigation } from "@react-navigation/native";
import { Div, Text, Image, Input, Icon, Button } from "react-native-magnus";
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Div flex={1} bg="darkblue" alignItems="center" pt={50}>
        {/* Logo */}
        <Div>
          <Image
            resizeMode="contain"
            mt={50}
            h={130}
            w={130}
            mb={"6xl"}
            source={require("../../../assets/logo.png")}
          />
        </Div>

        <Div w={"85%"} bg="white" h={450} alignItems="center">
          <Text color="#000" fontSize="bigText100" fontWeight="500" mt={15}>
            Login
          </Text>

          <Div mt={50}>
            <Input
              placeholder="E-mail"
              placeholderTextColor={"darkblue"}
              borderBottomColor="white"
              borderTopColor="#000"
              h={50}
              w={"80%"}
              onChangeText={setEmail}
              suffix={
                <Icon name="mail" color="lightblue" fontFamily="Feather" />
              }
              mb={20}
            />

            <Input
              placeholder="Password"
              secureTextEntry
              placeholderTextColor={"darkblue"}
              borderBottomColor="white"
              borderTopColor="#000"
              h={50}
              w={"80%"}
              onChangeText={setPassword}
              suffix={
                <Icon name="lock" color="lightblue" fontFamily="Feather" />
              }
              mb={20}
            />

            <Button mt="lg" bg="lightblue" borderless>
              <Text fontSize={16} color="white" w={"78%"} textAlign="center">
                Login
              </Text>
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{marginTop: 10}}>
              <Text color="lightblue">Create an account</Text>
            </TouchableOpacity>
          </Div>
        </Div>
      </Div>
    </TouchableWithoutFeedback>
  );
}
