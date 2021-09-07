import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { getUserDetails } from "../../services/reducers/authSlice";

export function ProtectedAuthRoute({ children, ...rest }) {
    const user = useSelector((store) => store.auth.success);
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        if (!user) {
            dispatch(getUserDetails());
        }
    }, [dispatch]);

    return (
        <Route
            {...rest}
            render={() =>
                !user ? (
                    children
                ) : (
                    <Redirect
                        to={ location.state?.from || '/' }
                    />
                )
            }
        />
    );
}
