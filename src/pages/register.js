import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Link, useHistory } from "react-router-dom";
import {
    Button,
    Input
} from "@ya.praktikum/react-developer-burger-ui-components";

import { addCurrentUser, register } from "../services/reducers/authSlice";

import styles from "./pages.module.scss";

//import { useAuth } from '../services/auth';


export function RegisterPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [value, setValue] = React.useState("");
    const [passValue, setPassValue] = React.useState("");
    const [nameValue, setNameValue] = React.useState("");
    const [type, setType] = React.useState("password");
    const [icon, setIcon] = React.useState("ShowIcon");
    const inputRef = React.useRef(null);
    const onIconClick = () => {
        type === "password" ? setType("text") : setType("password");
        icon === "ShowIcon" ? setIcon("HideIcon") : setIcon("ShowIcon");
    };

    const registerHandle = () => {
        if(!value || !passValue || !nameValue) {
            alert('Заполните все поля.')
            return false
        }
        dispatch(register({email: value, password: passValue, name: nameValue}));
        history.push('/')
    }

    return (
        <div className={styles.mainRegister}>
            <p className="text text_type_main-default">Регистрация</p>
            <div className={styles.inputWrapper}>
                <Input
                    type={"email"}
                    placeholder={"Имя"}
                    onChange={(e) => setNameValue(e.target.value)}
                    value={nameValue}
                    name={"name"}
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
                    name={"password"}
                    error={false}
                    errorText={"Введите пароль"}
                    size={"default"}
                />
            </div>
            <div className={styles.inputWrapper}>
                <Button type="primary" size="default" onClick={registerHandle}>
                    Зарегистрироваться
                </Button>
            </div>
            <div className={styles.links}>
                <p className="text text-center text_type_main-small text_color_inactive">
                    Уже зарегистрированы?{" "}
                    <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
}