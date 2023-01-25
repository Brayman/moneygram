
import classNames from 'classnames';

import React from 'react'
import {
    MdKeyboardBackspace,
} from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CreateClasssName from '../../../utils/bemClassCreate';
import "./Navigation.css";

const navClassName = CreateClasssName()

const Title = styled.div`
    font-size: 18px;
    font-weight: 600;
    line-height: 21.8px;
`

const NavButton = styled.button`
    font-size: 16px;
    width: 2em;
    height: 2em;
    cursor: pointer;
    color: inherit;
    background-color: inherit;
`

const Button = ({Icon, onClick}) => {
  return (
    <NavButton onClick={onClick}>
        <Icon style={{width: '100%', height:'100%'}}/>
    </NavButton>
  )
}

export const Navigation = ({children, className, title}) => {
    const nav = useNavigate();
    return (
        <nav className={classNames(navClassName('nav'), className)}>
            <Button Icon={MdKeyboardBackspace}  onClick={() => nav(-1)} />
            <Title>
                {title}
            </Title>
            {children}
        </nav>
    )
}



Navigation.Button = Button