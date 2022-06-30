import React from 'react'
import {
    MdKeyboardBackspace,
} from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import "./Navigation.css";


export const Navigation = ({children = undefined, className, title}) => {
    const nav = useNavigate();
    return (
        <nav className={`${className} nav`}>
            <button className="nav__button" onClick={() => nav(-1)}>
                <MdKeyboardBackspace />
            </button>
            <h2 className="nav__title">
                {title}
            </h2>
            {children}
        </nav>
    )
}
