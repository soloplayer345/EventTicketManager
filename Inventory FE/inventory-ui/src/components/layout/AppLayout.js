import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopNav from "./TopNav";
import SiteFooter from "./SiteFooter";

const MINIMAL_ROUTES = ["/login"];

const AppLayout = () => {
    const location = useLocation();
    const isMinimal = MINIMAL_ROUTES.includes(location.pathname);

    return (
        <div className={`app-shell ${isMinimal ? "app-shell--minimal" : ""}`}>
            {!isMinimal && <TopNav />}
            <main className="app-shell__content">
                <Outlet />
            </main>
            {!isMinimal && <SiteFooter />}
        </div>
    );
};

export default AppLayout;

