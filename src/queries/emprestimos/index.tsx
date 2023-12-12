import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import api from "../../services/api";
import { Emprestimo } from "./types";

async function getAccountLoans() {
  const { data } = await api.get<Emprestimo>(`/v1/emprestimos/listar-emprestimos/`);

  return data;
}

//adicionando camada de cache
export default function useFetchLoans() {
  const data = useQuery({ queryKey: ["emprestimos"], queryFn: getAccountLoans, staleTime:  2, refetchInterval: 2});
  return data
}