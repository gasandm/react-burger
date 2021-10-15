import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
    Button,
    Input
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./pages.module.scss";


export function ForgotPassword() {
    const forgotPassAPI = "https://norma.nomoreparties.space/api/password-reset"

    const history = useHistory()
    const [value, setValue] = useState("")

    const onForgotHandle = (e: any) => {
        e.preventDefault();
        fetch(forgotPassAPI, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ email: value })
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
            <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
            <form onSubmit={onForgotHandle}>
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
                    <Button type="primary" size="medium">
                        Восстановить
                    </Button>
                </div>
            </form>
            <div className={styles.links}>
                <p className="text text-center text_type_main-small text_color_inactive">
                    Вспомнили пароль?{" "}
                    <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
}