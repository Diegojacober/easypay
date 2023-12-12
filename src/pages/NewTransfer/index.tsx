import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Div, Input, Text } from "react-native-magnus";
import Header from "../../components/Header";
import Currency from "../../components/Currency";
import useAuthStore from "../../stores/useAuthStore";
import useFetchAccount from "../../queries/account";
import {
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Toast from "react-native-toast-message";
import api from "../../services/api";

export default function NewTransfer() {
  const [account] = useAuthStore((state) => [state.account]);
  const { data } = useFetchAccount(account?.numero);
  const [value, setValue] = useState<number | null>();
  const [toAccount, setToAccount] = useState<string>("");

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });


  const handleTransfer = async () => {
    if (toAccount == "" || value == null || value <= 0.01 || toAccount.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'Dados incorretos',
      });
    } else {
      api.post(`/v1/transferencias/`, {
        "to_account_id": toAccount,
        value
      }).then((resp) => {
        if (resp.data.message == "ok") {
          setValue(null)
          setToAccount("")
          Toast.show({
            type: 'success',
            text1: 'Transferência efetuada com sucesso',
          });
        }
      }).catch((err) => {
        if (err.response.status == 404) {
          Toast.show({
            type: 'error',
            text1: 'Conta não encontrada',
          });
        }
      })
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Div flex={1} pt={50} bg="darkblue" alignItems="center">
        <Div w={"95%"}>
          <Header />
          <Div pb={5} borderBottomWidth={1} borderBottomColor="white">
            <Text color="white">
              Total balance: {formatter.format(data?.saldo)}
            </Text>
          </Div>

          <Div mt={50}>
            <Div>
              <Text color="white" fontSize={16} mb={15}>
                Value:
              </Text>
              <Input
                borderBottomColor="white"
                borderTopColor="#000"
                keyboardType="numeric"
                fontWeight="800"
                h={50}
                onChangeText={setValue}
                value={value}
                mb={20}
              />
            </Div>

            <Div mt={35}>
              <Div pb={5} borderBottomWidth={1} borderBottomColor="white">
                <Text
                  color="white"
                  textTransform="uppercase"
                  fontWeight="bold"
                  fontSize={14.5}
                >
                  Who will receive:
                </Text>
              </Div>

              <Div mt={15}>
                <Text color="white" fontSize={13} mb={5}>
                  INSTITUTE:
                </Text>
                <Input
                  borderBottomColor="white"
                  borderTopColor="#000"
                  keyboardType="numeric"
                  h={50}
                  fontWeight="500"
                  fontSize={13}
                  mb={20}
                  editable={false}
                  selectTextOnFocus={false}
                  value="EASYPAY BANK LTDA."
                  bg="#CCC"
                />
              </Div>

              <Div flexDir="row" w={"100%"} style={{ gap: 10 }}>
                <Div mt={15} flex={1}>
                  <Text color="white" fontSize={13} mb={5}>
                    AGENCY:
                  </Text>
                  <Input
                    borderBottomColor="white"
                    borderTopColor="#000"
                    keyboardType="numeric"
                    h={50}
                    fontWeight="500"
                    fontSize={15}
                    mb={20}
                    editable={false}
                    selectTextOnFocus={false}
                    value="0001"
                    textAlign="center"
                    bg="#CCC"
                  />
                </Div>

                <Div mt={15} flex={2}>
                  <Text color="white" fontSize={13} mb={5}>
                    NUMBER:
                  </Text>
                  <Input
                    borderBottomColor="white"
                    borderTopColor="#000"
                    keyboardType="numeric"
                    h={50}
                    fontWeight="500"
                    fontSize={13}
                    mb={20}
                    onChangeText={setToAccount}
                    value={toAccount}
                    maxLength={8}
                  />
                </Div>
              </Div>
              <Button mt={50} bg="lightblue" onPress={handleTransfer} borderless>
                <Text fontSize={16} fontWeight="500" color="white" w={"100%"} textAlign="center">
                  Send money
                </Text>
              </Button>
            </Div>
          </Div>
        </Div>
      </Div>
    </TouchableWithoutFeedback>
  );
}
