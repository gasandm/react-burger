import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, Redirect } from "react-router-dom";
import {
    Button,
    Input
} from "@ya.praktikum/react-developer-burger-ui-components";

import { login } from "../services/reducers/authSlice";

import styles from "./pages.module.scss";


export function LoginPage() {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState("");
    const [passValue, setPassValue] = React.useState("");
    const [type, setType] = React.useState("password");
    const [icon, setIcon] = React.useState("ShowIcon");
    const inputRef = React.useRef(null);
    
    const onIconClick = () => {
        type === "password" ? setType("text") : setType("password");
        icon === "ShowIcon" ? setIcon("HideIcon") : setIcon("ShowIcon");
    };

    const loginHandle = () => {
        if(!value || !passValue) {
            alert('Заполните все поля.')
            return false
        }
        dispatch(login({ email: value, password: passValue }));
    }

    return (
        <div className={styles.main}>
            <p className="text text_type_main-default">Вход</p>
            <div className={styles.inputWrapper}>
                <Input
                    type={"email"}
                    placeholder={"E-mail"}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    name={"email"}
                    error={false}
                    errorText={"Введите e-mail"}
                    size={"default"}
                />
            </div>
            <div className={styles.inputWrapper}>
                <Input
                    type={type}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    onChange={(e) => setPassValue(e.target.value)}
                    value={passValue}
                    placeholder={"Пароль"}
                    icon={icon}
                    name={"name"}
                    error={false}
                    errorText={"Введите пароль"}
                    size={"default"}
                />
            </div>
            <div className={styles.inputWrapper}>
                <Button type="primary" size="default" onClick={loginHandle}>
                    Войти
                </Button>
            </div>
            <div className={styles.links}>
                <p className="text text-center text_type_main-small text_color_inactive">
                    Вы - новый пользователь?{" "}
                    <Link to="/register">Зарегистрироваться</Link>
                </p>
                <p className="mt-15 text-center text text_type_main-small text_color_inactive">
                    Забыли пароль?{" "}
                    <Link to="/forgot-password">Восстановить пароль</Link>
                </p>
            </div>
        </div>
    );
}
