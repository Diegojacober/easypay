import React from "react";
import { Div, Image, Text } from "react-native-magnus";

type Transfer = {
  id: number;
  date: string;
  type: string;
  value: number;
  name: string;
};

interface ITransferCard {
  transfer: Transfer;
}

function TransferCard({ transfer }: ITransferCard) {
  return (
    <Div flexDir="row" mb={10} alignItems="center">
      <Image
        resizeMode="contain"
        h={50}
        w={50}
        mt={5}
        source={transfer.type == "sender" ? require("../../../assets/sender-img.png") : require("../../../assets/receive-img.png")}
        mr={10}
        
      />
      <Text color="white">
        {transfer.type == "sender"
          ? `- R$ ${transfer.value}`
          : `+ R$ ${transfer.value}`}
      </Text>
    </Div>
  );
}

export default TransferCard;
