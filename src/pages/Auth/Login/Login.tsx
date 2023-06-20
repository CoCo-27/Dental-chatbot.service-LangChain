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
  const [googleFlag, setGoogleFlag] = useState<boolean>(false);
  const [loginFlag, setLoginFlag] = useState<boolean>(false);

  //Firebase Auth
  const handleGoogleLogin = async () => {
    setGoogleFlag(true);
    auth.setPersistence(browserLocalPersistence);

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential) throw new Error('Missing credentials!');
        const token = credential.accessToken;
        const save_user = await authServices.handleGoogleAuther(
          result.user.email
        );
        console.log(save_user);
        notification.success({
          description: 'Login erfolgreich',
          message: '',
        });
        setGoogleFlag(false);
        localStorage.setItem('email', result.user.email);
        localStorage.setItem('token', token);
        setTimeout(() => {
          navigate('/');
        }, 500);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        if (
          errorCode === 'auth/cancelled-popup-request' ||
          errorCode === 'auth/popup-closed-by-user'
        ) {
          notification.info({
            description:
              'Das aktuelle Doamin ist nicht aktiv. Richten Sie eine Live-Domain ein.',
            message: '',
          });
        } else {
          notification.error({
            description: 'Firebase-Fehler',
            message: '',
          });
        }
        setGoogleFlag(false);
      });
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
              description: 'Login Fehler',
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
            description: 'Erfolgreich registriert',
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
              description: 'Registrierungsfehler',
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
          <div className="w-full  max-w-2xl z-10">
            <div className="sm:text-xl xl:text-xl font-bold leading-tight mb-6">
              Herzlich willkommen bei WunschlachenAI, Ihrem persönlichen
              Informationsportal für Dentalgesundheit! Unsere Plattform wurde
              entwickelt, um Ihnen umfangreiche und leicht verständliche
              Informationen zu verschiedenen zahnmedizinischen Themen zu
              liefern.
            </div>
            <div className="sm:text-xl xl:text-xl leading-tight mb-6">
              Melden Sie sich noch heute an und tauchen Sie ein in eine Welt
              voller wertvoller und relevanter Informationen, die speziell auf
              Ihre Bedürfnisse und Interessen abgestimmt sind. Bei
              WunschlachenAI ist unser Hauptziel, Ihr Wissen zu erweitern und
              Ihr Verständnis zu vertiefen.
            </div>
            <div className="sm:text-xl xl:text-xl leading-tight mb-6">
              Von grundlegenden Informationen bis hin zu komplexen Themen –
              WunschlachenAI ist eine gute Quelle für qualitativ hochwertige und
              aktuelle Informationen.
            </div>
            <div className="sm:text-xl xl:text-xl leading-tight mb-6">
              Erleben Sie mit WunschlachenAI, wie zugänglich und ansprechend die
              Welt der Dentalgesundheit sein kann. Wir freuen uns darauf, Sie
              auf Ihrem Weg zu mehr Wissen und einem strahlenden Lächeln zu
              begleiten!
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
                Herzlich Willkommen!
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                {!loginFlag
                  ? 'Bitte melden Sie sich in Ihrem Konto an'
                  : 'Bitte registrieren'}
              </p>
            </div>
            <div className="flex flex-row justify-center items-center space-x-3">
              <button
                type="button"
                disabled={googleFlag}
                className="w-full flex justify-center items-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                onClick={() => handleGoogleLogin()}
              >
                {googleFlag ? (
                  <Spin
                    indicator={Loading}
                    style={{
                      color: 'white',
                      width: '1.5rem',
                      height: '1.5rem',
                    }}
                  />
                ) : (
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      ></path>
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      ></path>
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      ></path>
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      ></path>
                    </svg>
                  </div>
                )}

                <span className="ml-4">Anmelden mit Google</span>
              </button>
            </div>
            <div className="flex items-center gap-1 justify-center">
              <span className="h-px w-32 bg-gray-200"></span>
              <span className="text-gray-300 font-normal">oder weiter mit</span>
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
                        Vorname
                      </label>
                      <input
                        id="firstName"
                        required
                        className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                        type="first_name"
                        placeholder="Vorname"
                      />
                    </div>
                    <div className="mt-8 content-center">
                      <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                        Nachname
                      </label>
                      <input
                        id="lastName"
                        required
                        className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                        type="last_name"
                        placeholder="Nachname"
                      />
                    </div>
                  </>
                )}
                <div className="mt-8 content-center">
                  <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                    E-Mail
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
                  Passwort
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
                      Erinnere mich
                    </label>
                  </div>
                  <div className="text-sm">
                    <div className="text-indigo-400 hover:text-blue-500 cursor-pointer">
                      Haben Sie Ihr Passwort vergessen?
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
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
                    'Anmelden'
                  ) : (
                    'Anmeldung'
                  )}
                </button>
              </div>
              <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                <span>
                  {!loginFlag
                    ? `Haben Sie kein Konto?`
                    : 'Haben Sie ein Konto?'}
                </span>
                <div
                  className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                  onClick={() => setLoginFlag(!loginFlag)}
                >
                  {!loginFlag ? 'Anmeldung' : 'Anmelden'}
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
