import React, { useContext } from "react";
import PropTypes from 'prop-types';
import {
    ConstructorElement,
    DragIcon,
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.scss";
import OrderAccepted from "../order-accepted/order-accepted";
import { IngredientsContext } from '../../services/appContext';


const BurgerConstructor = () => {

    const Ingredients = useContext(IngredientsContext);

    const bun = Ingredients.find((item) => item.type === "bun");

    const[isOrderAcceptedActive, setIsOrderAcceptedActive] = React.useState(false);
    const[orderNumber, setOrderNumber] = React.useState(0);

    function toggleOrderAccepted() {
        const ids = 
        {
            "ingredients": Ingredients.map(item => item._id)
        };
        console.log(ids);
        fetch('https://norma.nomoreparties.space/api/orders', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(ids)
        })
            .then((res) => res.json())
            .then((result) => {
                setOrderNumber(result.order.number);
                setIsOrderAcceptedActive(!isOrderAcceptedActive);
            })
            .catch((error) => {
                alert(error);
            });
    }

    const price = Ingredients.reduce(function(sum, current) {
        if (current.type !== "bun") {
            return sum + current.price;
        } else {
            return sum;
        }
      }, bun.price*2);

    return (
        <section className={styles.constructorBlock}>
            {isOrderAcceptedActive && <OrderAccepted number={orderNumber} toggleModal={toggleOrderAccepted}/>}
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
                        {Ingredients.map((item) => {
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
                    <span className="mr-5">{price}</span>
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
