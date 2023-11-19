import { AxiosInstance } from "axios";

const objectToQueryString = (obj: any) => {
    return Object.keys(obj).map(key => {
        const v = obj[key];
        return (v !== null && v !== undefined) ? (key + "=" + v) : null;
    }).filter(v => v !== null).join("&");
};

export abstract class Base {
    public constructor(protected readonly axios: AxiosInstance) {
    }

    protected get http() {
        return {
            post: this.axios.post,
            put: this.axios.put,
            delete: this.axios.delete,
            get: <T, R>(path: string, query?: any) => {
                const q = query ? Object.keys(query).map(k => {
                    const v = query[k];
                    if (v !== undefined) {
                        return `${k}=${Array.isArray(v) ? v.join(",") : v}`;
                    }
                    return null;
                }).filter(v => !!v).join("&") : "";

                return this.axios.get<T, R>(`${path}${q.length > 0 ? `?${q}` : ""}`);
            }
        };
    }

    toQueryString(params: any) {
        let query = "";
        if (params) {
            query = "?" + objectToQueryString(params);
        }
        return query;
    }

    download(path: string, {acceptType, download}: { acceptType?: string, download?: string }) {
        const headers = {
            "Accept": acceptType || ""
        };
        return this.axios.get(path, {headers, responseType: "blob"}).then((blob: any) => {
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            if (download) {
                link.download = download;
            } else {
                link.target = "_blank";
            }
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            let timeout: any = setTimeout(() => {
                window.URL.revokeObjectURL(link.href);
                clearTimeout(timeout);
                timeout = undefined;
            }, 100);
            return link;
        });
    }
}
