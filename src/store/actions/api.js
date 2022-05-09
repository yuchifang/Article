import axios from "axios";
export function getFetch(url, params = {}) {
  return axios({
    url: url,
    method: "GET",
    params: params,
  });
}
