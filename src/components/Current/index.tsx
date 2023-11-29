import React, { createRef, useState } from "react";
import {
  TouchableOpacity,
} from "react-native";
import { Button, Div, Icon, Input, Modal, Snackbar, Text } from "react-native-magnus";
import Toast from "react-native-toast-message";
import api from "../../services/api";

interface ICurrentComponentProps {
  numeroConta: string;
  idConta: number;
  saldo: number;
}

function Current({ numeroConta, idConta, saldo }: ICurrentComponentProps) {
  const [quantity, setQuantity] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const snackbarRef = createRef();

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const openModal = () => {
    setQuantity("");
    setVisible(true);
  };

  const handleAddSaldo = () => {
    if (parseFloat(quantity) <= 0.00 || parseFloat(quantity) > 999.99) {
      if (snackbarRef.current) {
        snackbarRef.current.show(
          "O valor deve ser maior que R$ 0,00 e menor que R$ 999,99",
          {
            duration: 5000,
            suffix: <Icon
              name="frowno"
              color="white"
              fontSize="lg"
              fontFamily="AntDesign"
            />
          }
        );
      }
    } else {
      api.post(`/v1/accounts/${idConta}/depositar/`, {
        value: parseFloat(quantity),
      }).then((resp) => {
        if (resp.status == 200 || resp.status == 201) {
          setVisible(false)
          Toast.show({
            type: 'success',
            text1: 'Saldo inserido com sucesso!',
        });
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }

  return (
    <Div mt={5}>
      <Text color="gray500" fontSize={12}>
        Total balance
      </Text>
      <Div row alignItems="center">
        <Text color="white" fontSize={22} fontWeight="600" mr={7}>
          {formatter.format(saldo)}
        </Text>
        <TouchableOpacity onPress={openModal}>
          <Icon name="pluscircleo" color="gray300" fontSize={14} />
        </TouchableOpacity>
      </Div>
      <Div w={"100%"} h={1} mt={4} bg="white"></Div>

      <Modal isVisible={visible}>
        <Div mt={40} px={10}>
          <Button
            bg="gray400"
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
            <Icon color="gray800" name="closecircle" fontSize={18} />
          </Button>
          <Text fontSize={20} w={"80%"} color="lightblue" fontWeight="300">
            Quanto deseja adicionar a conta?
          </Text>

          <Input
            placeholder="Valor"
            mt={110}
            placeholderTextColor={"blue"}
            borderBottomColor="white"
            borderTopColor="#000"
            h={50}
            w={"95%"}
            onChangeText={setQuantity}
            mb={50}
            keyboardType="number-pad"
          />

          <TouchableOpacity style={{backgroundColor: "#3883BB", borderRadius: 8, padding: 10}} onPress={handleAddSaldo}>
            <Text fontSize={18} color="white" textAlign="center">
              Adicionar Saldo
            </Text>
          </TouchableOpacity>
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

export default Current;
