import React from 'react';
import { Logo, BurgerIcon, ListIcon, Typography, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.scss';

class AppHeader extends React.Component {
    render() {
        return (
            <header>
                <nav className="p-6">
                    <div className="">
                        <BurgerIcon type="primary" />
                        <span className="text text_type_main-default ml-2">Конструктор</span>
                    </div>
                    <div className={styles.orderList}>
                        <ListIcon type="primary" />
                        <span className="text text_type_main-default ml-2">Лента заказов</span>
                    </div>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                    <div className="pos-r mr-10">
                        <ProfileIcon type="primary" />
                        <span className="text text_type_main-default ml-2">Личный кабинет</span>
                    </div>
                </nav>
            </header>
        )
    }
}

export default AppHeader