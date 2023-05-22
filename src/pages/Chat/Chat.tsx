import React, { useEffect } from 'react';
import { IconChevronsLeft } from '@tabler/icons-react';
import ChatMiddle from 'src/components/Chat/Chat';
import RightBar from 'src/components/ChatRight/ChatRight';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-stretch h-[calc(100vh-96px)] w-full sm:pt-0 relative">
      <div className="w-full flex justify-center max-[1024px]:w-full">
        <div className="flex w-full laptop:w-8/12">
          <ChatMiddle />
        </div>
        <div className="h-full w-[290px] flex mobile:w-4/12 right-[-290px] mobile:right-0 absolute mobile:relative z-10 hover:right-0 transition-all">
          <div className="absolute left-[-40px] mobile:left-0 top-0 p-2">
            <IconChevronsLeft className="text-[30px] font-bold text-black" />
          </div>
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Chat;
