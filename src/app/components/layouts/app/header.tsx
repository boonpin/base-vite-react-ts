import React, { useMemo } from "react";
import { UserInfo } from "./user-info";
import { Col, Row, theme } from "antd";
import { Link } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MenuNav } from "@/src/app/components/layouts/app/menu-nav";
import { useWindowSize } from "@/src/app/hooks";


const isTopNavMode = false;

export const Header: React.FC<{ siderWidth?: number, menuCollapsed?: boolean, onToggleMenu?: () => void }> = (props) => {

    const size = useWindowSize();

    const {siderWidth = 96, menuCollapsed, onToggleMenu} = props;

    const headerSize = useMemo(() => {
        if (size) {
            if (size?.width < 1000) {
                return {
                    center: 0,
                    right: "auto"
                };
            }
        }
        return {
            center: "auto",
            right: `${480}px`
        };
    }, [size]);

    const DASHBOARD_URL = useMemo(() => {
        return "/home";
    }, []);

    const {token} = theme.useToken();

    const companyLogo = "/assets/img/logo.svg";

    return <div style={{
        height: "100%",
        padding: isTopNavMode ? "0 90px" : "0 24px",
        backgroundColor: token.colorPrimary
    }}>
        <Row justify="space-between" align="middle" style={{height: 56}}>
            <Col flex={`${menuCollapsed ? 96 : siderWidth}px`}>
                <Link to={DASHBOARD_URL} replace>
                    {useMemo(() => {
                        if (companyLogo) {
                            return <img
                                alt="logo"
                                src={companyLogo} style={{width: menuCollapsed ? 80 : 128}}
                            />;
                        }
                    }, [companyLogo, menuCollapsed])}
                </Link>
            </Col>

            <Col flex={headerSize.center}>
                {useMemo(() => {
                    if (isTopNavMode) {
                        return <MenuNav mode="horizontal" style={{
                            backgroundColor: token.colorPrimary,
                            borderBottom: "none",
                            color: "#dadada"
                        }}/>;
                    } else {
                        const style = {fontSize: 20, color: "#f8f8f8", cursor: "pointer"};
                        return menuCollapsed ? <MenuFoldOutlined style={style} onClick={onToggleMenu}/> :
                            <MenuUnfoldOutlined style={style} onClick={onToggleMenu}/>;
                    }
                }, [menuCollapsed])}
            </Col>
            <Col flex={headerSize.right} style={{textAlign: "right"}}>
                <UserInfo/>
            </Col>
        </Row>
    </div>;
};
