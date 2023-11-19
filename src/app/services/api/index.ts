import axios, { AxiosInstance } from "axios";
import * as CONFIG from "@/src/config";
import { storage } from "@/src/app/services";
import { STORAGE_KEYS } from "@/src/app/constants";
import { Auth } from "@/src/app/services/api/auth.ts";

class ApiFactory {
    private readonly axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: CONFIG.API.HOST,
            timeout: CONFIG.API.TIMEOUT,
            headers: {
                "Content-Type": "application/json"
            }
        });
        this.axios.interceptors.request.use(
            (config: any) => {
                const token = storage.local.get.value(STORAGE_KEYS.ACCESS_TOKEN);
                if (token) {
                    if (!config.headers) {
                        config.headers = {};
                    }
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            },
            (error: any) => {
                return Promise.reject(error);
            }
        );
        this.axios.interceptors.response.use(
            (response: any) => {
                // do nothing on response (direct response the data)
                return response ? response.data : null;
            },
            async (error: any) => {
                let res = error;
                if (error) {
                    if (error.response && error.response.data) {
                        if (error.response.data.type === "application/json") {
                            res = JSON.parse(await error.response.data.text());
                        } else if (error?.response?.headers?.["content-type"].indexOf("/json") > 0) {
                            res = error.response.data;
                        }
                    } else {
                        res = {
                            message: error.message,
                            statusCode: error.status,
                            error
                        };
                    }
                }
                return Promise.reject(res);
            }
        );
    }

    public get auth() {
        return new Auth(this.axios);
    }
}

export const useApi = () => {
    return new ApiFactory();
};
