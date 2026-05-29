import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

export default function RootLayout() {
    const token = useLoaderData<string>();
    const submit = useSubmit();

    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === "EXPIRED") {
            submit(null, {action: "/logout", method: "post"});
            return;
        }

        setTimeout(() => {
            submit(null, {action: "/logout", method: "post"});
        }, getTokenDuration());
    }, [token, submit]);

    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    )
}