import React, { useEffect, useState } from 'react'
import { MdCancel, MdCheckCircle } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';
import { appActions } from '../../../redux/app';
import './Modal.css'

const Modal = ({ text, show, type = 'message' }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            dispatch(appActions.hideModal())
        }, 6000);
    }, [show])


    const icon = type === 'error' ?
        <MdCancel className='modal__icon_error' /> :
        <MdCheckCircle className='modal__icon_message' />
    const showWindow = !show ? 'modal__hide' : ''

    const navigate = useNavigate()
    return (
        <div className={`modal__shadow ${showWindow}`}>
            <div className='modal__box'>
                {icon}
                <p className='modal__message'>
                    {text}
                </p>
                
            </div>
        </div>
    )
}
export default Modal;