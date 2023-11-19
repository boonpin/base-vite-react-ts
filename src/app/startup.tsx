import { FC, PropsWithChildren, useMemo } from "react";
import { Col, ConfigProvider, Result, Row, Spin } from "antd";
import Keycloak from "keycloak-js";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { AUTH_METHOD, STORAGE_KEYS } from "@/src/app/constants";
import { BrowserRouter } from "react-router-dom";
import { useService } from "@/src/app/services";
import { useAppStore } from "@/src/app/store";
import { AppRoute } from "@/src/app/routes";
import { APP_STYLE } from "@/src/config.ts";


export const AppStartup: FC<PropsWithChildren> = () => {
    const {storage} = useService();
    const {auth, settings} = useAppStore();

    // TODO: load setting

    return <BrowserRouter>
        <ConfigProvider theme={{
            token: {
                colorPrimary: APP_STYLE.colorPrimary
            }
        }}>
            {useMemo(() => {

                //const isSettingsReady = !!settings && Object.values(settings).length > 0;
                const isSettingsReady = true;
                if (!isSettingsReady) {
                    return <Row justify="center" align="middle" style={{height: "100vh"}}>
                        <Col md={12} sm={22} style={{textAlign: "center"}}>
                            <Spin spinning={true} size="large" tip="loading app settings ..."/>
                        </Col>
                    </Row>;
                }

                if (settings?.error) {
                    return <Result title="Oops, something went wrong" subTitle={settings.error}/>;
                }

                if (auth?.method === AUTH_METHOD.KEYCLOAK) {
                    const keycloak = new Keycloak({
                        url: `${auth.baseUrl}/auth`,
                        realm: auth.realm,
                        clientId: auth.baseUrl.clientId
                    });
                    return <ReactKeycloakProvider
                        initOptions={{
                            flow: "implicit"
                        }}
                        authClient={keycloak}
                        onTokens={(v) => {
                            storage.local.set(STORAGE_KEYS.ACCESS_TOKEN, v.token);
                        }}>
                        <AppRoute/>
                    </ReactKeycloakProvider>;
                }
                return <AppRoute/>;
            }, [settings, auth])}
        </ConfigProvider>
    </BrowserRouter>;
};
