import { ADMIN_MENUS } from "./admin.menus";

export function getMenus(user?: any): any[] {
    console.log("get menu", user);
    return ADMIN_MENUS;
}
