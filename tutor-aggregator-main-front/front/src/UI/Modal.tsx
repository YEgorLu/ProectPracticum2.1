import '../styles/modal.css'
import {Component, ReactElement, ReactNode} from "react";


type ModalProps = {
    children: ReactElement;
    title: string;
    onClose: () => void;
    show: boolean
}

export function Modal({children, title, show, onClose}: ModalProps) {

    return (
        <>
            {show &&
              <div className="modal">
                <div className="modal__content">
                  <div className="modal__header">
                    <h4 className="modal__title">{title}</h4>
                  </div>
                  <div className="modal__body">
                      {children}
                  </div>
                  <div className="modal__footer">
                    <button className="modal__close" onClick={onClose}>Закрыть</button>
                  </div>
                </div>
              </div>
            }
        </>
    )
}