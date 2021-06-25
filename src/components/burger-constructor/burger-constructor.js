import React from 'react';
import { Typography, ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.scss';

class BurgerIngridients extends React.Component {

    render() {
        return (
            <div className={styles.bConstrBlock}>
                <div className="ml-15">
                    <div className={styles.topBottom}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text="Краторная булка N-200i (верх)"
                            price={200}
                            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                        />
                    </div>
                    <div className={styles.ingridientsList}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {this.props.data.map((item) => {
                                return <div style={{ width: "100%" }}>
                                    <DragIcon type="primary" />
                                    <ConstructorElement
                                        key={item._id}
                                        isLocked={false}
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </div>
                            })}
                        </div>
                    </div>
                    <div className={styles.topBottom}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text="Краторная булка N-200i (верх)"
                            price={200}
                            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                        />
                    </div>
                </div>
                <div className={styles.priceTotal}>
                    <div className={styles.price}>
                        <span className="mr-5">610</span>
                        <CurrencyIcon type="primary" />
                    </div>

                    <Button type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        )
    }
}

export default BurgerIngridients