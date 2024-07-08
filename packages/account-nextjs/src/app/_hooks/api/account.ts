import { request } from "@/app/_utils/request";
import { useEffect, useState } from "react";

export const useAccountList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    request("/api/account/list").then(setData);
  }, []);
  return {
    data,
  };
};
