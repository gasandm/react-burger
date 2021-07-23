import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.scss";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
    return ReactDOM.createPortal(
        <ModalOverlay toggleModal={props.toggleModal}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={`${styles.details} text text_type_main-large`}>
                    <span>{props.modalTitle}</span>
                    <div
                        className={styles.closeButton}
                        onClick={props.toggleModal}
                    >
                        <CloseIcon type="primary" />
                    </div>
                </div>
                {props.children}
            </div>
        </ModalOverlay>,
        modalRoot
    );
};

Modal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    modalTitle: PropTypes.string
};

export default Modal;
