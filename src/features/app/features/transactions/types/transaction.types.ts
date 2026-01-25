import type {ApiResponse, Pagination} from "@/types/api.types";
import type {Transaction} from "@/types/transaction.types";

export interface GetTransactionsResponse extends ApiResponse {
  data?: {data: Transaction[]; pagination: Pagination};
}
