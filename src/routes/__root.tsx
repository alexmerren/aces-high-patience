import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import type { FC } from "react";

const Layout: FC = () => (
    <>
        <div className="p-2 flex gap-2">
            <Link to="/" className="[&.active]:font-bold">
                Home
            </Link>{' '}
        </div>
        <hr />
        <Outlet />
    </>
);

export const Route = createRootRoute({ component: () => <Layout /> })