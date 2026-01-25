import type {ApiResponse} from "@/types/api.types";
import type {Wallet} from "@/types/wallet.types";

export interface GetWalletResponse extends ApiResponse {
  data?: Wallet;
}

export interface GetWalletsResponse extends ApiResponse {
  data?: Wallet[];
}

export type WalletMutationParams = WalletFormType & {id?: number};

export interface MutationWalletResponse extends ApiResponse {
  data?: Wallet;
}

export interface WalletFormType {
  name: string;
  balance: number;
}
