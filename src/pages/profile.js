import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import {
    Button,
    Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";

import { logout, setUserDetails, getUserDetails } from "../services/reducers/authSlice";

import styles from "./pages.module.scss";

export function ProfilePage() {
    const user = useSelector(store => store.auth.user)
    const dispatch = useDispatch()
    const history = useHistory();
    const [value, setValue] = useState(user.email)
    const [passValue, setPassValue] = useState("")
    const [nameValue, setNameValue] = useState(user.name)
    const inputRef = useRef(null)
    const [userLoaded, setUserLoaded] = useState(false)

    const logoutHandle = () => {
        dispatch(logout())
        history.push("/login")
    }

    const editUserHandle = () => {
        dispatch(setUserDetails({ email: value, name: nameValue, password: passValue }))
        alert('Данные обновлены')
    }

    const onResetHandle = () => {
        setValue(user.email)
        setNameValue(user.name)
        setPassValue('')
    }

    useEffect(() => {
        dispatch(getUserDetails())
            .then((result) => {
                if (result.payload.success) {
                    setUserLoaded(true)
                } else {
                    setUserLoaded(false)
                }
            })
    }, [dispatch])

    return (
        userLoaded ? (
            <div className={styles.mainProfile}>
                <div className={styles.linksWrapper}>
                    <NavLink
                        to={{ pathname: "/profile" }}
                        className='text_color_inactive'
                        activeClassName={styles.activeLink}
                    >
                        <span className={`${styles.profileLink} text text_type_main-default mt-40`}>Профиль</span>
                    </NavLink>
                    <NavLink
                        to={{ pathname: "/profile/orders" }}
                        className='text_color_inactive'
                        activeClassName={styles.activeLink}
                    >
                        <span className={`${styles.profileLink} text text_type_main-default mt-35`}>История заказов</span>
                    </NavLink>
                    <Link>
                        <span onClick={logoutHandle} className={`${styles.profileLink} text_color_inactive text text_type_main-default mt-35`}>Выход</span>
                    </Link>
                    <div className={styles.links}>
                        <p className="text text_type_main-small text_color_inactive">
                            В этом разделе вы можете <br/> изменить свои персональные данные
                        </p>
                    </div>
                </div>
                <div className={styles.inputMainWrapper}>
                    <div className={styles.inputWrapper}>
                        <Input
                            type={"text"}
                            placeholder={"Имя"}
                            onChange={(e) => setNameValue(e.target.value)}
                            value={nameValue}
                            name={"name"}
                            icon={"EditIcon"}
                            error={false}
                            errorText={"Введите имя"}
                            size={"default"}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <Input
                            type={"email"}
                            placeholder={"E-mail"}
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                            name={"email"}
                            icon={"EditIcon"}
                            error={false}
                            errorText={"Введите e-mail"}
                            size={"default"}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <Input
                            type={"password"}
                            ref={inputRef}
                            onChange={(e) => setPassValue(e.target.value)}
                            value={passValue}
                            placeholder={"Пароль"}
                            icon={"EditIcon"}
                            name={"password"}
                            error={false}
                            errorText={"Введите пароль"}
                            size={"default"}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <Button onClick={onResetHandle} type="secondary" size="default">
                            Отмена
                        </Button>
                        <Button onClick={editUserHandle} type="primary" size="default">
                            Сохранить
                        </Button>
                    </div>
                </div>
            </div>
        ) : (
            null
        )
        
    );
}
