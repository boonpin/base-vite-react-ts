import { Layout, Spin } from "antd";
import React, { FC, PropsWithChildren, ReactElement } from "react";

type ContainerProps = {
    back?: boolean | string;
    title?: string | React.ReactElement;
    subTitle?: string;
    loading?: boolean;
    extra?: ReactElement;
    style?: React.CSSProperties;
};

export const AppContainer: FC<PropsWithChildren<ContainerProps>> = (props) => {
    const {children, style, loading = false} = props;

    return <>
        <Layout style={style ?? {padding: "0 48px 48px 48px", minHeight: "max-content"}}>
            <Layout.Content style={{minHeight: "80vh"}}>
                <Spin spinning={loading}>{children}</Spin>
            </Layout.Content>
        </Layout>
    </>;
};
