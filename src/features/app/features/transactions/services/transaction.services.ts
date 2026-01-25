import {api} from "@/lib/axios";
import type {GetTransactionsResponse} from "../types/transaction.types";

export async function getTransactionsService(
  signal?: AbortSignal,
): Promise<GetTransactionsResponse> {
  const {data} = await api.get<GetTransactionsResponse>("/transactions", {
    signal,
  });
  return data;
}
