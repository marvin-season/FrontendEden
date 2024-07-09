import {request} from "../_utils/request";

export const getAccountList = async () => {
  return await request("/api/account/list");
};

export const getAccountById = async (id: number) => {
  return await request(`/api/account/${id}`);
};

