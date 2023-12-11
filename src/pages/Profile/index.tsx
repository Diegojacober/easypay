import React, { useState, useContext } from "react";

import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Div,
  Icon,
  Image,
  Input,
  Modal,
  Text,
} from "react-native-magnus";
import useAuthStore from "../../stores/useAuthStore";
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import api from "../../services/api";
export default function Profile() {
  const navigation = useNavigation();

  const [logout, user, account] = useAuthStore((state) => [
    state.logout,
    state.user,
    state.account,
  ]);
  const [visible, setVisible] = useState<boolean>(false);

  const openModal = () => {
    setVisible(true);
  };

  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    user && user?.url_image
  );

  const gallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUrl(result.assets[0].uri);
      let ext = result.assets[0].uri.split("ImagePicker/")[1].split(".")[1]
      if (ext == "jpeg" || ext == "webp" || ext == "png" || ext == "jpg") {
        const formData = new FormData();
        formData.append('url_image', {
          uri: result.assets[0].uri,
          type: 'image/jpeg', // ou 'image/png' dependendo do formato
          name: 'profile.jpg', // ou 'profile.png'
        });
        api.patch("/user/me/", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((resp) => {
          Toast.show({
            type: "success",
            text1: "Imagem atualizada com sucesso"
          })
          setAvatarUrl(result.assets[0].uri);
          return
        }).catch(err => {
          console.log(Object.keys(err))
          console.log(err.message)
          console.log(err.request)
          console.log(err.name)
          Toast.show({
            type: "error",
            text1: "Erro inesperado"
          })
        })
      } else {
        Toast.show({
          type: "error",
          text1: "Imagem inválida"
        })
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Div flex={1} pt={50} bg="darkblue" alignItems="center">
        <Div w={"95%"} alignItems="center" pt={30}>
          <TouchableOpacity
            style={{
              width: 90,
              height: 90,
              borderRadius: 50,
              position: "absolute",
              top: 28,
              zIndex: 1,
            }}
            onPress={gallery}
          ></TouchableOpacity>
          <Image
            w={85}
            h={85}
            rounded="circle"
            source={{
              uri:
                avatarUrl === null
                  ? `https://ui-avatars.com/api/?background=random&name=${user?.first_name} ${user?.last_name}`
                  : avatarUrl,
            }}
          />
        </Div>

        <Text
          color="white"
          fontWeight="600"
          fontSize={16}
          mt={10}
          textTransform="uppercase"
        >
          {user?.first_name} {user?.last_name}
        </Text>

        <TouchableOpacity
          style={{
            marginTop: 15,
            backgroundColor: "#3883BB",
            borderRadius: 4,
            paddingHorizontal: 20,
            paddingVertical: 12,
          }}
          onPress={openModal}
        >
          <Text
            fontSize={16}
            fontWeight="500"
            color="white"
            w={"70%"}
            textAlign="center"
          >
            See account details
          </Text>
        </TouchableOpacity>

        <Modal isVisible={visible} h={"50%"}>
          <Div mt={20} px={10}>
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
              Account Details
            </Text>

            <Div mt={10}>
              <Div>
                <Text color="#7e7e7e" fontSize={12}>
                  Institute:
                </Text>
                <Input
                  borderBottomColor="white"
                  borderTopColor="#000"
                  keyboardType="numeric"
                  fontWeight="800"
                  h={50}
                  mb={5}
                  editable={false}
                  selectTextOnFocus={false}
                  value="EASYPAY BANK LTDA."
                  bg="#CCC"
                />
              </Div>

              <Div>
                <Div flexDir="row" w={"100%"} style={{ gap: 10 }}>
                  <Div mt={5} flex={1}>
                    <Text color="#7e7e7e" fontSize={12} mb={5}>
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

                  <Div mt={5} flex={2}>
                    <Text color="#7e7e7e" fontSize={12} mb={5}>
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
                      maxLength={8}
                      editable={false}
                      selectTextOnFocus={false}
                      value={account?.numero}
                      bg="#CCC"
                    />
                  </Div>
                </Div>
              </Div>

              <Div>
                <Text color="#7e7e7e" fontSize={12}>
                  NAME:
                </Text>
                <Input
                  borderBottomColor="white"
                  borderTopColor="#000"
                  fontWeight="800"
                  h={50}
                  mb={5}
                  editable={false}
                  selectTextOnFocus={false}
                  value={`${user?.first_name} ${user?.last_name}`}
                  bg="#CCC"
                />
              </Div>

              <Div>
                <Text color="#7e7e7e" fontSize={12}>
                  CPF:
                </Text>
                <Input
                  borderBottomColor="white"
                  borderTopColor="#000"
                  keyboardType="numeric"
                  fontWeight="800"
                  h={50}
                  mb={5}
                  editable={false}
                  selectTextOnFocus={false}
                  value={user?.cpf}
                  bg="#CCC"
                />
              </Div>
            </Div>
          </Div>
        </Modal>
      </Div>
    </TouchableWithoutFeedback>
  );
}
