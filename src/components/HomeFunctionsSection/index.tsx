import React from "react";
import { TouchableOpacity } from "react-native";
import { Button, Div, Icon, Text } from "react-native-magnus";

function HomeFunctionsSection() {
  return (
    <Div alignItems="center" justifyContent="center" mt={15}>
      <Div w={"90%"} flexDir="row" justifyContent="space-between">
        <Div justifyContent="center" alignItems="center">
          <TouchableOpacity
            style={{
              backgroundColor: "#214168",
              padding: 12,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              name="bank-transfer"
              fontFamily="MaterialCommunityIcons"
              fontSize={40}
              color="white"
            />
          </TouchableOpacity>
          <Text color="white" mt={2}>Transfer</Text>
        </Div>

        <Div justifyContent="center" alignItems="center">
          <TouchableOpacity
            style={{
              backgroundColor: "#214168",
              padding: 12,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              name="barcode"
              fontFamily="AntDesign"
              fontSize={40}
              color="white"
            />
          </TouchableOpacity>
          <Text color="white" mt={2}>Payment</Text>
        </Div>


        <Div justifyContent="center" alignItems="center">
          <TouchableOpacity
            style={{
              backgroundColor: "#214168",
              padding: 12,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              name="plussquareo"
              fontFamily="AntDesign"
              fontSize={40}
              color="white"
            />
          </TouchableOpacity>
          <Text color="white" mt={2}>Loan</Text>
        </Div>

      </Div>
    </Div>
  );
}

export default HomeFunctionsSection;
