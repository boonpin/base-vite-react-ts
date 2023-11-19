import React, { useMemo } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

import { getMenus } from "@/src/app/menus";

import { useAppStore } from "@/src/app/store";

export const MenuNav: React.FC<{
    mode: "inline" | "vertical" | "horizontal";
    style?: React.CSSProperties;
}> = (props) => {
    const {mode, style} = props;

    const location = useLocation();

    const {auth} = useAppStore();

    const menus = useMemo(() => getMenus(auth), [auth]);

    const path = location.pathname;

    const selectedKeys = useMemo(() => {
        const selectedKeys: string[] = [];
        menus?.forEach((m) => {
            const isMenuMatch = (menu: any) => {
                return (
                    menu.path &&
                    (menu.path === path || `${path}`.indexOf(`${menu.path}`) >= 0)
                );
            };
            if (isMenuMatch(m)) {
                selectedKeys.push(m.id);
            }
            if (m.children) {
                for (const c of m.children) {
                    if (isMenuMatch(c)) {
                        if (!selectedKeys.includes(m.id)) {
                            selectedKeys.push(m.id);
                        }
                        selectedKeys.push(`${m.id}-${c.id}`);
                    }
                }
            }
        });
        return selectedKeys;
    }, [path, menus]);

    return (
        <Menu
            style={style}
            defaultOpenKeys={selectedKeys}
            selectedKeys={selectedKeys}
            mode={mode}
            items={menus.map((m) => {
                const toTitle = (menu: any) => {
                    return menu.path ? (
                        <Link to={menu.path}>{menu.title}</Link>
                    ) : (
                        menu.title
                    );
                };

                return {
                    key: `${m.id}`,
                    icon: m.icon,
                    label: toTitle(m),
                    children:
                        m.children?.length > 0
                            ? m.children.map((s: any) => {
                                return {
                                    key: `${m.id}-${s.id}`,
                                    icon: s.icon,
                                    label: toTitle(s)
                                };
                            })
                            : undefined
                };
            })}
        />
    );
};
