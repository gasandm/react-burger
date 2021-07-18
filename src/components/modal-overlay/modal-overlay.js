import React from "react";
import styles from "./modal-overlay.module.scss";

const ModalOverlay = (props) => {

    React.useEffect(()=>{
        const checkForEsc = (e) => {
            if(e.key === 'Escape') props.toggleModal();
        }

        document.addEventListener("keydown", checkForEsc, false);
        
        return () => {
            document.removeEventListener("keydown", checkForEsc, false);
        }
    }, [])

    return (
        <div onClick={props.toggleModal} className={styles.overlay}>
            {props.children}
        </div>
    );
};

export default ModalOverlay;