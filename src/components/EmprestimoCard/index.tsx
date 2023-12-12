import React from "react";
import { Div, Icon, Text } from "react-native-magnus";
import { Emprestimo } from "../../queries/emprestimos/types";

interface IEmprestimoCard {
  emprestimo: Emprestimo;
}

function EmprestimoCard({ emprestimo }: IEmprestimoCard) {

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });

  const formatDate = (unformattedDate: string) => {
    const date = new Date(unformattedDate);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${date.getDate()}/${month}/${year} ${date.getHours()}:${date.getMinutes()}`;
  }

  return (
    <Div flexDir="row" mb={10} alignItems="center">
      <Icon
        h={50}
        w={50}
        fontSize={25}
        mt={5}
        name={emprestimo.status == "Não Aprovado - O valor solicitado é muito para sua conta" ? "dislike2" : "like2"}
        color={emprestimo.status == "Não Aprovado - O valor solicitado é muito para sua conta" ? "#b11818" : "green"}
        bg="gray600"
        style={{ borderRadius: 45 }}
        mr={10}
      />
      <Div>
        <Div flexDir="row" alignItems="baseline">
          <Text color="white">Solicitação: </Text>
          <Text color="white" fontSize={10}>{formatter.format(emprestimo.valorRequisitado)} em {emprestimo.qtd_parcelas} Parcelas</Text>
        </Div>

        <Div flexDir="row" alignItems="baseline">
          <Text color="white" fontSize={10}>Data: </Text>
          <Text color="white" fontSize={10}>{formatDate(emprestimo.data_pedido)}</Text>
        </Div>
      </Div>

    </Div>
  );
}

export default EmprestimoCard;
