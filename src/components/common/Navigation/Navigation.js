import React from 'react'
import {
    MdKeyboardBackspace,
} from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import "./Navigation.css";


export const Navigation = ({children, className, title}) => {
    const nav = useNavigate();
    return (
        <nav className={`${className} nav`}>
            <button type='button' className="nav__button" onClick={() => nav(-1)}>
                <MdKeyboardBackspace />
            </button>
            <h2 className="nav__title">
                {title}
            </h2>
            {children}
        </nav>
    )
}
