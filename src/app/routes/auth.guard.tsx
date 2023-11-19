import { Outlet, useNavigate } from "react-router-dom";
import { AppLayout } from "@/src/app/components/layouts/app";
import { useService } from "@/src/app/services";
import { useAppDispatch, useAppStore } from "@/src/app/store";
import { useEffect, useState } from "react";

export const AuthGuard = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {auth} = useAppStore();
    const [ready, setReady] = useState(false);
    const {ui, api} = useService();

    useEffect(() => {
        if (!ready && api.auth.token.is_exists()) {
            api.auth.profile().then(rs => {
                if (rs !== undefined) {
                    dispatch.user.set(rs);
                    setReady(true);
                }
            }).catch(err => {
                if (err?.statusCode === 401) {
                    ui.notify.warn(err.message || err.error);
                }
                navigate(`/auth/login`, {replace: true});
            });
        } else {
            navigate(`/auth/login`, {replace: true});
        }
    }, []);

    return <AppLayout>
        {ready && auth && <Outlet/>}
    </AppLayout>;
};
