import React from "react";
import PropTypes from 'prop-types';
import {
    ConstructorElement,
    DragIcon,
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.scss";
import OrderAccepted from "../order-accepted/order-accepted";

const BurgerConstructor = (props) => {
    const bun = props.data.find((item) => item.type === "bun");

    const[isOrderAcceptedActive, setIsOrderAcceptedActive] = React.useState(false);

    function toggleOrderAccepted() {
        setIsOrderAcceptedActive(!isOrderAcceptedActive);
    }

    return (
        <section className={styles.constructorBlock}>
            {isOrderAcceptedActive && <OrderAccepted toggleModal={toggleOrderAccepted}/>}
            <div className="ml-15">
                <div className={styles.topBottom}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
                <div className={styles.ingredientsList}>
                    <div className={styles.ingredientsListInner}>
                        {props.data.map((item) => {
                            if (item.type !== "bun") {
                                return (
                                    <div
                                        key={item._id}
                                        style={{ width: "100%" }}
                                    >
                                        <DragIcon type="primary" />
                                        <ConstructorElement
                                            key={item._id}
                                            isLocked={false}
                                            text={item.name}
                                            price={item.price}
                                            thumbnail={item.image}
                                        />
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
                <div className={styles.topBottom}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
            </div>
            <div className={styles.priceTotal}>
                <div className={styles.price}>
                    <span className="mr-5">610</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={toggleOrderAccepted} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};

BurgerConstructor.propTypes = { data: PropTypes.arrayOf(PropTypes.object) };

export default BurgerConstructor;
