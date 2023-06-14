import React, { useState, useRef, useEffect } from 'react';
import { notification } from 'antd';
import LanguageDetect from 'languagedetect';
import ChatMessage from '../ChatMessage/ChatMessage';
import uploadServices from 'src/services/uploadServices';
import historyServices from 'src/services/historyServices';
import greeting from '../../config/greeting';
import { isEmpty } from 'src/utils/isEmpty';
import { useNavigate } from 'react-router-dom';

const Chat = ({ extraData }) => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const langDetect = new LanguageDetect();
  const [formValue, setFormValue] = useState('');
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

  const [text, setText] = useState({
    data: '',
    type: false,
  });
  const [isFree, setIsFree] = useState(1);
  const req_qa_box = useRef(null);

  useEffect(() => {
    req_qa_box.current.scrollTop = req_qa_box.current.scrollHeight;
    if (!isEmpty(text.data)) {
      const save = array.slice();
      if (text.type === false) {
        save.push({
          message: text.data,
          flag: false,
          isButton: false,
          language: 'english',
        });
        save.push({
          message: '...',
          flag: true,
          isButton: false,
          language: 'english',
        });
      } else {
        save[save.length - 1].message = text.data;
        save[save.length - 1].flag = true;
      }
      setArray(save);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const handlePressEnter = (e) => {
    if (e.key === 'Enter' && formValue) {
      handleMessage('');
    }
  };

  const handleMessage = async (isClicked) => {
    const lang_type = langDetect.detect(
      isClicked === '' ? formValue : isClicked
    );
    const result = lang_type
      .filter((item, index) => item[0] === 'english' || item[0] === 'german')
      .sort((a, b) => b[1] - a[1]);

    if (!localStorage.getItem('email') && isFree !== 1) {
      notification.warning({
        message: '',
        description: 'You have to register for more then one question',
        duration: 2,
        style: {
          width: 440,
        },
      });
      navigate('/login');
    } else {
      // After press enter, the input value is initialized
      setFormValue('');
      const save = array.slice();
      // const save_history = history;
      save.push({
        message: isClicked === '' ? formValue : isClicked,
        flag: false,
      });
      save.push({ message: '...', flag: true });
      setArray(save);

      const extraDATA = Object.entries(extraData);

      const ratingData = {
        value: isClicked === '' ? formValue : isClicked,
        rating: '',
      };

      historyServices.addQuestion(ratingData);

      const data = {
        value: isClicked === '' ? formValue : isClicked,
        extra: extraDATA,
        type: isClicked === '' ? false : true,
        email: localStorage.getItem('email')
          ? localStorage.getItem('email')
          : 'nothing',
      };
      uploadServices
        .requestMessage(data)
        .then((res) => {
          const update = save.slice();
          if (res.data.type === false) {
            const sentences = res.data.data.text.split('!@#$%^&*())(*&^%$#@!');
            const answer =
              sentences[0].search('Answer:') === -1
                ? sentences[0]
                : sentences[0].split('Answer:')[1];
            const questions = sentences[1].split('\n');
            update[update.length - 1].message = answer;
            update[update.length - 1].flag = true;
            update[update.length - 1].isButton = false;
            update[update.length - 1].language = result[0][0];
            questions.map((item, index) => {
              if (index > 1) {
                update.push({
                  message: item.replace(/[0-9]/g, '').replace('.', ''),
                  flag: false,
                  isButton: true,
                  language: result[0][0],
                });
              }
              return update;
            });
          } else {
            update[update.length - 1].message = res.data.data.text;
            update[update.length - 1].flag = true;
            update[update.length - 1].isButton = false;
            update[update.length - 1].language = result[0][0];
          }
          setArray(update);
          localStorage.setItem('open_chat_history', JSON.stringify(update));
          setIsFree(isFree + 1);
        })
        .catch((err) => {
          console.log(err);
          const update = save.slice();
          update[update.length - 1].message =
            'Please wait. Dental Assistant are not yet trained';
          update[update.length - 1].flag = true;
          setArray(update);
          notification.error({
            description: err.response.data.message,
            message: '',
            duration: 2,
          });
        });
    }
  };

  return (
    <div className="flex w-full min-w-[400px]">
      <div className="h-full flex flex-col flex-1 justify-between duration-500 overflow-hidden relative bg-white">
        <div className="relative h-[calc(100%-62px)] w-full">
          <div
            ref={req_qa_box}
            className="relative flex w-full h-full flex-col space-y-4 p-8 rounded-md bg-white overflow-y-auto overflow-x-hidden"
          >
            {!isEmpty(array) ? (
              array.map((item, index) => {
                return (
                  <div key={index}>
                    <ChatMessage
                      index={index}
                      box_ref={req_qa_box}
                      message={item.message}
                      status={item.flag}
                      isButton={item.isButton}
                      language={item.language}
                      onClick={handleMessage}
                    />
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="relative flex w-full flex-row py-2 px-4 gap-4 justify-center items-center rounded-md ">
          <input
            ref={inputRef}
            className="m-0 w-10/12 rounded resize-none border border-black/20 overflow-hidden bg-transparent text-black hover:border-[#1976d2] dark:bg-transparent dark:text-white py-2 pl-4"
            value={formValue}
            required
            placeholder="Eine Nachricht schreiben ..."
            onChange={(e) => setFormValue(e.target.value)}
            style={{
              maxHeight: '400px',
              height: '44px',
            }}
            onKeyDown={(e) => handlePressEnter(e)}
          />
          <button
            className="bg-[#1565c0] hover:bg-[#1565c0] text-white px-4 py-1 font-bold gap-4 rounded inline-flex cursor-pointer items-center justify-center w-2/12 h-full transition duration-500 ease-in-out focus:outline-none"
            disabled={formValue ? false : true}
            onClick={() => handleMessage('')}
          >
            <svg
              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              width={'1.5em'}
              height={'1.5em'}
              data-testid="SendIcon"
            >
              <path
                d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"
                fill="white"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
