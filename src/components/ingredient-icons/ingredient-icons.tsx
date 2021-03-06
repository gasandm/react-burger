import styles from "./ingredient-icons.module.scss";
import { TOrderSm} from "../../services/reducers/types";
import { useSelector } from "../../utils/hooks";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientIcons = ({ order }: {order: TOrderSm}) => {
    const ingredients = useSelector((store) => store.ingredients.ingredients);
    var totalPrice = 0;

    return (
        <>
            <div className={styles.miniOrder}>
                {order.ingredients.map((item, index) => {
                    const ingrInfo = ingredients.find(ingr => ingr._id === item);
                    if (ingrInfo !== undefined) {
                        totalPrice += ingrInfo.price;

                        if (index > 5) {
                            return "";
                        }
                        
                        return (
                            <div key={index}
                                style={{ zIndex: order.ingredients.length - index }}
                                className={styles.miniIngrOuter}
                            >
                                <div className={styles.miniIngr}>
                                    <img
                                        className={styles.miniIngrImage}
                                        src={ingrInfo.image}
                                    />
                                    {(index === 5 && order.ingredients.length > 6) && (
                                        <div className={styles.ingrMore}>
                                            +{order.ingredients.length - 5}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    } else return (
                        ''
                    )  
                })}
            </div>
            <div className={`${styles.orderPrice} text text_type_digits-default`}>
                {totalPrice}
                <CurrencyIcon type="primary" />
            </div>
        </>
    );
};

export default IngredientIcons;
