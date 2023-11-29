import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import api from "../../../services/api";
import { Account } from "./types";

async function getAccountDetails(ctx: QueryFunctionContext) {
  const [, accountNumber] = ctx.queryKey;
  const { data } = await api.get<Account[]>(`/v1/accounts/${accountNumber}/`);

  return data;
}

//adicionando camada de cache
export default function useFetchAccount(accountNumber: string) {
  return useQuery({ queryKey: ["account", accountNumber], queryFn: getAccountDetails });
}