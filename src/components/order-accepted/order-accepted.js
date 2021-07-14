import React from "react";
import ReactDOM from 'react-dom';
import doneLogo from "../../images/done.svg";
import styles from "./order-accepted.module.scss";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

const OrderAccepted = (props) => {

    return ReactDOM.createPortal(
        (
            <ModalOverlay>
                <Modal toggleOrderAccepted={props.toggleOrderAccepted}>
                    <span className={styles.orderNumber}>034536</span>
                    <span className={`${styles.orderId} text text_type_main-large`}>идентификатор заказа</span>
                    <img className={styles.doneLogo} src={doneLogo} alt="done logo"/>
                    <span className={`${styles.orderStartInfo} text text_type_main-medium`}>Ваш заказ начали готовить</span>
                    <span className={`${styles.orderPlaceInfo} text text_type_main-medium`}>Дождитесь готовности на орбитальной станции</span>
                </Modal>
            </ModalOverlay>
        ), modalRoot
    );
};

OrderAccepted.propTypes = { 
    toggleOrderAccepted: PropTypes.func
};

export default OrderAccepted;