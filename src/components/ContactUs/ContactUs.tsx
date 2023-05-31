import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Spin, notification } from 'antd';
import Loading from '../Icon/Loader';

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    emailjs
      .sendForm(
        'service_byox8ds',
        'template_y682bhl',
        form.current,
        'XfKXY2hwb3gMYDYSs'
      )
      .then(() => {
        setLoading(false);
        notification.success({
          message: '',
          description: 'Message sent successfully',
          duration: 2,
        });
      })
      .catch((error) => {
        console.log(error.text);
        setLoading(false);
        notification.error({
          message: '',
          description: 'Something went wrong',
          duration: 2,
        });
      });
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
      <div
        className="
          flex flex-col
          bg-white
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
          w-1/2
          max-w-md
          min-w-[330px]
        "
      >
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Contact us Now
        </div>
        <div className="mt-10">
          <form ref={form} onSubmit={handleSubmit}>
            <div className="flex flex-col mb-5">
              <label
                htmlFor="name"
                className="mb-1 text-xs tracking-wide text-gray-600"
              >
                Name:
              </label>
              <div className="relative">
                <div
                  className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                  <i className="fas fa-user text-blue-500"></i>
                </div>

                <input
                  id="name"
                  type="text"
                  name="name"
                  className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Enter your name"
                />
              </div>
            </div>
            <div className="flex flex-col mb-5 hidden">
              <label
                htmlFor="to_name"
                className="mb-1 text-xs tracking-wide text-gray-600"
              >
                Name:
              </label>
              <div className="relative">
                <div
                  className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                  <i className="fas fa-user text-blue-500"></i>
                </div>

                <input
                  id="to_name"
                  type="text"
                  name="to_name"
                  defaultValue={'Martin'}
                  className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Enter your name"
                />
              </div>
            </div>
            <div className="flex flex-col mb-5">
              <label
                htmlFor="email"
                className="mb-1 text-xs tracking-wide text-gray-600"
              >
                E-Mail Address:
              </label>
              <div className="relative">
                <div
                  className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                  <i className="fas fa-user text-blue-500"></i>
                </div>

                <input
                  id="email"
                  type="email"
                  name="email"
                  className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="message"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >
                Message:
              </label>
              <div className="relative">
                <div
                  className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                  <span>
                    <i className="fas fa-lock text-blue-500"></i>
                  </span>
                </div>

                <textarea
                  id="message"
                  name="message"
                  className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Tell us what you're thinking about..."
                />
              </div>
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                className="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
              >
                {!loading ? (
                  <>
                    <span className="mr-2 uppercase">Contact Us</span>
                    <span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </>
                ) : (
                  <Spin indicator={Loading} style={{ color: 'white' }} />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
