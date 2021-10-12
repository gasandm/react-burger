import { Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../services/reducers/authSlice";

import styles from "./side-menu.module.scss";


export function SideMenu() {
    const dispatch = useDispatch()
    const history = useHistory();

    const logoutHandle = () => {
        dispatch(logout())
        history.push("/login")
    }

    return (
        <div className={styles.linksWrapper}>
            <NavLink
                to={{ pathname: "/profile" }}
                className='text_color_inactive'
                activeClassName={styles.activeLink}
            >
                <span className={`${styles.profileLink} text text_type_main-default`}>Профиль</span>
            </NavLink>
            <NavLink
                to={{ pathname: "/profile/orders" }}
                className='text_color_inactive'
                activeClassName={styles.activeLink}
            >
                <span className={`${styles.profileLink} text text_type_main-default mt-35`}>История заказов</span>
            </NavLink>
            <Link to=''>
                <span onClick={logoutHandle} className={`${styles.profileLink} text_color_inactive text text_type_main-default mt-35`}>Выход</span>
            </Link>
            <div className={styles.links}>
                <p className="text text_type_main-small text_color_inactive">
                    В этом разделе вы можете <br/> изменить свои персональные данные
                </p>
            </div>
        </div>
    )
}