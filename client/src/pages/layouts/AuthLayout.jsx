import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { checkLoginStatus } from '../../features/thunks/userThunks.js';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.user);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        dispatch(checkLoginStatus())
        .catch(() => {})
        .finally(() => setChecked(true));
    }, [dispatch]);

     if (!checked) {
       return (
         <div className="m-20 text-3xl text-neutral">
           Checking your session…
         </div>
       );
     }

     // 2) Checked & not logged in?
     if (!isLoggedIn) {
       return (
         <div className="m-20 text-3xl text-neutral">
           😏 Please log in to access this content.
         </div>
       );
     }

    return <Outlet />;
};

export default AuthLayout;