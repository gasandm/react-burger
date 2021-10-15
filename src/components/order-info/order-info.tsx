import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "../../utils/hooks";
import { fetchOrder } from "../../services/reducers/ingredientsSlice";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { format } from "date-fns";
import { ru } from 'date-fns/esm/locale';

import styles from "./order-info.module.scss";

const OrderInfo = () => {
    const { id }: {id: string} = useParams();
    const dispatch = useDispatch();
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const order = useSelector(store => store.ingredients.currentOrder.order);
    const [orderLoaded, setOrderLoaded] = useState(false);

    var totalPrice = 0;
    var showed: string[] = [];

    useEffect(() => {
        dispatch<any>(fetchOrder(id))
            // @ts-ignore
            .then((result) => {
                if (result.payload.success) {
                    setOrderLoaded(true)
                } else {
                    setOrderLoaded(false)
                }
            })
    }, [dispatch])
    
    if(orderLoaded && order && ingredients.length > 0) {
            return (
                <div className={styles.orderMain}>
                    <div className='text text-center text_type_digits-default'>
                        #{order.number}
                    </div>
                    <div className={`${styles.burgerName} text text_type_main-medium mt-40`}>{order.name}</div>
                    <div className={`${styles.doneText} mt-3 text text_type_main-medium`}>{order.status === 'done' ? 'Выполнен' : 'В работе'}</div>
                    <div className='text text_type_main-large'>Состав:</div>
                    <div className={styles.ingrScroll}>
                    {order.ingredients.map((item, index) => {
                        const ingrInfo = ingredients.find(ingr => ingr._id === item);
                        const howMany = order.ingredients.filter(ingr => ingr === item).length;
                        if (ingrInfo) {
                            totalPrice += ingrInfo.price;
                            if (!showed.includes(ingrInfo._id)) {
                                showed.push(ingrInfo._id)
                                return (
                                    <div key={index} className={styles.ingrLine}>
                                        <div className={styles.miniIngr}>
                                            <img
                                                className={styles.miniIngrImage}
                                                src={ingrInfo.image}
                                            />
                                        </div>
                                        <span className="flex text text_type_main-default ml-4">{ingrInfo.name}</span>
                                        <div className={`${styles.orderPriceForOne} text text_type_digits-default`}>
                                            {howMany+' x '+ingrInfo.price}
                                            <CurrencyIcon type="primary" />
                                        </div>
                                    </div>
                                );
                            } else return null;
                        } else return null;
                    })}
                    </div>
                    <div className={styles.OrderInfoBottom}>
                        <span className="text text_type_main-default text_color_inactive">
                        {format(new Date(Date.parse(order.updatedAt)),"PPP в kk:mm O", { locale: ru })}
                        </span>
                        <div className={`${styles.orderPrice} text text_type_digits-default`}>
                        {totalPrice}
                        <CurrencyIcon type="primary" />
                    </div>
                    </div>
                </div>
            );
        } else return null;
};

export default OrderInfo;
