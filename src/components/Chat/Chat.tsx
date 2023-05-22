import React, { useState, useRef, useEffect } from 'react';
import { notification } from 'antd';
import ChatMessage from '../ChatMessage/ChatMessage';
import uploadServices from 'src/services/uploadServices';
import { isEmpty } from 'src/utils/isEmpty';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState('');
  const [array, setArray] = useState([]);
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
        save.push({ message: text.data, flag: false });
        save.push({ message: '...', flag: true });
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
      handleMessage();
    }
  };

  const handleMessage = async () => {
    if (!localStorage.getItem('email') && isFree !== 1) {
      notification.warning({
        message: '',
        description: 'You must log in to ask more questions.',
        duration: 2,
      });
    } else {
      setFormValue('');
      const save = array.slice();
      save.push({ message: formValue, flag: false });
      save.push({ message: '...', flag: true });
      setArray(save);
      uploadServices
        .requestMessage(formValue, localStorage.getItem('email'))
        .then((res) => {
          const update = save.slice();
          update[update.length - 1].message = res.data.text;
          update[update.length - 1].flag = true;
          setArray(update);
          localStorage.setItem('historyFlag', 'true');
          setIsFree(isFree + 1);
        })
        .catch((err) => {
          notification.error({
            description: err.response.data.message,
            message: '',
            duration: 2,
          });
        });
    }
  };

  return (
    <div className="flex w-full min-w-min">
      <div className="h-full flex flex-col flex-1 justify-between p-4 duration-500 overflow-hidden relative bg-white">
        <div className="relative h-full flex flex-col">
          <div
            ref={req_qa_box}
            className="relative flex w-full h-64 flex-grow flex-col rounded-md border border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] overflow-y-auto overflow-x-hidden"
          >
            {!isEmpty(array) ? (
              array.map((item, index) => {
                return (
                  <ChatMessage
                    key={index}
                    box_ref={req_qa_box}
                    message={item.message}
                    status={item.flag}
                  />
                );
              })
            ) : (
              <div className="mx-auto flex flex-col w-full space-y-5 md:space-y-10 px-3 pt-5 max-[650px]:pt-12">
                <div className="text-center text-3xl font-semibold text-[#00185A] dark:text-gray-100 max-[555px]:text-xl transition-all">
                  As a full service provider with state-of-the-art technology,
                  we help you achieve your personal dream smile!
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative flex w-full flex-row mt-4 p-2 justify-center items-center rounded-md border border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] ">
          <input
            ref={inputRef}
            className="m-0 w-full resize-none border-0 overflow-hidden bg-transparent py-2 pl-4 pr-8 text-black dark:bg-transparent dark:text-white md:py-2 md:pl-4"
            value={formValue}
            required
            placeholder="Type a message ..."
            onChange={(e) => setFormValue(e.target.value)}
            style={{
              maxHeight: '400px',
              height: '44px',
            }}
            onKeyDown={(e) => handlePressEnter(e)}
          />
          <button
            className="absolute right-2 top-2 rounded-sm m-3 text-neutral-800 opacity-60 hover:bg-neutral-200 hover:text-neutral-900"
            disabled={formValue ? false : true}
            onClick={() => handleMessage()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tabler-icon tabler-icon-send"
            >
              <path d="M10 14l11 -11"></path>
              <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
