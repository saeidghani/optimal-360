import React from 'react';
import PropTypes from 'prop-types';
import { QuestionOutlined, SaveOutlined } from '@ant-design/icons';

import Layout from './Helper/Layout';

import Button from '../Common/Button';
import Table from '../Common/Table';
import Radio from '../Common/RadioGroup';
import TextArea from '../Common/TextArea';

const ReferenceGuide = ({ loading }) => {
  const [comment, setComment] = React.useState('');
  const [isClear, setIsClear] = React.useState(1);
  const [items, setItems] = React.useState({});

  const columns = React.useMemo(() => [
    {
      key: 'notAtAll',
      title: (
        <div className="inline-flex flex-col justify-between items-center md:flex-row">
          <span className="mr-0 text-xs md:mr-2 mb-2 md:mb-0 md:text-sm">Not at all</span>
          <QuestionOutlined
            className="text-white bg-gray-400 w-5 h-5 rounded-full"
            style={{ paddingTop: 3 }}
          />
        </div>
      ),
      width: 100,
      render: (itm) => (
        <Radio
          onChange={(e) => setItems({ ...items, [itm.id]: e.target.value })}
          items={itm.options}
          value={items[itm.id]}
          className="pl-5"
        />
      ),
    },
    {
      key: 'notMuch',
      title: (
        <div className="inline-flex flex-col justify-between items-center md:flex-row">
          <span className="mr-0 text-xs md:mr-2 mb-2 md:mb-0 md:text-sm">Not much</span>
          <QuestionOutlined
            className="text-white bg-gray-400 w-5 h-5 rounded-full"
            style={{ paddingTop: 3 }}
          />
        </div>
      ),
      width: 100,
      render: (itm) => (
        <Radio
          onChange={(e) => setItems({ ...items, [itm.id]: e.target.value })}
          items={itm.options}
          value={items[itm.id]}
          className="pl-5"
        />
      ),
    },
    {
      key: 'somewhat',
      title: (
        <div className="inline-flex flex-col justify-between items-center md:flex-row">
          <span className="mr-0 text-xs md:mr-2 mb-2 md:mb-0 md:text-sm">Somewhat</span>
          <QuestionOutlined
            className="text-white bg-gray-400 w-5 h-5 rounded-full"
            style={{ paddingTop: 3 }}
          />
        </div>
      ),
      width: 100,
      render: (itm) => (
        <Radio
          onChange={(e) => setItems({ ...items, [itm.id]: e.target.value })}
          items={itm.options}
          value={items[itm.id]}
          className="pl-5"
        />
      ),
    },
    {
      key: 'most',
      title: (
        <div className="inline-flex flex-col justify-between items-center md:flex-row">
          <span className="mr-0 text-xs md:mr-2 mb-2 md:mb-0 md:text-sm">Most</span>
          <QuestionOutlined
            className="text-white bg-gray-400 w-5 h-5 rounded-full"
            style={{ paddingTop: 3 }}
          />
        </div>
      ),
      width: 100,
      render: (itm) => (
        <Radio
          onChange={(e) => setItems({ ...items, [itm.id]: e.target.value })}
          items={itm.options}
          value={items[itm.id]}
          className="pl-5"
        />
      ),
    },
  ]);

  const dataSource = [
    {
      key: '1',
      notAtAll: { id: '101', options: [{ title: '', value: '1' }] },
      notMuch: { id: '101', options: [{ title: '', value: '2' }] },
      somewhat: { id: '101', options: [{ title: '', value: '3' }] },
      most: { id: '101', options: [{ title: '', value: '4' }] },
    },
    {
      key: '2',
      notAtAll: { id: '102', options: [{ title: '', value: '1' }] },
      notMuch: { id: '102', options: [{ title: '', value: '2' }] },
      somewhat: { id: '102', options: [{ title: '', value: '3' }] },
      most: { id: '102', options: [{ title: '', value: '4' }] },
    },
    {
      key: '3',
      notAtAll: { id: '103', options: [{ title: '', value: '1' }] },
      notMuch: { id: '103', options: [{ title: '', value: '2' }] },
      somewhat: { id: '103', options: [{ title: '', value: '3' }] },
      most: { id: '103', options: [{ title: '', value: '4' }] },
    },
    {
      key: '4',
      notAtAll: { id: '104', options: [{ title: '', value: '1' }] },
      notMuch: { id: '104', options: [{ title: '', value: '2' }] },
      somewhat: { id: '104', options: [{ title: '', value: '3' }] },
      most: { id: '104', options: [{ title: '', value: '4' }] },
    },
  ];

  return (
    <Layout title="Reference Guide">
      <div className="hidden text-left text-heading md:block">Reference Guide</div>
      <h1 className="hidden text-base text-primary-500 font-medium mt-1 md:mt-12 md:block">
        Reference Guide
      </h1>
      <p className="text-heading font-semibold md:hidden">
        You will read a behavioral statement where you have to rate how well it describes the person
        you are rating:
      </p>
      <div className="rounded-lg mt-8 grid grid-cols-12 col-gap-12 md:bg-white md:shadow md:p-10">
        <p className="text-heading font-semibold hidden md:block col-start-1 col-span-12 md:row-start-1 md:mb-10">
          You will read a behavioral statement where you have to rate how well it describes the
          person you are rating:
        </p>
        <Table
          size="middle"
          className="p-0 col-start-1 col-span-12 md:col-start-6 md:row-start-2 md:col-span-7"
          tableClassName="overflow-auto"
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          title=""
          rowSelection={false}
          pagination={false}
        />
        <div
          className="mt-8 col-start-1 row-start-2 col-span-12
        md:col-start-1 md:row-start-2 md:col-span-5 md:pr-6"
        >
          <div>
            <span className="text-heading font-semibold">Describes this person most:</span>
            <p className="mt-2">
              If the behavior is shown almost always (90% of the time); it may describe the person
              exactly.
            </p>
          </div>
          <div className="mt-5">
            <span className="text-heading font-semibold">Describes this person somewhat:</span>
            <p className="mt-2">If the behavior is shown over half the time, but not always.</p>
          </div>
          <div className="mt-5">
            <span className="text-heading font-semibold">Does not describe this person much:</span>
            <p className="mt-2">
              If the behavior is shown rarely, maybe under very specific circumstances
            </p>
          </div>
          <div className="mt-5">
            <span className="text-heading font-semibold">
              Does not describe this person at all:
            </span>
            <p className="mt-2">
              If the behavior is not shown by the person at all, or you have never observed the
              behavior by this person.
            </p>
          </div>
        </div>
        <div
          className="mt-4 row-start-3 col-start-1 col-span-12 mt-10
        md:mt-4 md:row-start-3 md:col-start-6 md:col-span-7"
        >
          <span className="md:hidden">Katherine Kan</span>
          <div className="border border-solid border-antgray-100 rounded-md h-24">
            <TextArea
              placeholder="(The verbatim can be left empty by clicking skip)"
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>
        <p
          className="mt-8 row-start-4 col-start-1 col-span-12
        md:mt-6 md:row-start-3 md:col-start-1 md:col-span-5 md:pr-6"
        >
          At the end of the survey, you will have the option to add verbatim comments. This is
          optional, but highly recommended for contextual feedback to the person(s). You have the
          option to skip this section.
        </p>
        <div
          className="mt-10 row-start-5 col-start-1 col-span-12 flex justify-between items-center w-3/5
        md:mt-0 md:row-start-4 md:col-start-6 md:col-span-2 md:w-full"
        >
          <div className="flex">
            <span>Not Clear</span>
            <QuestionOutlined
              className="text-white bg-gray-400 w-5 h-5 rounded-full ml-3"
              style={{ paddingTop: 3 }}
            />
          </div>
          <Radio
            items={[
              { title: '', value: 1 },
              { title: '', value: 2 },
            ]}
            value={isClear}
            onChange={(e) => setIsClear(e.target.value)}
          />
        </div>
        <p
          className="mt-4 row-start-6 col-start-1 col-span-12
        md:row-start-4 md:col-start-1 md:col-span-5 md:pr-6"
        >
          If you feel you are unable to rate the person for this behavior because you were never
          given the opportunity to observe him/her, please select “Cannot rate clearly”.
        </p>
        <div
          className="flex justify-start w-3/4 mt-7 row-start-7 col-start-1 col-span-12
        md:row-start-5 md:col-start-6 md:col-span-7 md:w-full md:mb-10 md:flex-row md:my-auto md:mr-auto"
        >
          <Button
            className="mt-6 text-primary-500 w-full mr-2 md:pl-auto md:w-auto md:border-none"
            text="Skip for now"
            type="link"
          />
          <Button
            className="mt-6 shadow-none w-full py-6 px-5 md:w-auto md:border-none"
            text="Submit All"
          />
        </div>
        <p
          className="mt-8 row-start-8 col-start-1 col-span-12
        md:row-start-5 md:col-start-1 md:col-span-5 md:pr-6"
        >
          Once you have rated and reviewed (optional) all your ratees, you may click “Submit All”
          button on the dashboard.
        </p>
        <div
          className="flex mt-12 row-start-9 col-start-1 col-span-12
        md:row-start-9 md:col-start-1 md:col-span-8"
        >
          <div>
            <QuestionOutlined
              className="text-gray-600 rounded-full border-2
            border-solid border-gray-600 w-5 h-5"
            />
          </div>
          <p className="ml-5 md:pt-1">
            At any time you want to return to this Reference Guide, click on this icon in website
            header
          </p>
        </div>
        <div
          className="flex mt-6 row-start-10 col-start-1 col-span-12
        md:row-start-10 md:col-start-1 md:col-span-8"
        >
          <div>
            <SaveOutlined className="text-gray-600 text-xl" />
          </div>
          <p className="ml-5 md:pt-1">
            There is not save function as the survey is progressively auto-saved.
          </p>
        </div>
      </div>
      <div className="hidden md:flex justify-center">
        <Button
          className="mt-16 shadow-none w-full py-6 px-5 md:w-auto md:border-none"
          text="Ok, Got it!"
        />
      </div>
    </Layout>
  );
};

ReferenceGuide.propTypes = {
  loading: PropTypes.bool.isRequired,
};

ReferenceGuide.defaultProps = {};

export default ReferenceGuide;
