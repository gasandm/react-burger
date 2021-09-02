import React from "react";
import { Link } from "react-router-dom";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.scss";

const AppHeader = () => {
    return (
        <header className={styles.topHeader}>
            <nav className={`${styles.mainNav} p-6`}>
                <ul className={styles.navUl}>
                    <li className={styles.navElement}>
                        <div className="d-ib">
                            <BurgerIcon type="primary" />
                        </div>
                        <span
                            className={`${styles.topTitle} text text_type_main-default ml-2`}
                        >
                            Конструктор
                        </span>
                    </li>
                    <li className={styles.navElement}>
                        <div className="d-ib">
                            <ListIcon type="primary" />
                        </div>
                        <span
                            className={`${styles.topTitle} text text_type_main-default ml-2`}
                        >
                            Лента заказов
                        </span>
                    </li>
                    <li className={styles.logo}>
                        <Link to="/">
                            <Logo />
                        </Link>
                    </li>
                    <li className={styles.navElement}>
                        <Link to="/profile">
                            <div className="d-ib">
                                <ProfileIcon type="primary" />
                            </div>
                            <span className={`${styles.topTitle} text text_type_main-default ml-2`}>
                                Личный кабинет
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;
