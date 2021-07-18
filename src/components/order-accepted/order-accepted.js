import React from "react";
import doneLogo from "../../images/done.svg";
import styles from "./order-accepted.module.scss";
import {
    CloseIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

const OrderAccepted = (props) => {

    return (
        <div className={styles.orderAcceptedMain}>
            <div className={styles.modal}>
                <div className={styles.closeButton}>
                <CloseIcon type="primary" />
                </div>
                <span className={styles.orderNumber}>034536</span>
                <span className={`${styles.orderId} text text_type_main-large`}>идентификатор заказа</span>
                <img className={styles.doneLogo} src={doneLogo}/>
                <span className={`${styles.orderStartInfo} text text_type_main-medium`}>Ваш заказ начали готовить</span>
                <span className={`${styles.orderPlaceInfo} text text_type_main-medium`}>Дождитесь готовности на орбитальной станции</span>

            </div>
        </div>
    );
};

export default OrderAccepted;