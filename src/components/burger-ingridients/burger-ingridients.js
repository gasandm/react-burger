import React from 'react';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingridients.module.scss';
import Tabs from '../../components/tabs/tabs';
import Ingridient from '../../components/ingridient/ingridient';

class BurgerIngridients extends React.Component {

    render() {
        const buns = this.props.data.filter(item => item.type === "bun")
        const main = this.props.data.filter(item => item.type === "main")
        const sauce = this.props.data.filter(item => item.type === "sauce")

        return (
            <div className={styles.bIngrBlock}>
                <Tabs />
                <div className={styles.ingridients}>
                    <span className="text text_type_main-default mb-25">Булки</span>
                    <div className={styles.shortList}>{buns.map((item) => {
                        return <Ingridient key={item._id} item={item} />
                    })}
                    </div>

                    <span className="text text_type_main-default mt-40">Соусы</span>
                    <div className={styles.shortList}>{sauce.map((item) => {
                        return <Ingridient key={item._id} item={item} />
                    })}
                    </div>

                    <span className="text text_type_main-default mt-40">Начинки</span>
                    <div className={styles.shortList}>{main.map((item) => {
                        return <Ingridient key={item._id} item={item} />
                    })}
                    </div>
                </div>
            </div>
        )
    }
}

export default BurgerIngridients