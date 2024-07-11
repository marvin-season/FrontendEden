import { request } from "../_utils/request";
import { Account } from "@/app/_type";

export const getAccountList = async () => {
  return await request("/api/account/list");
};

export const getAccountById = async (id: number) => {
  return await request(`/api/account/${id}`);
};
export const deleteAccountById = async (id: number) => {
  return await request(`/api/account/${id}`, {
    method: "delete",
  });
};

export const saveOrUpdateAccount = async (account: Partial<Account>) => {
  return await request(`/api/account`, {
    method: "post",
    body: JSON.stringify(account),
  });
};
