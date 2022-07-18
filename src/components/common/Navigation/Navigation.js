
import classNames from 'classnames';

import React from 'react'
import {
    MdKeyboardBackspace,
} from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import CreateClasssName from '../../../utils/bemClassCreate';
import "./Navigation.css";

const navClassName = CreateClasssName()
export const Navigation = ({children, className, title}) => {
    const nav = useNavigate();
    return (
        <nav className={classNames(navClassName('nav'), className)}>
            <button type='button' className={navClassName('nav', 'button')} onClick={() => nav(-1)}>
                <MdKeyboardBackspace />
            </button>
            <h2 className={navClassName('nav', 'title')}>
                {title}
            </h2>
            {children}
        </nav>
    )
}

const Button = ({Icon, onClick}) => {
  return (
    <button className={navClassName("nav", "button")} onClick={onClick}>
        <Icon />
    </button>
  )
}

Navigation.Button = Button