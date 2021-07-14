import React from "react";
import styles from "./modal-overlay.module.scss";

const ModalOverlay = (props) => {

    return (
        <div className={styles.orderAcceptedMain}>
            {props.children}
        </div>
    );
};

export default ModalOverlay;