import {request} from "@/utils/service";

export const upload = () => {
  return request<any>({
    baseURL: '/api/v2',
    url: 'example/upload',
    method: "post"
  })
}
