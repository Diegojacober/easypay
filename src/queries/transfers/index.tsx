import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import api from "../../services/api";
import { Transfer } from "./types";

async function getTransfers(ctx: QueryFunctionContext) {
  const { data } = await api.get<Transfer[]>(`/v1/transferencias/`);

  return data;
}

//adicionando camada de cache
export default function useFetchTransfers() {
  const transfers = useQuery({ queryKey: ["transfers",], queryFn: getTransfers, staleTime:  1, refetchInterval: 150});
  return transfers
}