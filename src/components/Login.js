import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignIn, setIsSignIN] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const name = useRef()
    const email = useRef(null)
    const password = useRef(null)

    const handleValidate = () => {
        const message = checkValidData(email.current.value, password.current.value)
        setErrorMessage(message);

        if (message) return;

        if (!isSignIn) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117'
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                        navigate('/browse');
                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });

                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                    // ..
                });
        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    navigate('/browse');
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
    }

    const handleToggle = () => {
        setIsSignIN(!isSignIn);
    }
    return (
        <div >
            <Header />
            <div className='absolute bg-gradient-to-b from-black'><img src='https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/5ff265b6-3037-44b2-b071-e81750b21783/IN-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_c6d6616f-4478-4ac2-bdac-f54b444771dd_small.jpg' alt='background_img' /></div>

            <form className='w-4/12 p-12 bg-black absolute my-32 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-lg' onSubmit={(e) => e.preventDefault()} >
                <h1 className='font-bold text-3xl py-4'>{isSignIn ? "Sign In" : "Sign Up"}</h1>
                {!isSignIn && <input ref={name} type='text' placeholder='Name' className='my-3 px-4 py-2 w-full bg-gray-700' />}
                <input ref={email} type='text' placeholder='Email Address' className='my-3 px-4 py-2 w-full bg-gray-700' />
                <input ref={password} type='password' placeholder='Password' className='my-3 px-4 py-2 w-full bg-gray-700' />
                <p className='font-bold text-red-500'>{errorMessage}</p>
                <button className='p-4 my-4 bg-red-700 w-full rounded-lg cursor-pointer' onClick={handleValidate}>{isSignIn ? "Sign In" : "Sign Up"}</button>
                <p className='py-2 font-thin cursor-pointer' onClick={handleToggle}>{isSignIn ? "New to Netflix? " : "Already Registered "} <span className='font-bold'>{isSignIn ? "Sign up now." : "Sign in."}</span> </p>
            </form>
        </div>
    )
}

export default Login
