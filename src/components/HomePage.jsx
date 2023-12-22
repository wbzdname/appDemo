import React from "react";
import AppCards from "./Pages/AppCards";
import AppTable from "./Pages/AppTable";
import Navbar from "./Pages/Navbar";
import VerticalMenu from "./Pages/VerticalMenu";

const HomePage = () => {
    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: 200 }}>
                <VerticalMenu />
            </div>
            <div style={{ flex: 1 }}>
                <Navbar/>
                <h2 style={{ display: 'flex', justifyContent: 'center' }}>常用应用</h2>
                <AppCards />
                <h2 style={{ display: 'flex', justifyContent: 'center' }}>应用列表</h2>
                <AppTable />
            </div>
        </div>
    )
}

export default HomePage;