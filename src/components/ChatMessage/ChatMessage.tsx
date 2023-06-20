import React, { useEffect, useState } from 'react';
// import translate from 'translate';
import historyServices from '../../services/historyServices';
import './Message.css';

const ChatMessage = (props) => {
  const [suggestion, setSuggestion] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [disable, setDisable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // const fetchData = async (string, lang) => {
  //   const value = await translate(string, {
  //     engine: 'deepl',
  //     key: '3d0aa190-bffa-1a00-d4b7-57bac54cab9d:fx',
  //     to: lang === 'english' ? 'en' : 'de',
  //   });
  //   setText(value);
  // };

  useEffect(() => {
    props.box_ref.current.scrollTop = props.box_ref.current.scrollHeight;
    // fetchData(props.message, props.language);
  }, [props.message]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  });

  const handleRating = async (index, type) => {
    if (disable !== true) {
      if (type === 'suggestion') {
        setSuggestion(!suggestion);
      } else setDislike(!dislike);
      setDisable(true);
      const data = {
        value: JSON.parse(localStorage.getItem('open_chat_history'))[index - 1]
          .message,
        rating: type,
      };
      historyServices
        .addQuestion(data)
        .then((result) => {})
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div
      className={`flex items-end ${props.status === true ? '' : 'justify-end'}`}
    >
      {props.status === true ? (
        <div className="flex items-start group answer-in">
          <div className="flex items-center justify-center px-1 xl:px-0 w-[40px] h-[40px] text-white text-xl rounded-full order-1 bg-[#84909d]">
            WL
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
                        Einen kleinen Augenblick bitte
                      </p>
                    )}
                  </div>
                ) : (
                  props.message
                )}
              </span>
            </div>
          </div>
          <div
            className={`w-4 h-full flex flex-col justify-start order-2 ${
              props.index === 0 ? 'hidden' : ''
            }`}
          >
            <button
              className={`invisible group-hover:visible focus:visible text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300`}
              onClick={() => handleRating(props.index, 'suggestion')}
            >
              <img
                src={`${
                  suggestion === true
                    ? 'https://img.icons8.com/?size=48&id=85618&format=png'
                    : 'https://img.icons8.com/?size=48&id=85608&format=png'
                }`}
                alt=""
                width={'24px'}
                height={'24px'}
              />
            </button>
            <button
              className={`invisible group-hover:visible focus:visible text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300`}
              onClick={() => handleRating(props.index, 'dislike')}
            >
              <img
                src={`${
                  dislike === true
                    ? 'https://img.icons8.com/?size=48&id=87726&format=png'
                    : 'https://img.icons8.com/?size=48&id=87695&format=png'
                }`}
                alt=""
                width={'24px'}
                height={'24px'}
              />
            </button>
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
              <div className="bg-[#1976d2] w-[40px] h-[40px] flex items-center rounded-full order-2 p-1">
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

export default ChatMessage;
