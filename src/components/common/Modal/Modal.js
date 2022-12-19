import React, { useEffect } from 'react'
import { MdCancel, MdCheckCircle } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { hideModal } from '../../../redux/app';
import './Modal.css'

const Modal = ({ text, show, type = 'message' }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            dispatch(hideModal())
        }, 6000);
    }, [show, dispatch])


    const icon = type === 'error' ?
        <MdCancel className='modal__icon_error' /> :
        <MdCheckCircle className='modal__icon_message' />
    const showWindow = !show ? 'modal__hide' : ''

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