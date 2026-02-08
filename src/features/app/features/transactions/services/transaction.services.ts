import {api} from "@/lib/axios";
import type {
  GetTransactionCategoriesResponse,
  GetTransactionResponse,
  GetTransactionsResponse,
  MutationTransactionResponse,
  TransactionFormType,
} from "../types/transaction.types";

export async function getTransactionsService(
  signal?: AbortSignal,
): Promise<GetTransactionsResponse> {
  const {data} = await api.get<GetTransactionsResponse>("/transactions", {
    signal,
  });
  return data;
}

export async function getTransactionService(
  id: number,
  signal?: AbortSignal,
): Promise<GetTransactionResponse> {
  const {data} = await api.get(`/transactions/${id}`, {signal});
  return data;
}

export async function getTransactionCategoriesService(
  signal?: AbortSignal,
): Promise<GetTransactionCategoriesResponse> {
  const {data} = await api.get<GetTransactionCategoriesResponse>(
    "/transaction-categories",
    {
      signal,
    },
  );
  return data;
}

export async function createTransactionService(
  payload: TransactionFormType,
): Promise<MutationTransactionResponse> {
  const {data} = await api.post("/transactions", payload);
  return data;
}

export async function editTransactionService({
  id,
  ...payload
}: {id: number} & TransactionFormType): Promise<MutationTransactionResponse> {
  const {data} = await api.patch(`/transactions/${id}`, payload);
  return data;
}

export async function deleteTransactionService(
  id: number,
  signal?: AbortSignal,
): Promise<GetTransactionResponse> {
  const {data} = await api.delete(`/Transactions/${id}`, {signal});
  return data;
}
