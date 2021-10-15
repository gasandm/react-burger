import { useState, useRef } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./pages.module.scss";
import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

export function ResetPassword() {
    const forgotPassAPI = "https://norma.nomoreparties.space/api/password-reset";
    const [value, setValue] = useState("")
    const [passValue, setPassValue] = useState("")
    const [icon, setIcon]: [icon: keyof TICons | undefined, setIcon: Function] = useState("ShowIcon");
    const [type, setType]: [type: "text" | "password", setType: Function] = useState("password");
    const inputRef = useRef(null)
    const onIconClick = () => {
        type === "password" ? setType("text") : setType("password")
        icon === "ShowIcon" ? setIcon("HideIcon") : setIcon("ShowIcon")
    };

    const history = useHistory()
    const isForgot = localStorage.getItem('isForgot')

    const onResetHandle = (e: any) => {
        e.preventDefault();
        fetch(`${forgotPassAPI}/reset`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ password: passValue, token: value })
        })
            .then((res) => {
                if (!res.ok) return Promise.reject(`Не удалось сбросить пароль. Ошибка ${res.status}`)

                return res.json();
            })
            .then((res) => {
                localStorage.setItem('isForgot', '0')
                history.push("/login")
                return res;
            })
            .catch((error) => {
                alert(error);
                return false;
            })
    }

    return (
        isForgot === '1' ? (
            <div className={styles.main}>
                <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
                <form onSubmit={onResetHandle}>
                    <div className={styles.inputWrapper}>
                        <Input
                            type={type}
                            ref={inputRef}
                            onIconClick={onIconClick}
                            onChange={(e) => setPassValue(e.target.value)}
                            value={passValue}
                            placeholder={"Введите новый пароль"}
                            icon={icon}
                            name={"name"}
                            error={false}
                            errorText={"Введите пароль"}
                            size={"default"}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <Input
                            type={"text"}
                            placeholder={"Введите код из письма"}
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                            name={"name"}
                            error={false}
                            errorText={"Введите код"}
                            size={"default"}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <Button type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>
                </form>
                <div className={styles.links}>
                    <p className="text text-center text_type_main-small text_color_inactive">
                        Вспомнили пароль? <Link to="/login">Войти</Link>
                    </p>
                </div>
            </div>
        ) : (
            <Redirect
                to={{
                    pathname: '/forgot-password'
                }}
            />
        )
    );
}
