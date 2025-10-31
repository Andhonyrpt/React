import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Newsletter from "./Newsletter/Newsletter";
import { useLocation } from "react-router-dom";
import "./Layout.css";


export default function Layout({ children }) {

    const location = useLocation();
    const isHome = location.pathname === "/";
    const isProfile = location.pathname === "/profile";

    return <div className="layout">
        <Header />
        {children}
        {(isHome || isProfile) ? <Newsletter /> : <> </>}
        <Footer />
    </div>
};