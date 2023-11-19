import { Base } from "@/src/app/services/api/base";
import { storage } from "@/src/app/services";

import { STORAGE_KEYS } from "@/src/app/constants";

export class Auth extends Base {
    get token() {
        return {
            clear: (): void => {
                storage.local.remove(STORAGE_KEYS.USER);
                storage.local.remove(STORAGE_KEYS.ACCESS_TOKEN);
                storage.local.remove(STORAGE_KEYS.REFRESH_TOKEN);
            },
            is_exists: (): boolean => storage.local.has(STORAGE_KEYS.ACCESS_TOKEN)
        };
    }

    get password() {
        return {
            forget: (email: string) =>
                this.http.post("/api/auth/forgot-password", {email}),
            reset: (reset_code: string, password: string) =>
                this.http.post("/api/auth/reset-password", {
                    reset_code,
                    password
                }),
            update: (current: string, new_password: string) =>
                this.http.put("/api/auth/password", {
                    current,
                    password: new_password
                })
        };
    }

    login(credential: { username: string; password: string }) {
        return this.http
            .post<any, any>("/api/auth/login", credential)
            .then((rs) => {
                storage.local.set(STORAGE_KEYS.ACCESS_TOKEN, rs.token);
                return rs.user;
            });
    }

    update(payload: any) {
        return this.http.put<any, any>("/api/auth/profile", payload);
    }

    profile() {
        return this.http.get<any, { user: any }>("/api/auth/profile");
    }

    photo() {
        return this.http.get<any, { photo: string }>("/api/auth/photo");
    }

    logout() {
        return this.http.get("/api/auth/logout").then(() => {
            this.token.clear();
        });
    }
}
