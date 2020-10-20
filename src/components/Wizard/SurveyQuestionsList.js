import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined, LineOutlined } from '@ant-design/icons';
import MainLayout from '../Common/Layout';
import Menu from './Helper/Menu';
import Steps from '../Common/Steps';
import Input from '../Common/Input';
import SecondaryMenu from '../Common/Menu';
import SecondaryButton from '../Common/Button';
import Checkbox from '../Common/Checkbox';
import AddQuestionModal from './Helper/AddQuestionModal';
import AddFeedbackModal from './Helper/AddFeedbackModal';
import DataTable from '../Common/DataTable';
import arrayMove from 'array-move';

const SurveyQuestionsList = () => {
  const [questionModal, setquestionModal] = useState(false);
  const [feedbackModal, setfeedbackModal] = useState(false);

  const ratingScalesData = [
    {
      label1: '',
      description1: '',
      label2: '',
      description2: '',
      label3: '',
      description3: '',
      label4: '',
      description4: '',
      label0: '',
      description0: '',
    },
  ];
  const feedbacksData = [
    {
      general1: '',
      statement1: '',
      required1: false,
      general2: '',
      statement2: '',
      required2: false,
    },
  ];
  const data = [
    {
      key: '1',
      name: '1',
      index: 0,
    },
    {
      key: '2',
      name: '2',
      index: 1,
    },
    {
      key: '3',
      name: '3',
      index: 2,
    },
    {
      key: '4',
      name: '4',
      index: 3,
    },
    {
      key: '5',
      name: '5',
      index: 4,
    },
  ];
  const [ratingScales, setRatingScales] = useState(ratingScalesData);
  const [feedbacks, setfeedbacks] = useState(feedbacksData);
  const [dataSource, setDataSource] = useState(data);

  const clusters = [
    {
      key: '1',
      name: '1',
      index: 0,
    },
    {
      key: '2',
      name: '2',
      index: 1,
    },
    {
      key: '3',
      name: '3',
      index: 2,
    },
    {
      key: '4',
      name: '4',
      index: 3,
    },
    {
      key: '5',
      name: '5',
      index: 4,
    },
  ];

  // Sample array for data model menu
  const menuItems = [
    {
      key: '1',
      name: 'Cluster 1',
      type: 'cluster',
      index: 0,
      competencies: [
        {
          key: '1',
          name: 'Competency 1',
          type: 'competency',
          index: 0,
          questions: [
            {
              key: '1',
              name: 'questions 1',
              type: 'questions',
              index: 0,
            },
            {
              key: '2',
              name: 'questions 2',
              type: 'questions',
              index: 1,
            },
          ],
        },
        {
          key: '2',
          name: 'Competency 2',
          type: 'competency',
          index: 0,
          questions: [
            {
              key: '1',
              name: 'questions 1',
              type: 'questions',
              index: 0,
            },
            {
              key: '2',
              name: 'questions 2',
              type: 'questions',
              index: 1,
            },
          ],
        },
      ],
    },
    {
      key: '2',
      name: 'Cluster 2',
      type: 'cluster',
      index: 0,
      competencies: [
        {
          key: '1',
          name: 'Competency 1',
          type: 'competency',
          index: 0,
          questions: [
            {
              key: '1',
              name: 'questions 1',
              type: 'questions',
              index: 0,
            },
            {
              key: '2',
              name: 'questions 2',
              type: 'questions',
              index: 1,
            },
          ],
        },
        {
          key: '2',
          name: 'Competency 2',
          type: 'competency',
          index: 0,
          questions: [
            {
              key: '1',
              name: 'questions 1',
              type: 'questions',
              index: 0,
            },
            {
              key: '2',
              name: 'questions 2',
              type: 'questions',
              index: 1,
            },
          ],
        },
      ],
    },
  ];

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setRatingScales({ ...ratingScales, [name]: value });
  };
  const handleOnChangeRatingScales = (event) => {
    const { name, value } = event.target;
    setfeedbacks({ ...feedbacks, [name]: value });
  };
  const handleOnChangeRatingScalesCheckbox = (event, name) => {
    console.log('event', event, name);
    setfeedbacks({ ...feedbacks, [name]: event });
  };
  //data table
  const handleSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter((el) => !!el);
      setDataSource(newData);
    }
  };
  //sec menu
  const handleClickMenu = (e) => {};

  const handleCluterClick = (e) => {
    console.log('cluter id:', e.target.id);
    alert('cluter click');
  };

  const handleCompetencyClick = (e) => {
    console.log('Competency id:', e.target.id);
    alert('Competency click');
  };

  const handleQuestionClick = (e, id) => {
    console.log('Question id:', id);
    alert('Question click');
  };
  return (
    <>
      <MainLayout
        title="Super User"
        hasBreadCrumb
        titleClass="mb-2"
        contentClass="py-4"
        headerClassName="pl-21"
        childrenPadding={false}
      >
        <div className="bg-white grid grid-cols-12 pl-15">
          <Menu className="col-span-2" />
          <div className="px-6 py-5 col-start-3 col-span-10  ">
            <Steps currentPosition={3} />
            <div className="pr-28">
              <div className="mt-17">
                <h4 className=" text-secondary text-20px mb-8">Rating Scale</h4>

                <div className="mb-6">
                  <span className="text-heading">1</span>
                  <div className="flex flex-row mt-3">
                    <Input
                      placeholder="Label"
                      value={ratingScales.label1}
                      name="label1"
                      inputClass="w-41"
                      wrapperClassName="mr-6"
                      onChange={handleOnChange}
                    />
                    <Input
                      value={ratingScales.description1}
                      name="description1"
                      onChange={handleOnChange}
                      placeholder="Does not describe the person at all"
                      wrapperClassName="w-full"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <span className="text-heading">2</span>
                  <div className="flex flex-row mt-3">
                    <Input
                      placeholder="Label"
                      value={ratingScales.label2}
                      name="label2"
                      inputClass="w-41"
                      wrapperClassName="mr-6"
                      onChange={handleOnChange}
                    />
                    <Input
                      value={ratingScales.description2}
                      name="description2"
                      onChange={handleOnChange}
                      placeholder="Does not describe the person much"
                      wrapperClassName="w-full"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <span className="text-heading">3</span>
                  <div className="flex flex-row mt-3">
                    <Input
                      placeholder="Label"
                      value={ratingScales.label3}
                      name="label3"
                      inputClass="w-41"
                      wrapperClassName="mr-6"
                      onChange={handleOnChange}
                    />
                    <Input
                      value={ratingScales.description3}
                      name="description3"
                      onChange={handleOnChange}
                      placeholder="Describe the person somewhat"
                      wrapperClassName="w-full"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <span className="text-heading">4</span>
                  <div className="flex flex-row mt-3">
                    <Input
                      placeholder="Label"
                      value={ratingScales.label4}
                      name="label4"
                      inputClass="w-41"
                      wrapperClassName="mr-6"
                      onChange={handleOnChange}
                    />
                    <Input
                      value={ratingScales.description4}
                      name="description4"
                      onChange={handleOnChange}
                      placeholder="Describe the persone the most"
                      wrapperClassName="w-full"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <span className="text-heading">0</span>
                  <div className="flex flex-row mt-3">
                    <Input
                      placeholder="Label"
                      value={ratingScales.label0}
                      name="label0"
                      inputClass="w-41"
                      wrapperClassName="mr-6"
                      onChange={handleOnChange}
                    />
                    <Input
                      value={ratingScales.description0}
                      name="description0"
                      onChange={handleOnChange}
                      placeholder="No oppotunity to observe"
                      wrapperClassName="w-full"
                    />
                  </div>
                </div>

                <h4 className=" text-secondary text-20px mt-8.5">Data Model</h4>
              </div>
              <div className="flex flex-row mt-8 mb-7.5 w-full">
                <SecondaryMenu
                  title="ALL"
                  titleClassName="pt-2.3 pb-5.5 pl-7.5 text-body font-medium font-sans"
                  className="mr-6"
                  menuItems={menuItems}
                  onClickMenu={handleClickMenu}
                  onClickCluter={handleCluterClick}
                  onClickCompetency={handleCompetencyClick}
                  onClickQuestion={handleQuestionClick}
                />
                <div className="p-6 rounded-7px border border-antgray-500 w-full">
                  <div className="flex flex-row justify-between bg-antgray-600 h-14 w-full pl-8 py-3 pr-6 items-center border-b border-list-border">
                    <span>All</span>
                    <div className="flex items-center">
                      <Button
                        className="flex items-center mr-3.5"
                        onClick={() => setquestionModal(true)}
                      >
                        <span className="text-12 pr-2">Add Cluster</span>
                        <PlusCircleOutlined />
                      </Button>
                      <Button disabled className="flex items-center">
                        <span className="text-12 pr-2">Export Exel File</span>
                        <PlusCircleOutlined />
                      </Button>
                    </div>
                  </div>

                  <DataTable items={clusters} data={dataSource} onSortEnd={handleSortEnd} />
                </div>
              </div>

              <div className=" bg-antgray-600 rounded-7px w-full pl-8.2 pt-6 pb-5.5 pr-3.5">
                <div className="flex flex-row items-center justify-between mb-6">
                  <h4 className=" text-secondary text-20px   ">Feedbacks</h4>
                  <Button className="flex items-center " onClick={() => setfeedbackModal(true)}>
                    <span className="text-12 pr-2">Add Question</span>
                    <PlusCircleOutlined />
                  </Button>
                </div>

                <div className="flex flex-row items-center">
                  <button className="flex flex-col">
                    <LineOutlined className="text-antgray-100 text-lg" />
                    <LineOutlined className="text-antgray-100 text-lg -mt-2" />
                  </button>
                  <Input
                    onChange={handleOnChangeRatingScales}
                    name="general1"
                    placeholder="General"
                    value={feedbacks.general1}
                    inputClass="w-41"
                    wrapperClassName="mr-6 ml-8.3"
                  />
                  <Input
                    onChange={handleOnChangeRatingScales}
                    name="statement1"
                    placeholder="Statement"
                    value={feedbacks.statement1}
                    inputClass="pl-10"
                    wrapperClassName="w-full"
                  />
                </div>
                <div className="flex justify-end items-center pt-1.5">
                  <Checkbox
                    checked={feedbacks.required1}
                    onChange={(event) => handleOnChangeRatingScalesCheckbox(event, 'required1')}
                    labelClass="text-secondary"
                  >
                    Required
                  </Checkbox>
                </div>
                <div className="flex flex-row items-center mt-6.5">
                  <button className="flex flex-col">
                    <LineOutlined className="text-antgray-100 text-lg" />
                    <LineOutlined className="text-antgray-100 text-lg -mt-2" />
                  </button>
                  <Input
                    onChange={handleOnChangeRatingScales}
                    name="general2"
                    placeholder="General"
                    value={feedbacks.general2}
                    inputClass="w-41"
                    wrapperClassName="mr-6 ml-8.3"
                  />
                  <Input
                    onChange={handleOnChangeRatingScales}
                    name="statement2"
                    placeholder="Statement"
                    value={feedbacks.statement2}
                    inputClass="pl-10"
                    wrapperClassName="w-full"
                  />
                </div>
                <div className="flex justify-end items-center pt-1.5">
                  <Checkbox
                    checked={feedbacks.required2}
                    onChange={(event) => handleOnChangeRatingScalesCheckbox(event, 'required2')}
                    labelClass="text-secondary"
                  >
                    Required
                  </Checkbox>
                </div>
              </div>
              <div className="mt-16 pb-22 flex justify-end">
                <SecondaryButton
                  type="link"
                  text="Back"
                  className="text-base w-24.5 h-9.5 flex items-center justify-center"
                />
                <SecondaryButton
                  text="Next"
                  className="text-base w-24.5 h-9.5 flex items-center justify-center"
                />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
      <AddQuestionModal visible={questionModal} action={setquestionModal} />
      <AddFeedbackModal visible={feedbackModal} action={setfeedbackModal} />
    </>
  );
};

export default SurveyQuestionsList;
