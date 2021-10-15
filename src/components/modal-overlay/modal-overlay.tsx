import { useEffect } from "react";
import styles from "./modal-overlay.module.scss";

const ModalOverlay = (props: {toggleModal: () => void, children: JSX.Element}) => {
    useEffect(()=>{
        const checkForEsc = (e: KeyboardEvent) => {
            if(e.key === 'Escape') props.toggleModal();
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

export default ModalOverlay;