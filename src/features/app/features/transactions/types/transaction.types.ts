import type {ApiResponse, Pagination} from "@/types/api.types";
import type {Transaction, TransactionCategory} from "@/types/transaction.types";

export interface TransactionSummary {
  income: number;
  expense: number;
  balance: number;
}

export interface GetTransactionResponse extends ApiResponse {
  data?: Transaction;
}
export interface GetTransactionsResponse extends ApiResponse {
  data: {
    data: Transaction[];
    summary: TransactionSummary;
    pagination: Pagination;
  };
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
  targetWalletId?: number;
  adminFee?: number;
}

export type TransactionMutationParams = TransactionFormType & {id?: number};
