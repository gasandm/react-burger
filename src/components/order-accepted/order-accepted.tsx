import doneLogo from "../../images/done.svg";
import styles from "./order-accepted.module.scss";
import Modal from "../modal/modal";

const OrderAccepted = (props: {toggleModal: () => void, number: number}) => {
    return (
        <Modal>
            <>
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
            </>
        </Modal>
    );
};

export default OrderAccepted;
