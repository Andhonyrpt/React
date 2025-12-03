import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Newsletter from "./Newsletter/Newsletter";
import { useLocation } from "react-router-dom";
import "./Layout.css";


export default function Layout({ children }) {

    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <div className="layout">
            <Header />
            {children}
            {isHome && <Newsletter />}
            <Footer />
        </div>
    );
};