import React from 'react';
import TypeWriter from '../TextWriter/TextWriter';
import HumanIcon from '../Icon/HumanIcon';
import ChatGPTIcon from '../Icon/ChatGPTIcon';

const ChatMessage = (props) => {
  return (
    <div
      className={`w-full text-base flex p-4 ${
        props.status === true ? '' : 'justify-end'
      }`}
    >
      {props.status === true ? (
        <div className="w-[30px] flex flex-col relative items-end mr-4">
          <div className="rounded-sm flex justify-center items-center relative tracking-widest h-8 w-8 text-xs">
            <ChatGPTIcon />
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
        <div className="flex flex-grow flex-col gap-3 justify-center">
          <div
            className={`min-h-[20px] flex flex-col justify-center gap-4 ${
              props.status === true ? 'items-start' : 'items-end'
            }`}
          >
            {props.message === '...' ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-navy-100"></div>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-navy-400"></div>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-navy-800"></div>
              </div>
            ) : (
              <div
                className={`relative max-w-screen-lg px-4 py-2 
                relative max-w-screen-lg px-4 py-2 text-gray-900 rounded-t-lg ${
                  props.status === true
                    ? 'rounded-br-lg bg-[#f1f1f1]'
                    : 'bg-[#d4f8ff] rounded-bl-lg'
                }`}
              >
                {props.status === true ? (
                  <TypeWriter
                    content={props.message}
                    speed={10}
                    box_ref={props.box_ref}
                  />
                ) : (
                  <p>{props.message}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {props.status === false ? (
        <div className="w-[30px] flex flex-col relative items-end ml-4">
          <div className="rounded-sm flex justify-center items-center relative tracking-widest h-8 w-8 text-xs">
            <HumanIcon />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChatMessage;
