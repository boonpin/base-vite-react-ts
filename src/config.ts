import packageJson from "../package.json";

declare global {
    interface Window {
        REACT_APP_GOOGLE_MAP_API_KEY?: string;
        REACT_APP_API_HOST?: string;
        REACT_APP_MODE?: string;
        REACT_APP_NAME?: string;
        REACT_APP_ASSET_BASE_URL?: string;
        REACT_APP_STYLE_PRIMARY_COLOR?: string;
    }
}
const APP_NAME = window.REACT_APP_NAME ?? import.meta.env.VITE_APP_NAME;

export const APP = {
    NAME: APP_NAME ?? "SYSTEM NAME",
    POWERED_BY: import.meta.env.VITE_APP_POWERED_BY,
    POWERED_BY_WEBSITE: import.meta.env.VITE_APP_POWERED_BY_WEBSITE,
    VERSION: packageJson.version
};

export const SECURE = {
    KEY: import.meta.env.VITE_APP_SECURE_KEY
};

export const API = {
    HOST: window.REACT_APP_API_HOST ?? import.meta.env.VITE_APP_API_HOST,
    TIMEOUT: import.meta.env.VITE_APP_API_TIMEOUT_MS ? Number(import.meta.env.VITE_API_TIMEOUT_MS) : 30000
};

export const ASSET = {
    BASE_URL: window.REACT_APP_ASSET_BASE_URL || import.meta.env.VITE_APP_ASSET_BASE_URL || ""
};

export const APP_STYLE = {
    colorPrimary: window.REACT_APP_STYLE_PRIMARY_COLOR || import.meta.env.VITE_APP_STYLE_PRIMARY_COLOR || "#d21515"
};
