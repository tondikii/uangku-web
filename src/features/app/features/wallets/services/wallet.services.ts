import {api} from "@/lib/axios";
import type {
  MutationWalletResponse,
  GetWalletsResponse,
  WalletFormType,
  GetWalletResponse,
} from "../types/wallet.types";

export async function getWalletsService(
  signal?: AbortSignal,
): Promise<GetWalletsResponse> {
  const {data} = await api.get("/wallets", {signal});
  return data;
}

export async function getWalletService(
  id: number,
  signal?: AbortSignal,
): Promise<GetWalletResponse> {
  const {data} = await api.get(`/wallets/${id}`, {signal});
  return data;
}

export async function createWalletService(
  payload: WalletFormType,
): Promise<MutationWalletResponse> {
  const {data} = await api.post("/wallets", payload);
  return data;
}

export async function editWalletService({
  id,
  ...payload
}: {id: number} & WalletFormType): Promise<MutationWalletResponse> {
  const {data} = await api.patch(`/wallets/${id}`, payload);
  return data;
}

export async function deleteWalletService(
  id: number,
  signal?: AbortSignal,
): Promise<GetWalletResponse> {
  const {data} = await api.delete(`/wallets/${id}`, {signal});
  return data;
}
