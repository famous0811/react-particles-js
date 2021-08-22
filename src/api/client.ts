import axios, { AxiosRequestConfig } from "axios";

interface ApiUriTypes {
  production: string;
  development: string;
  test: string;
}

function apiUrl(): string {
  if (!process.env.REACT_APP_PROD_API_URI || !process.env.REACT_APP_DEV_API_URI)
    throw new Error("API URI not defined. (ENV)");

  const apiUriPreference: ApiUriTypes = {
    production: process.env.REACT_APP_PROD_API_URI,
    development: process.env.REACT_APP_DEV_API_URI,
    test: process.env.REACT_APP_DEV_API_URI,
  };

  return apiUriPreference[process.env.NODE_ENV];
}

const baseClient = axios.create({
  baseURL: apiUrl(),
  headers: {
    "Access-Control-Expose-Headers": "x-access-token",
  },
});

// It renews access token
async function renewAccessToken(): Promise<{ result: boolean }> {
  const refreshToken = localStorage.getItem("refresh-token");
  if (!refreshToken) {
    return { result: false };
  }
  return baseClient
    .post("auth/resign", { token: refreshToken })
    .then((res) => {
      localStorage.setItem("access-token", res.data.data.token);
      return { result: true };
    })
    .catch((err) => {
      return { result: false };
    });
}

export async function resolver(
  config: AxiosRequestConfig
): Promise<Record<string, any>> {
  return baseClient
    .request({
      ...config,
      headers: {
        ...config.headers,
        "x-access-token": localStorage.getItem("access-token"),
      },
    })
    .then((result) => {
      return { ...result.data };
    })
    .catch(async (result) => {
      if (result.response) {
        // Request has been xesolved with code 400 ~ 500
        console.error(
          `Error ${result.response.data.status} : ${result.response.data.message}`
        );
        switch (result.response.data.code) {
          case "TOKEN_EXPIRED":
            console.info("Retrying Login...");
            if (!(await renewAccessToken()).result) {
              localStorage.removeItem("refresh-token");
              localStorage.removeItem("access-token");
              window.location.assign("/");
            } else {
              return await resolver(config);
            }
            break;
          case "TOKEN_EXPIRED_REFRESH":
          case "TOKEN_INVALID":
            console.error("Token Invalid, return to login.");
            localStorage.removeItem("refresh-token");
            localStorage.removeItem("access-token");
            if (["/"].indexOf(window.location.pathname) === -1)
              window.location.assign("/");
            break;
          default:
            break;
        }
        return { ...result.response.data };
      } else if (result.request) {
        // Request failed
        console.error(result.request);
        return { result: false, code: "REQUEST_FAIL" };
      } else {
        // Error on request processing
        console.error("Error", result.message);
        return { result: false, code: "REQUEST_FAIL" };
      }
    });
}

export const client = {
  request: (config: AxiosRequestConfig): Promise<Record<string, any>> =>
    resolver(config),
  get: (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<Record<string, any>> =>
    resolver({
      ...config,
      url,
      method: "get",
    }),
  delete: (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<Record<string, any>> =>
    resolver({ ...config, url, method: "delete" }),
  head: (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<Record<string, any>> =>
    resolver({ ...config, url, method: "head" }),
  options: (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<Record<string, any>> =>
    resolver({ ...config, url, method: "options" }),
  post: (
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<Record<string, any>> =>
    resolver({ ...config, url, data, method: "post" }),
  put: (
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<Record<string, any>> =>
    resolver({ ...config, url, data, method: "put" }),
  patch: (
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<Record<string, any>> =>
    resolver({ ...config, url, data, method: "patch" }),
};

export default { resolver, ...client, rawClient: baseClient };
