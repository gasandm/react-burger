import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

import { getUserDetails } from "../../services/reducers/authSlice";
import { ILocation } from "../../utils/types";

export function ProtectedAuthRoute({ children, path, ...rest }: {children: JSX.Element, path: string, exact: boolean}) {
    const user = useSelector((store) => store.auth.success);
    const dispatch = useDispatch()
    const location = useLocation<ILocation>()

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
