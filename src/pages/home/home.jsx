import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

function Home() {
    return (
        <div className="h-screen w-screen flex gap-4 bg-dark-grey p-4">
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Home;
