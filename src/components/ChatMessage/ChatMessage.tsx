import React, { useEffect, useState } from 'react';
import { IconDental } from '@tabler/icons-react';
import historyServices from '../../services/historyServices';
import url from '../../assets/img/human.svg';
import TypeWriter from '../TextWriter/TextWriter';
import './Message.css';

const ChatMessage = (props) => {
  const [suggestion, setSuggestion] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    props.box_ref.current.scrollTop = props.box_ref.current.scrollHeight;
  }, []);

  const handleRating = async (index, type) => {
    if (disable !== true) {
      if (type === 'suggestion') {
        setSuggestion(!suggestion);
      } else setDislike(!dislike);
      setDisable(true);
      const data = {
        value: JSON.parse(localStorage.getItem('open_chat_history'))[index - 1]
          .message,
        email: localStorage.getItem('email'),
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
        <div className="flex items-start group">
          <div className="w-8 h-9 rounded-full order-1">
            <IconDental size={36} strokeWidth={1} />
          </div>
          <div className="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-1 items-start">
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
                    speed={15}
                    box_ref={props.box_ref}
                  />
                ) : (
                  <p>{props.message}</p>
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
        <div className="flex justify-end items-end">
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
                      speed={15}
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

export default ChatMessage;
