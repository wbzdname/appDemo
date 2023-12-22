import React from "react";
import VerticalMenu from "./Pages/VerticalMenu";


const Baidu = () => {
    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: 200 }}>
                <VerticalMenu />
            </div>
            <div style={{ flex: 1 }}>
                <iframe
                    id="baidu"
                    title="to baidu"
                    width="1250"
                    height="900"
                    src="https://lab.aiwht.com/chat">
                </iframe>
            </div>
        </div>

    )
}

export default Baidu;