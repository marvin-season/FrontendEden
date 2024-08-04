import { PaginationProps } from "antd";
import { request } from "../_utils/request";
import { Account } from "../(ui)/dashboard/account/types";

export const getAccountList = async ({
  pageSize,
  current: pageNumber,
}: PaginationProps) => {
  return await request(
    `/api/account/page?pageSize=${pageSize}&pageNumber=${pageNumber}`
  );
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
