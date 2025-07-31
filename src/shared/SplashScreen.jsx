import React, { useEffect, useState } from "react";
import "../SplashScreen.css";
import Logo from "./components/Logo.jsx";

const SplashScreen = () => {
    const [hide, setHide] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHide(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (hide) return null;

    return (
        <div className="splash-container">
            <div className="logo-wrapper">
                <Logo size="xl" isDarkMode={true} />
            </div>
        </div>
    );
};

export default SplashScreen;
