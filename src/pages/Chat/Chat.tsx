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
      <div className="w-full flex justify-center max-[1024px]:w-full">
        <div className="flex w-full xl:w-8/12">
          <ChatMiddle extraData={extraData} array={array} setArray={setArray} />
        </div>
        <div
          className={`h-full w-[390px] flex xl:w-4/12 absolute xl:relative z-10 transition-all ${
            showButton === false
              ? 'right-[-390px]'
              : showButton === true
              ? 'right-0'
              : ''
          }`}
        >
          <div
            className={`absolute p-2 ${
              showButton === null ? 'left-0 top-0' : 'left-[-40px]'
            }`}
            onClick={() => setShowButton(!showButton)}
          >
            {showButton === false ? (
              <IconChevronsLeft className="text-[30px] font-bold text-black" />
            ) : showButton === true ? (
              <IconChevronsRight className="text-[30px] font-bold text-black" />
            ) : (
              <></>
            )}
          </div>
          <RightBar
            extraData={extraData}
            setExtraData={setExtraData}
            array={array}
            setArray={setArray}
          />
        </div>
        <script async src="//localhost:8081/widget.js"></script>
      </div>
    </>
  );
};

export default Chat;
