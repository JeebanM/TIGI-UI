import React from 'react'
import style from './styles/Modal.module.css'

type Props = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal = (props: Props) => {
  if (!props.open) return null

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
      <span className={style.close} onClick={props.onClose}>&times;</span>
        {props.children}
      </div>
    </div>
  )
}

export default Modal