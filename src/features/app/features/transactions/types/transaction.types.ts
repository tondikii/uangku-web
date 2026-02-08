import type {ApiResponse, Pagination} from "@/types/api.types";
import type {Transaction, TransactionCategory} from "@/types/transaction.types";

export interface GetTransactionResponse extends ApiResponse {
  data?: Transaction;
}
export interface GetTransactionsResponse extends ApiResponse {
  data?: {data: Transaction[]; pagination: Pagination};
}

export interface GetTransactionCategoriesResponse extends ApiResponse {
  data?: {data: TransactionCategory[]; pagination: Pagination};
}

export interface MutationTransactionResponse extends ApiResponse {
  data?: Transaction;
}

export interface TransactionFormType {
  transactionTypeId: number;
  transactionCategoryId: number;
  walletId: number;
  amount: number;
}

export type TransactionMutationParams = TransactionFormType & {id?: number};
