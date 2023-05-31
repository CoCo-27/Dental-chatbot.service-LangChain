import React, { useEffect, useState } from 'react';
import './Message.css';

const FAQChatMessage = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    props.box_ref.current.scrollTop = props.box_ref.current.scrollHeight;
  }, [props.message]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  });

  return (
    <div
      className={`flex items-end ${props.status === true ? '' : 'justify-end'}`}
    >
      {props.status === true ? (
        <div className="flex items-start group answer-in">
          <div className="flex items-center justify-center px-1 xl:px-0 w-[40px] h-[40px] text-white text-xl rounded-full order-1 bg-[#84909d]">
            Da.
          </div>
          <div className="flex flex-row space-y-2 text-sm max-w-xl mx-2 order-1 items-start">
            <div className="relative top-[16px] left-[15px]">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="30px"
                height="30px"
                viewBox="0,0,256,256"
              >
                <g
                  fill="#84909d"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style={{ mixBlendMode: 'normal' }}
                >
                  <g transform="translate(229.47006,-25.69412) rotate(90) scale(10.66667,10.66667)">
                    <path d="M4,9l8,8l8,-8z"></path>
                  </g>
                </g>
              </svg>
            </div>
            <div>
              <span
                className={`py-4 rounded-lg inline-block text-white text-base bg-[#84909d] ${
                  props.message === '...' ? '' : 'px-4'
                }`}
              >
                {props.message === '...' ? (
                  <div className={`flex flex-row ${isVisible ? 'pr-6' : ''}`}>
                    <div className="spinner">
                      <div className="bounce1"></div>
                      <div className="bounce2"></div>
                      <div className="bounce3"></div>
                    </div>
                    {isVisible && (
                      <p className={isVisible ? 'fade-in' : 'fade-out'}>
                        Give me just a moment
                      </p>
                    )}
                  </div>
                ) : (
                  props.message
                )}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-end items-end fade-in">
          <div className="flex flex-col space-y-2 text-sm max-w-xl mx-2 order-1 items-end">
            <div>
              {props.isButton === true ? (
                <button
                  className="bg-transparent text-[#1976d2] font-semibold rounded py-2 px-4 text-base border border-[#1976d280] border-solid hover:border-[#1976d2] hover:bg-[#1976d20a]"
                  onClick={() => props.onClick(props.message)}
                >
                  {props.message}
                </button>
              ) : (
                <div
                  className={`rounded-lg inline-block bg-[#1976d2] text-white text-base p-4`}
                >
                  {props.message}
                </div>
              )}
            </div>
          </div>

          {props.isButton === true ? (
            <></>
          ) : (
            <>
              <div className="relative top-[-2px] right-[21px] order-1">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="30px"
                  height="30px"
                  viewBox="0,0,256,256"
                >
                  <g
                    fill="#1976d2"
                    fillRule="nonzero"
                    stroke="none"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray=""
                    strokeDashoffset="0"
                    fontFamily="none"
                    fontWeight="none"
                    fontSize="none"
                    textAnchor="none"
                    style={{ mixBlendMode: 'normal' }}
                  >
                    <g transform="translate(9.55083,234.24707) rotate(-90) scale(10.66667,10.66667)">
                      <path d="M4,9l8,8l8,-8z"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="bg-[#1976d2] w-[56px] h-[40px] flex justify-center items-center rounded-full order-2 p-1">
                <svg
                  className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiAvatar-fallback css-13y7ul3"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="PersonIcon"
                >
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    fill="white"
                  ></path>
                </svg>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FAQChatMessage;
