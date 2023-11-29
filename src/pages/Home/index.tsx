import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Div } from "react-native-magnus";
import Current from "../../components/Current";
import Header from "../../components/Header";
import useAuthStore from "../../stores/useAuthStore";

export default function Home() {

  const [loading, setLoading] = useState<boolean>(false);

  const [getUser, accessToken, account] = useAuthStore((state) => [
    state.getUser,
    state.accessToken,
    state.account,
  ]);
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
        <Current numeroConta={account?.numero}/>
      </Div>
    </Div>
  );
}
