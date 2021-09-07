import { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.scss";

const ModalOverlay = (props) => {

    useEffect(()=>{
        const checkForEsc = (e) => {
            if(e.key === 'Escape') props.toggleModal(e);
        }
        document.addEventListener("keydown", checkForEsc, false);

        return () => {
            document.removeEventListener("keydown", checkForEsc, false);
        }
    }, [props])

    return (
        <div onClick={props.toggleModal} className={styles.overlay}>
            {props.children}
        </div>
    );
};

ModalOverlay.propTypes = {
    toggleModal: PropTypes.func.isRequired
};

export default ModalOverlay;