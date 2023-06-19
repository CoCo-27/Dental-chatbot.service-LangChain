import React, { useEffect, useState } from 'react';
import { IconChevronsLeft } from '@tabler/icons-react';
import ChatMiddle from 'src/components/Chat/Chat';
import RightBar from 'src/components/ChatRight/ChatRight';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();
  const [extraData, setExtraData] = useState({});
  const [extraQus, setExtraQus] = useState({});

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full flex justify-center max-[1024px]:w-full">
        <div className="flex w-full laptop:w-8/12">
          <ChatMiddle extraData={extraData} extraQus={extraQus} />
        </div>
        <div className="h-full w-[290px] flex lg:w-4/12 right-[-290px] lg:right-0 absolute lg:relative z-10 hover:right-0 transition-all">
          <div className="absolute left-[-40px] lg:left-0 top-0 p-2">
            <IconChevronsLeft className="text-[30px] font-bold text-black" />
          </div>
          <RightBar
            extraData={extraData}
            setExtraData={setExtraData}
            extraQus={extraQus}
            setExtraQus={setExtraQus}
          />
        </div>
        <script async src="//localhost:8081/widget.js"></script>
      </div>
    </>
  );
};

export default Chat;
