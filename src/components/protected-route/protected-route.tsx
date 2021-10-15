import { Route, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";

import { refreshTokenFunc } from "../../services/reducers/authSlice";

export function ProtectedRoute({ children, path: string, ...rest }: {children: JSX.Element, path: string, exact: boolean}) {
    const [isTokenValidated, setIsTokenValidated] = useState(false)
    const [notAuth, setNotAuth] = useState(true)

    useEffect(() => {
        refreshTokenFunc()
            .then((result) => {
                if (result.success) {
                    setIsTokenValidated(true)
                } else {
                    setIsTokenValidated(false)
                }
            })
            .catch((err) => {
                setNotAuth(false)
            })
    }, []);

    if (isTokenValidated === false && notAuth) { return <h2>Загружаем...</h2>; }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isTokenValidated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
