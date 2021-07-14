import React from "react";
import styles from "./modal.module.scss";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = (props) => {
    return (
        <div className={styles.modal}>
            <div className={`${styles.details} text text_type_main-large mt-40 ml-40`}>
                <span>Детали ингредиента</span>
                <div className={styles.closeButton} onClick={props.toggleOrderAccepted}>
                    <CloseIcon type="primary" />
                </div>
            </div>
            {props.children}
        </div>
    );
};

Modal.propTypes = { 
    toggleOrderAccepted: PropTypes.func
};

export default Modal;
