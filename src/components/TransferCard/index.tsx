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
  // account?.id !== transferencia.to_account_id ? 'sender' : 'receiver'
  return (
    <Div flexDir="row">
      <Image
        resizeMode="contain"
        mt={40}
        h={50}
        w={50}
        mb={"6xl"}
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