import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from './Modal.module.css';

const root = document.getElementById('react-modals');

function Modal({title, modal}) {
    React.useEffect(() => {
        const onEsc = (event) => {
            if (event.key === "Escape") {
                modal.close();
            }
        }

        document.addEventListener('keydown', onEsc);

        return () => {
            document.removeEventListener('keydown', onEsc);
        }
    }, [modal.close]);

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={modal.close}/>

            <div className={styles.modal}>
                <div className={styles.header_group}>
                    <h1 className={styles.header + ' text text_type_main-large'}>{title}</h1>

                    <div className={styles.close_icon}>
                        <CloseIcon type="primary" onClick={modal.close}/>
                    </div>
                </div>

                <div>{modal.getContent}</div>
            </div>
        </>, root
    );
}

Modal.propTypes = {
    title: PropTypes.string,
    modal: PropTypes.element,
}

export default Modal;
