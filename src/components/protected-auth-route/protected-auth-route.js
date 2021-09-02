import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';

import { getUserDetails, setUserDetails } from "../../services/reducers/authSlice";

export function ProtectedAuthRoute({ children, ...rest }) {
    const user = useSelector(store => store.auth.success)
    const [isUserLoaded, setUserLoaded] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
      if(!user) {
        dispatch(getUserDetails())
        setUserLoaded(true)
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
          to={{
            pathname: '/'
          }}
          />
        )
      }
    />
  );
}