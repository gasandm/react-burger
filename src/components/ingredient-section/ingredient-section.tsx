import { useSelector } from "../../utils/hooks";
import { Link, useLocation } from "react-router-dom";
import Ingredient from "../ingredient/ingredient";
import styles from "./ingredient-section.module.scss";
import { TTab } from "./types";


const IngredientSection = ({ tab, toggleDetails }: {tab: TTab, toggleDetails: () => void}) => {
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const location = useLocation();

    return (
        <>
            <span ref={tab.ref} className={`${styles.sectionTitle} text text_type_main-default mb-25`}>{tab.title}</span>
            <div className={styles.shortList}>
                {ingredients.map((item) => {
                    if (item.type === tab.id) {
                        return (
                            <Link key={item._id} to={{ pathname: `/ingredients/${item._id}`, state: { background: location }}}>
                                <Ingredient toggleDetails={toggleDetails} key={item._id} item={item} />
                            </Link>
                        )
                    }
                })}
            </div>
        </>
    );
};

export default IngredientSection;