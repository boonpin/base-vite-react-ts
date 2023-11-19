import React from "react";
import { Avatar, Dropdown, Space, Typography } from "antd";
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/src/app/store";
import { useService } from "@/src/app/services";

export const UserInfo: React.FC<{ style?: React.CSSProperties }> = ({style}) => {

    //const {user} = useAppStore();
    const user = {username: "username", name: "user", role: {name: "ADMIN"}, photo: undefined};

    const {api, ui} = useService();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const profileUrl = "/portal/profile";
    const handlers = {
        logout: () => {
            ui.confirm(`Are you sure to logout?`, async () => {
                try {
                    await api.auth.logout();
                    dispatch.user.unset();
                    navigate("/auth/login");
                } catch (err: any) {
                    ui.notify.error(err);
                }
            });
        },
        goToProfile: () => {
            if (profileUrl) {
                navigate(profileUrl);
            }
        }
    };

    return <Dropdown overlayStyle={{margin: 0}} menu={{
        items: [
            {
                key: "profile",
                icon: <SettingOutlined/>,
                label: <Link to={profileUrl || "#"}>Profile</Link>,
                onClick: () => handlers.goToProfile()
            },
            {
                type: "divider"
            },
            {
                key: "logout",
                icon: <LogoutOutlined/>,
                label: "Logout",
                onClick: () => handlers.logout()
            }
        ]
    }} placement="bottom" arrow>
        <Space.Compact style={{margin: 0, ...style}}>
            <Space.Compact direction="vertical" style={{marginRight: 16}}>
                <Typography.Text strong style={{color: "white", margin: 0}}>
                    {user?.name}
                </Typography.Text>
                <Typography.Text italic style={{color: "white", margin: 0}}>
                    <small>
                        <>{user?.role?.name}</>
                    </small>
                </Typography.Text>
            </Space.Compact>
            <Avatar
                size="large"
                style={{color: "white", margin: 0}}
                icon={user?.photo ? <img alt="img" src={user?.photo}/> : <UserOutlined/>}/>
        </Space.Compact>
    </Dropdown>;
};
