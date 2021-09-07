import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import styles from "./modal.module.scss";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { addToDetails, removeFromDetails, removeFromOrderDetails } from "../../services/reducers/ingredientsSlice";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useHistory } from "react-router-dom";

const modalRoot = document.getElementById("react-modals");


const Modal = (props) => {
    const history = useHistory()
    
    function toggleDetails(item) {
        if(item._id) {
            dispatch(addToDetails(item))
        } else {
            dispatch(removeFromDetails())
            dispatch(removeFromOrderDetails())
            history.replace('/')
        } 
    }
    const dispatch = useDispatch()

    return ReactDOM.createPortal(
        <ModalOverlay toggleModal={toggleDetails}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={`${styles.details} text text_type_main-large`}>
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

Modal.propTypes = {
    modalTitle: PropTypes.string
};

export default Modal;
