import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { FullMidLayout } from "@/src/app/components/layouts/app/layout";
import { Button, Result } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { Home, Home2 } from "@/src/app/containers";

const Err404 = () => {
    const location = useLocation();

    return (
        <FullMidLayout>
            <Result
                status="warning"
                title={"Oops, Page not found"}
                subTitle={location.pathname}
                extra={
                    <Button href="/home" icon={<ArrowLeftOutlined/>}>
                        Back to Dashboard
                    </Button>
                }
            />
        </FullMidLayout>
    );
};

export const AppRoute = () => {

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home"/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/home2" element={<Home2/>}/>
            <Route path="*" element={<Err404/>}/>
        </Routes>
    );
};
