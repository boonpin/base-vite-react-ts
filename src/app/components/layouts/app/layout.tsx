import { Col, Layout, Row, Tooltip } from "antd";
import { MenuNav } from "@/src/app/components/layouts/app/menu-nav";
import { Header } from "./header";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { APP } from "@/src/config";
import moment from "dayjs";
import { useAppStore } from "@/src/app/store.tsx";
import { useWindowSize } from "@/src/app/hooks.tsx";

const siderWidth = 240;
const isTopNavMode = false;

export const AppLayout: React.FC<PropsWithChildren> = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);

    const {version} = useAppStore();

    const size = useWindowSize();

    useEffect(() => {
        if (size) {
            if (size?.width < 1000 && !collapsed) {
                setCollapsed(true);
            } else if (size?.width >= 1000 && collapsed) {
                setCollapsed(false);
            }
        }
    }, [size]);

    return <Layout>
        <Header siderWidth={siderWidth} menuCollapsed={collapsed} onToggleMenu={() => setCollapsed(!collapsed)}/>
        <Layout hasSider={!isTopNavMode}>
            {!isTopNavMode && <Layout.Sider
                theme="light"
                collapsed={collapsed}
                width={siderWidth}
                style={{
                    overflow: "auto",
                    position: "static",
                    left: 0,
                    top: 0,
                    bottom: 0
                }}
            >
                <MenuNav mode="inline" style={{marginTop: 8}}/>
            </Layout.Sider>}

            <Layout.Content>
                <div style={isTopNavMode ? {paddingLeft: 48, paddingRight: 48, marginTop: 24} : {marginTop: 24}}>
                    {children}
                </div>
                <Layout.Footer
                    style={{
                        backgroundColor: "white",
                        position: "fixed",
                        padding: isTopNavMode ? "12px 48px" : "12px 0",
                        bottom: 0,
                        margin: 0,
                        width: isTopNavMode ? "100%" : `calc(100% - ${collapsed ? 80 : siderWidth}px)`
                    }}>
                    <Row justify="space-between" style={{marginLeft: 24, marginRight: 24}}>
                        <Col>
                            {`${APP.NAME} @${moment().year()}`}
                        </Col>
                        <Col style={{textAlign: "right"}}>
                            <Tooltip title={<ul style={{padding: 0, margin: 0}}>
                                <li>backend: {version}</li>
                                <li>frontend: {APP.VERSION}</li>
                            </ul>}>
                                <span>v{APP.VERSION}</span>
                            </Tooltip>
                        </Col>
                    </Row>
                </Layout.Footer>
            </Layout.Content>
        </Layout>
    </Layout>;
};


export const FullMidLayout: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <Layout>
            <Layout.Content>
                <Row align="middle" justify="center" style={{height: "100vh"}}>
                    <Col xl={10} lg={10} md={10} sm={12} xs={16}>
                        {children}
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    );
};
