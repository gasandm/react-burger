import { useSelector } from "../../utils/hooks";
import styles from "./ingredient-details.module.scss";
import Modal from "../modal/modal";

const IngredientDetails = () => {
    const currentItem = useSelector(store => store.ingredients.currentItem);

    return (
        <Modal modalTitle="Детали ингредиента">
            <>
                <img
                    className={styles.ingredientImage}
                    src={currentItem.image}
                    alt="ingredient"
                />
                <span
                    className={`${styles.ingredientName} text text_type_main-medium mt-15`}
                >
                    {currentItem.name}
                </span>
                <div className={styles.ingredientEnergyMain}>
                    <div className={`${styles.ingredientEnergy} mr-20`}>
                        <span>Калории,ккал</span>
                        <span className="text text_type_digits-default">
                            {currentItem.calories}
                        </span>
                    </div>
                    <div className={`${styles.ingredientEnergy} mr-20`}>
                        <span>Белки, г</span>
                        <span className="text text_type_digits-default">
                            {currentItem.proteins}
                        </span>
                    </div>
                    <div className={`${styles.ingredientEnergy} mr-20`}>
                        <span>Жиры, г</span>
                        <span className="text text_type_digits-default">
                            {currentItem.fat}
                        </span>
                    </div>
                    <div className={styles.ingredientEnergy}>
                        <span>Углеводы, г</span>
                        <span className="text text_type_digits-default">
                            {currentItem.carbohydrates}
                        </span>
                    </div>
                </div>
            </>
        </Modal>
    );
};

export default IngredientDetails;
