import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, useHistory } from "react-router-dom";
import {
    Button,
    Input
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./pages.module.scss";

//import { useAuth } from '../services/auth';


export function ForgotPassword() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [value, setValue] = useState("")

    const forgotPassAPI = "https://norma.nomoreparties.space/api/password-reset"

    const onForgotHandle = () => {
        fetch(forgotPassAPI, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({email: value})
        })
        .then((res) => {
            if (!res.ok) return Promise.reject(`Не удалось отправить код на почту. Ошибка ${res.status}`)

            return res.json();
        })
        .then((res) => {
            localStorage.setItem('isForgot', '1')
            history.push("/reset-password")
            return res;
        })
        .catch((error) => {
            alert(error);
            return false;
        })
    }

    return (
        <div className={styles.main}>
            <p className="text text_type_main-default">Восстановление пароля</p>
            <div className={styles.inputWrapper}>
                <Input
                    type={"email"}
                    placeholder={"Укажите e-mail"}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    name={"email"}
                    error={false}
                    errorText={"Введите e-mail"}
                    size={"default"}
                />
            </div>
            <div className={styles.inputWrapper}>
                <Button onClick={onForgotHandle} type="primary" size="default">
                    Восстановить
                </Button>
            </div>
            <div className={styles.links}>
                <p className="text text-center text_type_main-small text_color_inactive">
                    Вспомнили пароль?{" "}
                    <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
}