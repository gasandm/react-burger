import { useState, useRef, useEffect } from "react";
import {
    Button,
    Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../utils/hooks";

import { SideMenu } from "../components/side-menu/side-menu";

import { setUserDetails, getUserDetails } from "../services/reducers/authSlice";

import styles from "./pages.module.scss";


export function ProfilePage() {
    const user = useSelector(store => store.auth.user)
    const dispatch = useDispatch()
    const [value, setValue] = useState(user.email)
    const [passValue, setPassValue] = useState("")
    const [nameValue, setNameValue] = useState(user.name)
    const inputRef = useRef(null)
    const [userLoaded, setUserLoaded] = useState(false)

    const editUserHandle = (e: any) => {
        e.preventDefault();
        dispatch<any>(setUserDetails({ email: value, name: nameValue, password: passValue }))
    }

    const onResetHandle = () => {
        setValue(user.email)
        setNameValue(user.name)
        setPassValue('')
    }

    useEffect(() => {
        dispatch<any>(getUserDetails())
            // @ts-ignore
            .then((result) => {
                if (result.payload?.success) {
                    setUserLoaded(true)
                } else {
                    setUserLoaded(false)
                }
            })
    }, [dispatch])

    return (
        userLoaded ? (
            <div className={styles.mainProfile}>
                <SideMenu />
                <div className={styles.inputMainWrapper}>
                    <form onSubmit={editUserHandle}>
                        <div className={styles.inputWrapper}>
                            <Input
                                type={"text"}
                                placeholder={"Имя"}
                                onChange={(e) => setNameValue(e.target.value)}
                                value={nameValue || ''}
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
                                value={value || ''}
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
                    </form>
                    <div className={styles.inputWrapper}>
                        <Button onClick={onResetHandle} type="secondary" size="medium">
                            Отмена
                        </Button>
                        <Button onClick={editUserHandle} type="primary" size="medium">
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
