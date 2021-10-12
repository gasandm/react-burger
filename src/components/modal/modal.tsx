import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import styles from "./modal.module.scss";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { removeFromDetails, removeFromOrderDetails } from "../../services/reducers/ingredientsSlice";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useHistory } from "react-router-dom";

const modalRoot = document.getElementById("react-modals") as HTMLElement;


const Modal = (props: { modalTitle?: string, children: JSX.Element }) => {
    const history = useHistory()

    function toggleDetails() {
        dispatch(removeFromDetails(123))
        dispatch(removeFromOrderDetails(123))
        history.replace('/')
    }
    const dispatch = useDispatch()

    return ReactDOM.createPortal(
        <ModalOverlay toggleModal={toggleDetails}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={`${styles.details} text 22 text_type_main-large`}>
                    <span>{props.modalTitle}</span>
                    <div
                        className={styles.closeButton}
                        onClick={toggleDetails}
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

export default Modal;
