import { useUi } from "@/src/app/services/ui.tsx";
import { useStorage } from "@/src/app/services/storage.ts";
import { useApi } from "@/src/app/services/api";

export * as storage from "./storage";

export const useService = () => {
    const ui = useUi();
    const api = useApi();
    const storage = useStorage();
    return {ui, api, storage};
};
