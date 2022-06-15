import React from 'react'
import Modal from '../components/common/Modal/Modal'

export const withModalAlert = (Component) => {
    
    return function withModal({modal, ...props}) {
        return (
            <>
                <Component {...props} />
                {modal.showModal && <Modal show={modal.showModal} text={modal.message} type={modal.type}/>}
            </>
        )
    }
}
