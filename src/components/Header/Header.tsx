import HEADER from 'src/constants/menu.json';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { notification } from 'antd';

import authServices from 'src/services/authServices';
import { isEmpty } from 'src/utils/isEmpty';
import Logo from '../../assets/img/Logo.svg';

import { useViewport } from 'src/utils';
type Props = {
  menu: any;
  isSmall?: boolean;
  isSign?: boolean;
};

const Header = ({ menu, isSmall, isSign }: Props) => {
  const MENU_ITEMS = HEADER;
  const location = useLocation();
  const navigate = useNavigate();
  const viewport = useViewport();
  const [isOpen, setIsOpen] = useState(false);
  const [logFlag, setLogFlag] = useState(
    isEmpty(localStorage.getItem('token')) ? 'false' : 'true'
  );

  const handleGoSection = (item: any) => {
    document.getElementById(item).scrollIntoView({ behavior: 'smooth' });
  };

  const handleGoPage = (path: string) => {
    if (path === 'logOut') {
      const data = {
        email: localStorage.getItem('email'),
      };

      authServices
        .logOut(data)
        .then((result) => {
          notification.success({
            description: result.data.message,
            message: '',
            duration: 2,
          });
          localStorage.clear();
          setLogFlag('true');
          navigate('/login');
        })
        .catch((error) => {
          console.log(error);
          notification.error({
            description: error.response.data.message,
            message: '',
            duration: 2,
          });
        });
    } else if (path === 'home') {
      navigate('/');
    } else {
      navigate('/' + path);
    }
  };

  return (
    <Menu>
      <div
        className={`w-full flex text-navy-700 items-center font-semibold justify-between bg-gradient-to-r from-[#f5f5f5] to-teal-100 shadow-md z-10 px-3 transition-all duration-300 h-[90px]
			`}
      >
        <img
          src={Logo}
          className="cursor-pointer transition-all duration-300 opacity-1"
          width={isSmall ? '150' : '250' && viewport === 'xs' ? '150' : '250'}
          alt="Logo"
          onClick={() => handleGoPage('home')}
        />

        <div className="flex justify-between">
          <div className="hidden mobile:block">
            {location.pathname !== '/login' && (
              <div
                className={`flex gap-8 h-fit items-center ${
                  location.pathname === '/login' && 'hidden'
                }`}
              >
                {MENU_ITEMS &&
                  MENU_ITEMS.length > 0 &&
                  MENU_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleGoPage(item.id)}
                      className="cursor-pointer rounded hover:bg-[#1976d22f] px-2 py-1 transition-all duration-150 ease-out"
                    >
                      <div
                        key={item.id}
                        className="text-sm font-['Chakra Petch'] leading-[22px]"
                      >
                        {item.name}
                      </div>
                    </div>
                  ))}

                {logFlag === 'true' ? (
                  <button
                    className={` ml-10 mr-5 flex w-44 rounded-lg bg-[#0071b2] p-3 py-3 px-6 text-lg text-white font-semibold text-txGray shadow-sm hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.3),0_4px_18px_0_rgba(51,45,45,0.2)] lg:ml-32 xl:my-auto xl:ml-0 justify-center`}
                    onClick={() => handleGoPage('logOut')}
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                    </svg>
                    <span className="ml-4">LOG OUT</span>
                  </button>
                ) : (
                  <button
                    className={` ml-10 mr-5 flex w-44 rounded-lg bg-[#0071b2] p-3 py-3 px-6 text-lg text-white font-semibold text-txGray shadow-sm hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.3),0_4px_18px_0_rgba(51,45,45,0.2)] lg:ml-32 xl:my-auto xl:ml-0 justify-center`}
                    onClick={() => handleGoPage('login')}
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                    </svg>
                    <span className="ml-4">LOGIN</span>
                  </button>
                )}
              </div>
            )}
          </div>
          {location.pathname !== '/login' && (
            <div className="relative">
              <div className="flex mobile:hidden bg-gray-100">
                <Menu.Button
                  // onClick={() => setIsOpen(!isOpen)}
                  className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                {(ref) => (
                  <div className="mobile:hidden" id="mobile-menu">
                    <div
                      ref={ref}
                      className="px-2 top-[25px] right-[-11px] absolute pb-3 space-y-3 -px-5 bg-gray-100"
                    >
                      {MENU_ITEMS &&
                        MENU_ITEMS.length > 0 &&
                        MENU_ITEMS.map((item) => (
                          <button
                            className={`${'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            key={item.id}
                            onClick={() => handleGoPage(item.id)}
                          >
                            <div
                              key={item.id}
                              className="text-[16px] font-['Chakra Petch'] leading-[22px]"
                            >
                              {item.name}
                            </div>
                          </button>
                        ))}
                      {logFlag === 'true' ? (
                        <button
                          className={`mx-4 flex w-36 rounded-lg bg-indigo-500 py-3 text-sm text-white font-semibold text-txGray shadow-sm hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.3),0_4px_18px_0_rgba(51,45,45,0.2)] lg:ml-32 xl:my-auto xl:ml-0 justify-center`}
                          onClick={() => handleGoPage('logOut')}
                        >
                          <span>LOG OUT</span>
                        </button>
                      ) : (
                        <button
                          className={`mx-4 flex w-36 rounded-lg bg-indigo-500 py-3 text-sm text-white font-semibold text-txGray shadow-sm hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.3),0_4px_18px_0_rgba(51,45,45,0.2)] lg:ml-32 xl:my-auto xl:ml-0 justify-center`}
                          onClick={() => handleGoPage('login')}
                        >
                          <span>LOGIN</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </Transition>
            </div>
          )}
        </div>
      </div>
    </Menu>
  );
};
function MoveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}

export default Header;
