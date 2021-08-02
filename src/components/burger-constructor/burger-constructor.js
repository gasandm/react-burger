import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
    ConstructorElement,
    DragIcon,
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.scss";
import OrderAccepted from "../order-accepted/order-accepted";
import { IngredientsContext } from '../../services/appContext';
import { addToConstructor, deleteFromConstructor } from "../../services/reducers/ingredientsSlice";
import Ingredient from "../ingredient/ingredient";


const BurgerConstructor = () => {

    const dispatch = useDispatch();
    const ingredients = useContext(IngredientsContext);
    const addedIngredients = useSelector(store => store.ingredients.addedIngredients);

    var bun = addedIngredients.find((item) => item.type === "bun");
    if (!bun) {
        bun = ingredients.find((item) => item.type === "bun");
    }

    const[isOrderAcceptedActive, setIsOrderAcceptedActive] = React.useState(false);
    const[orderNumber, setOrderNumber] = React.useState(0);

    function toggleOrderAccepted() {
        const ids = 
        {
            "ingredients": ingredients.map(item => item._id)
        };
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

    const price = addedIngredients.reduce(function(sum, current) {
        if (current.type !== "bun") {
            return sum + current.price;
        } else {
            return sum;
        }
      }, bun.price*2);

    const onDropHandler = (itemId) => {
        const dropped = ingredients.find(item => item._id === itemId._id);
        dispatch(addToConstructor(dropped));
    }

    const onDeleteHandler = (itemNew) => {
        const item = ingredients.find(item => item._id === itemNew._id);
        dispatch(deleteFromConstructor(item));
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            onDropHandler(itemId);
        },
    });

    return (
        <section className={styles.constructorBlock}>
            {isOrderAcceptedActive && <OrderAccepted number={orderNumber} toggleModal={toggleOrderAccepted}/>}
            <div className="ml-15">
                <div className={styles.topBottom}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name+' (верх)'}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
                <div ref={dropTarget} className={styles.ingredientsList}>
                    <div className={styles.ingredientsListInner}>
                        {addedIngredients.map((item, index) => {
                            if (item.type !== "bun") {
                                return (
                                    <div
                                        key={index}
                                        style={{ width: "100%" }}
                                    >
                                        <DragIcon type="primary" />
                                        <ConstructorElement
                                            isLocked={false}
                                            handleClose={() => {onDeleteHandler(item)}}
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
                        text={bun.name+' (низ)'}
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

export default BurgerConstructor;
