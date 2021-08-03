import React from "react";
import doneLogo from "../../images/done.svg";
import styles from "./order-accepted.module.scss";
import Modal from "../modal/modal";
import PropTypes from "prop-types";

const OrderAccepted = (props) => {
    return (
        <Modal toggleModal={props.toggleModal}>
            <span className={styles.orderNumber}>{props.number}</span>
            <span className={`${styles.orderId} text text_type_main-large`}>
                идентификатор заказа
            </span>
            <img className={styles.doneLogo} src={doneLogo} alt="done logo" />
            <span className={`${styles.orderStartInfo} text text_type_main-medium`} >
                Ваш заказ начали готовить
            </span>
            <span className={`${styles.orderPlaceInfo} text text_type_main-medium`} >
                Дождитесь готовности на орбитальной станции
            </span>
        </Modal>
    );
};

OrderAccepted.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired
};

export default OrderAccepted;
