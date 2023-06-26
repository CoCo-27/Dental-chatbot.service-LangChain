import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react';
import ChatMiddle from 'src/components/Chat/Chat';
import RightBar from 'src/components/ChatRight/ChatRight';
import greeting from '../../config/greeting';

function getCurrentDimension() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

const Chat = () => {
  const navigate = useNavigate();
  const [extraData, setExtraData] = useState({});
  const [showButton, setShowButton] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [array, setArray] = useState(
    JSON.parse(localStorage.getItem('open_chat_history'))
      ? JSON.parse(localStorage.getItem('open_chat_history'))
      : [
          {
            message: greeting,
            flag: true,
            isButton: false,
            language: 'english',
          },
        ]
  );

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener('resize', updateDimension);

    if (screenSize.width <= 1200) {
      setShowButton(false);
    } else setShowButton(null);
    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, [screenSize]);

  return (
    <>
      <div className={`w-full h-full flex max-[1024px]:w-full flex-col`}>
        {showButton === false ? (
          <div className={`w-full flex shadow-[#0000002b]`}>
            {isClicked === true ? (
              <>
                <button
                  className="bg-white hover:bg-[#0000000a] w-1/2 flex justify-center items-center py-4"
                  onClick={() => setIsClicked(false)}
                >
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeMedium css-jxtyyz"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    width={'20px'}
                    height={'20px'}
                    data-testid="ArrowBackIosNewTwoToneIcon"
                  >
                    <path d="M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z"></path>
                  </svg>
                </button>
                <button className="bg-white hover:bg-[#0000000a] w-1/2 justify-center items-center flex gap-2 py-4">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeMedium css-jxtyyz"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="BookTwoToneIcon"
                    width={'2rem'}
                    height={'2rem'}
                    fill="#1976d2"
                  >
                    <path
                      d="m13 13-3-2.25L7 13V4H6v16h12V4h-5z"
                      opacity=".3"
                    ></path>
                    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z"></path>
                  </svg>
                  Behandlung
                </button>
              </>
            ) : (
              <button
                className="flex bg-white hover:bg-[#0000000a] w-full justify-center items-center gap-2 py-4"
                onClick={() => setIsClicked(true)}
              >
                <svg
                  className="MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeMedium css-jxtyyz"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="BookTwoToneIcon"
                  width={'2rem'}
                  height={'2rem'}
                  fill="#1976d2"
                >
                  <path
                    d="m13 13-3-2.25L7 13V4H6v16h12V4h-5z"
                    opacity=".3"
                  ></path>
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z"></path>
                </svg>
                Behandlung
              </button>
            )}
          </div>
        ) : (
          <></>
        )}
        <div
          className={`w-full flex flex-row ${
            showButton === false ? 'h-[calc(100%-64px)]' : 'h-full'
          }`}
        >
          <div className="flex w-full xl:w-8/12">
            <ChatMiddle
              extraData={extraData}
              array={array}
              setArray={setArray}
            />
          </div>
          <div
            className={`h-full w-[560px] xl:w-4/12 flex absolute xl:relative z-10 transition-all 
            ${isClicked === true ? '!right-0 pb-[90px] !w-full' : ''}
            ${
              showButton === false
                ? `right-[-560px]`
                : showButton === true
                ? 'right-0 pb-[90px]'
                : ''
            }`}
          >
            <RightBar
              showButton={showButton}
              extraData={extraData}
              setExtraData={setExtraData}
              array={array}
              setArray={setArray}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
