import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { getUserDetails } from "../../services/reducers/authSlice";

export function ProtectedRoute({ children, ...rest }) {
    const user = useSelector((store) => store.auth.success);
    const [isUserLoaded, setUserLoaded] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const getDetails = async () => {
            if (!isUserLoaded) {
                dispatch(getUserDetails());
                setUserLoaded(true);
            } else {
                setUserLoaded(true);
            }
        };
        getDetails();
    }, [dispatch]);

    if (!isUserLoaded) { return 'Загружаем...'; }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (
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
