import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { notification, Spin } from 'antd';

import auth from '../FirebaseConfig';
import authServices from 'src/services/authServices';
import setAuthToken from 'src/utils/setAuthToken';
import Loading from 'src/components/Icon/Loader';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [loginFlag, setLoginFlag] = useState<boolean>(false);

  //Firebase Auth
  const handleGoogleLogin = async () => {
    auth.setPersistence(browserLocalPersistence);

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    const loginResult = await signInWithPopup(auth, provider);

    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(loginResult);
    if (!credential) throw new Error('Missing credentials!');

    //////////////////
    const result = await authServices.handleGoogleAuther(
      loginResult.user.email
    );
    ///////////////////

    notification.success({
      description: 'Login Success',
      message: '',
    });
    // localStorage.setItem('token', loginResult.user.getIdToken);
    localStorage.setItem('email', loginResult.user.email);
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!loginFlag) {
      const data = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      authServices
        .authLogin(data)
        .then((result) => {
          notification.success({
            description: result.data.message,
            message: '',
          });
          setLoading(false);
          localStorage.setItem('email', result.data.data.email);
          localStorage.setItem('token', result.data.data.accessToken);
          setAuthToken(localStorage.getItem('token'));
          setTimeout(() => {
            navigate('/');
          }, 500);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            notification.error({
              description: error.response.data.message,
              message: '',
            });
          } else {
            notification.error({
              description: 'Login Error',
              message: '',
            });
          }
        });
    } else {
      const data = {
        first_name: e.target.firstName.value,
        last_name: e.target.lastName.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };
      authServices
        .authRegister(data)
        .then((result) => {
          notification.success({
            description: 'Register Success',
            message: '',
          });
          setLoading(false);
          setLoginFlag(false);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            notification.error({
              description: `${error.response.data.message}`,
              message: '',
            });
          } else {
            notification.error({
              description: 'Register Error',
              message: '',
            });
          }
        });
    }
  };

  return (
    <div className="relative min-h-screen flex ">
      <div className="flex sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
        <div
          className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1579451861283-a2239070aaa9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
          }}
        >
          <div className="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0"></div>
          <div className="w-full  max-w-md z-10">
            <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
              Welcome to our dental assistant..
            </div>
            <div className="sm:text-sm xl:text-md text-gray-200 font-normal">
              {' '}
              Our dental assistant brings expertise in dental management,
              business development, and patient experience. By working with our
              consultant, you can expect greater revenue, enhanced patient
              satisfaction, increased efficiency, and cost savings. Our
              consultant takes an individualized approach to each dental
              practice and designs a unique strategy that suits your needs.
            </div>
          </div>
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Welcome!
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                {!loginFlag
                  ? 'Please sign in to your account'
                  : 'Please sign up'}
              </p>
            </div>
            <div className="flex flex-row justify-center items-center space-x-3">
              <a
                href="https://www.behance.net/ajeeshmon"
                target="_blank"
                className="w-11 h-11 items-center justify-center inline-flex rounded-2xl font-bold text-lg   bg-blue-900 hover:shadow-lg cursor-pointer transition ease-in duration-300"
                rel="noreferrer"
              >
                <img
                  alt=""
                  className="w-4 h-4"
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGQ9Im0xNS45OTcgMy45ODVoMi4xOTF2LTMuODE2Yy0uMzc4LS4wNTItMS42NzgtLjE2OS0zLjE5Mi0uMTY5LTMuMTU5IDAtNS4zMjMgMS45ODctNS4zMjMgNS42Mzl2My4zNjFoLTMuNDg2djQuMjY2aDMuNDg2djEwLjczNGg0LjI3NHYtMTAuNzMzaDMuMzQ1bC41MzEtNC4yNjZoLTMuODc3di0yLjkzOWMuMDAxLTEuMjMzLjMzMy0yLjA3NyAyLjA1MS0yLjA3N3oiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9zdmc+"
                />
              </a>
              <button
                className="w-11 h-11 items-center justify-center inline-flex rounded-2xl font-bold text-lg  text-white bg-blue-400 hover:shadow-lg cursor-pointer transition ease-in duration-300"
                onClick={()=>handleGoogleLogin()}
              >
                <svg className="w-4" viewBox="0 0 533.5 544.3">
                  <path
                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                    fill="white"
                  ></path>
                  <path
                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                    fill="white"
                  ></path>
                  <path
                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                    fill="white"
                  ></path>
                  <path
                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                    fill="white"
                  ></path>
                </svg>
              </button>
              <a
                href="https://in.linkedin.com/in/ajeeshmon"
                target="_blank"
                className="w-11 h-11 items-center justify-center inline-flex rounded-2xl font-bold text-lg  text-white bg-blue-500 hover:shadow-lg cursor-pointer transition ease-in duration-300"
                rel="noreferrer"
              >
                <img
                  alt=""
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGQ9Im0yMy45OTQgMjR2LS4wMDFoLjAwNnYtOC44MDJjMC00LjMwNi0uOTI3LTcuNjIzLTUuOTYxLTcuNjIzLTIuNDIgMC00LjA0NCAxLjMyOC00LjcwNyAyLjU4N2gtLjA3di0yLjE4NWgtNC43NzN2MTYuMDIzaDQuOTd2LTcuOTM0YzAtMi4wODkuMzk2LTQuMTA5IDIuOTgzLTQuMTA5IDIuNTQ5IDAgMi41ODcgMi4zODQgMi41ODcgNC4yNDN2Ny44MDF6IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtLjM5NiA3Ljk3N2g0Ljk3NnYxNi4wMjNoLTQuOTc2eiIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiI+PC9wYXRoPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTIuODgyIDBjLTEuNTkxIDAtMi44ODIgMS4yOTEtMi44ODIgMi44ODJzMS4yOTEgMi45MDkgMi44ODIgMi45MDkgMi44ODItMS4zMTggMi44ODItMi45MDljLS4wMDEtMS41OTEtMS4yOTItMi44ODItMi44ODItMi44ODJ6IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+PC9nPjwvc3ZnPg=="
                  className="w-4 h-4"
                />
              </a>
            </div>
            <div className="flex items-center gap-1 justify-center">
              <span className="h-px w-32 bg-gray-200"></span>
              <span className="text-gray-300 font-normal">
                or continue with
              </span>
              <span className="h-px w-32 bg-gray-200"></span>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleAuth}>
              <input type="hidden" name="remember" value="true" />
              <div className="relative">
                {!loginFlag ? (
                  <></>
                ) : (
                  <>
                    <div className="mt-8 content-center">
                      <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        required
                        className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                        type="first_name"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="mt-8 content-center">
                      <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        required
                        className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                        type="last_name"
                        placeholder="Last Name"
                      />
                    </div>
                  </>
                )}
                <div className="mt-8 content-center">
                  <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                    Email
                  </label>
                  <input
                    id="email"
                    required
                    className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="mt-8 content-center">
                <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                  Password
                </label>
                <input
                  id="password"
                  required
                  className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              {!loginFlag ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <div className="text-indigo-400 hover:text-blue-500 cursor-pointer">
                      Forgot your password?
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                  disabled={loading}
                >
                  {loading ? (
                    <Spin
                      indicator={Loading}
                      style={{
                        color: 'white',
                        width: '1.5rem',
                        height: '1.5rem',
                      }}
                    />
                  ) : !loginFlag ? (
                    'Sign in'
                  ) : (
                    'Sign up'
                  )}
                </button>
              </div>
              <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                <span>
                  {!loginFlag ? `Don't have an account?` : 'Have you account?'}
                </span>
                <div
                  className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                  onClick={() => setLoginFlag(!loginFlag)}
                >
                  {!loginFlag ? 'Sign up' : 'Sign in'}
                </div>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
