import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
    ConstructorElement,
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.scss";
import defaultBun from "../../utils/default-bun";
import OrderAccepted from "../order-accepted/order-accepted";
import IngredientInConstructor from "../ingredient-in-constructor/ingredient-in-constructor";
import {
    addToConstructor,
    deleteFromConstructor,
    fetchOrderDetails,
    addManyToConstructor,
    removeFromOrderDetails
} from "../../services/reducers/ingredientsSlice";

const BurgerConstructor = () => {
    const dispatch = useDispatch()
    const ingredients = useSelector(store => store.ingredients.ingredients)
    const addedIngredients = useSelector(store => store.ingredients.addedIngredients)
    const orderDetails = useSelector(store => store.ingredients.currentOrder)

    let bun = addedIngredients.find((item) => item.type === "bun")
    if (!bun) bun = defaultBun

    function toggleOrderAccepted() {
        if (addedIngredients.length > 0) {
            if (orderDetails.success) {
                dispatch(removeFromOrderDetails());
            } else {
                const ids = {
                    ingredients: addedIngredients.map((item) => item._id)
                };
                dispatch(fetchOrderDetails(ids));
            }
        } else {
            alert("Добавьте ингредиенты в конструктор");
        }
    }

    const price = addedIngredients.reduce(function (sum, current) {
        if (current.type !== "bun") {
            return sum + current.price;
        } else {
            return sum;
        }
    }, bun.price * 2);

    const onDropHandler = (itemId) => {
        const dropped = ingredients.find((item) => item._id === itemId._id);
        dispatch(addToConstructor(dropped));
    };

    const onDeleteHandler = (itemDel) => {
        const item = ingredients.find((item) => item._id === itemDel._id);
        dispatch(deleteFromConstructor(item));
    };

    const moveIngredient = (dragIndex, hoverIndex) => {
        const newIngredients = [...addedIngredients];
        const newItem = addedIngredients[dragIndex];
        newIngredients.splice(dragIndex, 1);
        newIngredients.splice(hoverIndex, 0, newItem);

        dispatch(addManyToConstructor(newIngredients));
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            onDropHandler(itemId);
        },
    });

    return (
        <section className={styles.constructorBlock}>
            {orderDetails.success && (
                <OrderAccepted
                    number={orderDetails.order.number}
                    toggleModal={toggleOrderAccepted}
                />
            )}
            <div className="ml-15">
                <div className={styles.topBottom}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
                <div ref={dropTarget} className={styles.ingredientsList}>
                    <div className={styles.ingredientsListInner}>
                        {addedIngredients.map((item, index) => {
                            if (item.type !== "bun") {
                                return (
                                    <IngredientInConstructor
                                        index={index}
                                        onDeleteHandler={onDeleteHandler}
                                        key={index}
                                        item={item}
                                        moveIngredient={moveIngredient}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>
                <div className={styles.topBottom}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
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
                <Button
                    onClick={toggleOrderAccepted}
                    type="primary"
                    size="large"
                >
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};

export default BurgerConstructor;
