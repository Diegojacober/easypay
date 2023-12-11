import React, { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { Button, Div, Text} from "react-native-magnus";
import CardComponent from "../../components/CardComponent";
import Header from "../../components/Header";
import api from "../../services/api";
import Toast from "react-native-toast-message";

type CardType = {
  id: number
  cvv: number
  cardNumber: string
  cardName: string
  date: string
}

export default function Card() {
  const [cardData, setCardData] = useState<CardType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const formatDate = (unformattedDate: string) => {
    const date = new Date(unformattedDate);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${month}/${year}`;
  }

  useEffect(() => {
    async function getCard() {
      api.get('/v1/cartoes/listar-cartoes/')
      .then(resp => {
        setCardData({
          cardName: resp.data[0].nome,
          cardNumber: resp.data[0].numero,
          cvv: resp.data[0].cvv,
          date: formatDate(resp.data[0].data_exp),
          id: resp.data[0].id
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
    getCard()
  }, []);


  const askCard = async () => {
    setLoading(true)
    api.get('/v1/cartoes/solicitar-cartao')
    .then(resp => {
      setCardData({
        cardName: resp.data.nome,
        cardNumber: resp.data.numero,
        cvv: resp.data.cvv,
        date: formatDate(resp.data.data_exp),
        id: resp.data.id
      })
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
      Toast.show({
        type: 'error',
        text1: 'Não foi possível solicitar um cartão no momento',
        text2: 'Por favor, tente mais tarde!'
      });
      setLoading(false)
    })
  }

  return (
    <Div flex={1} pt={50} bg="darkblue" alignItems="center">
        <Div w={"95%"}>
          <Header />

          <Div mt={30}>
            <Div borderBottomColor="gray400" borderBottomWidth={1} pb={3}>
              <Text color="white">My cards:</Text>
            </Div>

            <Div alignItems="center">
              {cardData !== null ? (
                 <CardComponent card={cardData}/>
              ) : (
                <Div mt={15}>
                  <Button w={150} onPress={askCard} disabled={loading}>
                  <Text color="white">Pedir cartão</Text>
                </Button>
                </Div>
              )}
            </Div>
          </Div>
        </Div>
    </Div>
  );
}
