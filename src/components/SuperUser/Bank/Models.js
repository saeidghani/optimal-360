import React from 'react';
import PropTypes from 'prop-types';

import { useQuery } from '../../../hooks';

import Button from '../../Common/Button';
import MainLayout from '../../Common/Layout';
import Table from '../../Common/Table';

const Models = ({ loading, surveyGroups, fetchSurveyGroups, exportSurveyGroup }) => {
  const [parsedQuery, query, setQuery] = useQuery();

  const [pageSize, setPageSize] = React.useState(parsedQuery?.page_size || 10);
  const pageNumber = parsedQuery?.page_number;

  React.useEffect(() => {
    fetchSurveyGroups(query);
  }, [query, fetchSurveyGroups]);

  const getSortOrder = (key) => {
    return parsedQuery?.sort?.includes(key)
      ? parsedQuery?.sort?.[0] === '+'
        ? 'ascend'
        : 'descend'
      : '';
  };

  const sort = (sorter) => {
    // eslint-disable-next-line operator-linebreak
    const order = parsedQuery?.sort?.[0] === '+' ? '-' : '+';
    const newItem = `${order}${sorter.columnKey}`;

    setQuery({ sort: newItem });
  };

  const columns = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
      sortOrder: getSortOrder('id'),
    },
    {
      key: 'name',
      title: 'Survey Group',
      dataIndex: 'name',
      sorter: true,
      sortOrder: getSortOrder('name'),
    },
    {
      key: 'action',
      width: 100,
      render: () => (
        <div className="flex items-center">
          <Button
            // onClick={async () => {
            //   const { data } = await exportSurveyGroup(id);

            //   const blob = new Blob([data], {
            //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            //   });
            //   // const csvURL = window.URL.createObjectURL(blob);

            //   const reader = new FileReader();

            //   reader.onload = (res) => {
            //     console.log('onload', res);

            //     setDownload(res.target.result);

            //     // const tempLink = document.createElement('a');
            //     // tempLink.href = res.target.result;
            //     // tempLink.setAttribute('download', 'filename.csv');
            //     // tempLink.click();
            //   };

            //   reader.readAsDataURL(blob);
            // }}
            className="flex items-center mr-3.5"
            text="Export Exel File"
            icon="FileExcelOutlined"
            size="middle"
            textSize="md"
            textClassName="mr-2"
            iconPosition="right"
            type="gray"
          />
          <Button
            // onClick={async () => {
            //   await duplicateProject(projectId);
            //   fetch();
            // }}
            icon="EditOutlined"
            type="link"
            className="text-xl text-primary-500 cursor-pointer"
            size="middle"
          />
        </div>
      ),
    },
  ];

  const renderHeader = () => (
    <div className="flex justify-end">
      <Button
        className="flex items-center mr-3.5"
        text="New Survey Group"
        icon="PlusCircleOutlined"
        textClassName="mr-2"
        size="middle"
        textSize="md"
        iconPosition="right"
        type="gray"
      />
      <Button
        className="flex items-center mr-3.5"
        text="Export Exel File"
        icon="FileExcelOutlined"
        textClassName="mr-2"
        size="middle"
        textSize="md"
        iconPosition="right"
        type="gray"
      />
    </div>
  );

  return (
    <MainLayout
      hasBreadCrumb
      title="Pre Defined Data"
      contentClass="py-6 pl-21 pr-6"
      titleClass="mb-6 mt-3"
    >
      {/* <a target="_blank" rel="noreferrer" href={download} download={download}>
        CSV FILE
      </a> */}

      <Table
        className="p-6 bg-white rounded-lg shadow"
        showSorterTooltip={false}
        size="middle"
        onTableChange={({ sorter }) => sort(sorter)}
        renderHeader={renderHeader}
        loading={loading}
        columns={columns}
        dataSource={surveyGroups?.data?.length > 0 ? surveyGroups.data : []}
        rowSelection={false}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setQuery({ page_size: size, page_number: 1 });
        }}
        pageSize={pageSize * 1}
        pageNumber={pageNumber * 1}
        // eslint-disable-next-line camelcase
        onPaginationChange={(page_number, page_size) => {
          setQuery({
            page_size,
            page_number,
          });
        }}
        totalRecordSize={surveyGroups?.metaData?.pagination?.totalRecords * 1}
      />
    </MainLayout>
  );
};

Models.propTypes = {
  loading: PropTypes.bool.isRequired,
  surveyGroups: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    metaData: PropTypes.shape({
      pagination: PropTypes.shape({
        totalRecords: PropTypes.string,
      }),
    }),
  }).isRequired,
  fetchSurveyGroups: PropTypes.func.isRequired,
  exportSurveyGroup: PropTypes.func.isRequired,
};

Models.defaultProps = {};

export default Models;
