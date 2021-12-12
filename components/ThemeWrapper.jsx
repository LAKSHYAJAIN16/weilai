import React from 'react'
import { config } from "../weilai.config";

export default function ThemeWrapper(props) {
    return (
        <div className={config.darkTheme ? "darkBody" : "lightBody"}>
            {props.children}
        </div>
    )
}
