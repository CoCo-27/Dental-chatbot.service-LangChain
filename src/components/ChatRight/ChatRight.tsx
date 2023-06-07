import { Select, Radio, Input, InputNumber } from 'antd';

const Rightbar = () => {
  const { Option } = Select;

  return (
    <div
      className={`flex h-full w-full flex-none flex-col bg-white p-4 gap-4 text-[14px] transition-all sm:relative overflow-y-auto`}
    >
      <div className="flex flex-col">
        <div className="flex flex-row gap-4 items-center">
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeMedium css-jxtyyz"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="BookTwoToneIcon"
            width={'2rem'}
            height={'2rem'}
            fill="#1976d2"
          >
            <path d="m13 13-3-2.25L7 13V4H6v16h12V4h-5z" opacity=".3"></path>
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z"></path>
          </svg>
          <h5 className="text-black font-bold text-2xl">Dental Library</h5>
        </div>
        <div className="flex flex-row mt-4 p-4 bg-[#e5f6fd] rounded-md">
          <div className="flex w-12 h-12 pb-4 pr-4">
            <svg
              className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="InfoOutlinedIcon"
              fill="#1976d2"
            >
              <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"></path>
            </svg>
          </div>
          <span className="text-black text-base">
            After you start your conversation, Dental Chatbot will collect
            research materials here.
          </span>
        </div>
      </div>

      {/* ---------- Description of symptom ----------- */}
      <div className="flex flex-col">
        <div className="flex flex-row gap-4 items-center">
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeMedium css-jxtyyz"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="MedicalInformationIcon"
            width={'2rem'}
            height={'2rem'}
            fill="#1976d2"
          >
            <path d="M20 7h-5V4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-9-3h2v5h-2V4zm0 12H9v2H7v-2H5v-2h2v-2h2v2h2v2zm2-1.5V13h6v1.5h-6zm0 3V16h4v1.5h-4z"></path>
          </svg>
          <h5 className="text-black font-bold text-2xl">
            Description of symptom
          </h5>
        </div>
        <div className="p-4 flex flex-col">
          <div className="p-2 flex items-center gap-2">
            <label
              htmlFor="pain"
              className="flex flex-row-reverse w-1/3 block text-sm font-medium text-gray-900 dark:text-white text-lg"
            >
              Pain:
            </label>
            <div className="w-2/3">
              <Select defaultValue={0} style={{ width: '100%' }}>
                <Option value={0}>Choose Pain</Option>
                <Option value={1}>sharp</Option>
                <Option value={2}>pulling</Option>
                <Option value={3}>throbbing</Option>
                <Option value={4}>constant</Option>
                <Option value={5}>sporadic</Option>
              </Select>
            </div>
          </div>

          <div className="p-2 flex items-center gap-2">
            <label
              htmlFor="swelling"
              className="flex flex-row-reverse w-1/3 block text-sm font-medium text-gray-900 dark:text-white text-lg"
            >
              Swelling:
            </label>
            <div className="w-2/3">
              <Radio.Group defaultValue={0} style={{ width: '100%' }}>
                <Radio value={0}>Yes</Radio>
                <Radio value={1}>No</Radio>
              </Radio.Group>
            </div>
          </div>

          <div className="p-2 flex items-center gap-2">
            <label
              htmlFor="bleeding"
              className="flex flex-row-reverse w-1/3 block text-sm font-medium text-gray-900 dark:text-white text-lg"
            >
              Bleeding:
            </label>
            <div className="w-2/3">
              <Radio.Group defaultValue={0} style={{ width: '100%' }}>
                <Radio value={0}>Yes</Radio>
                <Radio value={1}>No</Radio>
              </Radio.Group>
            </div>
          </div>

          <div className="p-2 flex items-center gap-2">
            <label
              htmlFor="sensitivities"
              className="flex flex-row-reverse w-1/3 block text-sm font-medium text-gray-900 dark:text-white text-lg"
            >
              Sensitivities:
            </label>
            <div className="w-2/3">
              <Radio.Group defaultValue={0} style={{ width: '100%' }}>
                <Radio value={0}>cold</Radio>
                <Radio value={1}>heat</Radio>
                <Radio value={2}>sweet</Radio>
                <Radio value={3}>when chewing</Radio>
              </Radio.Group>
            </div>
          </div>

          <div className="p-2 flex items-center gap-2">
            <label
              htmlFor="tooth"
              className="flex flex-row-reverse w-1/3 block text-sm font-medium text-gray-900 dark:text-white text-lg"
            >
              Specific Tooth:
            </label>
            <div className="w-2/3">
              <Select defaultValue={0} style={{ width: '100%' }}>
                <Option value={0}>Choose teeth</Option>
                <Option value={1}>1-32 for adults</Option>
                <Option value={2}>A-T for children</Option>
              </Select>
            </div>
          </div>

          <div className="p-2 flex items-center gap-2">
            <label
              htmlFor="mouth"
              className="flex flex-row-reverse w-1/3 block text-sm font-medium text-gray-900 dark:text-white text-lg"
            >
              Area of the Mouth:
            </label>
            <div className="w-2/3">
              <Select defaultValue={0} style={{ width: '100%' }}>
                <Option value={0}>upper</Option>
                <Option value={1}>lower</Option>
                <Option value={2}>right</Option>
                <Option value={3}>left</Option>
                <Option value={4}>front</Option>
                <Option value={5}>back</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Duration of Symptoms ----------- */}
      <div className="flex flex-col">
        <div className="flex flex-row gap-4 items-center">
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeMedium css-jxtyyz"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="FilterTiltShiftIcon"
            width={'2rem'}
            height={'2rem'}
            fill="#1976d2"
          >
            <path d="M11 4.07V2.05c-2.01.2-3.84 1-5.32 2.21L7.1 5.69c1.11-.86 2.44-1.44 3.9-1.62zm7.32.19C16.84 3.05 15.01 2.25 13 2.05v2.02c1.46.18 2.79.76 3.9 1.62l1.42-1.43zM19.93 11h2.02c-.2-2.01-1-3.84-2.21-5.32L18.31 7.1c.86 1.11 1.44 2.44 1.62 3.9zM5.69 7.1 4.26 5.68C3.05 7.16 2.25 8.99 2.05 11h2.02c.18-1.46.76-2.79 1.62-3.9zM4.07 13H2.05c.2 2.01 1 3.84 2.21 5.32l1.43-1.43c-.86-1.1-1.44-2.43-1.62-3.89zM15 12c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zm3.31 4.9 1.43 1.43c1.21-1.48 2.01-3.32 2.21-5.32h-2.02c-.18 1.45-.76 2.78-1.62 3.89zM13 19.93v2.02c2.01-.2 3.84-1 5.32-2.21l-1.43-1.43c-1.1.86-2.43 1.44-3.89 1.62zm-7.32-.19C7.16 20.95 9 21.75 11 21.95v-2.02c-1.46-.18-2.79-.76-3.9-1.62l-1.42 1.43z"></path>
          </svg>
          <h5 className="text-black font-bold text-2xl">
            Duration of Symptoms
          </h5>
        </div>
        <div className="p-4 flex flex-col">
          <div className="p-2 flex items-center gap-2">
            <label
              htmlFor="pain"
              className="flex flex-row-reverse w-1/3 block text-sm font-medium text-gray-900 dark:text-white text-lg"
            >
              Pain:
            </label>
            <div className="w-2/3">
              <Select defaultValue={0} style={{ width: '100%' }}>
                <Option value={0}>Choose Pain</Option>
                <Option value={1}>sharp</Option>
                <Option value={2}>pulling</Option>
                <Option value={3}>throbbing</Option>
                <Option value={4}>constant</Option>
                <Option value={5}>sporadic</Option>
              </Select>
            </div>
          </div>

          <div className="p-2 flex items-center gap-2">
            <label
              htmlFor="symptom"
              className="flex flex-row-reverse w-1/3 block text-sm font-medium text-gray-900 dark:text-white text-lg"
            >
              Symptom intensity:
            </label>
            <div className="w-2/3">
              <Radio.Group defaultValue={0} style={{ width: '100%' }}>
                <Radio value={0}>constant</Radio>
                <Radio value={1}>comes and goes</Radio>
              </Radio.Group>
            </div>
          </div>

          <div className="p-2 flex items-center gap-2">
            <label
              htmlFor="worse"
              className="flex flex-row-reverse w-1/3 block text-sm font-medium text-gray-900 dark:text-white text-lg"
            >
              Worse during:
            </label>
            <div className="w-2/3">
              <Radio.Group defaultValue={0} style={{ width: '100%' }}>
                <Radio value={0}>rest</Radio>
                <Radio value={1}>night</Radio>
                <Radio value={2}>meals</Radio>
                <Radio value={3}>on touch</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Medical History ----------- */}
      <div className="flex flex-col">
        <div className="flex flex-row gap-4 items-center">
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeMedium css-jxtyyz"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            width={'2rem'}
            height={'2rem'}
            fill="#1976d2"
            data-testid="MonitorHeartIcon"
          >
            <path d="M15.11 12.45 14 10.24l-3.11 6.21c-.16.34-.51.55-.89.55s-.73-.21-.89-.55L7.38 13H2v5c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-5h-6c-.38 0-.73-.21-.89-.55z"></path>
            <path d="M20 4H4c-1.1 0-2 .9-2 2v5h6c.38 0 .73.21.89.55L10 13.76l3.11-6.21c.34-.68 1.45-.68 1.79 0L16.62 11H22V6c0-1.1-.9-2-2-2z"></path>
          </svg>
          <h5 className="text-black font-bold text-2xl">Medical History</h5>
        </div>
        <div className="p-4 flex flex-col">
          <div className="p-2 flex items-center gap-2">
            <label
              htmlFor="conditions"
              className="flex flex-row-reverse w-1/3 block text-sm font-medium text-gray-900 dark:text-white text-lg"
            >
              Medical conditions:
            </label>
            <div className="w-2/3">
              <Select defaultValue={0} style={{ width: '100%' }}>
                <Option value={0}>Choose conditions</Option>
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
                <Option value={3}>3</Option>
                <Option value={4}>4</Option>
                <Option value={5}>5</Option>
              </Select>
            </div>
          </div>

          <div className="p-2 flex items-center gap-2">
            <label
              htmlFor="medications"
              className="flex flex-row-reverse w-1/3 block text-sm font-medium text-gray-900 dark:text-white text-lg"
            >
              Current medications:
            </label>
            <div className="w-2/3">
              <Input
                style={{ width: '100%' }}
                placeholder="current medications"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Dental History ----------- */}
      <div className="flex flex-col">
        <div className="flex flex-row gap-4 items-center">
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeMedium css-jxtyyz"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            width={'2rem'}
            height={'2rem'}
            fill="#1976d2"
            data-testid="MonitorHeartIcon"
          >
            <path d="M15.11 12.45 14 10.24l-3.11 6.21c-.16.34-.51.55-.89.55s-.73-.21-.89-.55L7.38 13H2v5c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-5h-6c-.38 0-.73-.21-.89-.55z"></path>
            <path d="M20 4H4c-1.1 0-2 .9-2 2v5h6c.38 0 .73.21.89.55L10 13.76l3.11-6.21c.34-.68 1.45-.68 1.79 0L16.62 11H22V6c0-1.1-.9-2-2-2z"></path>
          </svg>
          <h5 className="text-black font-bold text-2xl">Dental History</h5>
        </div>
        <div className="p-4 flex flex-col">
          <div className="p-2 flex items-center gap-2">
            <label
              htmlFor="problems"
              className="flex flex-row-reverse w-1/3 block text-sm font-medium text-gray-900 dark:text-white text-lg"
            >
              Problems/treatments:
            </label>
            <div className="w-2/3">
              <Input
                style={{ width: '100%' }}
                placeholder="previous dental problems/treatments"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Pain Level ----------- */}
      <div className="flex flex-col">
        <div className="flex flex-row gap-4 items-center">
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeMedium css-jxtyyz"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            width={'2rem'}
            height={'2rem'}
            fill="#1976d2"
            data-testid="MonitorHeartIcon"
          >
            <path d="M15.11 12.45 14 10.24l-3.11 6.21c-.16.34-.51.55-.89.55s-.73-.21-.89-.55L7.38 13H2v5c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-5h-6c-.38 0-.73-.21-.89-.55z"></path>
            <path d="M20 4H4c-1.1 0-2 .9-2 2v5h6c.38 0 .73.21.89.55L10 13.76l3.11-6.21c.34-.68 1.45-.68 1.79 0L16.62 11H22V6c0-1.1-.9-2-2-2z"></path>
          </svg>
          <h5 className="text-black font-bold text-2xl">Pain Level</h5>
        </div>
        <div className="p-4 flex flex-col">
          <div className="p-2 flex items-center gap-2">
            <label
              htmlFor="painLevel"
              className="flex flex-row-reverse w-1/3 block text-sm font-medium text-gray-900 dark:text-white text-lg"
            >
              Pain Level:
            </label>
            <div className="w-2/3">
              <InputNumber min={1} max={10} style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Allergies ----------- */}
      <div className="flex flex-col">
        <div className="flex flex-row gap-4 items-center">
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeMedium css-jxtyyz"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            width={'2rem'}
            height={'2rem'}
            fill="#1976d2"
            data-testid="MonitorHeartIcon"
          >
            <path d="M15.11 12.45 14 10.24l-3.11 6.21c-.16.34-.51.55-.89.55s-.73-.21-.89-.55L7.38 13H2v5c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-5h-6c-.38 0-.73-.21-.89-.55z"></path>
            <path d="M20 4H4c-1.1 0-2 .9-2 2v5h6c.38 0 .73.21.89.55L10 13.76l3.11-6.21c.34-.68 1.45-.68 1.79 0L16.62 11H22V6c0-1.1-.9-2-2-2z"></path>
          </svg>
          <h5 className="text-black font-bold text-2xl">Allergies</h5>
        </div>
        <div className="p-4 flex flex-col">
          <div className="p-2 flex items-center gap-2">
            <label
              htmlFor="allergies"
              className="flex flex-row-reverse w-1/3 block text-sm font-medium text-gray-900 dark:text-white text-lg"
            >
              Known allergies:
            </label>
            <div className="w-2/3">
              <Input style={{ width: '100%' }} placeholder="Known allergies" />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Lifestyle Habits ----------- */}
      <div className="flex flex-col">
        <div className="flex flex-row gap-4 items-center">
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeMedium css-jxtyyz"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            width={'2rem'}
            height={'2rem'}
            fill="#1976d2"
            data-testid="MonitorHeartIcon"
          >
            <path d="M15.11 12.45 14 10.24l-3.11 6.21c-.16.34-.51.55-.89.55s-.73-.21-.89-.55L7.38 13H2v5c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-5h-6c-.38 0-.73-.21-.89-.55z"></path>
            <path d="M20 4H4c-1.1 0-2 .9-2 2v5h6c.38 0 .73.21.89.55L10 13.76l3.11-6.21c.34-.68 1.45-.68 1.79 0L16.62 11H22V6c0-1.1-.9-2-2-2z"></path>
          </svg>
          <h5 className="text-black font-bold text-2xl">Lifestyle Habits</h5>
        </div>
        <div className="p-4 flex flex-col">
          <div className="p-2 flex items-center gap-2">
            <label
              htmlFor="smoking"
              className="flex flex-row-reverse w-1/3 block text-sm font-medium text-gray-900 dark:text-white text-lg"
            >
              Smoking:
            </label>
            <div className="w-2/3">
              <Radio.Group defaultValue={0} style={{ width: '100%' }}>
                <Radio value={0}>Yes</Radio>
                <Radio value={1}>No</Radio>
                <Radio value={2}>how often</Radio>
              </Radio.Group>
            </div>
          </div>

          <div className="p-2 flex items-center gap-2">
            <label
              htmlFor="alcohol"
              className="flex flex-row-reverse w-1/3 block text-sm font-medium text-gray-900 dark:text-white text-lg"
            >
              Alcohol consumption:
            </label>
            <div className="w-2/3">
              <Radio.Group defaultValue={0} style={{ width: '100%' }}>
                <Radio value={0}>Yes</Radio>
                <Radio value={1}>No</Radio>
                <Radio value={2}>how often</Radio>
              </Radio.Group>
            </div>
          </div>

          <div className="p-2 flex items-center gap-2">
            <label
              htmlFor="dietary"
              className="flex flex-row-reverse w-1/3 block text-sm font-medium text-gray-900 dark:text-white text-lg"
            >
              Dietary habits:
            </label>
            <div className="w-2/3">
              <Input style={{ width: '100%' }} placeholder="Diatary habits" />
            </div>
          </div>

          <div className="p-2 flex items-center gap-2">
            <label
              htmlFor="oralHygiene"
              className="flex flex-row-reverse w-1/3 block text-sm font-medium text-gray-900 dark:text-white text-lg"
            >
              Oral hygiene habits:
            </label>
            <div className="w-2/3">
              <Select defaultValue={0} style={{ width: '100%' }}>
                <Option value={0}>how often brushed</Option>
                <Option value={1}>how often used floss</Option>
                <Option value={2}>how often</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-1 border-t border-black/20 pt-1 text-sm"></div>
    </div>
  );
};

export default Rightbar;
