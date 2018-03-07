import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { ToastContainerStyled } from './styled'

const Notification = () => {
  return (
    <ToastContainerStyled>
      <ToastContainer
        position={toast.POSITION.TOP_CENTER}
        type="default"
        autoClose={5000000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnHover={false}
        closeButton={false}
        className='toast-wrapper'
        toastClassName='toast-container'
      />
    </ToastContainerStyled>
  )
}
export default Notification