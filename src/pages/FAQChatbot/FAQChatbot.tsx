import React, { useState, useRef, useEffect } from 'react';
import { message } from 'antd';
import uploadServices from 'src/services/uploadServices';
import FAQChatMessage from 'src/components/ChatMessage/FAQChatMessage';
import { isEmpty } from 'src/utils/isEmpty';

const FAQChatbot = () => {
  const inputRef = useRef();
  const req_qa_box = useRef(null);
  const [formValue, setFormValue] = useState('');
  const [text, setText] = useState({
    data: '',
    type: false,
  });
  const [array, setArray] = useState(
    JSON.parse(localStorage.getItem('faq_chat_history'))
      ? JSON.parse(localStorage.getItem('faq_chat_history'))
      : [
          {
            message:
              'Welcome to Dental Counselors for Immediate Implants! With this treatment method, you can have stable and new third teeth in just one day. Our practice in Berlin offers this service, and we are excited to share with you the requirements, course of treatment, and costs.',
            flag: true,
            isButton: false,
          },
        ]
  );

  useEffect(() => {
    req_qa_box.current.scrollTop = req_qa_box.current.scrollHeight;
    if (!isEmpty(text.data)) {
      const save = array.slice();
      if (text.type === false) {
        save.push({ message: text.data, flag: false, isButton: false });
        save.push({ message: '...', flag: true, isButton: false });
      } else {
        save[save.length - 1].message = text.data;
        save[save.length - 1].flag = true;
      }
      setArray(save);
    }
  }, [text]);

  const handlePressEnter = (e) => {
    if (e.key === 'Enter' && formValue) {
      handleMessage('');
    }
  };

  const handleMessage = async (isClicked) => {
    req_qa_box.current.scrollTop = req_qa_box.current.scrollHeight;
    // After press enter, the input value is initialized
    setFormValue('');
    const save = array.slice();
    save.push({
      message: isClicked === '' ? formValue : isClicked,
      flag: false,
    });
    save.push({ message: '...', flag: true });
    setArray(save);
    const data = {
      value: isClicked === '' ? formValue : isClicked,
      type: isClicked === '' ? false : true,
    };
    uploadServices
      .faqMessage(data)
      .then((res) => {
        console.log('!!!!!!!! = ', res);
        const update = save.slice();
        if (res.data.type === false) {
          const sentences = res.data.data.text.split('\n');
          update[update.length - 1].message = sentences[0];
          update[update.length - 1].flag = true;
          update[update.length - 1].isButton = false;
          sentences.map((item, index) => {
            if (index >= 1 && item !== '' && item !== 'Similar questions:') {
              update.push({
                message: sentences[index],
                flag: false,
                isButton: true,
              });
            }
          });
        } else {
          update[update.length - 1].message = res.data.data.text;
          update[update.length - 1].flag = true;
          update[update.length - 1].isButton = false;
        }
        setArray(update);
        localStorage.setItem('faq_chat_history', JSON.stringify(update));
      })
      .catch((err) => {
        console.log(err);
        message.error({
          type: 'error',
          content: 'Something went wrong',
        });
      });
  };

  return (
    <div className="flex-1 p:2 flex flex-col h-screen justify-between">
      <div className="bg-[#0071b2] flex sm:items-center justify-center p-6 border-b-2 border-gray-200">
        <span className="text-lg font-bold text-white">
          Question? Chat with us!
        </span>
      </div>
      <div
        ref={req_qa_box}
        className="flex flex-col h-[calc(100vh-160px)] space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch overflow-x-hidden"
      >
        {array &&
          array.map((item, index) => {
            return (
              <FAQChatMessage
                key={index}
                box_ref={req_qa_box}
                message={item.message}
                status={item.flag}
                isButton={item.isButton}
                onClick={handleMessage}
              />
            );
          })}
      </div>
      <div className="border-t-2 border-gray-200 p-4 sm:mb-0">
        <div className="relative flex">
          <input
            ref={inputRef}
            type="text"
            required
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Write your message..."
            className="w-full focus:outline-none focus:placeholder-gray-400 text-black/20 rounded-md py-3 pl-4 pr-14 bg-gray-200"
            onKeyDown={(e) => handlePressEnter(e)}
          />
          <div className="absolute right-0 items-center inset-y-0 flex">
            <button
              className="inline-flex cursor-pointer items-center justify-center rounded-full w-7 h-7 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              disabled={formValue ? false : true}
              onClick={() => handleMessage('')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tabler-icon tabler-icon-send h-5 w-5 text-gray-600"
              >
                <path d="M10 14l11 -11"></path>
                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
              </svg>
            </button>
            {/* <button
              type="button"
              className="inline-flex items-center justify-center rounded-full w-7 h-7 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                ></path>
              </svg>
            </button> */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full w-7 h-7 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQChatbot;
