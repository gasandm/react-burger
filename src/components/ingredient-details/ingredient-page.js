import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import styles from "./ingredient-details.module.scss";

const IngredientPage = () => {
    const { id } = useParams();
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const item = ingredients.find(item => item._id === id);
    
    return (
        item ? (
            <div className={styles.ingredientMain}>
            <div className={`${styles.details} text text_type_main-large`}>
                <span>Детали ингредиента</span>
            </div>
            <img
                className={styles.ingredientImage}
                src={item.image}
                alt="ingredient"
            />
            <span
                className={`${styles.ingredientName} text text_type_main-medium mt-15`}
            >
                {item.name}
            </span>
            <div className={styles.ingredientEnergyMain}>
                <div className={`${styles.ingredientEnergy} mr-20`}>
                    <span>Калории,ккал</span>
                    <span className="text text_type_digits-default">
                        {item.calories}
                    </span>
                </div>
                <div className={`${styles.ingredientEnergy} mr-20`}>
                    <span>Белки, г</span>
                    <span className="text text_type_digits-default">
                        {item.proteins}
                    </span>
                </div>
                <div className={`${styles.ingredientEnergy} mr-20`}>
                    <span>Жиры, г</span>
                    <span className="text text_type_digits-default">
                        {item.fat}
                    </span>
                </div>
                <div className={styles.ingredientEnergy}>
                    <span>Углеводы, г</span>
                    <span className="text text_type_digits-default">
                        {item.carbohydrates}
                    </span>
                </div>
            </div>
        </div>
        ) : (
            null
        )
        
    );
};

export default IngredientPage;
