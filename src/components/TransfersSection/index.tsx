import React from "react";
import { Div, Text } from "react-native-magnus";

import useAuthStore from "../../stores/useAuthStore";
import TransferCard from "../TransferCard";
import { FlatList } from "react-native";
import { Transfer } from "../../queries/transfers/types";

interface ITransfersSectionProps {
  transfers: Transfer[];
}

function TransfersSection({ transfers }: ITransfersSectionProps) {
  const [account] = useAuthStore((state) => [state.account]);

  return (
    <Div mt={25}>
      <Text color="white" fontSize={16} fontWeight="700" mb={4}>
        Recent activity
      </Text>

      {transfers?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          data={transfers}
          renderItem={({ item }) => (
            <TransferCard
              key={item.id}
              transfer={{
                id: item.id,
                type:
                  account?.id !== item.to_account_id ? "sender" : "receiver",
                value: item.value,
                date: item.created_at,
                name: ` ${item.to_account.agencia}  ${item.to_account.numero}`,
              }}
            />
          )}
        />
      ) : (
        <Text color="gray500" fontSize={12} ml={15} mt={5}>
          Nenhuma transferencia...
        </Text>
      )}
    </Div>
  );
}

export default TransfersSection;
