import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { checkLoginStatus } from '../../features/thunks/userThunks.js';
import { Outlet } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

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
         <div className='w-full h-screen bg-base-300 flex flex-col items-center justify-center'>
          <ScaleLoader color="#b30808"/> 
          <p className='text-lg'>Checking your session....</p> 
         </div>
       );
     }

     // 2) Checked & not logged in?
     if (!isLoggedIn) {
       return (
         <div className="w-full h-screen bg-base-300 flex flex-col items-center justify-center">
           <ScaleLoader color="#b30808" />
           <p className="text-lg">😏 Please log in the access this content..</p>
         </div>
       );
     }

    return <Outlet />;
};

export default AuthLayout;