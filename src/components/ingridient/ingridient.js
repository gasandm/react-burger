import React from 'react';
import styles from './ingridient.module.scss';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingridient = (props) => {

  return (
    <div className={styles.ingridient}>
      <div className={styles.counter}>
        <Counter count={1} size="default" />
      </div>
      <img className="" src={props.item.image} />
      <div className={styles.priceWrapper}>
        <span className="mr-5">{props.item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{props.item.name}</p>
    </div>
  )
}

export default Ingridient