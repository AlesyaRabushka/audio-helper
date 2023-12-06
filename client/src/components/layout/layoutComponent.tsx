import React, {ReactNode} from "react"
import './layoutComponent.css'

interface Props {
    children: ReactNode
}

export const Layout = ({children, ...props}: Props) => {
    return(
        <div className="wave-body">
            
            <div>{children}</div>
            {/* <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div> */}
        </div>
    )
}