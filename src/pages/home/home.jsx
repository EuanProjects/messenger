import { useEffect } from "react";
import Navbar from "../components/navbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

function Home() {

    return (
        <div className="h-screen w-screen flex flex-col md:flex-row gap-4 bg-dark-grey p-4">
            <Navbar />
            <Outlet />

        </div>
    )
}

export default Home;
