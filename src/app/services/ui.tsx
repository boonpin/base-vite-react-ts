import React from "react";
import { message, Modal, notification, theme } from "antd";
import { CloseCircleOutlined, ExclamationCircleOutlined, WarningOutlined } from "@ant-design/icons";

type EmptyFc = () => void;

export const useUi = () => {
    const {token} = theme.useToken();

    const buttonPropsStyle = {backgroundColor: token.colorPrimary};
    return {
        notify: {
            success: (msg: string | React.ReactNode) => {
                notification.success({message: msg});
            },
            warn: (msg: string | React.ReactNode) => notification.warning({message: msg}),
            error: (err: string | Error | React.ReactNode | any) => {
                if (err instanceof Error) {
                    notification.error({message: err.message ?? err});
                } else if (typeof err === "object" && err.hasOwnProperty("message")) {
                    notification.error({message: err.message ?? err});
                } else {
                    notification.error({message: err});
                }
            },
            info: (msg: string | React.ReactNode) => notification.info({message: msg})
        },
        confirm: (message: string, yes?: EmptyFc, no?: EmptyFc, config?: { icon?: React.ReactNode }) => {
            Modal.confirm({
                icon: config?.icon ?? <ExclamationCircleOutlined/>,
                title: "Confirm",
                content: message,
                onOk: yes,
                onCancel: no,
                okButtonProps: {style: buttonPropsStyle}
            });
        },
        prompt: {
            notice: (message: string, yes?: EmptyFc) => {
                Modal.confirm({
                    icon: <ExclamationCircleOutlined/>,
                    title: "Info",
                    content: message,
                    onOk: yes,
                    okText: "Close",
                    okButtonProps: {style: buttonPropsStyle},
                    cancelButtonProps: {style: {display: "none"}}
                });
            },
            error: (message: string, yes?: EmptyFc) => {
                Modal.confirm({
                    icon: <CloseCircleOutlined style={{color: "red"}}/>,
                    title: "Error",
                    content: message,
                    onOk: yes,
                    okText: "Close",
                    okButtonProps: {style: buttonPropsStyle},
                    cancelButtonProps: {style: {display: "none"}}
                });
            },
            warning: (message: string, yes?: EmptyFc) => {
                Modal.confirm({
                    icon: <WarningOutlined/>,
                    title: "Warning",
                    content: message,
                    onOk: yes,
                    okText: "Close",
                    okButtonProps: {style: buttonPropsStyle},
                    cancelButtonProps: {style: {display: "none"}}
                });
            }
        },
        toast: {
            success: (msg: string) => message.success(msg),
            warn: (msg: string) => message.warning(msg),
            error: (msg: string) => message.error(msg),
            info: (msg: string) => message.info(msg)
        }
    };
};
