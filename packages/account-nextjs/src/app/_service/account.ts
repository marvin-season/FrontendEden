import { request } from "../_utils/request";

export const getAccountList = async () => {
  return await request("/api/account/list");
};
