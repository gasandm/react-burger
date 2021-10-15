import React from "react";
import { useDispatch } from "../utils/hooks";
import { Link } from "react-router-dom";
import {
    Button,
    Input
} from "@ya.praktikum/react-developer-burger-ui-components";

import { login } from "../services/reducers/authSlice";

import styles from "./pages.module.scss";
import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";


export function LoginPage() {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState("");
    const [passValue, setPassValue] = React.useState("");
    const [icon, setIcon]: [icon: keyof TICons | undefined, setIcon: Function] = React.useState("ShowIcon");
    const [type, setType]: [type: "text" | "password", setType: Function] = React.useState("password");
    const inputRef = React.useRef(null);

    const onIconClick = () => {
        type === "password" ? setType("text") : setType("password");
        icon === "ShowIcon" ? setIcon("HideIcon") : setIcon("ShowIcon");
    };

    const loginHandle = (e: any) => {
        e.preventDefault();
        if (!value || !passValue) {
            alert('Заполните все поля.')
            return false
        }
        dispatch<any>(login({ email: value, password: passValue }));
    }

    return (
        <div className={styles.main}>
            <p className="text text_type_main-medium mb-6">Вход</p>
            <form onSubmit={loginHandle}>
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
                    <Button type="primary" size="medium">
                        Войти
                    </Button>
                </div>
            </form>
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
