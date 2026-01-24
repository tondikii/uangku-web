import type {Wallet} from "@/types/wallet.types";

export interface GetWalletResponse {
  data?: Wallet;
  message: string;
}

export interface GetWalletsResponse {
  data?: Wallet[];
  message: string;
}

export type WalletMutationParams = WalletFormType & {id?: number};

export interface MutationWalletResponse {
  data?: Wallet;
  message: string;
}

export interface WalletFormType {
  name: string;
  balance: number;
}
