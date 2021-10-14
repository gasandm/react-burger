import { useState, useRef } from "react";
import { useDispatch } from "../utils/hooks";
import { Link, useHistory } from "react-router-dom";
import {
    Button,
    Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

import { register } from "../services/reducers/authSlice";

import styles from "./pages.module.scss";


export function RegisterPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [value, setValue] = useState("");
    const [passValue, setPassValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [type, setType]: [type: "text" | "password", setType: Function] = useState("password");
    const [icon, setIcon]: [icon: keyof TICons | undefined, setIcon: Function] = useState("ShowIcon");
    const inputRef = useRef(null);

    const onIconClick = () => {
        type === "password" ? setType("text") : setType("password");
        icon === "ShowIcon" ? setIcon("HideIcon") : setIcon("ShowIcon");
    };

    const registerHandle = () => {
        if (!value || !passValue || !nameValue) {
            alert('Заполните все поля.')
            return false
        }
        dispatch<any>(register({ email: value, password: passValue, name: nameValue }));
        history.push('/')
    }

    return (
        <div className={styles.mainRegister}>
            <p className="text text_type_main-medium mb-6">Регистрация</p>
            <form onSubmit={registerHandle}>
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
            </form>
            <div className={styles.inputWrapper}>
                <Button type="primary" size="medium" onClick={registerHandle}>
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