import React, { useState, useEffect } from 'react';
import { Select, Radio, Input, InputNumber, Spin } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import uploadServices from 'src/services/uploadServices';
import treatmentServices from 'src/services/treatmentServices';
import itemServices from 'src/services/itemServices';
import { isEmpty } from 'src/utils/isEmpty';
import Loading from '../Icon/Loader';

const Rightbar = ({ showButton, extraData, setExtraData, array, setArray }) => {
  const { Option } = Select;
  const [loadingSubName, setLoadingSubName] = useState(false);
  const [loadingValue, setLoadingValue] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [treatmentArray, setTreatmentArray] = useState([]);
  const [itemArray, setItemArray] = useState([]);
  const [treat_type, setTreat_Type] = useState(-1);
  const [subNameList, setSubNameList] = useState(-1);
  const [subValue, setSubValue] = useState(-1);
  const [extraQus, setExtraQus] = useState(null);

  useEffect(() => {
    treatmentServices
      .getItems()
      .then((res) => {
        console.log(res);
        setTreatmentArray(res.data.data[0].value);
      })
      .catch((error) => console.log(error));

    itemServices
      .getItems()
      .then((res) => {
        console.log(res);
        setItemArray(res.data.data[0].value);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleTreat_Type = (value) => {
    console.log('Treat = ', value);
    setTreat_Type(value);
    setSubNameList(-1);
    setSubValue(-1);
    setExtraQus({ treatType: treatmentArray[value].name });
  };

  const handleSubName = (value) => {
    setSubNameList(value);
    setSubValue(-1);
    setExtraQus({
      treat_type: treatmentArray[treat_type].name,
      subTreat: treatmentArray[treat_type].treatments[value].subName,
    });
    if (isEmpty(treatmentArray[treat_type].treatments[value].subtreatments)) {
      setLoadingSubName(true);
      const data = {
        treat_type: treatmentArray[treat_type].name,
        subTreat: treatmentArray[treat_type].treatments[value].subName,
      };
      uploadServices
        .questionMessage(data)
        .then((res) => {
          setLoadingSubName(false);
          console.log(res.data.data.text);
          const update = array.slice();

          const questions = res.data.data.text.split('\n');

          questions.map((item) => {
            update.push({
              message: item.replace(/[0-9]/g, '').replace('.', ''),
              flag: false,
              isButton: true,
              language: 'de ',
            });
            return update;
          });
          setArray(update);
        })
        .catch((error) => {
          console.log(error);
          setLoadingSubName(false);
        });
    }
  };

  const handleValue = (value) => {
    setSubValue(value);
    setExtraQus({
      treat_type: treatmentArray[treat_type].name,
      subTreat: treatmentArray[treat_type].treatments[subNameList].subName,
      value:
        treatmentArray[treat_type].treatments[subNameList].subtreatments[value]
          .value,
    });
    setLoadingValue(true);
    const data = {
      treat_type: treatmentArray[treat_type].name,
      subTreat: treatmentArray[treat_type].treatments[subNameList].subName,
      value:
        treatmentArray[treat_type].treatments[subNameList].subtreatments[value]
          .value,
    };
    uploadServices
      .questionMessage(data)
      .then((res) => {
        setLoadingValue(false);
        const update = array.slice();

        const questions = res.data.data.text.split('\n');

        questions.map((item) => {
          update.push({
            message: item.replace(/[0-9]/g, '').replace('.', ''),
            flag: false,
            isButton: true,
            language: 'de ',
          });
          return update;
        });
        setArray(update);
      })
      .catch((error) => {
        console.log(error);
        setLoadingValue(false);
      });
  };

  const handleSelect = (index, name, array) => {
    const data = name + ':' + array[index].subName;
    console.log(data);
    setExtraData({ ...extraData, [name]: array[index].subName });
  };

  const handleRadio = (index, name, array) => {
    const data = { [name]: array[index].subName };
    console.log(data);
    setExtraData({ ...extraData, [name]: array[index].subName });
  };

  const handleInput = (name, value) => {
    const data = name + ':' + value;
    console.log(data);
    setExtraData({ ...extraData, [name]: value });
  };

  const handleInputNumber = (name, value) => {
    const data = name + ':' + value;
    console.log(data);
    setExtraData({ ...extraData, [name]: value });
  };

  return (
    <div
      className={`flex h-full w-full flex-none flex-col bg-[#FEF6E4] rounded gap-8 text-[20px] text-[#00185A] transition-all overflow-y-auto ${
        showButton === null ? 'p-8' : 'p-4'
      }`}
    >
      {/* ---------- Treatment --------------*/}
      <div className="flex flex-col bg-white rounded-lg p-4">
        <div className="flex flex-col">
          <div className="flex flex-row gap-4 items-center">
            <div className="flex items-center justify-center">
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
                <path
                  d="m13 13-3-2.25L7 13V4H6v16h12V4h-5z"
                  opacity=".3"
                ></path>
                <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z"></path>
              </svg>
            </div>
            <h5 className="text-black font-bold text-2xl">Behandlung</h5>
          </div>
          <div className="flex flex-col">
            <div className="p-2 flex items-center gap-2 justify-center">
              {loadingSubName === true || loadingValue === true ? (
                <Spin
                  indicator={Loading}
                  style={{
                    color: 'blue',
                    width: '1.5rem',
                    height: '1.5rem',
                  }}
                />
              ) : (
                <div className="w-full flex flex-col gap-4">
                  {treatmentArray.length === 0 ? (
                    <></>
                  ) : (
                    <Select
                      defaultValue={
                        treat_type === -1 ? 'Bitte wählen' : treat_type
                      }
                      style={{ width: '100%' }}
                      onChange={handleTreat_Type}
                    >
                      {treatmentArray?.map((item, index) => (
                        <Option key={index} value={index}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                  <div className="flex items-center gap-4">
                    {!isEmpty(treatmentArray[treat_type]?.treatments) && (
                      <Select
                        value={
                          subNameList === -1 ? 'Bitte wählen' : subNameList
                        }
                        style={{ width: '50%' }}
                        onChange={handleSubName}
                      >
                        {treatmentArray[treat_type]?.treatments.map(
                          (item, index) => (
                            <Option key={index} value={index}>
                              {item.subName}
                            </Option>
                          )
                        )}
                      </Select>
                    )}
                    {treatmentArray[treat_type]?.treatments &&
                      !isEmpty(
                        treatmentArray[treat_type]?.treatments[subNameList]
                          ?.subtreatments
                      ) && (
                        <Select
                          value={subValue === -1 ? 'Bitte wählen' : subValue}
                          style={{ width: '50%' }}
                          onChange={handleValue}
                        >
                          {treatmentArray[treat_type]?.treatments[
                            subNameList
                          ]?.subtreatments?.map((item, index) => (
                            <Option key={index} value={index}>
                              {item.value}
                            </Option>
                          ))}
                        </Select>
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row p-4 bg-[#e5f6fd] rounded-md">
            <div className="flex w-12 h-12 pb-4 pr-4">
              <div className="flex items-center justify-center">
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
            </div>
            <span className="text-black text-base">
              Nachdem Sie Ihre Unterhaltung gestartet haben, wird WunschlachenAI
              weitere Informationen anzeigen. Bitte wählen Sie oben die
              gewünschte Behandlung aus. Sollten Sie keine direkten Fragen
              haben.
            </span>
          </div>
        </div>

        <div
          className={`w-full flex flex-col py-4 ${
            isOpen ? 'overflow-y-auto' : ''
          }`}
        >
          <div
            className="flex flex-row items-center justify-between cursor-pointer select-none pr-8"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex gap-4 items-center justify-center">
              <div className="flex items-center justify-center">
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
              </div>
              <h5 className="text-black font-bold text-2xl pt-2">
                Beschreibung der Symptome
              </h5>
            </div>
            <div className="flex justify-center items-center">
              {isOpen ? (
                <DownOutlined
                  style={{
                    cursor: 'pointer',
                    width: '0.8em',
                    height: '0.8em',
                  }}
                  rev={undefined}
                />
              ) : (
                <UpOutlined
                  style={{ cursor: 'pointer', width: '0.8em', height: '0.8em' }}
                  rev={undefined}
                />
              )}
            </div>
          </div>

          <div className="flex-grow w-full overflow-y-auto">
            <div
              className={`transition-all duration-500 ease-in-out overflow-y-auto ${
                isOpen ? 'h-full' : 'h-0'
              }`}
            >
              {itemArray?.map((item, index) => (
                <div className="px-4 pt-6 flex items-center gap-2">
                  {item.type === 0 ? (
                    <>
                      <label
                        htmlFor="item_type"
                        className="flex flex-row-reverse w-1/3 block text-xs font-medium text-gray-900 dark:text-white"
                      >
                        {item.name}:
                      </label>
                      <div className="w-2/3">
                        <Select
                          defaultValue={'Bitte wählen'}
                          style={{ width: '100%' }}
                          key={`select-${index}`}
                          onChange={(value) =>
                            handleSelect(value, item.name, item.treatments)
                          }
                        >
                          {item.treatments?.map((item, index) => (
                            <Option value={index} key={index}>
                              {item.subName}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </>
                  ) : item.type === 1 ? (
                    <>
                      <label
                        htmlFor="item_type"
                        className="flex flex-row-reverse w-1/3 block text-xs font-medium text-gray-900 dark:text-white"
                      >
                        {item.name}:
                      </label>
                      <div className="w-2/3">
                        <Radio.Group
                          style={{ width: '100%' }}
                          key={`radio-${index}`}
                          onChange={(e) =>
                            handleRadio(
                              e.target.value,
                              item.name,
                              item.treatments
                            )
                          }
                        >
                          {item.treatments?.map((item, index) => (
                            <Radio value={index} key={index}>
                              {item.subName}
                            </Radio>
                          ))}
                        </Radio.Group>
                      </div>
                    </>
                  ) : item.type === 2 ? (
                    <>
                      <label
                        htmlFor="item_type"
                        className="flex flex-row-reverse w-1/3 block text-xs font-medium text-gray-900 dark:text-white"
                      >
                        {item.name}:
                      </label>
                      <div className="w-2/3">
                        <Input
                          style={{ width: '100%' }}
                          onChange={(e) =>
                            handleInput(item.name, e.target.value)
                          }
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <label
                        htmlFor="item_type"
                        className="flex flex-row-reverse w-1/3 block text-xs font-medium text-gray-900 dark:text-white"
                      >
                        {item.name}:
                      </label>
                      <div className="w-2/3">
                        <InputNumber
                          min={1}
                          max={10}
                          style={{ width: '100%' }}
                          onChange={(value) =>
                            handleInputNumber(item.name, value)
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-1 border-t border-black/20 pb-4 text-sm"></div>
        <div className="flex flex-row p-4 bg-[#e5f6fd] rounded-md">
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
            <p>Haben Sie Probleme oder Schmerzen?</p>
            WunschlachenAI ist für Sie da. Wenn Sie über Beschwerden sprechen
            möchten, wählen Sie bitte den entsprechenden Dialog oben aus.
            Sollten Sie keine direkten Fragen haben, wird WunschlachenAI Ihnen
            weiterführende Informationen anzeigen. Lassen Sie uns gemeinsam für
            Ihr Wohlbefinden sorgen und den Weg zu einem schmerzfreien Lächeln
            gehen.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
