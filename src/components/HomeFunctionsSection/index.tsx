import React, { useState, createRef } from "react";
import { TouchableOpacity } from "react-native";
import { Button, Div, Icon, Modal, Radio, Snackbar, Text } from "react-native-magnus";
import { useNavigation } from "@react-navigation/native";
import Slider from '@react-native-community/slider';

function HomeFunctionsSection() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState<boolean>(false);
  const snackbarRef = createRef();
  const [value, setValue] = useState<number>(0);

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const openModal = () => {
    setVisible(true);
  };


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
            onPress={() => navigation.navigate("NewTransfer")}
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
            onPress={openModal}
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

      <Modal isVisible={visible} bg="darkblue">
        <Div mt={40} px={10}>
          <Button
            bg="lightblue"
            h={48}
            w={48}
            mt={-10}
            position="absolute"
            right={15}
            rounded="circle"
            onPress={() => {
              setVisible(false);
            }}
          >
            <Icon color="blue" name="closecircle" fontSize={18} />
          </Button>

          <Div mt={80} alignItems="center" justifyContent="center">
            <Text fontSize={18} color="white" fontWeight="300">
              Quanto deseja emprestar?
            </Text>

            <Text color="white" fontWeight="800" fontSize={23}>{formatter.format(value)}</Text>

            <Slider
              style={{ width: 320, height: 55 }}
              minimumValue={0}
              maximumValue={10000}
              onValueChange={(newValue: number) => setValue(newValue)}
              value={value}
              minimumTrackTintColor='#3883BB'
              maximumTrackTintColor='#DDD'
              thumbTintColor='#fff'
            />

            <Div m="lg">
              <Radio.Group row style={{flexWrap: "wrap", width: 300, gap: 15}}>
                {["12", "24", "36", "48"].map((item) => (
                  <Radio key={item} value={item} w={125}>
                    {({ checked }) => (
                      <Div  w={70} h={70} alignItems="center" justifyContent="center"
                        bg={checked ? "lightblue" : "darkblue"}
                        borderWidth={1}
                        borderColor="lightblue"
                        px="xl"
                        py="md"
                      >
                        <Text color={checked ? "white" : "lightblue"} fontWeight="600">{item}</Text>
                      </Div>
                    )}
                  </Radio>
                ))}
              </Radio.Group>
            </Div>
          </Div>

          <Div alignItems="center" mt={45}>
            <TouchableOpacity style={{ backgroundColor: "#3883BB", borderRadius: 8, padding: 10, width: '70%' }}>
              <Text fontSize={16} color="white" textAlign="center">
                Solicitar Empréstimo
              </Text>
            </TouchableOpacity>
          </Div>
        </Div>

        <Snackbar
          ref={snackbarRef}
          bg="#f00"
          color="white"
        />
      </Modal>
    </Div>
  );
}

export default HomeFunctionsSection;
