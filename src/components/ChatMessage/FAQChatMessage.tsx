import React, { useEffect } from 'react';
import { IconDental } from '@tabler/icons-react';
import url from '../../assets/img/human.svg';
import TypeWriter from '../TextWriter/TextWriter';
import './Message.css';

const FAQChatMessage = (props) => {
  useEffect(() => {
    props.box_ref.current.scrollTop = props.box_ref.current.scrollHeight;
  }, []);

  return (
    <div
      className={`flex items-end ${props.status === true ? '' : 'justify-end'}`}
    >
      {props.status === true ? (
        <div className="flex items-end">
          <div className="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-2 items-start">
            <div>
              <span
                className={`py-2 rounded-lg inline-block rounded-bl-none text-gray-800 ${
                  props.message === '...' ? 'bg-white' : 'bg-gray-300 px-4'
                }`}
              >
                {props.message === '...' ? (
                  <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                  </div>
                ) : props.status === true ? (
                  <TypeWriter
                    content={props.message}
                    speed={10}
                    box_ref={props.box_ref}
                  />
                ) : (
                  <p>{props.message}</p>
                )}
              </span>
            </div>
          </div>
          <div className="w-8 h-9 rounded-full order-1">
            <IconDental size={36} strokeWidth={1} />
          </div>
        </div>
      ) : (
        <div className="flex justify-end items-center">
          <div className="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-1 items-end">
            <div>
              {props.isButton === true ? (
                <button
                  className="bg-transparent hover:bg-blue-600 text-blue-700 font-semibold hover:text-white p-2 text-sm border border-blue-500 hover:border-transparent rounded"
                  onClick={() => props.onClick(props.message)}
                >
                  {props.message}
                </button>
              ) : (
                <div
                  className={`rounded-lg inline-block rounded-br-none bg-blue-600 text-white px-4 py-2`}
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
          {props.isButton === true ? (
            <></>
          ) : (
            <img
              src={url}
              alt="My profile"
              className="w-8 h-9 rounded-full order-2"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FAQChatMessage;
