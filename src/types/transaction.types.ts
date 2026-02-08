import type {Wallet} from "./wallet.types";

// 1. Reusable Sub-Interfaces
export interface TransactionType {
  id: number;
  name: "Income" | "Expense" | "Transfer" | string;
}

export interface TransactionCategory {
  id: number;
  name: string;
  iconName: string | null;
  transactionType: TransactionType;
}

export interface TransactionWallet {
  id: number;
  isIncoming: boolean;
  amount: number;
  wallet: Wallet;
}

export interface Transaction {
  id: number;
  amount: number;
  adminFee: number;
  createdAt: string;
  updatedAt: string;
  transactionType: TransactionType;
  transactionCategory: TransactionCategory;
  transactionWallets: TransactionWallet[];
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TransactionResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    data: Transaction[];
    pagination: Pagination;
  };
}
