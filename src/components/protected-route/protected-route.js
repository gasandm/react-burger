import { Route, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";

import { refreshTokenFunc } from "../../services/reducers/authSlice";

export function ProtectedRoute({ children, ...rest }) {
    const [isTokenValidated, setIsTokenValidated] = useState(null)
    const [notAuth, setNotAuth] = useState(true)

    useEffect(() => {
        refreshTokenFunc()
            .then((result) => {
                if (result.success) {
                    setIsTokenValidated(true)
                } else {
                    setIsTokenValidated(null)
                }
            })
            .catch((err) => {
                setNotAuth(false)
            })
    }, []);

    if (isTokenValidated === null && notAuth) { return <h2>Загружаем...</h2>; }

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
