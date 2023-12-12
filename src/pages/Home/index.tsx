import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Div } from "react-native-magnus";
import Currency from "../../components/Currency";
import Header from "../../components/Header";
import useAuthStore from "../../stores/useAuthStore";
import useFetchAccount from "../../queries/account";
import HomeFunctionsSection from "../../components/HomeFunctionsSection";
import TransfersSection from "../../components/TransfersSection";
import useFetchTransfers from "../../queries/transfers";
import EmprestimoSection from "../../components/EmprestimosSections";
import useFetchLoans from "../../queries/emprestimos";

export default function Home() {

  const [loading, setLoading] = useState<boolean>(false);

  const [getUser, accessToken, account] = useAuthStore((state) => [
    state.getUser,
    state.accessToken,
    state.account,
  ]);

  const { data } = useFetchAccount(account?.numero);
  const { data: transferData } = useFetchTransfers();
  const { data: emprestimos } = useFetchLoans();
  useEffect(() => {
    function loadUser() {
      setLoading(true);
      getUser(accessToken);
      setLoading(false);
    }
    loadUser();
  }, []);

  if (loading) {
    return (
      <Div
        flex={1}
        pt={50}
        bg="darkblue"
        alignItems="center"
        justifyContent="center"
      >
        <ActivityIndicator size={70} color={"#3883BB"} />
      </Div>
    );
  }

  return (
    <Div flex={1} pt={50} bg="darkblue" alignItems="center">
      <Div w={"95%"}>
        <Header />
        <Currency numeroConta={account?.numero} idConta={account?.id} saldo={data?.saldo} />
        <HomeFunctionsSection />
        <EmprestimoSection emprestimos={emprestimos} />
        <TransfersSection transfers={transferData} />
      </Div>
    </Div>
  );
}
