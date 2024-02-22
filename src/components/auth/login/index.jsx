import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/authContext';

const Login = () => {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!isSigningIn) {
            if (!email.includes('@') || !email.includes('.com')) {
                setErrorMessage('Email must contain "@" and ".com"');
            } else if (password.length < 8) {
                setErrorMessage('Password must be at least 8 characters long');
            } else {
                setIsSigningIn(true);
                try {
                    await doSignInWithEmailAndPassword(email, password);
                } catch (error) {
                    setErrorMessage(error.message);
                }
            }
        }
    };

    return (
        <div>
            {userLoggedIn && <Navigate to={'/home'} replace={true} />}

            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="text-center">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Welcome Back</h3>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-5">
                        <div>
                            <label className="text-sm text-gray-600 font-bold">Email</label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 font-bold">Password</label>
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>
                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}
                        <button
                            type="submit"
                            
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                             Sign In
                        </button>
                    </form>
                    <Link className='text-sm text-blue-600 underline text-right' to={'/register'}>Register New Account</Link>
                </div>
            </main>
        </div>
    );
};

export default Login;
